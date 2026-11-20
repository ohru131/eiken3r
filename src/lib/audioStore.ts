// 自分の回答の録音。面接中はマイクのストリームを開いたままにし、回答ごとに MediaRecorder で録る。
// 録音は IndexedDB に保存し、記録の振り返りでも聞き返せるようにする（古いものから自動削除）。

const DB_NAME = 'eiken_audio';
const STORE = 'clips';
/** 保存しておく最大件数（1件 数十KB〜数百KB） */
const MAX_CLIPS = 300;

interface ClipRow {
  id: string;
  blob: Blob;
  createdAt: number;
}

let dbPromise: Promise<IDBDatabase> | null = null;
function db(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      if (typeof indexedDB === 'undefined') return reject(new Error('no indexedDB'));
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        const s = req.result.createObjectStore(STORE, { keyPath: 'id' });
        s.createIndex('createdAt', 'createdAt');
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    dbPromise.catch(() => (dbPromise = null));
  }
  return dbPromise;
}

/** 再生用 URL のキャッシュ（多くなりすぎたら古いものから解放） */
const urlCache = new Map<string, string>();
const URL_CACHE_MAX = 30;
function cacheUrl(id: string, url: string) {
  urlCache.set(id, url);
  while (urlCache.size > URL_CACHE_MAX) {
    const [oldId, oldUrl] = urlCache.entries().next().value as [string, string];
    urlCache.delete(oldId);
    // 再生中の可能性があるので少し待ってから解放
    setTimeout(() => URL.revokeObjectURL(oldUrl), 120_000);
  }
}

/** 保存中のクリップ（IndexedDB に書き終わるまで、再生はここから） */
const pending = new Map<string, Blob>();

async function putClip(id: string, blob: Blob) {
  pending.set(id, blob);
  try {
    const d = await db();
    await new Promise<void>((resolve, reject) => {
      const tx = d.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put({ id, blob, createdAt: Date.now() } satisfies ClipRow);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    void prune();
  } catch (e) {
    console.warn('録音の保存に失敗', e);
  } finally {
    pending.delete(id);
  }
}

/** 古い録音を削除して MAX_CLIPS 件に収める */
async function prune() {
  const d = await db();
  const tx = d.transaction(STORE, 'readwrite');
  const store = tx.objectStore(STORE);
  const countReq = store.count();
  countReq.onsuccess = () => {
    let extra = countReq.result - MAX_CLIPS;
    if (extra <= 0) return;
    store.index('createdAt').openCursor().onsuccess = (e) => {
      const cur = (e.target as IDBRequest<IDBCursorWithValue | null>).result;
      if (!cur || extra <= 0) return;
      cur.delete();
      extra--;
      cur.continue();
    };
  };
}

/** 録音の再生用 URL（無ければ null） */
export async function clipUrl(id: string): Promise<string | null> {
  const cached = urlCache.get(id);
  if (cached) return cached;
  const p = pending.get(id);
  if (p) {
    const u = URL.createObjectURL(p);
    cacheUrl(id, u);
    return u;
  }
  try {
    const d = await db();
    const row = await new Promise<ClipRow | undefined>((resolve, reject) => {
      const req = d.transaction(STORE).objectStore(STORE).get(id);
      req.onsuccess = () => resolve(req.result as ClipRow | undefined);
      req.onerror = () => reject(req.error);
    });
    if (!row) return null;
    const u = URL.createObjectURL(row.blob);
    cacheUrl(id, u);
    return u;
  } catch {
    return null;
  }
}

// ---------------- 録音 ----------------

let stream: MediaStream | null = null;

export const canRecord = () => typeof window !== 'undefined' && typeof MediaRecorder !== 'undefined' && !!navigator.mediaDevices?.getUserMedia;

/** 面接の開始時に呼ぶ。マイクを開いたままにする（失敗しても面接は続行） */
export async function openRecorderMic(): Promise<boolean> {
  if (!canRecord()) return false;
  if (stream?.active) return true;
  try {
    const s = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    // 同時に開いた別の呼び出しが先に開いていたら、こちらは閉じる
    if (stream?.active) s.getTracks().forEach((t) => t.stop());
    else stream = s;
    return true;
  } catch {
    stream = null;
    return false;
  }
}

export function closeRecorderMic() {
  stream?.getTracks().forEach((t) => t.stop());
  stream = null;
}

export interface Recording {
  /** 録音を止めて保存する。保存したクリップ ID（声が無い・失敗時は null） */
  stop(keep: boolean): Promise<string | null>;
}

const pickMime = () =>
  ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus'].find((m) => MediaRecorder.isTypeSupported?.(m)) || '';

/** 録音を始める。マイクが開いていなければ null */
export function startRecording(): Recording | null {
  if (!stream?.active || !canRecord()) return null;
  let rec: MediaRecorder;
  try {
    const mimeType = pickMime();
    rec = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
  } catch {
    return null;
  }
  const chunks: Blob[] = [];
  rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
  try {
    rec.start();
  } catch {
    return null;
  }
  return {
    stop: (keep) =>
      new Promise((resolve) => {
        let settled = false;
        const finish = (id: string | null) => {
          if (settled) return;
          settled = true;
          clearTimeout(guard);
          resolve(id);
        };
        // onstop が来ない実装に備え、面接の進行を止めないよう最大1.5秒で諦める
        const guard = setTimeout(() => finish(null), 1500);
        const done = () => {
          if (!keep || !chunks.length) return finish(null);
          const blob = new Blob(chunks, { type: rec.mimeType || 'audio/webm' });
          const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
          // 保存は裏で行う（IndexedDB の応答を待たない）
          void putClip(id, blob);
          finish(id);
        };
        if (rec.state === 'inactive') return done();
        rec.onstop = done;
        try {
          rec.stop();
        } catch {
          finish(null);
        }
      }),
  };
}

/** 録音を再生して、終わるまで待つ */
export function playClip(url: string, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    const a = new Audio(url);
    const end = () => {
      signal?.removeEventListener('abort', stop);
      resolve();
    };
    const stop = () => {
      a.pause();
      end();
    };
    signal?.addEventListener('abort', stop, { once: true });
    a.onended = end;
    a.onerror = end;
    a.play().catch(end);
  });
}
