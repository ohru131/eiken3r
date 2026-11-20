// 面接の進行スクリプト。面接官の発話 → 自動でマイクON → 無音検知で自動送信 → 次へ、を繰り返す。
import { AnswerRecord, AppSettings, ExamCard, ExaminerProfile, PhaseId, ReadingAssessment, ScoredItem } from '../types';
import { ListenResult, listen, sleep, speak } from '../lib/speech';
import { playSfx } from '../lib/sfx';
import { EvalResult, evaluateAnswer } from '../lib/api';
import { isYesAnswer } from '../lib/scoring';
import { AzureUnavailableError, azureConfigured, listenReadingAzure } from '../lib/azurePronunciation';
import { gradeInfo, hasFollowUp } from '../lib/grade';
import { startRecording } from '../lib/audioStore';
import { analyzeFluency, mergeFluency } from '../lib/fluency';
import { HintTarget, answerJa, hintTarget } from '../lib/hints';

export const modelReadingText = (card: ExamCard) => `${card.title}. ${card.passage}`;

export type CardState = 'none' | 'front' | 'back';
export type FeedbackAction = 'next' | 'retry';

/** 誰の発話か（デモでは受験者役も話す） */
export type Speaker = 'examiner' | 'candidate';

export interface Bridge {
  setPhase(p: PhaseId): void;
  setLine(text: string | null, ja?: string, who?: Speaker): void;
  setSpeaking(b: boolean): void;
  setListening(active: boolean, hint?: string): void;
  setInterim(text: string): void;
  setSilence(ratio: number): void;
  setCardState(s: CardState): void;
  setTimer(sec: number | null): void;
  upsertRecord(rec: AnswerRecord): void;
  /** 練習モード: 1問ごとの解説表示。ユーザーの選択（または自動で next）を返す */
  showFeedback(rec: AnswerRecord, evalPromise: Promise<EvalResult>): Promise<FeedbackAction>;
  /** 練習モード: いま答えている質問のヒント対象（null で非表示） */
  setHintTarget?(t: HintTarget | null): void;
  /** 直前の回答で見たヒントの段階数を返し、0 に戻す */
  takeHintsUsed?(): number;
}

export interface RunOptions {
  /** お手本デモ: 受験者役も音声で自動再生し、採点・記録はしない */
  demo?: boolean;
  /** デモの受験者役の声 */
  candidateVoice?: { voiceHints: string[]; rate: number; pitch: number };
}

/** デモの受験者役のあいさつ（面接官の台詞 → 受験者の返事） */
const DEMO_SMALLTALK: [RegExp, string, string][] = [
  [/^Hello\.$/, 'Hello.', 'こんにちは。'],
  [/Can I have your card/, 'Here you are.', 'はい、どうぞ。'],
  [/Please sit down/, 'Thank you.', 'ありがとうございます。'],
  [/May I have your name/, 'My name is Aoi Tanaka.', '田中あおいです。'],
  [/test\. OK\?/, 'OK.', 'はい。'],
  [/How are you\?/, "I'm fine, thank you.", '元気です、ありがとうございます。'],
  [/card back/, 'Here you are.', 'はい、どうぞ。'],
  [/You may go now/, 'Thank you. Goodbye.', 'ありがとうございました。さようなら。'],
];

export interface InterviewResult {
  records: AnswerRecord[];
  greetingAnswered: number;
  greetingTotal: number;
  evals: Promise<void>;
}

type HearKind = 'short' | 'answer' | 'long' | 'story' | 'opinion' | 'reading';

const STORY_REPEAT = 'Please look at the picture and describe the situation. Your story should begin with the sentence on the card.';
const STORY_REPEAT_JA = 'イラストを見て状況を説明してください。カードに書かれている文で話を始めてください。';

const PARDON_RE = /\b(pardon|sorry|excuse me|one more time|again please|repeat)\b/i;

