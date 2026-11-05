// ===== 問題カード =====

export type SceneBackground =
  | 'park'
  | 'kitchen'
  | 'classroom'
  | 'library'
  | 'street'
  | 'station'
  | 'beach'
  | 'livingroom'
  | 'shop'
  | 'schoolyard'
  | 'garden'
  | 'mountain'
  | 'restaurant'
  | 'gym'
  | 'zoo'
  | 'hospital';

/** イラスト内の人物・物。座標は 0-100 (%) */
export interface SceneItem {
  emoji: string;
  x: number;
  y: number;
  /** 表示サイズ (rem)。既定 3 */
  size?: number;
  /** 左右反転 */
  flip?: boolean;
  /** 人物の上に出す小さなラベル (例: "A") — 通常は不要 */
  label?: string;
  /** 吹き出し（これからすること＝ be going to 用）に入れる絵文字 */
  thought?: string;
}

export interface Scene {
  background: SceneBackground;
  items: SceneItem[];
  /** イラストの英語説明（AI採点用。画面には出さない） */
  description: string;
}

export interface VocabularyHelp {
  word: string;
  meaning: string;
}

export interface CardQuestion {
  /** 面接官が読む英語の質問 */
  text: string;
  /** 和訳 */
  ja: string;
  /** 模範解答（最初が最も標準的な解答） */
  modelAnswers: string[];
  /** 解説（なぜその答えになるか・本文/イラストのどこを見るか） */
  explanation: string;
  /** 文法・表現ポイント（短く） */
  point: string;
  /** よくある誤答と減点理由 */
  commonMistakes?: string[];
}

export interface Question5 extends CardQuestion {
  /** Yes と答えた時の追加質問 (例: "Please tell me more.") */
  followUpYes: string;
  /** No と答えた時の追加質問 (例: "Why not?" / "What do you want to do ...?") */
  followUpNo: string;
  modelAnswersYes: string[];
  modelAnswersNo: string[];
}

export interface ExamCard {
  id: string;
  title: string; // パッセージのタイトル（英語）
  japaneseTitle: string;
  category: string;
  level: 'basic' | 'standard' | 'challenge';
  passage: string; // 30〜40語程度の英文
  passageJa: string;
  vocabulary: VocabularyHelp[];
  scene: Scene;
  q1: CardQuestion; // パッセージについて
  q2: CardQuestion; // イラストについて
  q3: CardQuestion; // イラストについて
  q4: CardQuestion; // 受験者自身について（カード裏返し後）
  q5: Question5; // 受験者自身について (Yes/No + 追加質問)
}

// ===== 面接官 =====

export interface ExaminerProfile {
  id: string;
  name: string;
  shortName: string;
  description: string;
  color: string; // tailwind gradient
  voiceHints: string[];
  pitch: number;
  rate: number;
}

// ===== シミュレーション =====

export type InterviewMode = 'exam' | 'practice';

export type PhaseId =
  | 'idle'
  | 'entrance'
  | 'greeting'
  | 'silent_reading'
  | 'reading_aloud'
  | 'q1'
  | 'q2'
  | 'q3'
  | 'turnover'
  | 'q4'
  | 'q5'
  | 'exit'
  | 'scoring'
  | 'report';

export type ScoredItem = 'reading' | 'q1' | 'q2' | 'q3' | 'q4' | 'q5';

export interface StepFeedback {
  score: number; // 0-5 (reading also 0-5)
  verdict: string; // 短い評価ラベル
  goodPoints: string;
  corrections: string;
  improvedAnswer: string;
  tip: string;
  source: 'claude' | 'local';
}

export interface AnswerRecord {
  item: ScoredItem;
  question: string;
  answer: string;
  /** No.5 の追加質問と回答 */
  followUpQuestion?: string;
  followUpAnswer?: string;
  /** 質問終了〜発話開始までの秒数 */
  latencySec: number | null;
  pardonUsed: boolean;
  feedback?: StepFeedback;
}

export interface FinalReport {
  scores: Record<ScoredItem, number>;
  attitude: number;
  total: number;
  passed: boolean;
  summary: string;
  strengths: string[];
  improvements: string[];
  nextSteps: string;
  source: 'claude' | 'local';
}

export interface HistoryRecord {
  id: string;
  date: string;
  cardId: string;
  cardTitle: string;
  mode: InterviewMode;
  total: number;
  passed: boolean;
}

export interface AppSettings {
  apiKey: string;
  model: string;
  mode: InterviewMode;
  examinerId: string;
  speechRate: number; // 0.7 - 1.2
  sfx: boolean;
  autoAdvance: boolean;
  /** 回答終了とみなす無音秒数 */
  silenceSec: number;
  /** 練習モードで模範解答を読み上げる */
  readModelAnswer: boolean;
}
