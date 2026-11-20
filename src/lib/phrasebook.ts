// 表現帳: 模範解答・「こう言えば満点」の英文を保存し、間隔反復（SRS）で復習する。localStorage に保存
import { Grade, ScoredItem } from '../types';
import { setItemWithEviction } from './sessionLog';

const KEY = 'eiken_phrasebook_v1';

export interface Phrase {
  id: string;
  en: string;
  /** 和訳（分かる場合） */
  ja?: string;
  /** 元の質問（英語） */
  question?: string;
  cardId?: string;
  item?: ScoredItem;
  grade?: Grade;
  /** 'model' = 模範解答 / 'improved' = AI の満点解答 / 'filler' = つなぎ表現 */
  source: 'model' | 'improved' | 'filler';
  addedAt: number;
  /** 連続で「言えた」回数（0 = 未習得） */
  box: number;
  /** 次に復習する日時（ms） */
  due: number;
  reviews: number;
  lapses: number;
}

/** box ごとの次回までの日数 */
const INTERVAL_DAYS = [0, 1, 3, 7, 14, 30, 60];
const DAY = 86_400_000;
export const MASTERED_BOX = 5;

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

export function loadPhrases(): Phrase[] {
  try {
    const raw = localStorage.getItem(KEY);
    const list = raw ? (JSON.parse(raw) as Phrase[]) : [];
    return Array.isArray(list) ? list.filter((p) => p && typeof p.en === 'string') : [];
  } catch {
    return [];
  }
}

function save(list: Phrase[]): Phrase[] {
  setItemWithEviction(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event('phrasebook-change'));
  return list;
}

export const hasPhrase = (en: string, list = loadPhrases()) => list.some((p) => norm(p.en) === norm(en));

export type NewPhrase = Omit<Phrase, 'id' | 'addedAt' | 'box' | 'due' | 'reviews' | 'lapses'>;

/** 追加（同じ英文があれば追加しない）。追加したら true */
export function addPhrase(p: NewPhrase): boolean {
  const list = loadPhrases();
  if (!p.en.trim() || hasPhrase(p.en, list)) return false;
  const now = Date.now();
  save([{ ...p, en: p.en.trim(), id: `${now}-${Math.random().toString(36).slice(2, 7)}`, addedAt: now, box: 0, due: now, reviews: 0, lapses: 0 }, ...list]);
  return true;
}

export function removePhrase(id: string) {
  save(loadPhrases().filter((p) => p.id !== id));
}

export function removePhraseByText(en: string) {
  save(loadPhrases().filter((p) => norm(p.en) !== norm(en)));
}

/** 復習の結果: good = 言えた / hard = あいまい / again = 言えなかった */
export type ReviewGrade = 'good' | 'hard' | 'again';

export function reviewPhrase(id: string, g: ReviewGrade): Phrase | null {
  const list = loadPhrases();
  const p = list.find((x) => x.id === id);
  if (!p) return null;
  const box = g === 'good' ? Math.min(p.box + 1, INTERVAL_DAYS.length - 1) : g === 'hard' ? Math.max(1, p.box) : 0;
  // again は10分後、hard は同じ間隔の半分（最低1日）
  const wait = g === 'again' ? 10 * 60_000 : g === 'hard' ? Math.max(1, INTERVAL_DAYS[box] / 2) * DAY : INTERVAL_DAYS[box] * DAY;
  Object.assign(p, { box, due: Date.now() + wait, reviews: p.reviews + 1, lapses: p.lapses + (g === 'again' ? 1 : 0) });
  save(list);
  return p;
}

/** 今日復習する表現（期限が来たもの、古い順） */
export const duePhrases = (list = loadPhrases(), now = Date.now()) => list.filter((p) => p.due <= now).sort((a, b) => a.due - b.due);

/** 次の復習予定日までの日数（表示用） */
export const daysUntil = (p: Phrase, now = Date.now()) => Math.max(0, Math.ceil((p.due - now) / DAY));
