// 面接の進行スクリプト。面接官の発話 → 自動でマイクON → 無音検知で自動送信 → 次へ、を繰り返す。
import { AnswerRecord, AppSettings, ExamCard, ExaminerProfile, PhaseId, ReadingAssessment, ScoredItem } from '../types';
import { ListenResult, listen, sleep, speak } from '../lib/speech';
import { playSfx } from '../lib/sfx';
import { EvalResult, evaluateAnswer } from '../lib/api';
import { isYesAnswer } from '../lib/scoring';
import { AzureUnavailableError, azureConfigured, listenReadingAzure } from '../lib/azurePronunciation';

export const modelReadingText = (card: ExamCard) => `${card.title}. ${card.passage}`;

export type CardState = 'none' | 'front' | 'back';
export type FeedbackAction = 'next' | 'retry';

export interface Bridge {
  setPhase(p: PhaseId): void;
  setLine(text: string | null, ja?: string): void;
  setSpeaking(b: boolean): void;
  setListening(active: boolean, hint?: string): void;
  setInterim(text: string): void;
  setSilence(ratio: number): void;
  setCardState(s: CardState): void;
  setTimer(sec: number | null): void;
  upsertRecord(rec: AnswerRecord): void;
  /** 練習モード: 1問ごとの解説表示。ユーザーの選択（または自動で next）を返す */
  showFeedback(rec: AnswerRecord, evalPromise: Promise<EvalResult>): Promise<FeedbackAction>;
}

export interface InterviewResult {
  records: AnswerRecord[];
  greetingAnswered: number;
  greetingTotal: number;
  evals: Promise<void>;
}

const PARDON_RE = /\b(pardon|sorry|excuse me|one more time|again please|repeat)\b/i;

