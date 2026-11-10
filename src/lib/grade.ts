// 級（3級 / 準2級 / 2級）ごとの違いをまとめる
import { CardQuestion, ExamCard, FollowUp, Grade, HistoryRecord, Scene, ScoredItem, Story } from '../types';

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
  /** ホーム画面の説明文 */
  intro: string;
  /** 採点される項目（順番どおり） */
  items: ScoredItem[];
  /** 問題カード ID の接頭辞（grade 追加前の学習記録の判定用） */
  idPrefix: string;
}

const ALL_ITEMS: ScoredItem[] = ['reading', 'q1', 'q2', 'q3', 'q4', 'q5'];

export const GRADES: Record<Grade, GradeInfo> = {
  '3': {
    id: '3',
    label: '3級',
    badge: '3級',
    cardLabel: 'GRADE 3',
    spoken: 'Grade 3',
    spokenJa: '3級',
    intro: '入室から退室まで、本番と同じ順番で面接官が質問します。答え終わって少し待つと、次の質問に進みます。',
    items: ALL_ITEMS,
    idPrefix: 'card-',
  },
  pre2: {
    id: 'pre2',
    label: '準2級',
    badge: '準2',
    cardLabel: 'GRADE PRE-2',
    spoken: 'Grade Pre-2',
    spokenJa: '準2級',
    intro: '音読のあと、パッセージ・イラストA（5人の動作）・イラストB（状況説明）・意見を問う2問の計5問。本番と同じ順番で面接官が質問します。',
    items: ALL_ITEMS,
    idPrefix: 'pre2-',
  },
  '2': {
    id: '2',
    label: '2級',
    badge: '2級',
    cardLabel: 'GRADE 2',
    spoken: 'Grade 2',
    spokenJa: '2級',
    intro: '音読のあと、パッセージ・3コマ漫画のナレーション（準備20秒）・意見を問う2問の計4問。本番と同じ順番で面接官が質問します。',
    items: ['reading', 'q1', 'q2', 'q3', 'q4'],
    idPrefix: 'g2-',
  },
};

/** 画面に並べる順番 */
export const GRADE_ORDER: Grade[] = ['3', 'pre2', '2'];

export const gradeOf = (card: Pick<ExamCard, 'grade'>): Grade => card.grade ?? '3';
export const gradeInfo = (card: Pick<ExamCard, 'grade'>) => GRADES[gradeOf(card)];

/** 学習記録の級（grade 追加前の記録はカード ID から判定） */
export const historyGrade = (h: Pick<HistoryRecord, 'grade' | 'cardId'>): Grade =>
  h.grade && h.grade in GRADES ? h.grade : GRADE_ORDER.find((g) => g !== '3' && h.cardId.startsWith(GRADES[g].idPrefix)) ?? '3';

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
  '2': {
    reading: '音読',
    q1: 'No.1 パッセージ',
    q2: 'No.2 3コマ漫画',
    q3: 'No.3 意見',
    q4: 'No.4 意見',
    q5: 'No.5',
  },
};

export const itemLabel = (card: Pick<ExamCard, 'grade'>, item: ScoredItem) => LABELS[gradeOf(card)][item];

/** その級で採点される項目（2級は No.5 が無い） */
export const scoredItems = (card: Pick<ExamCard, 'grade'>): ScoredItem[] => gradeInfo(card).items;

/** 設問の満点。2級の No.2（3コマ漫画）だけ10点、ほかは5点 */
export const maxScore = (card: Pick<ExamCard, 'grade'>, item: ScoredItem): number => (gradeOf(card) === '2' && item === 'q2' ? 10 : 5);

/** 満点が違う設問どうしを比べるため、5点満点に換算する */
export const scoreOutOf5 = (score: number, max: number) => (max === 5 ? score : (score / max) * 5);

export const getQuestion = (card: ExamCard, item: ScoredItem): CardQuestion | null => (item === 'reading' ? null : card[item] ?? null);

/** その設問で見るイラスト（無ければ null）。cardId は 3級の自動画像パス用 */
export function sceneFor(card: ExamCard, item: ScoredItem): { scene: Scene; cardId?: string; label?: string } | null {
  const g = gradeOf(card);
  if (g === '2' || !card.scene) return null;
  if (g === 'pre2') {
    if (item === 'q2') return { scene: card.scene, label: 'A' };
    if (item === 'q3' && card.sceneB) return { scene: card.sceneB, label: 'B' };
    return null;
  }
  return item === 'q2' || item === 'q3' ? { scene: card.scene, cardId: card.id } : null;
}

/** 2級 No.2 の3コマ漫画（それ以外は null） */
export const storyFor = (card: ExamCard, item: ScoredItem): Story | null => (gradeOf(card) === '2' && item === 'q2' ? card.story ?? null : null);

/** 2級のコマ画像のパス（scene.image が無ければ ID から決まる） */
export const panelImage = (card: Pick<ExamCard, 'id'>, index: number) => `/images/g2/${card.id}-${index + 1}.png`;

/** AI 採点に渡すイラストの説明 */
export function pictureDescription(card: ExamCard, item: ScoredItem): string {
  const story = storyFor(card, item);
  if (story)
    return [
      `Three-panel comic. The story must begin with this sentence printed on the card: "${story.firstSentence}"`,
      ...story.panels.map((p, i) => `${p.caption ? `[Caption above panel ${i + 1}: "${p.caption}"] ` : ''}${p.scene.description}`),
    ].join('\n');
  return sceneFor(card, item)?.scene.description ?? '';
}

export const hasFollowUp = (q: CardQuestion | null | undefined): q is CardQuestion & FollowUp =>
  !!q && typeof (q as Partial<FollowUp>).followUpYes === 'string' && typeof (q as Partial<FollowUp>).followUpNo === 'string';
