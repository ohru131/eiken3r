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
  | 'hospital'
  | 'pool'
  | 'rink';

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
  /** イラスト画像ファイルのパス（例: /images/cards/card-01.png） */
  image?: string;
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

/** Yes/No で答えたあとに追加質問がある設問 */
export interface FollowUp {
  /** Yes と答えた時の追加質問 (例: "Please tell me more." / "Why?") */
  followUpYes: string;
  /** No と答えた時の追加質問 (例: "Why not?" / "What do you want to do ...?") */
  followUpNo: string;
  modelAnswersYes: string[];
  modelAnswersNo: string[];
}

export interface Question5 extends CardQuestion, FollowUp {}

/** No.4: 3級は通常の質問、準2級は Yes/No + Why?/Why not? */
export type Question4 = CardQuestion & Partial<FollowUp>;

/** 級。'3' = 3級、'pre2' = 準2級、'2' = 2級 */
export type Grade = '3' | 'pre2' | '2';

/** 2級 No.2 の3コマ漫画の1コマ */
export interface StoryPanel {
  /** コマの上に書かれる時間・場面の言葉（2・3コマ目。例: "The next day"） */
  caption?: string;
  /** コマの絵。画像は public/images/g2/<カードID>-<コマ番号>.png（無ければ絵文字の仮イラスト） */
  scene: Scene;
  /** 吹き出しのセリフ（英語）。コマの下に表示する */
  speech?: { speaker: string; text: string };
}

/** 2級 No.2: 3コマ漫画のナレーション */
export interface Story {
  /** カードに印字されている書き出しの1文（One day, ...） */
  firstSentence: string;
  panels: [StoryPanel, StoryPanel, StoryPanel];
}

export interface ExamCard {
  id: string;
  /** 級（省略時は 3級） */
  grade?: Grade;
  title: string; // パッセージのタイトル（英語）
  japaneseTitle: string;
  category: string;
  level: 'basic' | 'standard' | 'challenge';
  passage: string; // 3級: 30〜40語 / 準2級: 約50語 / 2級: 約60語
  passageJa: string;
  vocabulary: VocabularyHelp[];
  /** 3級: イラスト / 準2級: イラストA（人物5人の動作） / 2級: story を使うので不要 */
  scene?: Scene;
  /** 準2級のみ: イラストB（人物の状況説明） */
  sceneB?: Scene;
  /** 2級のみ: 3コマ漫画（No.2） */
  story?: Story;
  q1: CardQuestion; // パッセージについて
  q2: CardQuestion; // 3級: イラスト / 準2級: イラストAの5人の動作 / 2級: 3コマ漫画のナレーション（10点）
  q3: CardQuestion; // 3級: イラスト / 準2級: イラストBの状況 / 2級: 意見（I agree / I disagree）
  q4: Question4; // 3級: 受験者自身 / 準2級・2級: 意見（Yes/No + Why?）
  q5?: Question5; // 受験者自身・意見 (Yes/No + 追加質問)。2級には無い
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
  avatar?: string;
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
  | 'q2_prep'
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
  score: number; // 0-5（2級の No.2 のみ 0-10）
  verdict: string; // 短い評価ラベル
  goodPoints: string;
  corrections: string;
  improvedAnswer: string;
  tip: string;
  source: AiSource;
}

/** Azure 発音評価の結果（音読のみ） */
export interface PronWord {
  word: string; // 本文の単語（表示用）
  accuracy: number | null; // 0-100。読み落としは null
  status: 'good' | 'fair' | 'poor' | 'omitted';
}

export interface ReadingAssessment {
  overall: number; // 総合（参考値）
  accuracy: number; // 発音の正確さ
  fluency: number; // 流暢さ
  completeness: number; // 読み切れた割合
  prosody: number | null; // 抑揚・リズム
  words: PronWord[];
  insertions: string[]; // 本文にない語
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
  /** 音読の発音評価（Azure 設定時） */
  pronunciation?: ReadingAssessment;
  /** 発音評価ができなかった理由（Azure 設定時のみ） */
  pronunciationNote?: string;
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
  source: AiSource;
}

export interface HistoryRecord {
  id: string;
  date: string;
  cardId: string;
  cardTitle: string;
  mode: InterviewMode;
  total: number;
  passed: boolean;
  grade?: Grade;
}

/** 採点したAI（local = APIキーなしの簡易採点） */
export type AiSource = 'claude' | 'gemini' | 'local';

/** 採点・講評に使う AI */
export type AiProvider = 'claude' | 'gemini';

export interface AppSettings {
  /** 採点・講評に使う AI */
  aiProvider: AiProvider;
  /** Claude API キー */
  apiKey: string;
  /** 1問ごとの採点に使うモデル */
  evalModel: string;
  /** 総合講評に使うモデル */
  reportModel: string;
  /** Gemini API キー */
  geminiKey: string;
  /** Gemini: 1問ごとの採点モデル */
  geminiEvalModel: string;
  /** Gemini: 総合講評モデル */
  geminiReportModel: string;
  /** 設定の形式バージョン（上がると既存ブラウザのモデル設定を上書き） */
  settingsVersion: number;
  mode: InterviewMode;
  /** 練習する級 */
  grade: Grade;
  examinerId: string;
  speechRate: number; // 0.7 - 1.2
  sfx: boolean;
  autoAdvance: boolean;
  /** 回答終了とみなす無音秒数 */
  silenceSec: number;
  /** 練習モードで模範解答を読み上げる */
  readModelAnswer: boolean;
  /** 練習モード: 音読の前にお手本音読を聞く */
  listenModelFirst: boolean;
  /** Azure Speech（音読の発音評価） */
  azureKey: string;
  azureRegion: string;
}
