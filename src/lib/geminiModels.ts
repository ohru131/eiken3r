// Gemini のモデル名（設定画面用。gemini.ts を遅延読み込みのまま保つため分離）

/** 既定モデル。*-latest は Google 側で最新の安定版に自動で切り替わるエイリアス */
export const GEMINI_DEFAULT_EVAL_MODEL = 'gemini-flash-latest';
export const GEMINI_DEFAULT_REPORT_MODEL = 'gemini-pro-latest';
export const GEMINI_MODEL_SUGGESTIONS = [
  { id: 'gemini-flash-lite-latest', note: '最速・最安' },
  { id: 'gemini-flash-latest', note: 'バランス型（採点の標準）' },
  { id: 'gemini-pro-latest', note: '最も精度が高い（講評の標準）' },
];
