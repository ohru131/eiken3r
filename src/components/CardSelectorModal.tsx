import React from 'react';
import { ExamCard, ExaminerProfile, InterviewMode, HistoryRecord } from '../types';
import { EXAM_CARDS, EXAMINERS } from '../data/examCards';
import { X, Check, Award, BookOpen, Layers, UserCheck } from 'lucide-react';

interface CardSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCardId: string;
  onSelectCard: (card: ExamCard) => void;
  selectedExaminerId: string;
  onSelectExaminer: (examiner: ExaminerProfile) => void;
  mode: InterviewMode;
  onSelectMode: (mode: InterviewMode) => void;
  history: HistoryRecord[];
}

export const CardSelectorModal: React.FC<CardSelectorModalProps> = ({
  isOpen,
  onClose,
  selectedCardId,
  onSelectCard,
  selectedExaminerId,
  onSelectExaminer,
  mode,
  onSelectMode,
  history,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              問題カード & 面接設定の選択
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              テーマを選んでステップアップ練習しましょう
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Mode Selector */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-600" />
              練習モードの選択:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'exam' as InterviewMode,
                  title: '本番実戦モード',
                  desc: 'ヒントなし・タイマー付きで本番の緊張感を体験',
                  badge: '標準',
                  color: 'indigo',
                },
                {
                  id: 'practice' as InterviewMode,
                  title: '練習・学習モード',
                  desc: 'ヒントや模範解答を見ながらじっくり練習',
                  badge: '初心者おすすめ',
                  color: 'emerald',
                },
                {
                  id: 'drill' as InterviewMode,
                  title: '苦手パート特訓',
                  desc: 'No.1〜5の気になる問を選んで集中練習',
                  badge: '弱点克服',
                  color: 'amber',
                },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => onSelectMode(m.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                    mode === m.id
                      ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-200'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-slate-900">{m.title}</span>
                    {mode === m.id && (
                      <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-snug">{m.desc}</p>
                  <span className="mt-2 inline-block text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                    {m.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Examiner Avatar Selector */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-indigo-600" />
              面接官アバターの選択:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {EXAMINERS.map((examiner) => (
                <button
                  key={examiner.id}
                  onClick={() => onSelectExaminer(examiner)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedExaminerId === examiner.id
                      ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-200'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm text-slate-900">{examiner.name}</span>
                  </div>
                  <div className="text-[11px] text-sky-700 font-medium mb-1">
                    {examiner.accent}
                  </div>
                  <p className="text-xs text-slate-500 line-clamp-2">{examiner.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Cards List */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              問題カード選択 (全6テーマ):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {EXAM_CARDS.map((c) => {
                const pastRecord = history.find((h) => h.cardId === c.id);
                const isSelected = selectedCardId === c.id;

                return (
                  <button
                    key={c.id}
                    onClick={() => {
                      onSelectCard(c);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/60 ring-2 ring-indigo-200 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${c.badgeColor}`}>
                          {c.category}
                        </span>
                        {isSelected && (
                          <span className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> 選択中
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-slate-900">
                        {c.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">
                        {c.japaneseTitle}
                      </p>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 bg-slate-50 p-2 rounded-lg font-serif">
                        "{c.passageText}"
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="text-slate-400">英検3級 本番レベル</span>
                      {pastRecord ? (
                        <span className="font-bold text-emerald-600 flex items-center gap-1">
                          <Award className="w-3.5 h-3.5" />
                          過去最高: {pastRecord.totalScore}/33 点
                        </span>
                      ) : (
                        <span className="text-slate-400">未受検</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm cursor-pointer shadow-md"
          >
            この設定でシミュレーション開始
          </button>
        </div>
      </div>
    </div>
  );
};
