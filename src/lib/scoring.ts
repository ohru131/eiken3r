// APIキーが無い時のローカル簡易採点と、最終スコア計算
import { AnswerRecord, ExamCard, StepFeedback } from '../types';
import { getQuestion, gradeOf, hasFollowUp, maxScore, storyFor } from './grade';

export { getQuestion };

export const PASS_LINE = 20; // 33点満点中の合格目安（約6割）

const STOP = new Set(['a', 'an', 'the', 'is', 'are', 'am', 'to', 'of', 'and', 'in', 'on', 'at', 'it', 'they', 'he', 'she', 'i', 'my', 'their', 'his', 'her', 'do', 'does', 'because', 'by', 'so']);

export const words = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9'\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

// イラストの見た目で呼び方が分かれる語は同じものとして扱う
const SYNONYMS: Record<string, string> = {
  bench: 'seat', chair: 'seat', seat: 'seat',
  backpack: 'bag', bag: 'bag', rucksack: 'bag',
  cup: 'cup', bottle: 'cup', can: 'cup',
  photo: 'picture', photos: 'pictures', picture: 'picture', pictures: 'pictures',
  bike: 'bicycle', bicycle: 'bicycle',
  couch: 'sofa', sofa: 'sofa',
  kid: 'boy', child: 'boy',
};
const canon = (w: string) => SYNONYMS[w] ?? w;

function overlap(answer: string, target: string): number {
  const t = words(target).filter((w) => !STOP.has(w)).map(canon);
  if (!t.length) return 0;
  const a = new Set(words(answer).map(canon));
  return t.filter((w) => a.has(w)).length / t.length;
}

