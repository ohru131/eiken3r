import { AppSettings, HistoryRecord } from '../types';
import { GRADES } from './grade';
import { pruneOrphanDetails, setItemWithEviction } from './sessionLog';

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
  aiProvider: 'claude',
  apiKey: '',
  geminiKey: '',
  geminiEvalModel: 'gemini-flash-latest',
  geminiReportModel: 'gemini-pro-latest',
  evalModel: DEFAULT_EVAL_MODEL,
  reportModel: DEFAULT_REPORT_MODEL,
  settingsVersion: SETTINGS_VERSION,
  mode: 'exam',
  grade: '3',
  examinerId: 'smith',
  speechRate: 1,
  sfx: true,
  autoAdvance: true,
  quickStart: false,
  silenceSec: 2.2,
  readModelAnswer: true,
  listenModelFirst: true,
  azureKey: '',
  azureRegion: 'japaneast',
  // Android の Chrome は音声認識と録音を同時に使うと認識が止まることがあるため、既定でオフ
  recordAudio: typeof navigator === 'undefined' || !/Android/i.test(navigator.userAgent),
  showHints: true,
};

export function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const saved = JSON.parse(raw);
    delete saved.model; // 旧形式（採点・講評共通の1モデル）
    const merged: AppSettings = { ...DEFAULT_SETTINGS, ...saved };
    // 不正な値（手動編集・将来の形式など）は既定値に戻す
    if (!(merged.grade in GRADES)) merged.grade = DEFAULT_SETTINGS.grade;
    if (merged.aiProvider !== 'claude' && merged.aiProvider !== 'gemini') merged.aiProvider = DEFAULT_SETTINGS.aiProvider;
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

/** 一覧（点数などの概要）は小さいので多めに残す。詳細は sessionLog 側で容量に応じて古い順に削除 */
const HISTORY_MAX = 2000;

/** 一覧を保存し、実際に保存できた一覧を返す（容量不足で古い記録を減らした場合は短くなる） */
export function saveHistory(h: HistoryRecord[]): HistoryRecord[] {
  let list = h.slice(0, HISTORY_MAX);
  // 詳細を消しても入らなければ、一覧の古い記録を減らして再試行
  for (;;) {
    if (setItemWithEviction(HISTORY_KEY, JSON.stringify(list))) break;
    if (list.length <= 1) return list; // 保存できない環境。ストレージは触らない
    list = list.slice(0, Math.floor(list.length * 0.8));
  }
  pruneOrphanDetails(new Set(list.map((x) => x.id)));
  return list;
}
