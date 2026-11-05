export type SimulationStepId =
  | 'welcome_entrance'    // 入室・挨拶
  | 'interview_warmup'    // 氏名・受験番号確認・ウォームアップ
  | 'card_receive'        // 問題カード受け渡し
  | 'silent_reading'      // 黙読20秒
  | 'aloud_reading'       // 音読
  | 'qa_no1'              // No. 1 パッセージ質問
  | 'qa_no2'              // No. 2 イラストA質問 (動作・be + -ing)
  | 'qa_no3'              // No. 3 イラストB質問 (位置・数)
  | 'card_turnover'       // カードを裏返す指示
  | 'qa_no4'              // No. 4 受験者自身への質問1 (日常・好み)
  | 'qa_no5'              // No. 5 受験者自身への質問2 (Yes/No + 展開)
  | 'exam_finish'         // カード返却・退室挨拶
  | 'final_report';       // 総合結果・AIレポート

export type InterviewMode = 'exam' | 'practice' | 'drill';

export interface ExaminerProfile {
  id: 'alex' | 'sarah' | 'david';
  name: string;
  role: string;
  accent: string;
  description: string;
  avatarColor: string;
  speechVoiceNameHint: string[];
}

export interface VocabularyHelp {
  word: string;
  meaning: string;
  pronunciation?: string;
}

export interface ExamCard {
  id: string;
  title: string;
  japaneseTitle: string;
  category: string;
  badgeColor: string;
  passageTitle: string;
  passageText: string;
  passageJapanese: string;
  passageVocabulary: VocabularyHelp[];
  
  // No. 1: Question about the passage
  question1: {
    questionText: string;
    japaneseTranslation: string;
    hint: string;
    modelAnswers: string[];
    grammarKey: string;
  };

  // No. 2: Picture A (actions)
  pictureA: {
    title: string;
    svgScene: 'park_cycling' | 'kitchen_cooking' | 'library_studying' | 'recycle_cleaning' | 'travel_station' | 'tablet_classroom';
    questionText: string;
    japaneseTranslation: string;
    hint: string;
    targetAction: string;
    modelAnswers: string[];
    grammarKey: string;
  };

  // No. 3: Picture B (locations, counts, descriptions)
  pictureB: {
    title: string;
    svgScene: 'park_bench_cats' | 'kitchen_table_apples' | 'library_shelf_books' | 'recycle_bins' | 'travel_bags' | 'classroom_computers';
    questionText: string;
    japaneseTranslation: string;
    hint: string;
    targetFocus: string;
    modelAnswers: string[];
    grammarKey: string;
  };

  // No. 4: Personal question 1
  question4: {
    questionText: string;
    japaneseTranslation: string;
    hint: string;
    modelAnswers: string[];
    tips: string;
  };

  // No. 5: Personal question 2
  question5: {
    questionText: string;
    japaneseTranslation: string;
    followUpYes: string;
    followUpNo: string;
    hint: string;
    modelAnswers: string[];
    tips: string;
  };
}

export interface StepFeedback {
  score: number;
  ratingLabel: string;
  analyzedSpokenText?: string;
  quickFeedback: string;
  grammarCheck: string;
  betterResponses: string[];
  keyTips: string;
}

export interface QuestionRecord {
  stepId: SimulationStepId;
  stepTitle: string;
  examinerPrompt: string;
  userSpokenText: string;
  feedback?: StepFeedback;
  audioDurationSec?: number;
  score?: number;
}

export interface FinalReportData {
  readingScore: number;
  no1Score: number;
  no2Score: number;
  no3Score: number;
  no4Score: number;
  no5Score: number;
  attitudeScore: number;
  totalScore: number;
  passed: boolean;
  gradeLabel: string;
  overallSummary: string;
  strengths: string[];
  improvements: string[];
  questionReviews: {
    questionTitle: string;
    score: number;
    comment: string;
    modelAnswer: string;
  }[];
  stepUpAdvice: string;
}

export interface HistoryRecord {
  id: string;
  date: string;
  cardId: string;
  cardTitle: string;
  mode: InterviewMode;
  totalScore: number;
  passed: boolean;
  gradeLabel: string;
}
