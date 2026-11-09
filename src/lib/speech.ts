// 音声合成 (TTS) と音声認識 (STT) の Promise ラッパー。中断 (AbortSignal) 対応。

export class AbortedError extends Error {
  constructor() {
    super('aborted');
  }
}

export function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(new AbortedError());
    const t = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(t);
      reject(new AbortedError());
    };
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

// ---------------- TTS ----------------

let cachedVoices: SpeechSynthesisVoice[] = [];
function loadVoices() {
  if (!('speechSynthesis' in window)) return;
  cachedVoices = window.speechSynthesis.getVoices();
}
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.addEventListener?.('voiceschanged', loadVoices);
}

/** 音声一覧は非同期に読み込まれる（Edge/Chrome）ため、最大 timeoutMs 待つ */
function waitForVoices(timeoutMs = 1500): Promise<void> {
  if (cachedVoices.length || !('speechSynthesis' in window)) return Promise.resolve();
  loadVoices();
  if (cachedVoices.length) return Promise.resolve();
  return new Promise((resolve) => {
    const synth = window.speechSynthesis;
    const done = () => {
      clearTimeout(t);
      synth.removeEventListener?.('voiceschanged', done);
      loadVoices();
      resolve();
    };
    const t = setTimeout(done, timeoutMs);
    synth.addEventListener?.('voiceschanged', done);
  });
}

/** オンライン音声（Edge の "Online (Natural)" 等）で失敗した音声名。以後は端末内蔵音声を使う */
const failedVoices = new Set<string>();

export function pickVoice(hints: string[], opts: { localOnly?: boolean } = {}): SpeechSynthesisVoice | undefined {
  if (!cachedVoices.length) loadVoices();
  const en = cachedVoices.filter(
    (v) => v.lang.toLowerCase().startsWith('en') && !failedVoices.has(v.voiceURI) && (!opts.localOnly || v.localService)
  );
  for (const h of hints) {
    const v = en.find((x) => x.name.includes(h));
    if (v) return v;
  }
  for (const h of hints) {
    const v = en.find((x) => x.lang === h);
    if (v) return v;
  }
  return en.find((v) => v.lang === 'en-US') || en[0];
}

export interface SpeakOptions {
  voiceHints?: string[];
  rate?: number;
  pitch?: number;
  muted?: boolean;
  signal?: AbortSignal;
  lang?: string;
}

// Chromium では発話中の utterance が GC されると onend が来ないため参照を保持する
let currentUtterance: SpeechSynthesisUtterance | null = null;

type AttemptResult = 'ok' | 'failed';

/** 1 回分の発話。開始しない・エラーになった場合は 'failed' を返す */
function speakOnce(
  text: string,
  opts: SpeakOptions,
  voice: SpeechSynthesisVoice | undefined,
  estimateMs: number
): Promise<AttemptResult> {
  const { signal } = opts;
  return new Promise((resolve, reject) => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = voice?.lang || opts.lang || 'en-US';
    u.rate = opts.rate ?? 0.95;
    u.pitch = opts.pitch ?? 1;
    if (voice) u.voice = voice;
    currentUtterance = u;

    let done = false;
    let started = false;
    const finish = (r: AttemptResult | Error) => {
      if (done) return;
      done = true;
      clearTimeout(startGuard);
      clearTimeout(safety);
      signal?.removeEventListener('abort', onAbort);
      if (currentUtterance === u) currentUtterance = null;
      r instanceof Error ? reject(r) : resolve(r);
    };
    // 一定時間内に onstart が来なければ失敗扱い（オンライン音声の通信失敗・エンジン停止対策）
    const startGuard = setTimeout(() => {
      if (!started) {
        synth.cancel();
        finish('failed');
      }
    }, 3500);
    // onend が来ないブラウザ対策
    const safety = setTimeout(() => finish('ok'), estimateMs * 2 + 6000);
    const onAbort = () => {
      synth.cancel();
      finish(new AbortedError());
    };
    signal?.addEventListener('abort', onAbort, { once: true });
    u.onstart = () => {
      started = true;
    };
    u.onend = () => finish(started ? 'ok' : 'failed');
    u.onerror = (e) => {
      if (signal?.aborted) return finish(new AbortedError());
      // interrupted / canceled は自分で止めた場合
      if (e.error === 'interrupted' || e.error === 'canceled') return finish(started ? 'ok' : 'failed');
      console.warn('[speech] TTS error:', e.error, voice?.name);
      finish('failed');
    };
    // 停止状態で固まっていることがある（Edge）
    if (synth.paused) synth.resume();
    synth.speak(u);
  });
}

