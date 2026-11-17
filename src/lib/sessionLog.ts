// 練習1回分の詳細（回答・採点・講評）を localStorage に保存し、あとから振り返れるようにする。
// 容量がいっぱいになったら、古い詳細から順に削除して空きを作る。
import { AnswerRecord, FinalReport, Grade, InterviewMode } from '../types';

const PREFIX = 'eiken_session_v1:';

export interface SessionDetail {
  /** HistoryRecord.id と同じ（保存時刻のミリ秒） */
  id: string;
  cardId: string;
  grade: Grade;
  mode: InterviewMode;
  /** 練習モードの「あいさつを省略」で行った回 */
  quick?: boolean;
  records: AnswerRecord[];
  report: FinalReport;
}

const keyOf = (id: string) => PREFIX + id;

/** 保存済みの詳細 ID（古い順） */
export function listDetailIds(): string[] {
  const ids: string[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith(PREFIX)) ids.push(k.slice(PREFIX.length));
    }
  } catch {
    /* noop */
  }
  return ids.sort((a, b) => (Number(a) || 0) - (Number(b) || 0));
}

export function loadSessionDetail(id: string): SessionDetail | null {
  try {
    const raw = localStorage.getItem(keyOf(id));
    return raw ? (JSON.parse(raw) as SessionDetail) : null;
  } catch {
    return null;
  }
}

export function deleteSessionDetail(id: string) {
  try {
    localStorage.removeItem(keyOf(id));
  } catch {
    /* noop */
  }
}

/**
 * 容量不足なら古い詳細を1件ずつ消しながら書き込む。
 * keep に含まれる ID（いま書き込もうとしている回など）は消さない。
 * 書き込めたら true。
 */
export function setItemWithEviction(key: string, value: string, keep: string[] = []): boolean {
  for (;;) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch {
      const victim = listDetailIds().find((id) => !keep.includes(id) && keyOf(id) !== key);
      if (!victim) return false;
      console.info(`保存容量が不足したため、古い練習記録（${new Date(Number(victim)).toLocaleString('ja-JP')}）の詳細を削除`);
      deleteSessionDetail(victim);
    }
  }
}

export function saveSessionDetail(d: SessionDetail): boolean {
  return setItemWithEviction(keyOf(d.id), JSON.stringify(d), [d.id]);
}

/** 一覧（HistoryRecord）に無い詳細を削除する */
export function pruneOrphanDetails(validIds: Set<string>) {
  listDetailIds().forEach((id) => {
    if (!validIds.has(id)) deleteSessionDetail(id);
  });
}

/** このアプリが localStorage で使っているおおよその容量（バイト、UTF-16 換算） */
export function storageUsage(): { bytes: number; details: number } {
  let bytes = 0;
  let details = 0;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k || !(k.startsWith(PREFIX) || k.startsWith('eiken'))) continue;
      bytes += (k.length + (localStorage.getItem(k)?.length ?? 0)) * 2;
      if (k.startsWith(PREFIX)) details++;
    }
  } catch {
    /* noop */
  }
  return { bytes, details };
}
