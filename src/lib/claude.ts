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
  イラストは絵文字を並べた簡略な絵なので、物の呼び方は見た目で分かれることがある（例: bench / chair、bag / backpack、cup / bottle、picture / photo、bike / bicycle、sofa / couch、kid / boy）。受験者の名詞がイラストの見た目として妥当なら減点しない。模範解答と単語が違うだけで減点しない。
- No.4/No.5: 自分のことを文で答えているか。No.5 は Yes/No と追加質問への回答の両方を合わせて評価する。
コメントはやさしく具体的に、中学生にも分かる日本語で。`;

const EVAL_SYSTEM_PRE2 = `あなたは英検準2級2次試験（面接）の採点官です。受験者の発話は音声認識テキストなので、句読点・大文字小文字・軽微な認識ゆれは減点しません。
採点基準 (0-5点):
- 5: 質問に的確に答え、文法的に正しい完全な文で、設問が求める情報をすべて含む。
- 4: 内容は正しいが小さな文法ミスが1-2つ、または情報がわずかに不足。
- 3: 内容は伝わるが、主語欠落・時制ミス・情報不足が目立つ。
- 1-2: 一部しか答えていない、質問とずれている、単語の羅列。
- 0: 無回答、または質問と無関係。
設問別の注意:
- 音読(reading): 本文との一致度・抜け/言い換え・タイトルを読んだかで評価。認識テキストの欠落は発音不明瞭の可能性として扱う。
- No.1: 本文の該当箇所を特定し、名詞を代名詞(they/it 等)に置き換えて答えているか。How→By ~ing、Why→Because ~ / 文で答える。
  「by doing so」「so」の前の部分を具体的に言い換えられているかが鍵。"By doing so." のように指示語のまま答えたら2点以下。本文の丸写しで代名詞にしない場合は4点。
- No.2（イラストA・5人の動作）: イラスト説明に書かれた5人の動作を、現在進行形で1人1文ずつ言えているか。正しく説明できた人数を基準にする（5人→5点、4人→4点、3人→3点…）。
  人物の呼び方（a man / a boy 等）や物の名前は見た目として妥当なら減点しない。現在形（kicks）など時制ミスは1人分の減点。動詞の言い換え（take a photo / take a picture 等）は正解扱い。
- No.3（イラストB・状況説明）: 「状況（何が起きているか）」と「吹き出し（何をしたい／しようと考えているか）」の2点が言えているか。両方そろい so/because 等で自然につながっていれば5点。片方のみは3点まで。
- No.4（意見）: Yes/No と、Why?/Why not? への理由を合わせて評価。理由が2文（主張＋具体例・補足）で論理的なら5点。1文のみは4点まで、理由が質問とずれていれば3点以下。
- No.5（受験者自身／意見）: Yes/No と追加質問への回答を合わせて評価。具体的な内容を2文で言えれば5点。1文のみは4点まで。
コメントはやさしく具体的に、中高生にも分かる日本語で。`;

const gradeName = (g?: string) => (g === 'pre2' ? '準2級' : '3級');

export interface EvaluateInput {
  /** '3' | 'pre2'（省略時は 3級） */
  grade?: string;
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
  const system = b.grade === 'pre2' ? EVAL_SYSTEM_PRE2 : EVAL_SYSTEM;
  const result = await callStructured(client, normalizeModel(model), system, userPrompt, FeedbackSchema, 2000);
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
  grade?: string;
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

上の記録をもとに、英検${gradeName(b.grade)}2次試験の総合講評を作成してください。`;
  const result = await callStructured(
    client,
    normalizeModel(model),
    `あなたは英検${gradeName(b.grade)}2次試験の面接官兼、${b.grade === 'pre2' ? '中高生' : '中学生'}を教える英語講師です。励ましつつ、次に何をすれば点が伸びるかを具体的に伝えます。`,
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