export async function speak(text: string, opts: SpeakOptions = {}): Promise<void> {
  const { signal } = opts;
  if (signal?.aborted) throw new AbortedError();
  const estimateMs = Math.max(1200, text.length * 70) / (opts.rate || 1);

  if (opts.muted || !('speechSynthesis' in window)) {
    return sleep(estimateMs, signal);
  }

  const synth = window.speechSynthesis;
  // cancel 直後の speak は無視されることがある（Chromium）ため、少し間を空ける
  if (synth.speaking || synth.pending) {
    synth.cancel();
    await sleep(80, signal);
  }
  await waitForVoices();
  if (signal?.aborted) throw new AbortedError();

  const useVoice = !opts.lang || opts.lang.startsWith('en');
  const first = useVoice ? pickVoice(opts.voiceHints || []) : undefined;
  const startedAt = performance.now();
  if ((await speakOnce(text, opts, first, estimateMs)) === 'ok') return;

  // 失敗：オンライン音声なら記録して、端末内蔵音声で再試行
  if (first && !first.localService) failedVoices.add(first.voiceURI);
  const fallback = useVoice ? pickVoice(opts.voiceHints || [], { localOnly: true }) : undefined;
  if (fallback?.voiceURI !== first?.voiceURI || !first) {
    synth.cancel();
    await sleep(80, signal);
    if ((await speakOnce(text, opts, fallback, estimateMs)) === 'ok') return;
  }

  // それでも話せない場合は、読み上げ相当の時間だけ待って進行を合わせる
  console.warn('[speech] TTS unavailable; continuing without audio');
  const remain = estimateMs - (performance.now() - startedAt);
  if (remain > 0) await sleep(remain, signal);
}

/**
 * クリック等のユーザー操作の中で呼ぶ。音声合成を初期化し、固まったキューを解消する。
 * （ユーザー操作なしの speak は Chromium/Safari で not-allowed になることがある）
 */
