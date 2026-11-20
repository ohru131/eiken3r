// シャドーイング / 瞬間英作文ドリルの素材と、発話と目標文の一致判定
import { ExamCard, ScoredItem } from '../types';
import { getQuestion, gradeOf, hasFollowUp, itemLabel } from './grade';
import { AnswerVariant, answerJa } from './hints';

export interface DrillItem {
  key: string;
  cardId: string;
  cardTitle: string;
  item: ScoredItem;
  itemLabel: string;
  question: string;
  questionJa: string;
  /** 目標の英文（模範解答） */
  en: string;
  /** 和訳（無い場合あり） */
  ja?: string;
  point: string;
}

/** カード一覧からドリル素材を作る（2級 No.2 のナレーションは長いので除外） */
export function drillItems(cards: ExamCard[]): DrillItem[] {
  const out: DrillItem[] = [];
  for (const c of cards) {
    for (const item of ['q1', 'q2', 'q3', 'q4', 'q5'] as const) {
      if (gradeOf(c) === '2' && item === 'q2') continue;
      const q = getQuestion(c, item);
      if (!q) continue;
      const base = { cardId: c.id, cardTitle: c.title, item, itemLabel: itemLabel(c, item), question: q.text, questionJa: q.ja, point: q.point };
      if (hasFollowUp(q)) {
        // Yes/No の設問は「Yes. ＋追加質問への答え」「No. ＋…」を1文ずつ
        const pairs: [AnswerVariant, string | undefined, string][] = [
          ['yes', q.modelAnswersYes[0], 'Yes.'],
          ['no', q.modelAnswersNo[0], 'No.'],
        ];
        for (const [v, en, lead] of pairs) {
          if (!en) continue;
          const ja = answerJa(c.id, item, v);
          out.push({ ...base, key: `${c.id}:${item}:${v}`, en: `${lead} ${en}`, ja: ja ? `${v === 'yes' ? 'はい。' : 'いいえ。'}${ja}` : undefined });
        }
      } else if (q.modelAnswers[0]) {
        out.push({ ...base, key: `${c.id}:${item}`, en: q.modelAnswers[0], ja: answerJa(c.id, item) });
      }
    }
  }
  return out;
}

const tokens = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/[^a-z0-9'\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

export interface WordMatch {
  word: string;
  hit: boolean;
}

/** 目標文の各語が発話に含まれたか（語順を考慮した LCS）と一致率 0-100 */
export function compareSpeech(spoken: string, target: string): { score: number; words: WordMatch[] } {
  const display = target.split(/\s+/).filter(Boolean);
  const t = display.map((w) => tokens(w).join(''));
  const s = tokens(spoken);
  const n = t.length;
  const m = s.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--) dp[i][j] = t[i] && t[i] === s[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const hit = new Array(n).fill(false);
  for (let i = 0, j = 0; i < n && j < m; ) {
    if (t[i] && t[i] === s[j]) {
      hit[i] = true;
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) i++;
    else j++;
  }
  const counted = t.filter(Boolean).length || 1;
  return { score: Math.round((hit.filter(Boolean).length / counted) * 100), words: display.map((word, i) => ({ word, hit: hit[i] || !t[i] })) };
}