export async function runInterview(
  card: ExamCard,
  examiner: ExaminerProfile,
  settings: AppSettings,
  useClaude: boolean,
  bridge: Bridge,
  signal: AbortSignal,
  opts: RunOptions = {}
): Promise<InterviewResult> {
  const demo = !!opts.demo;
  // デモは練習モード扱い（字幕あり）だが、解説・採点は出さない
  const practice = settings.mode === 'practice' && !demo;
  // 練習モードのクイック開始: 入室・あいさつ・退室を省いて、カードの黙読から始める
  const quick = practice && settings.quickStart;
  const grade = gradeInfo(card);
  const pre2 = grade.id === 'pre2';
  const g2 = grade.id === '2';
  const records = new Map<ScoredItem, AnswerRecord>();
  const latest = new Map<ScoredItem, AnswerRecord>();
  const evalPromises: Promise<void>[] = [];
  let greetingAnswered = 0;
  let greetingTotal = 0;
  let candidateName = '';

  const say = async (text: string, ja?: string) => {
    bridge.setLine(text, ja, 'examiner');
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

  /** 1秒ごとのカウントダウン（黙読・2級 No.2 の準備時間）。残り3秒から音を鳴らす */
  const countdown = async (full: number) => {
    // デモでは待ち時間を短縮
    const sec = demo ? Math.min(full, 5) : full;
    try {
      for (let s = sec; s > 0; s--) {
        bridge.setTimer(s);
        if (s <= 3) playSfx('tick');
        await sleep(1000, signal);
      }
    } finally {
      bridge.setTimer(null);
    }
    playSfx('timeUp');
  };

  const hear = async (kind: HearKind, hint: string): Promise<ListenResult> => {
    const cfg =
      kind === 'reading'
        ? { silenceMs: Math.max(3000, settings.silenceSec * 1500), noSpeechMs: 15000, maxMs: 90000 }
        : kind === 'story'
          ? // 2級 No.2（3コマ漫画）: 6〜7文を語るので、文の間の沈黙を長めに許容する
            { silenceMs: Math.max(3500, settings.silenceSec * 1600), noSpeechMs: 15000, maxMs: 120000 }
        : kind === 'opinion'
          ? // 2級 No.3（意見＋理由2文）: 考えながら話す間を許容する
            { silenceMs: Math.max(2800, settings.silenceSec * 1250), noSpeechMs: 12000, maxMs: 60000 }
        : kind === 'long'
          ? // 準2級 No.2（5人の動作）: 人物を探す間の沈黙を許容し、長めに聞く
            { silenceMs: Math.max(3000, settings.silenceSec * 1400), noSpeechMs: 15000, maxMs: 75000 }
        : kind === 'answer'
          ? { silenceMs: settings.silenceSec * 1000, noSpeechMs: 12000, maxMs: 45000 }
          : { silenceMs: Math.min(1500, settings.silenceSec * 1000), noSpeechMs: 7000, maxMs: 15000 };
    playSfx('micOn');
    bridge.setInterim('');
    bridge.setListening(true, hint);
    const recording = settings.recordAudio ? startRecording() : null;
    let result: ListenResult | null = null;
    try {
      result = await listen({
        ...cfg,
        signal,
        onInterim: bridge.setInterim,
        onSilenceProgress: bridge.setSilence,
      });
      return result;
    } finally {
      bridge.setListening(false);
      bridge.setSilence(0);
      playSfx('micOff');
      // 声が入った回答だけ保存する（中断時は捨てる）
      const keep = !!result?.text && result.reason !== 'pardon' && result.reason !== 'typed';
      const id = recording ? await recording.stop(keep) : null;
      if (result && id) result.audioId = id;
    }
  };

  /** デモ: 受験者役が答える */
  const candidateSay = async (text: string, ja?: string): Promise<ListenResult> => {
    await sleep(700, signal);
    bridge.setLine(text, ja, 'candidate');
    bridge.setSpeaking(true);
    try {
      const v = opts.candidateVoice;
      await speak(text, { voiceHints: v?.voiceHints ?? [], rate: (v?.rate ?? 0.95) * settings.speechRate, pitch: v?.pitch ?? 1.1, signal });
    } finally {
      bridge.setSpeaking(false);
    }
    await sleep(500, signal);
    return { text, latencySec: 1, reason: 'silence' };
  };

  /** 音読: Azure 設定があれば発音評価付きで録音。失敗時はブラウザの音声認識 */
  const hearReading = async (): Promise<ListenResult & { assessment?: ReadingAssessment | null; note?: string }> => {
    if (demo) return candidateSay(modelReadingText(card), card.passageJa);
    let note: string | undefined;
    if (azureConfigured(settings.azureKey, settings.azureRegion)) {
      const recording = settings.recordAudio ? startRecording() : null;
      let got: (ListenResult & { assessment?: ReadingAssessment | null }) | null = null;
      playSfx('micOn');
      bridge.setInterim('');
      bridge.setListening(true, 'タイトルから音読しましょう（発音評価中）');
      try {
        // 抑揚評価つき → 失敗したら抑揚なしで再接続
        for (const prosody of [true, false]) {
          try {
            got = await listenReadingAzure({
              key: settings.azureKey,
              region: settings.azureRegion,
              referenceText: modelReadingText(card),
              silenceMs: Math.max(3000, settings.silenceSec * 1500),
              noSpeechMs: 15000,
              maxMs: 90000,
              signal,
              onInterim: bridge.setInterim,
              onSilenceProgress: bridge.setSilence,
              prosody,
            });
            return got;
          } catch (e) {
            if (!(e instanceof AzureUnavailableError)) throw e;
            note = e.message;
            console.warn(`Azure 発音評価に失敗（prosody=${prosody}）:`, e.message);
          }
        }
      } finally {
        bridge.setListening(false);
        bridge.setSilence(0);
        playSfx('micOff');
        const id = recording ? await recording.stop(!!got?.text) : null;
        if (got && id) got.audioId = id;
      }
    }
    const r = await hear('reading', 'タイトルから音読しましょう');
    return { ...r, note: note ? `${note}（通常の音声認識で採点）` : undefined };
  };

  /** 挨拶など採点外のやりとり */
  const smallTalk = async (line: string, hint: string, ja?: string) => {
    await say(line, ja);
    if (demo) {
      const m = DEMO_SMALLTALK.find(([re]) => re.test(line));
      greetingTotal++;
      greetingAnswered++;
      return candidateSay(m?.[1] ?? 'OK.', m?.[2]);
    }
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
    if (!q) return;
    // 2級 No.2: 3コマ漫画のナレーション（準備20秒 →「Please begin.」）
    const story = g2 && item === 'q2';
    const kind: HearKind = story ? 'story' : g2 && item === 'q3' ? 'opinion' : pre2 && item === 'q2' ? 'long' : 'answer';
    const firstHint = story
      ? 'カードの1文で始め、3コマを順に過去形で説明しましょう'
      : g2 && item === 'q3'
        ? 'I agree. / I disagree. のあと、理由を2文で'
        : pre2 && item === 'q2'
          ? '5人の動作を1人ずつ説明しましょう'
          : '英語で答えてください';
    // 聞き返されたときに繰り返す文（2級 No.2 は準備時間の案内を省く）
    const repeatText = story ? STORY_REPEAT : q.text;
    const repeatJa = story ? STORY_REPEAT_JA : q.ja;
    for (let attempt = 0; ; attempt++) {
      let pardonUsed = false;
      bridge.setPhase(item);
      // やり直し（練習モード）では、2級 No.2 の準備時間を繰り返さない
      if (story && attempt > 0) await say(STORY_REPEAT, STORY_REPEAT_JA);
      else await say(`${prefix}${q.text}`, q.ja);
      if (story && attempt === 0) {
        bridge.setPhase('q2_prep');
        await countdown(20);
        bridge.setPhase('q2');
        await say('Please begin.', '始めてください。');
      }
      let r: ListenResult;
      if (demo) {
        // デモ: Yes/No の設問は Yes 側で答える
        const first = hasFollowUp(q) ? 'Yes.' : q.modelAnswers[0] ?? '';
        r = await candidateSay(first, hasFollowUp(q) ? 'はい。' : answerJa(card.id, item));
      } else {
        if (practice && settings.showHints) bridge.setHintTarget?.(hintTarget(card, item));
        r = await hear(kind, firstHint);
      }

      for (let tries = 0; tries < 2 && !demo; tries++) {
        if (r.reason === 'pardon' || (PARDON_RE.test(r.text) && r.text.split(' ').length <= 5)) {
          pardonUsed = true;
          await say(`All right. ${repeatText}`, repeatJa);
          r = await hear(kind, 'もう一度どうぞ');
        } else if (!r.text && r.reason === 'nospeech' && tries === 0) {
          await say(`I'll say it again. ${repeatText}`, repeatJa);
          r = await hear(kind, firstHint);
        } else break;
      }

      const rec: AnswerRecord = {
        item,
        question: q.text,
        answer: r.text,
        latencySec: r.latencySec,
        pardonUsed,
        audioId: r.audioId,
        fluency: r.text && !demo ? analyzeFluency(r.text, r.pauses ?? 0, r.longestPauseSec ?? 0) : undefined,
      };

      if (hasFollowUp(q) && r.text) {
        const yes = isYesAnswer(r.text);
        const follow = yes === false ? q.followUpNo : q.followUpYes;
        await say(follow);
        let f: ListenResult;
        if (demo) {
          f = await candidateSay(q.modelAnswersYes[0] ?? '', answerJa(card.id, item, 'yes'));
        } else {
          if (practice && settings.showHints) bridge.setHintTarget?.(hintTarget(card, item, { question: follow, yes: yes !== false }));
          f = await hear(g2 ? 'opinion' : 'answer', g2 ? '理由を2文で答えましょう' : pre2 ? '2文で詳しく答えましょう' : '続けてもう少し話しましょう');
        }
        rec.followUpQuestion = follow;
        rec.followUpAnswer = f.text;
        rec.followUpAudioId = f.audioId;
        if (f.text && !demo) rec.fluency = mergeFluency(rec.fluency, analyzeFluency(f.text, f.pauses ?? 0, f.longestPauseSec ?? 0));
      }
      bridge.setHintTarget?.(null);
      const hints = bridge.takeHintsUsed?.() ?? 0;
      if (hints) rec.hintsUsed = hints;

      if (demo) return;
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
    if (quick) {
      bridge.setCardState('none');
      bridge.setPhase('silent_reading');
      await say("Let's start. Here is your card.", 'では始めましょう。こちらがカードです。');
    } else {
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
      await smallTalk(`This is the ${grade.spoken} test. OK?`, '返事をしましょう (OK. / Yes.)', `これは${grade.spokenJa}のテストです。いいですか？`);
      await smallTalk('How are you?', '答えましょう (I\'m fine, thank you.)', '調子はどうですか？');
      await say("Good. Let's start the test. Here is your card.", 'では、テストを始めましょう。こちらがカードです。');
    }

    // ---- 黙読 ----
    playSfx('flip');
    bridge.setCardState('front');
    bridge.setPhase('silent_reading');
    await say('First, please read the passage silently.', 'まず、パッセージを黙読してください。');
    await countdown(20);

    // ---- 音読 ----
    bridge.setPhase('reading_aloud');
    if (practice && settings.listenModelFirst && !demo) {
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
      pronunciationNote: rd.assessment ? undefined : rd.note,
      audioId: rd.audioId,
    };
    if (!demo) {
      records.set('reading', readingRec);
      bridge.upsertRecord(readingRec);
      const readEval = startEval(readingRec);
      if (practice) await bridge.showFeedback(readingRec, readEval);
    }

    // ---- No.1 - No.3 ----
    const questions = grade.items.length - 1; // 音読を除く
    await say(
      `Now, I'm going to ask you ${questions === 4 ? 'four' : 'five'} questions.`,
      `今から${questions}つの質問をします。`
    );
    await ask('q1', 'No. 1. ');
    await ask('q2', 'No. 2. ');
    // 2級はここでカードを裏返す（No.3 からカードを見ない）
    if (!g2) await ask('q3', 'No. 3. ');

    // ---- カードを裏返す ----
    bridge.setPhase('turnover');
    if (pre2 || g2) {
      await say(
        `Now, ${candidateName ? candidateName + ', ' : ''}please turn over the card and put it down.`,
        'では、カードを裏返して置いてください。'
      );
    } else {
      await say(
        `Now, ${candidateName ? candidateName + ', ' : ''}please turn the card over.`,
        'では、カードを裏返してください。'
      );
    }
    playSfx('flip');
    bridge.setCardState('back');
    await sleep(900, signal);

    if (g2) await ask('q3', 'No. 3. ');
    await ask('q4', 'No. 4. ');
    if (grade.items.includes('q5')) await ask('q5', 'No. 5. ');

    // ---- 退室 ----
    bridge.setPhase('exit');
    if (quick) {
      bridge.setCardState('none');
      await say('That is all. Good job!', 'これで終わりです。おつかれさまでした！');
      bridge.setLine(null);
    } else {
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
  }

  return {
    records: Array.from(records.values()),
    greetingAnswered,
    greetingTotal,
    evals: Promise.all(evalPromises).then(() => undefined),
  };
}