export function unlockSpeech() {
  if (!('speechSynthesis' in window)) return;
  try {
    const synth = window.speechSynthesis;
    synth.cancel();
    if (synth.paused) synth.resume();
    const u = new SpeechSynthesisUtterance(' ');
    u.volume = 0;
    synth.speak(u);
    loadVoices();
  } catch {
    /* noop */
  }
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

// ---------------- STT ----------------

export const hasSpeechRecognition = (): boolean =>
  typeof window !== 'undefined' && !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

export type ListenEndReason = 'silence' | 'nospeech' | 'maxtime' | 'manual' | 'typed' | 'pardon' | 'skip';

export interface ListenResult {
  text: string;
  latencySec: number | null;
  reason: ListenEndReason;
}

export interface ListenOptions {
  /** 話し終わりとみなす無音時間 */
  silenceMs: number;
  /** 何も話さなかった場合のタイムアウト */
  noSpeechMs: number;
  /** 最大録音時間 */
  maxMs: number;
  signal?: AbortSignal;
  onInterim?: (text: string) => void;
  onSpeechStart?: () => void;
  /** 無音カウントダウン (0-1) */
  onSilenceProgress?: (ratio: number) => void;
}

/** 外部（ボタン・キーボード）から listen を終了させるためのハンドル */
export interface ListenHandle {
  finish: () => void;
  submitText: (text: string) => void;
  pardon: () => void;
  skip: () => void;
  /** キーボード入力中など、自動タイムアウトを止める */
  hold: () => void;
}

let activeHandle: ListenHandle | null = null;
export const getActiveListen = () => activeHandle;
export const setActiveListen = (h: ListenHandle | null) => {
  activeHandle = h;
};

export function listen(opts: ListenOptions): Promise<ListenResult> {
  const { signal } = opts;
  if (signal?.aborted) return Promise.reject(new AbortedError());

  return new Promise((resolve, reject) => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const startedAt = performance.now();
    let firstSpeechAt: number | null = null;
    let finalText = '';
    let interimText = '';
    let lastActivity = performance.now();
    let done = false;
    let held = false;
    let rec: any = null;
    let ticker: ReturnType<typeof setInterval>;

    const current = () => `${finalText} ${interimText}`.replace(/\s+/g, ' ').trim();

    const finish = (reason: ListenEndReason, overrideText?: string) => {
      if (done) return;
      done = true;
      clearInterval(ticker);
      signal?.removeEventListener('abort', onAbort);
      activeHandle = null;
      opts.onSilenceProgress?.(0);
      try {
        rec?.abort();
      } catch {
        /* noop */
      }
      const text = overrideText ?? current();
      const latency =
        reason === 'typed' ? (performance.now() - startedAt) / 1000 : firstSpeechAt ? (firstSpeechAt - startedAt) / 1000 : null;
      resolve({ text, latencySec: latency !== null ? Math.round(latency * 10) / 10 : null, reason });
    };

    const onAbort = () => {
      if (done) return;
      done = true;
      clearInterval(ticker);
      activeHandle = null;
      try {
        rec?.abort();
      } catch {
        /* noop */
      }
      reject(new AbortedError());
    };
    signal?.addEventListener('abort', onAbort, { once: true });

    activeHandle = {
      finish: () => finish('manual'),
      submitText: (t: string) => finish('typed', t.trim()),
      pardon: () => finish('pardon', 'Pardon?'),
      skip: () => finish('skip', ''),
      hold: () => {
        held = true;
        try {
          rec?.abort();
        } catch {
          /* noop */
        }
        rec = null;
      },
    };

    if (SR) {
      rec = new SR();
      rec.lang = 'en-US';
      rec.continuous = true;
      rec.interimResults = true;
      rec.maxAlternatives = 1;
      rec.onresult = (e: any) => {
        let interim = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const r = e.results[i];
          if (r.isFinal) finalText += ' ' + r[0].transcript;
          else interim += r[0].transcript;
        }
        interimText = interim;
        lastActivity = performance.now();
        if (!firstSpeechAt && current()) {
          firstSpeechAt = performance.now();
          opts.onSpeechStart?.();
        }
        opts.onInterim?.(current());
      };
      rec.onerror = (e: any) => {
        if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
          // マイク拒否 → キーボード入力待ちにする（タイムアウトは継続）
          rec = null;
        }
      };
      rec.onend = () => {
        // Chrome は continuous でも勝手に止まるので再開
        if (!done && rec) {
          try {
            rec.start();
          } catch {
            /* noop */
          }
        }
      };
      try {
        rec.start();
      } catch {
        /* noop */
      }
    }

    ticker = setInterval(() => {
      if (held) return;
      const now = performance.now();
      if (now - startedAt > opts.maxMs) return finish('maxtime');
      if (!firstSpeechAt) {
        // 音声認識がない場合はキーボード入力をずっと待つ（maxMs まで）
        if (SR && rec && now - startedAt > opts.noSpeechMs) return finish('nospeech');
        return;
      }
      const silent = now - lastActivity;
      opts.onSilenceProgress?.(Math.min(1, silent / opts.silenceMs));
      if (silent > opts.silenceMs) finish('silence');
    }, 100);
  });
}
