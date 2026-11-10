// Claude API 呼び出し（ブラウザ・サーバー共通）
import Anthropic from '@anthropic-ai/sdk';
import { betaZodOutputFormat } from '@anthropic-ai/sdk/helpers/beta/zod';
import { z } from 'zod';
import { EvaluateInput, FeedbackSchema, ReportInput, ReportSchema, buildEvalPrompt, buildReportPrompt, clampScore } from './prompts';

export const ALLOWED_MODELS = ['claude-opus-5-5', 'claude-sonnet-5-5', 'claude-haiku-5-5'] as const;
export const DEFAULT_MODEL = 'claude-opus-5-5';
// server-side refusal fallback ("default" form) は Opus 5.5 / Sonnet 5.5 で利用可
const FALLBACK_MODELS = new Set(['claude-opus-5-5', 'claude-sonnet-5-5']);

export const normalizeModel = (m?: string) => ((ALLOWED_MODELS as readonly string[]).includes(m || '') ? (m as string) : DEFAULT_MODEL);

export function createClient(apiKey: string, browser: boolean): Anthropic {
  return new Anthropic({ apiKey, maxRetries: 1, timeout: 45_000, dangerouslyAllowBrowser: browser });
}

async function callStructured<T extends z.ZodType>(
  client: Anthropic,
  model: string,
  system: string,
  user: string,
  schema: T,
  maxTokens: number
): Promise<z.infer<T>> {
  const useFallback = FALLBACK_MODELS.has(model);
  const response = await client.beta.messages.parse({
    model,
    max_tokens: maxTokens,
    system,
    messages: [{ role: 'user', content: user }],
    output_config: { effort: 'low', format: betaZodOutputFormat(schema) },
    ...(useFallback ? { betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' as const } : {}),
  });
  if (response.stop_reason === 'refusal') throw new Error('refusal');
  if (!response.parsed_output) throw new Error('parse_failed');
  return response.parsed_output as z.infer<T>;
}

/** 例外を日本語メッセージに */
export function describeError(err: unknown): { status: number; message: string } {
  if (err instanceof Anthropic.AuthenticationError) return { status: 401, message: 'APIキーが無効です。設定を確認してください。' };
  if (err instanceof Anthropic.PermissionDeniedError) return { status: 403, message: 'このAPIキーではこのモデルを使えません。' };
  if (err instanceof Anthropic.RateLimitError) return { status: 429, message: 'レート制限に達しました。少し待ってから再試行してください。' };
  if (err instanceof Anthropic.APIConnectionError) return { status: 502, message: 'Claude API に接続できません。' };
  if (err instanceof Anthropic.APIError) return { status: 502, message: `Claude API エラー (${err.status ?? '?'})` };
  return { status: 500, message: '評価に失敗しました' };
}

export { FeedbackSchema, ReportSchema } from './prompts';
export type { EvaluateInput, ReportInput } from './prompts';

export async function evaluateWithClaude(client: Anthropic, model: string, b: EvaluateInput) {
  const p = buildEvalPrompt(b);
  const result = await callStructured(client, normalizeModel(model), p.system, p.user, FeedbackSchema, 2000);
  return { ...result, score: clampScore(result.score), source: 'claude' as const };
}

export async function reportWithClaude(client: Anthropic, model: string, b: ReportInput) {
  const p = buildReportPrompt(b);
  const result = await callStructured(client, normalizeModel(model), p.system, p.user, ReportSchema, 3000);
  return { ...result, source: 'claude' as const };
}
/** キーとモデルの利用可否を確認（トークンを消費しない） */
export async function testConnection(apiKey: string, model: string): Promise<string | null> {
  try {
    await createClient(apiKey, true).models.retrieve(normalizeModel(model));
    return null;
  } catch (e) {
    return describeError(e).message;
  }
}
