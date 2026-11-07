// Azure Speech の発音評価（音読のみ）。SDK は大きいので、使う時だけ動的に読み込む。
import type { PronWord, ReadingAssessment } from '../types';
import { AbortedError, ListenEndReason, setActiveListen } from './speech';

type Sdk = typeof import('microsoft-cognitiveservices-speech-sdk');
let sdkPromise: Promise<Sdk> | null = null;
const loadSdk = () => (sdkPromise ??= import('microsoft-cognitiveservices-speech-sdk'));

export class AzureUnavailableError extends Error {}

export const azureConfigured = (key: string, region: string) => !!key.trim() && !!region.trim();

const norm = (w: string) => w.toLowerCase().replace(/[^a-z0-9']/g, '');

// ---------- 接続テスト（マイク不要・ほぼ無料） ----------
export async function testAzure(key: string, region: string): Promise<string | null> {
  try {
    const sdk = await loadSdk();
    const cfg = sdk.SpeechConfig.fromSubscription(key.trim(), region.trim());
    cfg.speechRecognitionLanguage = 'en-US';
    const push = sdk.AudioInputStream.createPushStream();
    push.write(new ArrayBuffer(3200)); // 0.1 秒の無音
    push.close();
    const rec = new sdk.SpeechRecognizer(cfg, sdk.AudioConfig.fromStreamInput(push));
    const result = await new Promise<import('microsoft-cognitiveservices-speech-sdk').SpeechRecognitionResult>((res, rej) =>
      rec.recognizeOnceAsync(res, rej)
    );
    rec.close();
    if (result.reason === sdk.ResultReason.Canceled) {
      const d = sdk.CancellationDetails.fromResult(result);
      if (d.reason === sdk.CancellationReason.Error) return describeAzureError(d.errorDetails);
    }
    return null;
  } catch (e: any) {
    return describeAzureError(String(e?.message || e));
  }
}

function describeAzureError(details: string): string {
  const raw = ` [詳細: ${String(details).slice(0, 140)}]`;
  if (/401|Unauthorized|authentication/i.test(details)) return 'キーまたはリージョンが正しくありません。' + raw;
  if (/403|quota|429|Too many/i.test(details)) return '利用上限に達したか、権限がありません。' + raw;
  if (/1006|websocket|network|Unable to contact/i.test(details)) return 'Azure に接続できません（リージョン名・ネット接続を確認）。' + raw;
  if (/microphone|getUserMedia|NotAllowed|NotFound|audio source/i.test(details)) return 'マイクを使えませんでした（ブラウザのマイク許可を確認）。' + raw;
  return 'Azure エラー。' + raw;
}

// ---------- 音読の録音 + 発音評価 ----------
interface Segment {
  words: { word: string; accuracy: number }[];
  fluency: number;
  prosody: number | null;
  duration: number;
}

export interface AzureReadingResult {
  text: string;
  latencySec: number | null;
  reason: ListenEndReason;
  assessment: ReadingAssessment | null;
  /** assessment が null の時の理由 */
  note?: string;
}

export async function listenReadingAzure(opts: {
  key: string;
  region: string;
  referenceText: string;
  silenceMs: number;
  noSpeechMs: number;
  maxMs: number;
  signal?: AbortSignal;
  onInterim?: (t: string) => void;
  onSilenceProgress?: (r: number) => void;
  /** 抑揚（prosody）評価。非対応環境ではエラーになるため外せるように */
  prosody?: boolean;
}): Promise<AzureReadingResult> {
  const sdk = await loadSdk();
  if (opts.signal?.aborted) throw new AbortedError();

  const cfg = sdk.SpeechConfig.fromSubscription(opts.key.trim(), opts.region.trim());
  cfg.speechRecognitionLanguage = 'en-US';
  const recognizer = new sdk.SpeechRecognizer(cfg, sdk.AudioConfig.fromDefaultMicrophoneInput());
  const pa = new sdk.PronunciationAssessmentConfig(
    opts.referenceText,
    sdk.PronunciationAssessmentGradingSystem.HundredMark,
    sdk.PronunciationAssessmentGranularity.Word,
    true
  );
  if (opts.prosody !== false) pa.enableProsodyAssessment = true;
  pa.applyTo(recognizer);

  const segments: Segment[] = [];
  const finals: string[] = [];
  let interim = '';
  let startedAt = performance.now();
  let firstSpeechAt: number | null = null;
  let lastActivity = performance.now();
  let fatal: string | null = null;
  let parseError: string | null = null;
  let recognizedCount = 0;

  const current = () => [...finals, interim].join(' ').replace(/\s+/g, ' ').trim();
  const touch = () => {
    lastActivity = performance.now();
    if (!firstSpeechAt && current()) firstSpeechAt = performance.now();
    opts.onInterim?.(current());
  };

  recognizer.recognizing = (_s, e) => {
    interim = e.result.text;
    touch();
  };
  recognizer.recognized = (_s, e) => {
    if (e.result.reason !== sdk.ResultReason.RecognizedSpeech || !e.result.text) return;
    interim = '';
    finals.push(e.result.text);
    recognizedCount++;
    try {
      // SDK のヘルパーが使えない場合に備え、生の JSON からも読む
      let d: any = null;
      try {
        d = sdk.PronunciationAssessmentResult.fromResult(e.result).detailResult;
      } catch {
        const raw = e.result.properties.getProperty(sdk.PropertyId.SpeechServiceResponse_JsonResult);
        d = raw ? JSON.parse(raw)?.NBest?.[0] : null;
      }
      if (!d?.Words?.length) throw new Error(`評価データなし（${d ? 'Words 空' : 'JSON なし'}）`);
      const pa = d.PronunciationAssessment || {};
      segments.push({
        words: d.Words.filter((w: any) => {
          const t = w.PronunciationAssessment?.ErrorType ?? w.ErrorType;
          return t !== 'Omission' && t !== 'Insertion';
        }).map((w: any) => ({ word: w.Word, accuracy: w.PronunciationAssessment?.AccuracyScore ?? w.AccuracyScore ?? 0 })),
        fluency: pa.FluencyScore ?? d.FluencyScore ?? 0,
        prosody: typeof (pa.ProsodyScore ?? d.ProsodyScore) === 'number' ? (pa.ProsodyScore ?? d.ProsodyScore) : null,
        duration: e.result.duration || 1,
      });
    } catch (err: any) {
      parseError = String(err?.message || err);
      console.warn('[Azure] 発音評価データの読み取りに失敗', err, e.result.json);
    }
    touch();
  };
  recognizer.canceled = (_s, e) => {
    if (e.reason === sdk.CancellationReason.Error) fatal = describeAzureError(e.errorDetails);
  };

  await new Promise<void>((res, rej) => recognizer.startContinuousRecognitionAsync(res, (err) => rej(new AzureUnavailableError(describeAzureError(err)))));
  startedAt = performance.now();
  lastActivity = startedAt;

  return new Promise<AzureReadingResult>((resolve, reject) => {
    let done = false;
    let held = false;
    const cleanup = () => {
      clearInterval(ticker);
      opts.signal?.removeEventListener('abort', onAbort);
      setActiveListen(null);
      opts.onSilenceProgress?.(0);
    };
    const stop = () =>
      new Promise<void>((res) =>
        recognizer.stopContinuousRecognitionAsync(
          () => res(),
          () => res()
        )
      ).finally(() => recognizer.close());

    const finish = async (reason: ListenEndReason, typed?: string) => {
      if (done) return;
      done = true;
      cleanup();
      await stop(); // 最後の区間の評価結果を受け取ってから集計
      const text = typed ?? current();
      const latency = firstSpeechAt ? Math.round(((firstSpeechAt - startedAt) / 1000) * 10) / 10 : null;
      const assessment = typed === undefined && segments.length ? aggregate(opts.referenceText, segments) : null;
      let note: string | undefined;
      if (!assessment) {
        if (typed !== undefined) note = 'キーボード入力のため発音評価なし';
        else if (fatal) note = fatal;
        else if (!recognizedCount) note = '音声を認識できませんでした（マイク・声の大きさを確認）';
        else note = `評価結果を受け取れませんでした（${parseError ?? '原因不明'}）`;
      }
      resolve({ text, latencySec: latency, reason, assessment, note });
    };
    const onAbort = () => {
      if (done) return;
      done = true;
      cleanup();
      void stop();
      reject(new AbortedError());
    };
    opts.signal?.addEventListener('abort', onAbort, { once: true });

    setActiveListen({
      finish: () => void finish('manual'),
      submitText: (t) => void finish('typed', t.trim()),
      pardon: () => void finish('pardon', 'Pardon?'),
      skip: () => void finish('skip', ''),
      hold: () => {
        held = true;
      },
    });

    const ticker = setInterval(() => {
      if (done || held) return;
      if (fatal) {
        // 開始直後の失敗はブラウザの音声認識に切り替えてもらう
        if (!firstSpeechAt) {
          done = true;
          cleanup();
          void stop();
          return reject(new AzureUnavailableError(fatal));
        }
        return void finish('silence');
      }
      const now = performance.now();
      if (now - startedAt > opts.maxMs) return void finish('maxtime');
      if (!firstSpeechAt) {
        if (now - startedAt > opts.noSpeechMs) void finish('nospeech');
        return;
      }
      const silent = now - lastActivity;
      opts.onSilenceProgress?.(Math.min(1, silent / opts.silenceMs));
      if (silent > opts.silenceMs) void finish('silence');
    }, 100);
  });
}

// ---------- 集計：本文と認識語を突き合わせ（LCS） ----------
export function aggregate(referenceText: string, segs: Segment[]): ReadingAssessment {
  const refDisplay = referenceText.split(/\s+/).filter(Boolean);
  const ref = refDisplay.map(norm);
  const said = segs.flatMap((s) => s.words).map((w) => ({ ...w, n: norm(w.word) })).filter((w) => w.n);

  const n = ref.length;
  const m = said.length;
  const dp = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--) dp[i][j] = ref[i] === said[j].n ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);

  const words: PronWord[] = [];
  const usedSaid = new Set<number>();
  let i = 0;
  let j = 0;
  while (i < n) {
    if (j < m && ref[i] === said[j].n) {
      const acc = Math.round(said[j].accuracy);
      words.push({ word: refDisplay[i], accuracy: acc, status: acc >= 80 ? 'good' : acc >= 60 ? 'fair' : 'poor' });
      usedSaid.add(j);
      i++;
      j++;
    } else if (j < m && dp[i][j + 1] >= dp[i + 1][j]) {
      j++;
    } else {
      words.push({ word: refDisplay[i], accuracy: null, status: 'omitted' });
      i++;
    }
  }
  const matched = words.filter((w) => w.accuracy !== null);
  const accuracy = matched.length ? matched.reduce((a, w) => a + (w.accuracy as number), 0) / matched.length : 0;
  const completeness = n ? (matched.length / n) * 100 : 0;
  const totalDur = segs.reduce((a, s) => a + s.duration, 0) || 1;
  const fluency = segs.reduce((a, s) => a + s.fluency * s.duration, 0) / totalDur;
  const prosSegs = segs.filter((s) => s.prosody !== null);
  const prosDur = prosSegs.reduce((a, s) => a + s.duration, 0);
  const prosody = prosSegs.length && prosDur ? prosSegs.reduce((a, s) => a + (s.prosody as number) * s.duration, 0) / prosDur : null;
  const overall =
    prosody === null ? accuracy * 0.5 + fluency * 0.25 + completeness * 0.25 : accuracy * 0.4 + fluency * 0.2 + completeness * 0.2 + prosody * 0.2;
  const r = (x: number) => Math.round(x);
  return {
    overall: r(overall),
    accuracy: r(accuracy),
    fluency: r(fluency),
    completeness: r(completeness),
    prosody: prosody === null ? null : r(prosody),
    words,
    insertions: said.filter((_, k) => !usedSaid.has(k)).map((w) => w.word),
  };
}

/** Claude に渡す要約 */
export function summarizeAssessment(a: ReadingAssessment): string {
  const weak = a.words.filter((w) => w.status === 'poor' || w.status === 'fair').map((w) => `${w.word}(${w.accuracy})`);
  const omitted = a.words.filter((w) => w.status === 'omitted').map((w) => w.word);
  return [
    `総合${a.overall} / 正確さ${a.accuracy} / 流暢さ${a.fluency} / 読み切り${a.completeness}${a.prosody !== null ? ` / 抑揚${a.prosody}` : ''}（各100点満点）`,
    weak.length ? `発音が弱い語: ${weak.slice(0, 12).join(', ')}` : '発音が弱い語: なし',
    omitted.length ? `読み落とした語: ${omitted.slice(0, 12).join(', ')}` : '読み落とした語: なし',
    a.insertions.length ? `本文にない語: ${a.insertions.slice(0, 8).join(', ')}` : '',
  ]
    .filter(Boolean)
    .join('\n');
}
