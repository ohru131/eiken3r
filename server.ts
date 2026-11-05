// ローカル開発用サーバー（GitHub Pages では使われない）。
// ANTHROPIC_API_KEY を設定すると、ブラウザにキーを入れなくてもサーバー経由で採点できる。
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient, describeError, evaluateWithClaude, reportWithClaude, normalizeModel } from './src/lib/claude';

dotenv.config();

const here = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = Number(process.env.PORT) || 3000;
const serverKey = process.env.ANTHROPIC_API_KEY || '';
const evalModel = normalizeModel(process.env.CLAUDE_EVAL_MODEL || 'claude-haiku-5-5');
const reportModel = normalizeModel(process.env.CLAUDE_REPORT_MODEL || 'claude-sonnet-5-5');

app.use(express.json({ limit: '1mb' }));

app.get('/api/status', (_req, res) => {
  res.json({ serverKey: !!serverKey, defaultModel: evalModel });
});

const model = (req: express.Request, fallback: string) => normalizeModel(req.header('x-claude-model') || fallback);

app.post('/api/evaluate', async (req, res) => {
  if (!serverKey) return res.status(400).json({ error: 'no_key' });
  try {
    res.json(await evaluateWithClaude(createClient(serverKey, false), model(req, evalModel), req.body || {}));
  } catch (err) {
    const e = describeError(err);
    if (e.status >= 500) console.error(err);
    res.status(e.status).json({ error: e.message });
  }
});

app.post('/api/report', async (req, res) => {
  if (!serverKey) return res.status(400).json({ error: 'no_key' });
  try {
    res.json(await reportWithClaude(createClient(serverKey, false), model(req, reportModel), req.body || {}));
  } catch (err) {
    const e = describeError(err);
    if (e.status >= 500) console.error(err);
    res.status(e.status).json({ error: e.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({ server: { middlewareMode: true, hmr: false }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(here, 'dist')));
    app.get('*', (_req, res) => res.sendFile(path.join(here, 'dist', 'index.html')));
  }
  app.listen(port, '0.0.0.0', () => console.log(`Server running at http://0.0.0.0:${port}`));
}

startServer();
