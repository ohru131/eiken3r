import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Anthropic from '@anthropic-ai/sdk';
import { betaZodOutputFormat } from '@anthropic-ai/sdk/helpers/beta/zod';
import { z } from 'zod';

dotenv.config();

const here = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '1mb' }));

const ALLOWED_MODELS = ['claude-opus-5-5', 'claude-sonnet-5-5', 'claude-haiku-5-5'] as const;
const DEFAULT_MODEL = process.env.CLAUDE_MODEL || 'claude-opus-5-5';
// server-side refusal fallback ("default" form) is supported on Opus 5.5 / Sonnet 5.5
const FALLBACK_MODELS = new Set(['claude-opus-5-5', 'claude-sonnet-5-5']);

/** リクエストヘッダのキー（ブラウザ設定）→ 環境変数 の順でクライアントを作る */
function getClient(req: express.Request): Anthropic | null {
  const headerKey = (req.header('x-anthropic-key') || '').trim();
  const apiKey = headerKey || process.env.ANTHROPIC_API_KEY || '';
  if (!apiKey) return null;
  return new Anthropic({ apiKey, maxRetries: 1, timeout: 45_000 });
}

function pickModel(req: express.Request): string {
  const m = (req.header('x-claude-model') || '').trim();
  return (ALLOWED_MODELS as readonly string[]).includes(m) ? m : DEFAULT_MODEL;
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

function sendError(res: express.Response, err: unknown) {
  if (err instanceof Anthropic.AuthenticationError) {
    return res.status(401).json({ error: 'APIキーが無効です。設定を確認してください。' });
  }
  if (err instanceof Anthropic.RateLimitError) {
    return res.status(429).json({ error: 'レート制限に達しました。少し待ってから再試行してください。' });
  }
  if (err instanceof Anthropic.APIError) {
    return res.status(502).json({ error: `Claude API エラー (${err.status ?? '?'})` });
  }
  console.error(err);
  return res.status(500).json({ error: '評価に失敗しました' });
}

// ---------- status ----------
app.get('/api/status', (_req, res) => {
  res.json({ serverKey: !!process.env.ANTHROPIC_API_KEY, defaultModel: DEFAULT_MODEL });
});

// ---------- 1問ごとの採点 ----------
const FeedbackSchema = z.object({
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

app.post('/api/evaluate', async (req, res) => {
  const client = getClient(req);
  if (!client) return res.status(400).json({ error: 'no_key' });

  const b = req.body || {};
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
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const result = await callStructured(client, pickModel(req), EVAL_SYSTEM, userPrompt, FeedbackSchema, 2000);
    result.score = Math.max(0, Math.min(5, Math.round(result.score)));
    res.json({ ...result, source: 'claude' });
  } catch (err) {
    sendError(res, err);
  }
});

// ---------- 総合講評 ----------
const ReportSchema = z.object({
  summary: z.string().describe('全体講評。日本語3-4文。受験者の実際の発話を1つ以上引用'),
  strengths: z.array(z.string()).describe('良かった点 2-3個'),
  improvements: z.array(z.string()).describe('改善点 2-3個。具体的な英語表現の例を含める'),
  nextSteps: z.string().describe('次回までの練習メニュー。日本語2文'),
});

app.post('/api/report', async (req, res) => {
  const client = getClient(req);
  if (!client) return res.status(400).json({ error: 'no_key' });
  const b = req.body || {};
  const userPrompt = `カード: ${b.cardTitle}
得点: ${JSON.stringify(b.scores)} / アティチュード ${b.attitude}/3 / 合計 ${b.total}/33（合格目安 ${b.passLine}点）
各設問の記録:
${JSON.stringify(b.records, null, 1)}

上の記録をもとに、英検3級2次試験の総合講評を作成してください。`;
  try {
    const result = await callStructured(
      client,
      pickModel(req),
      'あなたは英検3級2次試験の面接官兼、中学生を教える英語講師です。励ましつつ、次に何をすれば点が伸びるかを具体的に伝えます。',
      userPrompt,
      ReportSchema,
      3000
    );
    res.json({ ...result, source: 'claude' });
  } catch (err) {
    sendError(res, err);
  }
});

// ---------- static / vite ----------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(here, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(here, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
}

startServer();