export async function runInterview(
  card: ExamCard,
  examiner: ExaminerProfile,
  settings: AppSettings,
  useClaude: boolean,
  bridge: Bridge,
  signal: AbortSignal
): Promise<InterviewResult> {
  const practice = settings.mode === 'practice';
  const records = new Map<ScoredItem, AnswerRecord>();
  const latest = new Map<ScoredItem, AnswerRecord>();
  const evalPromises: Promise<void>[] = [];
  let greetingAnswered = 0;
  let greetingTotal = 0;
  let candidateName = '';

  const say = async (text: string, ja?: string) => {
    bridge.setLine(text, ja);
    bridge.setSpeaking(true);
    try {
      await speak(text, {
        voiceHints: examiner.voiceHints,
        rate: examiner.rate * settings.speechRate,
        pitch: examiner.pitch,
        signal,
      });
    } finally {
      bridge.setSpeaking(false);
    }
    await sleep(250, signal);
  };

  const hear = async (kind: 'short' | 'answer' | 'reading', hint: string): Promise<ListenResult> => {
    const cfg =
      kind === 'reading'
        ? { silenceMs: Math.max(3000, settings.silenceSec * 1500), noSpeechMs: 15000, maxMs: 90000 }
        : kind === 'answer'
          ? { silenceMs: settings.silenceSec * 1000, noSpeechMs: 12000, maxMs: 45000 }
          : { silenceMs: Math.min(1500, settings.silenceSec * 1000), noSpeechMs: 7000, maxMs: 15000 };
    playSfx('micOn');
    bridge.setInterim('');
    bridge.setListening(true, hint);
    try {
      return await listen({
        ...cfg,
        signal,
        onInterim: bridge.setInterim,
        onSilenceProgress: bridge.setSilence,
      });
    } finally {
      bridge.setListening(false);
      bridge.setSilence(0);
      playSfx('micOff');
    }
  };

  /** 音読: Azure 設定があれば発音評価付きで録音。失敗時はブラウザの音声認識 */
  const hearReading = async (): Promise<ListenResult & { assessment?: ReadingAssessment | null }> => {
    if (azureConfigured(settings.azureKey, settings.azureRegion)) {
      playSfx('micOn');
      bridge.setInterim('');
      bridge.setListening(true, 'タイトルから音読しましょう（発音評価中）');
      try {
        return await listenReadingAzure({
          key: settings.azureKey,
          region: settings.azureRegion,
          referenceText: modelReadingText(card),
          silenceMs: Math.max(3000, settings.silenceSec * 1500),
          noSpeechMs: 15000,
          maxMs: 90000,
          signal,
          onInterim: bridge.setInterim,
          onSilenceProgress: bridge.setSilence,
        });
      } catch (e) {
        if (!(e instanceof AzureUnavailableError)) throw e;
        console.warn('Azure 発音評価を使えないため通常の音声認識に切り替え:', e.message);
      } finally {
        bridge.setListening(false);
        bridge.setSilence(0);
        playSfx('micOff');
      }
    }
    return hear('reading', 'タイトルから音読しましょう');
  };

  /** 挨拶など採点外のやりとり */
  const smallTalk = async (line: string, hint: string, ja?: string) => {
    await say(line, ja);
    const r = await hear('short', hint);
    greetingTotal++;
    if (r.text) greetingAnswered++;
    return r;
  };

  const startEval = (rec: AnswerRecord) => {
    const p = evaluateAnswer(card, rec, settings, useClaude);
    latest.set(rec.item, rec);
    const done = p.then((fb) => {
      if (latest.get(rec.item) !== rec) return; // やり直し済みの古い回答
      const updated = { ...rec, feedback: fb };
      records.set(rec.item, updated);
      bridge.upsertRecord(updated);
    });
    evalPromises.push(done);
    return p;
  };

  /** 採点対象の質問。聞き返し・無言時の繰り返し・練習モードの解説/やり直しを含む */
  const ask = async (item: Exclude<ScoredItem, 'reading'>, prefix: string) => {
    const q = card[item];
    for (;;) {
      let pardonUsed = false;
      await say(`${prefix}${q.text}`, q.ja);
      let r = await hear('answer', '英語で答えてください');

      for (let tries = 0; tries < 2; tries++) {
        if (r.reason === 'pardon' || (PARDON_RE.test(r.text) && r.text.split(' ').length <= 5)) {
          pardonUsed = true;
          await say(`All right. ${q.text}`, q.ja);
          r = await hear('answer', 'もう一度どうぞ');
        } else if (!r.text && r.reason === 'nospeech' && tries === 0) {
          await say(`I'll say it again. ${q.text}`, q.ja);
          r = await hear('answer', '英語で答えてください');
        } else break;
      }

      const rec: AnswerRecord = {
        item,
        question: q.text,
        answer: r.text,
        latencySec: r.latencySec,
        pardonUsed,
      };

      if (item === 'q5' && r.text) {
        const yes = isYesAnswer(r.text);
        const follow = yes === false ? card.q5.followUpNo : card.q5.followUpYes;
        await say(follow);
        const f = await hear('answer', '続けてもう少し話しましょう');
        rec.followUpQuestion = follow;
        rec.followUpAnswer = f.text;
      }

      records.set(item, rec);
      bridge.upsertRecord(rec);
      const p = startEval(rec);

      if (!practice) return;
      const action = await bridge.showFeedback(rec, p);
      if (action === 'next') return;
      // retry: 同じ質問をもう一度
    }
  };

  {
    // ---- 入室 ----
    bridge.setPhase('entrance');
    bridge.setCardState('none');
    playSfx('knock');
    await sleep(1300, signal);
    playSfx('door');
    await sleep(700, signal);
    await smallTalk('Hello.', '挨拶しましょう (Hello.)', 'こんにちは。');
    await smallTalk('Can I have your card, please?', '面接カードを渡しましょう (Here you are.)', '（面接）カードをいただけますか？');
    await smallTalk('Thank you. Please sit down.', 'お礼を言って着席 (Thank you.)', 'ありがとう。お座りください。');

    // ---- 名前・挨拶 ----
    bridge.setPhase('greeting');
    const nameRes = await smallTalk(
      `My name is ${examiner.name}. May I have your name, please?`,
      '名前を答えましょう (My name is ...)',
      `私は${examiner.name}です。お名前を教えてください。`
    );
    const m = nameRes.text.match(/(?:my name is|i am|i'm)\s+([a-z]+)/i);
    candidateName = m ? m[1][0].toUpperCase() + m[1].slice(1) : '';
    await smallTalk('This is the Grade 3 test. OK?', '返事をしましょう (OK. / Yes.)', 'これは3級のテストです。いいですか？');
    await smallTalk('How are you?', '答えましょう (I\'m fine, thank you.)', '調子はどうですか？');
    await say("Good. Let's start the test. Here is your card.", 'では、テストを始めましょう。こちらがカードです。');

    // ---- 黙読 ----
    playSfx('flip');
    bridge.setCardState('front');
    bridge.setPhase('silent_reading');
    await say('First, please read the passage silently.', 'まず、パッセージを黙読してください。');
    for (let s = 20; s > 0; s--) {
      bridge.setTimer(s);
      if (s <= 3) playSfx('tick');
      await sleep(1000, signal);
    }
    bridge.setTimer(null);
    playSfx('timeUp');

    // ---- 音読 ----
    bridge.setPhase('reading_aloud');
    if (practice && settings.listenModelFirst) {
      // 練習モード: 先にお手本音読を聞く（本番にはない練習用ステップ）
      await say("Before you read, let's listen to a model reading.", '音読の前に、お手本を聞きましょう。');
      bridge.setLine(modelReadingText(card), 'お手本音読：区切り（カンマ・ピリオド）と強弱をまねしましょう');
      bridge.setSpeaking(true);
      try {
        await speak(modelReadingText(card), {
          voiceHints: examiner.voiceHints,
          rate: examiner.rate * settings.speechRate * 0.92,
          pitch: examiner.pitch,
          signal,
        });
      } finally {
        bridge.setSpeaking(false);
      }
      await sleep(600, signal);
    }
    await say('All right. Now, please read it aloud.', 'では、声に出して読んでください。');
    const rd = await hearReading();
    const readingRec: AnswerRecord = {
      item: 'reading',
      question: 'Please read the passage aloud.',
      answer: rd.text,
      latencySec: rd.latencySec,
      pardonUsed: false,
      pronunciation: rd.assessment ?? undefined,
    };
    records.set('reading', readingRec);
    bridge.upsertRecord(readingRec);
    const readEval = startEval(readingRec);
    if (practice) await bridge.showFeedback(readingRec, readEval);

    // ---- No.1 - No.3 ----
    await say("Now, I'm going to ask you five questions.", '今から5つの質問をします。');
    bridge.setPhase('q1');
    await ask('q1', 'No. 1. ');
    bridge.setPhase('q2');
    await ask('q2', 'No. 2. ');
    bridge.setPhase('q3');
    await ask('q3', 'No. 3. ');

    // ---- カードを裏返す ----
    bridge.setPhase('turnover');
    await say(
      `Now, ${candidateName ? candidateName + ', ' : ''}please turn the card over.`,
      'では、カードを裏返してください。'
    );
    playSfx('flip');
    bridge.setCardState('back');
    await sleep(900, signal);

    bridge.setPhase('q4');
    await ask('q4', 'No. 4. ');
    bridge.setPhase('q5');
    await ask('q5', 'No. 5. ');

    // ---- 退室 ----
    bridge.setPhase('exit');
    await smallTalk(
      'All right. This is the end of the test. Could I have the card back, please?',
      'カードを返しましょう (Here you are.)',
      'これでテストは終わりです。カードを返してください。'
    );
    bridge.setCardState('none');
    await smallTalk('Thank you. You may go now.', 'お礼と挨拶 (Thank you. Goodbye.)', 'ありがとう。退室して結構です。');
    playSfx('door');
    bridge.setLine(null);
  }

  return {
    records: Array.from(records.values()),
    greetingAnswered,
    greetingTotal,
    evals: Promise.all(evalPromises).then(() => undefined),
  };
}
