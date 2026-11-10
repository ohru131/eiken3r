import { AnswerRecord, AppSettings, ExamCard, FinalReport, ScoredItem, StepFeedback } from '../types';
import { getQuestion, localEvaluate } from './scoring';
import { gradeOf, hasFollowUp, itemLabel, maxScore, pictureDescription, scoredItems } from './grade';
import { summarizeAssessment } from './azurePronunciation';
import type Anthropic from '@anthropic-ai/sdk';

const loadClaude = () => import('./claude');
const loadGemini = () => import('./gemini');

export interface ServerStatus {
  serverKey: boolean;
  defaultModel: string;
}

export async function fetchStatus(): Promise<ServerStatus> {
  try {
    const r = await fetch('api/status');
    if (!r.ok) throw new Error();
    return await r.json();
  } catch {
    return { serverKey: false, defaultModel: '' };
  }
}

const headers = (model: string): Record<string, string> => ({ 'Content-Type': 'application/json', 'x-claude-model': model });

/** ブラウザにキーがあれば Claude API を直接呼ぶ。無ければ（ローカル開発時の）サーバーへ */
async function callClaude<T>(s: AppSettings, model: string, path: string, body: any, direct: (c: Anthropic, m: Awaited<ReturnType<typeof loadClaude>>) => Promise<T>): Promise<T> {
  if (s.apiKey) {
    const m = await loadClaude();
    try {
      return await direct(m.createClient(s.apiKey, true), m);
    } catch (e) {
      throw new Error(m.describeError(e).message);
    }
  }
  const r = await fetch(path, { method: 'POST', headers: headers(model), body: JSON.stringify(body) });
  const data = await r.json();
  if (!r.ok) throw new Error(data.error || `HTTP ${r.status}`);
  return data as T;
}

/** AI 採点が使えるか（Gemini はブラウザのキーのみ。Claude はサーバーのキーも可） */
export const canUseAI = (s: AppSettings, status: ServerStatus) =>
  s.aiProvider === 'gemini' ? !!s.geminiKey : !!s.apiKey || status.serverKey;

/** ヘッダー等に出す AI 名 */
export const aiName = (s: AppSettings) => (s.aiProvider === 'gemini' ? 'Gemini' : 'Claude');

export type EvalResult = StepFeedback & { error?: string };

export async function evaluateAnswer(
  card: ExamCard,
  rec: AnswerRecord,
  settings: AppSettings,
  useClaude: boolean
): Promise<EvalResult> {
  if (!useClaude) return localEvaluate(card, rec);
  const q = getQuestion(card, rec.item);
  const body = {
    grade: gradeOf(card),
    item: rec.item,
    itemLabel: itemLabel(card, rec.item),
    cardTitle: card.title,
    passage: card.passage,
    sceneDescription: pictureDescription(card, rec.item),
    question: rec.question,
    modelAnswers: q ? (hasFollowUp(q) ? [...q.modelAnswers, ...q.modelAnswersYes, ...q.modelAnswersNo] : q.modelAnswers) : [card.passage],
    answer: rec.answer,
    followUpQuestion: rec.followUpQuestion,
    followUpAnswer: rec.followUpAnswer,
    pardonUsed: rec.pardonUsed,
    maxScore: maxScore(card, rec.item),
    pronunciationSummary: rec.pronunciation ? summarizeAssessment(rec.pronunciation) : undefined,
  };
  try {
    if (settings.aiProvider === 'gemini') return await (await loadGemini()).evaluateWithGemini(settings.geminiKey, settings.geminiEvalModel, body);
    return await callClaude<StepFeedback>(settings, settings.evalModel, 'api/evaluate', body, (c, m) => m.evaluateWithClaude(c, settings.evalModel, body));
  } catch (e: any) {
    return { ...localEvaluate(card, rec), error: e?.message || 'network' };
  }
}

export async function generateReport(
  card: ExamCard,
  records: AnswerRecord[],
  scores: Record<ScoredItem, number>,
  attitude: number,
  total: number,
  passLine: number,
  settings: AppSettings,
  useClaude: boolean
): Promise<Pick<FinalReport, 'summary' | 'strengths' | 'improvements' | 'nextSteps' | 'source'>> {
  const local = () => localReport(card, records, scores);
  if (!useClaude) return local();
  try {
    const items = scoredItems(card);
    const body = {
        grade: gradeOf(card),
        cardTitle: card.title,
        scores: Object.fromEntries(items.map((k) => [k, scores[k]])),
        maxScores: Object.fromEntries(items.map((k) => [k, maxScore(card, k)])),
        attitude,
        total,
        passLine,
        records: records.map((x) => ({
          item: itemLabel(card, x.item),
          question: x.question,
          answer: x.answer || '(無回答)',
          followUp: x.followUpQuestion ? `${x.followUpQuestion} → ${x.followUpAnswer || '(無回答)'}` : undefined,
          score: x.feedback?.score,
          maxScore: maxScore(card, x.item),
          latencySec: x.latencySec,
        })),
    };
    if (settings.aiProvider === 'gemini') return await (await loadGemini()).reportWithGemini(settings.geminiKey, settings.geminiReportModel, body);
    return await callClaude(settings, settings.reportModel, 'api/report', body, (c, m) => m.reportWithClaude(c, settings.reportModel, body));
  } catch {
    return local();
  }
}

function localReport(card: ExamCard, records: AnswerRecord[], scores: Record<ScoredItem, number>) {
  const entries = scoredItems(card).map((k) => [k, scores[k] / maxScore(card, k)] as const);
  const good = entries.filter(([, v]) => v >= 0.8).map(([k]) => itemLabel(card, k));
  const weak = entries.filter(([, v]) => v < 0.8).map(([k]) => itemLabel(card, k));
  return {
    source: 'local' as const,
    summary: `お疲れさまでした。${good.length ? `${good.join('・')}はよくできています。` : ''}${
      weak.length ? `${weak.join('・')}は模範解答を声に出して練習しましょう。` : '全体的に安定しています。'
    }（Claude または Gemini の APIキーを設定すると、あなたの発話に合わせた詳しい講評が表示されます）`,
    strengths: good.length ? good.map((g) => `${g}で的確に答えられた`) : ['最後まで面接を受けきった'],
    improvements: weak.length ? weak.map((w) => (w === '音読' ? '音読: タイトルから最後まで、区切りを意識してはっきり読む' : `${w}: 主語＋動詞の完全な文で答える`)) : ['意見を答える設問で2文目を足して内容を広げる'],
    nextSteps: '間違えた設問を練習モードでもう一度。模範解答を3回音読してから本番モードに挑戦しましょう。',
  };
}
