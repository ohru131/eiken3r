// Gemini API 呼び出し（ブラウザから REST で直接）。プロンプトは Claude と共通（prompts.ts）
import { z } from 'zod';
import { EvaluateInput, FeedbackSchema, ReportInput, ReportSchema, buildEvalPrompt, buildReportPrompt, clampScore } from './prompts';

const BASE = 'https://generativelanguage.googleapis.com/v1beta';

import { GEMINI_DEFAULT_EVAL_MODEL } from './geminiModels';

export class GeminiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

/** モデル名を API のパス用に整える（"models/" の有無・空白を吸収） */
const modelPath = (m: string) => `models/${(m || GEMINI_DEFAULT_EVAL_MODEL).trim().replace(/^models\//, '')}`;

function describe(status: number, detail: string): string {
  if (status === 400 && /api key/i.test(detail)) return 'Gemini APIキーが無効です。設定を確認してください。';
  if (status === 401 || status === 403) return 'Gemini APIキーが無効か、このモデルを使う権限がありません。';
  if (status === 404) return 'Gemini のモデル名が見つかりません。設定のモデル名を確認してください。';
  if (status === 429) return 'Gemini のレート制限（または無料枠の上限）に達しました。少し待ってから再試行してください。';
  if (status === 0) return 'Gemini API に接続できません。';
  if (status === 408) return 'Gemini の応答が時間内に返りませんでした。もう一度試すか、速いモデルに変えてください。';
  return `Gemini API エラー (${status})${detail ? `: ${detail.slice(0, 120)}` : ''}`;
}

async function request(apiKey: string, path: string, init?: RequestInit, timeoutMs = 45_000): Promise<any> {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);
  let r: Response;
  try {
    r = await fetch(`${BASE}/${path}`, {
      ...init,
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey, ...(init?.headers || {}) },
      signal: ac.signal,
    });
  } catch {
    // 自前のタイムアウトで中断した場合は「時間切れ」として区別する
    throw ac.signal.aborted ? new GeminiError(408, describe(408, '')) : new GeminiError(0, describe(0, ''));
  } finally {
    clearTimeout(t);
  }
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new GeminiError(r.status, describe(r.status, data?.error?.message || ''));
  return data;
}

// Gemini の responseSchema（OpenAPI サブセット）。内容は prompts.ts の zod スキーマと同じ
const FEEDBACK_RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    score: { type: 'INTEGER', description: '0-5 integer' },
    verdict: { type: 'STRING', description: '短い日本語の評価ラベル (例: 完璧！ / あと一歩 / 要練習)' },
    goodPoints: { type: 'STRING', description: '良かった点。受験者の実際の発話を引用して日本語で1-2文' },
    corrections: { type: 'STRING', description: '誤り・不足の具体的な指摘と直し方。日本語1-3文。問題がなければ「特になし」' },
    improvedAnswer: { type: 'STRING', description: '受験者の意図を活かした満点の英語解答' },
    tip: { type: 'STRING', description: 'この設問タイプの本番で使えるコツ。日本語1文' },
  },
  required: ['score', 'verdict', 'goodPoints', 'corrections', 'improvedAnswer', 'tip'],
  propertyOrdering: ['score', 'verdict', 'goodPoints', 'corrections', 'improvedAnswer', 'tip'],
};

const REPORT_RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    summary: { type: 'STRING', description: '全体講評。日本語3-4文。受験者の実際の発話を1つ以上引用' },
    strengths: { type: 'ARRAY', items: { type: 'STRING' }, description: '良かった点 2-3個' },
    improvements: { type: 'ARRAY', items: { type: 'STRING' }, description: '改善点 2-3個。具体的な英語表現の例を含める' },
    nextSteps: { type: 'STRING', description: '次回までの練習メニュー。日本語2文' },
  },
  required: ['summary', 'strengths', 'improvements', 'nextSteps'],
  propertyOrdering: ['summary', 'strengths', 'improvements', 'nextSteps'],
};

async function generateStructured<T extends z.ZodType>(
  apiKey: string,
  model: string,
  system: string,
  user: string,
  responseSchema: object,
  schema: T,
  maxTokens: number,
  timeoutMs: number
): Promise<z.infer<T>> {
  const data = await request(apiKey, `${modelPath(model)}:generateContent`, {
    method: 'POST',
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: system }] },
      contents: [{ role: 'user', parts: [{ text: user }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema,
        // 思考（thinking）トークンも上限に含まれるため余裕を持たせる。temperature は既定値のまま（Gemini 3 世代の推奨）
        maxOutputTokens: maxTokens,
      },
    }),
  }, timeoutMs);
  const cand = data?.candidates?.[0];
  if (!cand) throw new GeminiError(502, data?.promptFeedback?.blockReason ? 'Gemini が回答を拒否しました。' : 'Gemini から回答がありませんでした。');
  const text = (cand.content?.parts || [])
    .filter((p: any) => typeof p.text === 'string' && !p.thought)
    .map((p: any) => p.text)
    .join('');
  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    throw new GeminiError(502, cand.finishReason === 'MAX_TOKENS' ? 'Gemini の回答が途中で切れました。' : 'Gemini の回答を読み取れませんでした。');
  }
  const parsed = schema.safeParse(json);
  if (!parsed.success) throw new GeminiError(502, 'Gemini の回答の形式が不正です。');
  return parsed.data;
}

export async function evaluateWithGemini(apiKey: string, model: string, b: EvaluateInput) {
  const p = buildEvalPrompt(b);
  const r = await generateStructured(apiKey, model, p.system, p.user, FEEDBACK_RESPONSE_SCHEMA, FeedbackSchema, 16384, 60_000);
  return { ...r, score: clampScore(r.score), source: 'gemini' as const };
}

export async function reportWithGemini(apiKey: string, model: string, b: ReportInput) {
  const p = buildReportPrompt(b);
  const r = await generateStructured(apiKey, model, p.system, p.user, REPORT_RESPONSE_SCHEMA, ReportSchema, 32768, 120_000);
  return { ...r, source: 'gemini' as const };
}

/** キーとモデルの利用可否を確認（トークンを消費しない） */
export async function testGemini(apiKey: string, model: string): Promise<string | null> {
  try {
    await request(apiKey, modelPath(model), { method: 'GET' }, 15_000);
    return null;
  } catch (e) {
    return e instanceof Error ? e.message : 'Gemini API に接続できません。';
  }
}
