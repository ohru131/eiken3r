// 観点別スコア（レーダーチャート用）: 発音・流暢さ・文法・語彙・内容・態度（各0-5）
import { AnswerRecord, ExamCard, FinalReport } from '../types';
import { maxScore, scoreOutOf5 } from './grade';
import { SLOW_START_SEC } from './fluency';

export type AspectKey = 'pronunciation' | 'fluency' | 'grammar' | 'vocabulary' | 'content' | 'attitude';

export const ASPECTS: { key: AspectKey; label: string; desc: string }[] = [
  { key: 'pronunciation', label: '発音', desc: '音読の発音・読みの正確さ（Azure 発音評価があればその正確さ）' },
  { key: 'fluency', label: '流暢さ', desc: '話し始めの速さ・途中の沈黙・つなぎ言葉（Azure 設定時は音読の流暢さも）' },
  { key: 'grammar', label: '文法', desc: '主語・動詞・時制・三単現などの正確さ（AI 採点）' },
  { key: 'vocabulary', label: '語彙', desc: '語彙・表現の適切さと幅（AI 採点）' },
  { key: 'content', label: '内容', desc: '質問に的確に答え、必要な情報・理由を言えたか（AI 採点）' },
  { key: 'attitude', label: '態度', desc: 'アティチュード（応答の積極性・あいさつ・聞き返し）' },
];

export interface AspectResult {
  values: Record<AspectKey, number>;
  /** 文法・語彙・内容が AI の観点別採点ではなく、設問の点数からの推定 */
  estimated: boolean;
}

const r1 = (n: number) => Math.round(Math.max(0, Math.min(5, n)) * 10) / 10;
const avg = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);

export function computeAspects(card: ExamCard, records: AnswerRecord[], report: Pick<FinalReport, 'attitude'>): AspectResult {
  const reading = records.find((r) => r.item === 'reading');
  const answers = records.filter((r) => r.item !== 'reading');

  // 発音
  const pron = reading?.pronunciation ? reading.pronunciation.accuracy / 20 : reading?.feedback ? reading.feedback.score : 0;

  // 流暢さ: 5 から、話し始めの遅さ・沈黙・つなぎ言葉・無回答で減点
  const answered = answers.filter((r) => r.answer.trim());
  let flu = answered.length ? 5 : 0;
  if (answered.length) {
    const lat = avg(answered.map((r) => r.latencySec ?? 0));
    if (lat >= SLOW_START_SEC) flu -= 1;
    if (lat >= SLOW_START_SEC + 2) flu -= 0.5;
    const pausesPer = avg(answered.map((r) => r.fluency?.pauses ?? 0));
    flu -= Math.min(1.5, pausesPer * 0.75);
    const fillersPer = avg(answered.map((r) => r.fluency?.fillers.length ?? 0));
    flu -= Math.min(1, fillersPer * 0.5);
    flu -= Math.min(1.5, (answers.length - answered.length) * 0.75);
  }
  if (reading?.pronunciation) flu = (flu + reading.pronunciation.fluency / 20) / 2;

  // 文法・語彙・内容（AI の観点別スコアが無ければ設問の点数で代用）
  const withAspects = answers.filter((r) => r.feedback?.aspects);
  const estimated = withAspects.length === 0;
  const scoreAvg = avg(answers.map((r) => scoreOutOf5(r.feedback?.score ?? 0, maxScore(card, r.item))));
  const pick = (k: 'grammar' | 'vocabulary' | 'content') => (estimated ? scoreAvg : avg(withAspects.map((r) => r.feedback!.aspects![k])));

  return {
    values: {
      pronunciation: r1(pron),
      fluency: r1(flu),
      grammar: r1(pick('grammar')),
      vocabulary: r1(pick('vocabulary')),
      content: r1(pick('content')),
      attitude: r1((report.attitude / 3) * 5),
    },
    estimated,
  };
}
