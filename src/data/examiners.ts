import { ExaminerProfile } from '../types';

export const EXAMINERS: ExaminerProfile[] = [
  {
    id: 'smith',
    name: 'Mr. Smith',
    shortName: 'Smith',
    description: 'アメリカ英語。明るくゆっくり、はっきり話す先生。初めての練習に。',
    color: 'from-sky-500 to-indigo-600',
    voiceHints: ['Google US English', 'Alex', 'Samantha', 'Microsoft Guy', 'Microsoft Aria', 'en-US'],
    pitch: 0.95,
    rate: 0.9,
  },
  {
    id: 'brown',
    name: 'Ms. Brown',
    shortName: 'Brown',
    description: 'イギリス英語。テンポよく進める本番そっくりの面接官。',
    color: 'from-emerald-500 to-teal-600',
    voiceHints: ['Google UK English Female', 'Serena', 'Kate', 'Microsoft Libby', 'Microsoft Sonia', 'en-GB', 'en-US'],
    pitch: 1.1,
    rate: 1.0,
  },
  {
    id: 'tanaka',
    name: 'Mr. Tanaka',
    shortName: 'Tanaka',
    description: '日本人面接官。本番で最も多いタイプ。落ち着いた標準的な発音。',
    color: 'from-amber-500 to-orange-600',
    voiceHints: ['Google UK English Male', 'Daniel', 'Microsoft Ryan', 'Microsoft Guy', 'en-US'],
    pitch: 0.85,
    rate: 0.95,
  },
];
