// Claude API 呼び出し（ブラウザ・サーバー共通）
import Anthropic from '@anthropic-ai/sdk';
import { betaZodOutputFormat } from '@anthropic-ai/sdk/helpers/beta/zod';
import { z } from 'zod';

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

// ---------- 1問ごとの採点 ----------
export const FeedbackSchema = z.object({
  score: z.number().int().describe('0-5 integer'),
  verdict: z.string().describe('短い日本語の評価ラベル (例: 完璧！ / あと一歩 / 要練習)'),
  goodPoints: z.string().describe('良かった点。受験者の実際の発話を引用して日本語で1-2文'),
  corrections: z.string().describe('誤り・不足の具体的な指摘と直し方。日本語1-3文。問題がなければ「特になし」'),
  improvedAnswer: z.string().describe('受験者の意図を活かした満点の英語解答（1-2文）'),
  tip: z.string().describe('この設問タイプの本番で使えるコツ。日本語1文'),
});

const EVAL_SYSTEM = `あなたは英検3級2次試験（面接）の採点官です。受験者の発話は音声認識テキストなので、句読点・大文字小文字・軽微な認識ゆれは減点しません。
採点基準 (0-5点):
- 5: 質問に的確に答え、文法的に正しい完全な文（主語＋動詞）。
- 4: 内容は正しいが小さな文法ミス（三単現・冠詞・代名詞の置き換え漏れ等）が1つ。
- 3: 内容は伝わるが、単語の羅列・主語欠落・複数のミス、または No.4/5 で1語のみ。
- 1-2: 一部しか答えていない、質問と少しずれている。
- 0: 無回答、または質問と無関係。
設問別の注意:
- 音読(reading): 本文との一致度・抜け/言い換え・タイトルを読んだかで評価。認識テキストの欠落は発音不明瞭の可能性として扱う。
- No.1: 本文の該当箇所を使い、名詞を代名詞(they/it/he/she)に置き換えて答えているか。Why→Because ~ でOK。本文をそのまま読んで代名詞にしない場合は4点。
- No.2/No.3: イラストの内容と一致しているか（イラスト説明を正とする）。進行形・be going to・There are・前置詞を正しく使えているか。
- No.4/No.5: 自分のことを文で答えているか。No.5 は Yes/No と追加質問への回答の両方を合わせて評価する。
コメントはやさしく具体的に、中学生にも分かる日本語で。`;

export interface EvaluateInput {
  item: string;
  itemLabel: string;
  cardTitle: string;
  passage: string;
  sceneDescription?: string;
  question: string;
  modelAnswers: string[];
  answer: string;
  followUpQuestion?: string;
  followUpAnswer?: string;
  pardonUsed?: boolean;
  /** 音読の Azure 発音評価の要約 */
  pronunciationSummary?: string;
}

export async function evaluateWithClaude(client: Anthropic, model: string, b: EvaluateInput) {
  const userPrompt = [
    `【設問】${b.itemLabel} (${b.item})`,
    `【カードのタイトル】${b.cardTitle}`,
    `【パッセージ】${b.passage}`,
    b.sceneDescription ? `【イラスト説明】${b.sceneDescription}` : '',
    `【面接官の質問】${b.question}`,
    `【想定模範解答】${JSON.stringify(b.modelAnswers || [])}`,
    `【受験者の回答（音声認識）】"${b.answer || ''}"`,
    b.followUpQuestion ? `【追加質問】${b.followUpQuestion}\n【追加質問への回答】"${b.followUpAnswer || ''}"` : '',
    b.pardonUsed ? '（受験者は聞き返しをしました。1回までは減点しません）' : '',
    b.pronunciationSummary
      ? `【Azure 発音評価（実際の音声を機械評価）】\n${b.pronunciationSummary}\n→ 音読の点数はこの発音評価を主な根拠にし、弱い語の発音のコツを具体的に指摘すること。`
      : '',
  ]
    .filter(Boolean)
    .join('\n');
  const result = await callStructured(client, normalizeModel(model), EVAL_SYSTEM, userPrompt, FeedbackSchema, 2000);
  return { ...result, score: Math.max(0, Math.min(5, Math.round(result.score))), source: 'claude' as const };
}

// ---------- 総合講評 ----------
export const ReportSchema = z.object({
  summary: z.string().describe('全体講評。日本語3-4文。受験者の実際の発話を1つ以上引用'),
  strengths: z.array(z.string()).describe('良かった点 2-3個'),
  improvements: z.array(z.string()).describe('改善点 2-3個。具体的な英語表現の例を含める'),
  nextSteps: z.string().describe('次回までの練習メニュー。日本語2文'),
});

export interface ReportInput {
  cardTitle: string;
  scores: Record<string, number>;
  attitude: number;
  total: number;
  passLine: number;
  records: unknown[];
}

export async function reportWithClaude(client: Anthropic, model: string, b: ReportInput) {
  const userPrompt = `カード: ${b.cardTitle}
得点: ${JSON.stringify(b.scores)} / アティチュード ${b.attitude}/3 / 合計 ${b.total}/33（合格目安 ${b.passLine}点）
各設問の記録:
${JSON.stringify(b.records, null, 1)}

上の記録をもとに、英検3級2次試験の総合講評を作成してください。`;
  const result = await callStructured(
    client,
    normalizeModel(model),
    'あなたは英検3級2次試験の面接官兼、中学生を教える英語講師です。励ましつつ、次に何をすれば点が伸びるかを具体的に伝えます。',
    userPrompt,
    ReportSchema,
    3000
  );
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
