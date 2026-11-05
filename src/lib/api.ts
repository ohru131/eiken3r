import { AnswerRecord, AppSettings, ExamCard, FinalReport, ScoredItem, StepFeedback } from '../types';
import { ITEM_LABELS, getQuestion, localEvaluate } from './scoring';
import { createClient, describeError, evaluateWithClaude, reportWithClaude } from './claude';

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

const headers = (s: AppSettings): Record<string, string> => ({ 'Content-Type': 'application/json', 'x-claude-model': s.model });

/** ブラウザにキーがあれば Claude API を直接呼ぶ。無ければ（ローカル開発時の）サーバーへ */
async function callClaude<T>(s: AppSettings, path: string, body: any, direct: (c: ReturnType<typeof createClient>) => Promise<T>): Promise<T> {
  if (s.apiKey) {
    try {
      return await direct(createClient(s.apiKey, true));
    } catch (e) {
      throw new Error(describeError(e).message);
    }
  }
  const r = await fetch(path, { method: 'POST', headers: headers(s), body: JSON.stringify(body) });
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
    item: rec.item,
    itemLabel: ITEM_LABELS[rec.item],
    cardTitle: card.title,
    passage: card.passage,
    sceneDescription: rec.item === 'q2' || rec.item === 'q3' ? card.scene.description : '',
    question: rec.question,
    modelAnswers: q ? q.modelAnswers : [card.passage],
    answer: rec.answer,
    followUpQuestion: rec.followUpQuestion,
    followUpAnswer: rec.followUpAnswer,
    pardonUsed: rec.pardonUsed,
  };
  try {
    return await callClaude<StepFeedback>(settings, 'api/evaluate', body, (c) => evaluateWithClaude(c, settings.model, body));
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
  const local = () => localReport(records, scores);
  if (!useClaude) return local();
  try {
    const body = {
        cardTitle: card.title,
        scores,
        attitude,
        total,
        passLine,
        records: records.map((x) => ({
          item: ITEM_LABELS[x.item],
          question: x.question,
          answer: x.answer || '(無回答)',
          followUp: x.followUpQuestion ? `${x.followUpQuestion} → ${x.followUpAnswer || '(無回答)'}` : undefined,
          score: x.feedback?.score,
          latencySec: x.latencySec,
        })),
    };
    return await callClaude(settings, 'api/report', body, (c) => reportWithClaude(c, settings.model, body));
  } catch {
    return local();
  }
}

function localReport(records: AnswerRecord[], scores: Record<ScoredItem, number>) {
  const entries = Object.entries(scores) as [ScoredItem, number][];
  const good = entries.filter(([, v]) => v >= 4).map(([k]) => ITEM_LABELS[k]);
  const weak = entries.filter(([, v]) => v <= 3).map(([k]) => ITEM_LABELS[k]);
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
