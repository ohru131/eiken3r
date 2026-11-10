import { AnswerRecord, AppSettings, ExamCard, FinalReport, ScoredItem, StepFeedback } from '../types';
import { getQuestion, localEvaluate } from './scoring';
import { gradeOf, hasFollowUp, itemLabel, sceneFor } from './grade';
import { summarizeAssessment } from './azurePronunciation';
import type Anthropic from '@anthropic-ai/sdk';

const loadClaude = () => import('./claude');

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

export const canUseClaude = (s: AppSettings, status: ServerStatus) => !!s.apiKey || status.serverKey;

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
    sceneDescription: sceneFor(card, rec.item)?.scene.description ?? '',
    question: rec.question,
    modelAnswers: q ? (hasFollowUp(q) ? [...q.modelAnswers, ...q.modelAnswersYes, ...q.modelAnswersNo] : q.modelAnswers) : [card.passage],
    answer: rec.answer,
    followUpQuestion: rec.followUpQuestion,
    followUpAnswer: rec.followUpAnswer,
    pardonUsed: rec.pardonUsed,
    pronunciationSummary: rec.pronunciation ? summarizeAssessment(rec.pronunciation) : undefined,
  };
  try {
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
    const body = {
        grade: gradeOf(card),
        cardTitle: card.title,
        scores,
        attitude,
        total,
        passLine,
        records: records.map((x) => ({
          item: itemLabel(card, x.item),
          question: x.question,
          answer: x.answer || '(無回答)',
          followUp: x.followUpQuestion ? `${x.followUpQuestion} → ${x.followUpAnswer || '(無回答)'}` : undefined,
          score: x.feedback?.score,
          latencySec: x.latencySec,
        })),
    };
    return await callClaude(settings, settings.reportModel, 'api/report', body, (c, m) => m.reportWithClaude(c, settings.reportModel, body));
  } catch {
    return local();
  }
}

function localReport(card: ExamCard, records: AnswerRecord[], scores: Record<ScoredItem, number>) {
  const entries = Object.entries(scores) as [ScoredItem, number][];
  const good = entries.filter(([, v]) => v >= 4).map(([k]) => itemLabel(card, k));
  const weak = entries.filter(([, v]) => v <= 3).map(([k]) => itemLabel(card, k));
  return {
    source: 'local' as const,
    summary: `お疲れさまでした。${good.length ? `${good.join('・')}はよくできています。` : ''}${
      weak.length ? `${weak.join('・')}は模範解答を声に出して練習しましょう。` : '全体的に安定しています。'
    }（Claude APIキーを設定すると、あなたの発話に合わせた詳しい講評が表示されます）`,
    strengths: good.length ? good.map((g) => `${g}で的確に答えられた`) : ['最後まで面接を受けきった'],
    improvements: weak.length ? weak.map((w) => (w === '音読' ? '音読: タイトルから最後まで、区切りを意識してはっきり読む' : `${w}: 主語＋動詞の完全な文で答える`)) : ['No.4・No.5で2文目を足して内容を広げる'],
    nextSteps: '間違えた設問を練習モードでもう一度。模範解答を3回音読してから本番モードに挑戦しましょう。',
  };
}
