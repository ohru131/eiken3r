// 練習モードの日本語ヒント（詰まったときに段階的に表示）と、模範解答の和訳の取得
import { ExamCard, ScoredItem } from '../types';
import { ANSWER_JA } from '../data/answerJa';
import { getQuestion, hasFollowUp } from './grade';

export type AnswerVariant = 'yes' | 'no';

export const answerJaKey = (cardId: string, item: ScoredItem, variant?: AnswerVariant) => `${cardId}:${item}${variant ? `:${variant}` : ''}`;

/** 模範解答（modelAnswers[0] / Yes / No の1つ目）の和訳。無ければ undefined */
export const answerJa = (cardId: string, item: ScoredItem, variant?: AnswerVariant): string | undefined => ANSWER_JA[answerJaKey(cardId, item, variant)];

/** ヒントを出す対象（いま答えている質問） */
export interface HintTarget {
  question: string;
  /** 目標にする模範解答 */
  answer: string;
  /** その和訳 */
  ja?: string;
  /** 文法・表現ポイント */
  point?: string;
}

/** 質問（と追加質問）に対応するヒント対象 */
export function hintTarget(card: ExamCard, item: Exclude<ScoredItem, 'reading'>, followUp?: { question: string; yes: boolean }): HintTarget | null {
  const q = getQuestion(card, item);
  if (!q) return null;
  if (followUp && hasFollowUp(q)) {
    const v: AnswerVariant = followUp.yes ? 'yes' : 'no';
    const answer = (followUp.yes ? q.modelAnswersYes : q.modelAnswersNo)[0];
    if (!answer) return null;
    return { question: followUp.question, answer, ja: answerJa(card.id, item, v), point: q.point };
  }
  // Yes/No の設問は、最初の答えも Yes 側の模範解答を目標にする
  const answer = q.modelAnswers[0] ?? (hasFollowUp(q) ? q.modelAnswersYes[0] : '');
  if (!answer) return null;
  return { question: q.text, answer, ja: answerJa(card.id, item), point: q.point };
}

const SUBJECT_JA: Record<string, string> = {
  i: '私は', he: '彼は', she: '彼女は', they: '彼らは（それらは）', it: 'それは', we: '私たちは', you: 'あなたは',
  there: 'There is / There are（～がある・いる）', some: 'Some people ...（～な人もいる）', by: '（主語なし）By ～ing.',
  because: '（主語なし）Because ～.', yes: 'Yes. のあとに文を続ける', no: 'No. のあとに文を続ける',
};

/** 答え方の型（質問の形から） */
function answerPattern(question: string): string {
  const q = question.toLowerCase();
  if (/^(no\. ?\d+\.? )?why not\b/.test(q) || /\bwhy not\?/.test(q)) return '「～しない理由」を Because ～. や I think ～. で答える';
  if (/\bwhy\b/.test(q)) return '理由を Because ～. の形で答える';
  if (/\bwhat (is|are) .* doing\b/.test(q)) return '「今していること」を現在進行形（is / are ～ing）で答える';
  if (/\bgoing to do\b/.test(q)) return '「これからすること」を be going to ～ で答える';
  if (/\bhow many\b/.test(q)) return 'There is / There are ～. や数を使って答える';
  if (/^how\b|\bhow (do|does|did|can)\b/.test(q)) return '方法を By ～ing. の形で答える';
  if (/\bwhere\b/.test(q)) return '場所を「前置詞＋場所」（in / on / at ～）で答える';
  if (/\bwhat\b/.test(q)) return '聞かれた「もの・こと」を主語＋動詞の文で答える';
  if (/\bsome people say\b/.test(q)) return 'I agree. / I disagree. で立場を言い、理由を2文で続ける';
  if (/\btell me more\b/.test(q)) return '具体的な内容を2文で付け足す';
  if (/^(do|does|did|are|is|have|has|will|would|can|should)\b/.test(q.replace(/^no\. ?\d+\.? /, ''))) return 'Yes. / No. で答えてから、理由や内容を文で続ける';
  return '主語＋動詞のそろった文で答える';
}

/** 時制・文の形（模範解答から） */
function tenseOf(answer: string): string {
  const a = answer.toLowerCase();
  if (/\b(am|is|are) going to\b/.test(a)) return 'be going to（これからすること）';
  if (/\b(am|is|are|'re|'s) \w+ing\b/.test(a)) return '現在進行形（is / are ～ing）';
  if (/\b(was|were) \w+ing\b/.test(a)) return '過去進行形（was / were ～ing）';
  const past = /\b(was|were|did|went|had|got|saw|made|took|told|said|came|bought|ate|left|found|gave|thought)\b/.test(a) || /\b(?!(?:need|speed|feed|seed|bed|red|tired|interested|excited|used)\b)\w{2,}ed\b/.test(a);
  const present = /\b(am|is|are|do|does|has|have|'m|'re|'s)\b/.test(a);
  if (past && !present) return '過去形';
  if (/\b(will|would)\b/.test(a)) return 'will / would を使った未来・仮定';
  if (/\b(can|could|should|must)\b/.test(a)) return '助動詞（can / should など）';
  return '現在形';
}

/** 語の頭文字だけを残す（I_ l___ s_____.） */
export function maskWords(text: string): string {
  return text.replace(/[A-Za-z']+/g, (w) => w[0] + '_'.repeat(Math.max(1, Math.min(w.length - 1, 6))));
}

export interface HintStep {
  title: string;
  body: string;
}

/** 段階ヒント（上から順に1つずつ見せる） */
export function buildHints(t: HintTarget): HintStep[] {
  const first = t.answer.trim().split(/\s+/)[0]?.replace(/[^A-Za-z']/g, '') ?? '';
  const subj = SUBJECT_JA[first.toLowerCase()] ?? `「${first}」から始める`;
  const words = t.answer.trim().split(/\s+/);
  const steps: HintStep[] = [
    { title: '答え方の型', body: `${answerPattern(t.question)}${t.point ? `（ポイント: ${t.point}）` : ''}` },
    { title: '主語と時制', body: `主語: ${subj}　／　時制: ${tenseOf(t.answer)}` },
    { title: '書き出し', body: `${words.slice(0, Math.min(3, Math.max(1, words.length - 1))).join(' ')} …` },
    { title: '単語の頭文字', body: maskWords(t.answer) },
  ];
  if (t.ja) steps.push({ title: '日本語で言うと', body: t.ja });
  return steps;
}
