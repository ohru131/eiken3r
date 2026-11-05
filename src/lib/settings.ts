import { AppSettings, HistoryRecord } from '../types';

const KEY = 'eiken3_settings_v2';
const HISTORY_KEY = 'eiken3_history_v2';

export const MODEL_OPTIONS = [
  { id: 'claude-opus-5-5', label: 'Claude Opus 5.5', note: '最も精度が高い（標準）' },
  { id: 'claude-sonnet-5-5', label: 'Claude Sonnet 5.5', note: 'バランス型' },
  { id: 'claude-haiku-5-5', label: 'Claude Haiku 5.5', note: '最速・低コスト' },
];

export const DEFAULT_SETTINGS: AppSettings = {
  apiKey: '',
  model: 'claude-opus-5-5',
  mode: 'exam',
  examinerId: 'smith',
  speechRate: 1,
  sfx: true,
  autoAdvance: true,
  silenceSec: 2.2,
  readModelAnswer: true,
};

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(s: AppSettings) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* noop */
  }
}

export function loadHistory(): HistoryRecord[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveHistory(h: HistoryRecord[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(h.slice(0, 100)));
  } catch {
    /* noop */
  }
}
