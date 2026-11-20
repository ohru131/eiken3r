// 話し方の分析（沈黙・つなぎ言葉・言い直し）と、沈黙を埋める表現
import { AnswerRecord, FluencyStats } from '../types';

// 音声認識が拾うつなぎ言葉（英語の um/uh、日本語の「えーと」「あの」をローマ字で拾った形を含む）
const FILLER_RE = /\b(u+m+|u+h+|e+r+m*|a+h+|h+m+|m{2,}|e+to+|et+o+|a+no+|well well|you know)\b|えーと|えっと|あのー?|うーん|えー/gi;

export function analyzeFluency(text: string, pauses: number, longestPauseSec: number): FluencyStats {
  const fillers = (text.match(FILLER_RE) || []).map((f) => f.toLowerCase());
  const w = text.toLowerCase().replace(/[^a-z'\s]/g, ' ').split(/\s+/).filter(Boolean);
  let repeats = 0;
  for (let i = 1; i < w.length; i++) if (w[i] === w[i - 1] && w[i] !== 'very' && w[i] !== 'no') repeats++;
  return { pauses, longestPauseSec, fillers, repeats };
}

/** 同じ回答の2つの分析（質問と追加質問）を合算 */
export function mergeFluency(a?: FluencyStats, b?: FluencyStats): FluencyStats | undefined {
  if (!a) return b;
  if (!b) return a;
  return {
    pauses: a.pauses + b.pauses,
    longestPauseSec: Math.max(a.longestPauseSec, b.longestPauseSec),
    fillers: [...a.fillers, ...b.fillers],
    repeats: a.repeats + b.repeats,
  };
}

/** 回答開始までの秒数がこれ以上なら「沈黙が長い」 */
export const SLOW_START_SEC = 4;

export interface FluencyIssue {
  label: string;
  detail: string;
}

/** 気になる点（無ければ空） */
export function fluencyIssues(rec: Pick<AnswerRecord, 'latencySec' | 'fluency' | 'answer'>): FluencyIssue[] {
  const out: FluencyIssue[] = [];
  if (!rec.answer.trim()) return out;
  if (rec.latencySec !== null && rec.latencySec >= SLOW_START_SEC)
    out.push({ label: `話し始めまで ${rec.latencySec}秒`, detail: '考える時間は「Well, ...」「Let me see.」で埋めると、黙っているより印象が良くなります。' });
  const f = rec.fluency;
  if (!f) return out;
  if (f.pauses >= 2 || f.longestPauseSec >= 3)
    out.push({ label: `途中で止まった回数 ${f.pauses}回（最長 ${f.longestPauseSec}秒）`, detail: '文の途中で詰まったら「I mean, ...」「I think ...」でつなぎ、最後まで言い切りましょう。' });
  if (f.fillers.length)
    out.push({ label: `つなぎ言葉 ${f.fillers.length}回（${[...new Set(f.fillers)].slice(0, 4).join(', ')}）`, detail: '「えーと」「um」の代わりに英語のつなぎ表現を使いましょう。' });
  if (f.repeats >= 2) out.push({ label: `言い直し ${f.repeats}回`, detail: '言い直しは減点されにくいですが、主語と動詞を決めてから話し始めると減らせます。' });
  return out;
}

/** 沈黙・「えーと」の代わりに使える英語のつなぎ表現 */
export const FILLER_PHRASES: { en: string; ja: string; use: string }[] = [
  { en: 'Well, ...', ja: 'ええと…', use: '答え始めに少し考えるとき' },
  { en: 'Let me see.', ja: 'そうですね。', use: '考える時間がほしいとき' },
  { en: "That's a good question.", ja: 'いい質問ですね。', use: '意見を聞かれて考えるとき' },
  { en: 'I think ...', ja: '私は…と思います', use: '意見の書き出し' },
  { en: 'I mean, ...', ja: 'つまり…', use: '言い直すとき' },
  { en: 'For example, ...', ja: '例えば…', use: '2文目で具体例を足すとき' },
  { en: 'Also, ...', ja: 'それに…', use: '理由をもう1つ足すとき' },
];

