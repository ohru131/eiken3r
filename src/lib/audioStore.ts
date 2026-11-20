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

const urlCache = new Map<string, string>();

async function putClip(id: string, blob: Blob) {
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
      const id = (cur.value as ClipRow).id;
      cur.delete();
      const u = urlCache.get(id);
      if (u) URL.revokeObjectURL(u);
      urlCache.delete(id);
      extra--;
      cur.continue();
    };
  };
}

/** 録音の再生用 URL（無ければ null） */
export async function clipUrl(id: string): Promise<string | null> {
  const cached = urlCache.get(id);
  if (cached) return cached;
  try {
    const d = await db();
    const row = await new Promise<ClipRow | undefined>((resolve, reject) => {
      const req = d.transaction(STORE).objectStore(STORE).get(id);
      req.onsuccess = () => resolve(req.result as ClipRow | undefined);
      req.onerror = () => reject(req.error);
    });
    if (!row) return null;
    const u = URL.createObjectURL(row.blob);
    urlCache.set(id, u);
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
    stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
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
        const done = async () => {
          if (!keep || !chunks.length) return resolve(null);
          const blob = new Blob(chunks, { type: rec.mimeType || 'audio/webm' });
          const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
          urlCache.set(id, URL.createObjectURL(blob));
          await putClip(id, blob);
          resolve(id);
        };
        if (rec.state === 'inactive') return void done();
        rec.onstop = () => void done();
        try {
          rec.stop();
        } catch {
          resolve(null);
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