export function isYesAnswer(text: string): boolean | null {
  const w = words(text);
  if (!w.length) return null;
  const head = w.slice(0, 4).join(' ');
  if (/^(no|nope|not really|i don't|i do not|i haven't|i have not|i'm not|i am not|i didn't|never|i disagree)\b/.test(head)) return false;
  if (/^(yes|yeah|yep|sure|of course|i do|i have|i am|i'm|i did|i like|i love|i think so|i agree|i guess so)\b/.test(head)) return true;
  if (w.includes('no') || w.includes("don't")) return false;
  return true;
}

export function localEvaluate(card: ExamCard, rec: AnswerRecord): StepFeedback {
  const answer = [rec.answer, rec.followUpAnswer].filter(Boolean).join(' ').trim();
  const w = words(answer);
  const base = { source: 'local' as const };

  if (!w.length) {
    return {
      ...base,
      score: 0,
      verdict: '無回答',
      goodPoints: '—',
      corrections: '回答が聞き取れませんでした。分からない時も知っている単語で何か答えると点がもらえます。',
      improvedAnswer: rec.item === 'reading' ? `${card.title}. ${card.passage}` : getQuestion(card, rec.item)!.modelAnswers[0],
      tip: '沈黙は0点。「Pardon?」と聞き返すのは1回までなら減点されません。',
    };
  }

  if (rec.item === 'reading' && rec.pronunciation) {
    const a = rec.pronunciation;
    let score = a.overall >= 90 ? 5 : a.overall >= 80 ? 4 : a.overall >= 65 ? 3 : a.overall >= 50 ? 2 : 1;
    if (a.completeness < 70) score = Math.min(score, 3);
    const weak = a.words.filter((w) => w.status === 'poor').map((w) => w.word);
    const omitted = a.words.filter((w) => w.status === 'omitted').map((w) => w.word);
    return {
      ...base,
      score,
      verdict: score >= 4 ? 'よく読めました' : score >= 3 ? 'あと一歩' : '要練習',
      goodPoints: `発音の正確さ ${a.accuracy}点・流暢さ ${a.fluency}点（100点満点）。`,
      corrections:
        [weak.length ? `発音が弱い語: ${weak.slice(0, 6).join(', ')}` : '', omitted.length ? `読み落とし: ${omitted.slice(0, 6).join(', ')}` : '']
          .filter(Boolean)
          .join(' / ') || '大きな問題はありません。',
      improvedAnswer: `${card.title}. ${card.passage}`,
      tip: '赤・黄色の単語をお手本で聞き、まねしてから全体をもう一度読みましょう。',
    };
  }

  if (rec.item === 'reading') {
    const passageWords = words(card.passage);
    const said = new Set(w);
    const cover = passageWords.filter((x) => said.has(x)).length / passageWords.length;
    const titleRead = overlap(answer.split(' ').slice(0, 8).join(' '), card.title) > 0.5;
    const score = cover > 0.9 ? 5 : cover > 0.75 ? 4 : cover > 0.55 ? 3 : cover > 0.3 ? 2 : 1;
    return {
      ...base,
      score,
      verdict: score >= 4 ? 'よく読めました' : '読み落としあり',
      goodPoints: `本文の約${Math.round(cover * 100)}%の語が認識されました。`,
      corrections: [
        titleRead ? '' : 'タイトルから読み始めましょう。タイトルも採点対象です。',
        cover < 0.9 ? '読み飛ばした部分があります。最後のピリオドまで読み切りましょう。' : '',
      ].filter(Boolean).join(' ') || '大きな問題はありません。',
      improvedAnswer: `${card.title}. ${card.passage}`,
      tip: '意味のまとまり（カンマ・ピリオド）で区切り、はっきり大きな声で読みます。',
    };
  }

  const q = getQuestion(card, rec.item)!;
  const follow = hasFollowUp(q);
  const models = follow ? [...q.modelAnswers, ...q.modelAnswersYes, ...q.modelAnswersNo] : q.modelAnswers;
  const best = Math.max(...models.map((m) => overlap(answer, m)));
  const hasSubjectVerb = /^(he|she|they|it|there|i|we|because|by|you|the|a|an|my|his|her|yes|no)\b/.test(w[0]) && w.length >= 3;
  const g = gradeOf(card);
  const pre2 = g === 'pre2';
  const max = maxScore(card, rec.item);
  const story = storyFor(card, rec.item);
  let score: number;
  if (story) {
    // 2級 No.2（10点）: 模範ナレーションとの重なりでおおまかに採点。過去形で語れていなければ上限6点
    score = Math.max(1, Math.min(10, Math.round(best * 12)));
    if (!/\b(was|were|said|told|asked|suggested|decided)\b/.test(w.join(' '))) score = Math.min(score, 6);
    if (w.length < 25) score = Math.min(score, 5);
  } else if (g === '2' && rec.item === 'q3') {
    // 2級 No.3: 賛成/反対 ＋ 理由2文（約14語以上）
    const stance = /\b(agree|disagree|think|opinion)\b/.test(w.join(' '));
    score = w.length >= 14 && stance ? 5 : w.length >= 8 ? 4 : w.length >= 3 ? 3 : 2;
  } else if (pre2 && rec.item === 'q2') {
    // 準2級 No.2: 5人の動作を進行形（is/are ~ing）で言えた数でおおまかに採点
    const actions = (w.join(' ').match(/\b(?:is|are|'s|he's|she's|they're)\s+\w+ing\b/g) || []).length;
    score = Math.max(1, Math.min(5, actions));
  } else if (rec.item === 'q4' || rec.item === 'q5') {
    // 準2級・2級は理由を2文（約12語以上）求められる
    const full = g === '3' ? 8 : 12;
    score = w.length >= full && hasSubjectVerb ? 5 : w.length >= full / 2 ? 4 : w.length >= 2 ? 3 : 2;
    if (follow && !rec.followUpAnswer) score = Math.min(score, 3);
  } else {
    score = best > 0.7 && hasSubjectVerb ? 5 : best > 0.5 ? 4 : best > 0.3 ? 3 : best > 0.1 ? 2 : 1;
    if (!hasSubjectVerb && score > 3) score = 3;
  }
  return {
    ...base,
    score,
    verdict: score === max ? 'よくできました' : score >= max * 0.8 ? 'おしい！' : score >= max * 0.6 ? 'あと一歩' : '要復習',
    goodPoints: `「${answer}」と答えました。`,
    corrections:
      story && score < max
        ? 'カードの1文で始め、各コマを2文ずつ過去形で。矢印の言葉・セリフ・吹き出しの内容に必ず触れましょう。'
        : g === '2' && rec.item === 'q3' && score < max
          ? '最初に I agree. / I disagree. を言い、理由を2文で続けましょう。'
        : pre2 && rec.item === 'q2' && score < 5
        ? '5人全員の動作を「A boy is ~ing.」の形で1文ずつ言いましょう。'
        : hasSubjectVerb
          ? '模範解答と見比べて、足りない語句がないか確認しましょう。'
          : '単語だけでなく、主語＋動詞の「文」で答えましょう。',
    // Yes/No の設問は、受験者の立場に合わせた理由つきの模範解答を見せる
    improvedAnswer: follow
      ? isYesAnswer(rec.answer) === false
        ? `No. ${q.modelAnswersNo[0]}`
        : `Yes. ${q.modelAnswersYes[0]}`
      : q.modelAnswers[0],
    tip: q.point,
  };
}

/** アティチュード 0-3（積極性・応答の速さ・聞き返し回数・挨拶） */
export function scoreAttitude(records: AnswerRecord[], greetingAnswered: number, greetingTotal: number): number {
  let s = 3;
  const lat = records.map((r) => r.latencySec).filter((x): x is number => x !== null);
  const avg = lat.length ? lat.reduce((a, b) => a + b, 0) / lat.length : 99;
  if (avg > 5) s -= 1;
  const blanks = records.filter((r) => !r.answer.trim()).length;
  if (blanks >= 1) s -= 1;
  if (blanks >= 3) s -= 1;
  if (records.filter((r) => r.pardonUsed).length >= 3) s -= 1;
  if (greetingTotal > 0 && greetingAnswered / greetingTotal < 0.5) s -= 1;
  return Math.max(0, Math.min(3, s));
}
