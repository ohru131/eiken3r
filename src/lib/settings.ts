import { AppSettings, HistoryRecord } from '../types';

const KEY = 'eiken3_settings_v2';
const HISTORY_KEY = 'eiken3_history_v2';

export const MODEL_OPTIONS = [
  { id: 'claude-haiku-5-5', label: 'Claude Haiku 5.5', note: '最速・低コスト' },
  { id: 'claude-sonnet-5-5', label: 'Claude Sonnet 5.5', note: 'バランス型' },
  { id: 'claude-opus-5-5', label: 'Claude Opus 5.5', note: '最も精度が高い' },
];

/** この値を上げると、保存済みのブラウザでもモデル設定を既定値に戻す */
const SETTINGS_VERSION = 3;
export const DEFAULT_EVAL_MODEL = 'claude-haiku-5-5';
export const DEFAULT_REPORT_MODEL = 'claude-sonnet-5-5';

export const DEFAULT_SETTINGS: AppSettings = {
  apiKey: '',
  evalModel: DEFAULT_EVAL_MODEL,
  reportModel: DEFAULT_REPORT_MODEL,
  settingsVersion: SETTINGS_VERSION,
  mode: 'exam',
  grade: '3',
  examinerId: 'smith',
  speechRate: 1,
  sfx: true,
  autoAdvance: true,
  silenceSec: 2.2,
  readModelAnswer: true,
  listenModelFirst: true,
  azureKey: '',
  azureRegion: 'japaneast',
};

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const saved = JSON.parse(raw);
    delete saved.model; // 旧形式（採点・講評共通の1モデル）
    const merged: AppSettings = { ...DEFAULT_SETTINGS, ...saved };
    if (saved.settingsVersion !== SETTINGS_VERSION) {
      // 旧バージョンの設定はモデルだけ強制的に新しい既定値へ（APIキー等はそのまま）
      merged.evalModel = DEFAULT_EVAL_MODEL;
      merged.reportModel = DEFAULT_REPORT_MODEL;
      merged.settingsVersion = SETTINGS_VERSION;
      saveSettings(merged);
    }
    return merged;
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
