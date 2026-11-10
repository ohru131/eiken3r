// 級（3級 / 準2級）ごとの違いをまとめる
import { CardQuestion, ExamCard, FollowUp, Grade, Scene, ScoredItem } from '../types';

export interface GradeInfo {
  id: Grade;
  /** 画面表示用（例: 3級 / 準2級） */
  label: string;
  /** ロゴ用の短い表記 */
  badge: string;
  /** カードに印字する英語表記 */
  cardLabel: string;
  /** 面接官が読み上げる級名（This is the ___ test.） */
  spoken: string;
  /** 面接官の台詞の和訳で使う級名 */
  spokenJa: string;
}

export const GRADES: Record<Grade, GradeInfo> = {
  '3': { id: '3', label: '3級', badge: '3級', cardLabel: 'GRADE 3', spoken: 'Grade 3', spokenJa: '3級' },
  pre2: { id: 'pre2', label: '準2級', badge: '準2', cardLabel: 'GRADE PRE-2', spoken: 'Grade Pre-2', spokenJa: '準2級' },
};

export const gradeOf = (card: Pick<ExamCard, 'grade'>): Grade => card.grade ?? '3';
export const gradeInfo = (card: Pick<ExamCard, 'grade'>) => GRADES[gradeOf(card)];

const LABELS: Record<Grade, Record<ScoredItem, string>> = {
  '3': {
    reading: '音読',
    q1: 'No.1 パッセージ',
    q2: 'No.2 イラスト',
    q3: 'No.3 イラスト',
    q4: 'No.4 あなた自身',
    q5: 'No.5 あなた自身',
  },
  pre2: {
    reading: '音読',
    q1: 'No.1 パッセージ',
    q2: 'No.2 イラストA',
    q3: 'No.3 イラストB',
    q4: 'No.4 意見',
    q5: 'No.5 意見',
  },
};

export const itemLabel = (card: Pick<ExamCard, 'grade'>, item: ScoredItem) => LABELS[gradeOf(card)][item];

/** その設問で見るイラスト（無ければ null）。cardId は 3級の自動画像パス用 */
export function sceneFor(card: ExamCard, item: ScoredItem): { scene: Scene; cardId?: string; label?: string } | null {
  if (gradeOf(card) === 'pre2') {
    if (item === 'q2') return { scene: card.scene, label: 'A' };
    if (item === 'q3' && card.sceneB) return { scene: card.sceneB, label: 'B' };
    return null;
  }
  return item === 'q2' || item === 'q3' ? { scene: card.scene, cardId: card.id } : null;
}

export const hasFollowUp = (q: CardQuestion | null | undefined): q is CardQuestion & FollowUp =>
  !!q && typeof (q as Partial<FollowUp>).followUpYes === 'string' && typeof (q as Partial<FollowUp>).followUpNo === 'string';
