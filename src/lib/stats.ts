// 学習の記録から、モチベーション表示用の数字を計算する
import { HistoryRecord } from '../types';
import { PASS_LINE } from './scoring';

const dayKey = (t: number) => {
  const d = new Date(t);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};
const ts = (h: HistoryRecord) => Number(h.id) || 0;

/** 連続練習日数（今日 or 昨日まで続いていれば継続中） */
export function practiceStreak(history: HistoryRecord[], now = Date.now()): number {
  const days = new Set(history.map((h) => dayKey(ts(h))));
  const DAY = 86400000;
  let cursor = now;
  if (!days.has(dayKey(cursor))) cursor -= DAY; // 今日まだ練習していなくても、昨日までの連続は表示
  let streak = 0;
  while (days.has(dayKey(cursor))) {
    streak++;
    cursor -= DAY;
  }
  return streak;
}

export const practicedToday = (history: HistoryRecord[], now = Date.now()) => history.some((h) => dayKey(ts(h)) === dayKey(now));

/** 直近7日間の練習回数 */
export const weekCount = (history: HistoryRecord[], now = Date.now()) => history.filter((h) => now - ts(h) < 7 * 86400000).length;

/** 直近5回の平均点 */
export function recentAverage(history: HistoryRecord[]): number | null {
  const r = history.slice(0, 5);
  return r.length ? Math.round((r.reduce((a, h) => a + h.total, 0) / r.length) * 10) / 10 : null;
}

export interface CardProgress {
  prevBest: number | null; // 今回より前の自己ベスト
  attempts: number; // 今回より前の挑戦回数
  wasPassed: boolean;
}

export function cardProgress(history: HistoryRecord[], cardId: string): CardProgress {
  const past = history.filter((h) => h.cardId === cardId);
  const prevBest = past.length ? Math.max(...past.map((h) => h.total)) : null;
  return { prevBest, attempts: past.length, wasPassed: prevBest !== null && prevBest >= PASS_LINE };
}

export const passedCardCount = (history: HistoryRecord[]) => {
  const best: Record<string, number> = {};
  history.forEach((h) => (best[h.cardId] = Math.max(best[h.cardId] ?? 0, h.total)));
  return Object.values(best).filter((v) => v >= PASS_LINE).length;
};
