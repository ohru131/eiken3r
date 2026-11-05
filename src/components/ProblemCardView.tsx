import React, { useState } from 'react';
import { ExamCard, SimulationStepId } from '../types';
import { CardIllustration } from './CardIllustrations';
import { Clock, Eye, RotateCw, Volume2, Info } from 'lucide-react';

interface ProblemCardViewProps {
  card: ExamCard;
  currentStep: SimulationStepId;
  isFlipped?: boolean;
  onFlipCard?: () => void;
  silentTimerSeconds?: number;
}

export const ProblemCardView: React.FC<ProblemCardViewProps> = ({
  card,
  currentStep,
  isFlipped = false,
  onFlipCard,
  silentTimerSeconds = 20,
}) => {
  const [selectedWord, setSelectedWord] = useState<{ word: string; meaning: string } | null>(null);

  // Check if card should be turned over
  const shouldBeFlipped = isFlipped || currentStep === 'card_turnover' || currentStep === 'qa_no4' || currentStep === 'qa_no5' || currentStep === 'exam_finish';

  // Highlight focuses based on current question
  const isNo1Focus = currentStep === 'qa_no1';
  const isPictureAFocus = currentStep === 'qa_no2';
  const isPictureBFocus = currentStep === 'qa_no3';
  const isReadingFocus = currentStep === 'silent_reading' || currentStep === 'aloud_reading';

  return (
    <div className="w-full">
      {/* 3D Card Container */}
      <div className="perspective-1000 w-full">
        <div
          className={`relative w-full rounded-2xl transition-transform duration-700 transform-style-3d shadow-xl border-4 ${
            shouldBeFlipped
              ? 'border-slate-300 bg-gradient-to-br from-slate-200 to-slate-300'
              : 'border-amber-200 bg-amber-50/60'
          }`}
        >
          {shouldBeFlipped ? (
            /* BACK SIDE OF THE CARD */
            <div className="p-8 sm:p-12 text-center min-h-[360px] flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-slate-400/30 flex items-center justify-center mb-4 text-slate-600">
                <RotateCw className="w-10 h-10 animate-spin-slow" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-700 tracking-wide mb-2">
                GRADE 3 QUESTION CARD
              </h3>
              <p className="text-sm sm:text-base font-semibold text-slate-500 max-w-md">
                「カードを裏返して机に置いてください」
                <br />
                (Please turn over the card and put it down.)
              </p>
              <div className="mt-4 px-4 py-2 rounded-full bg-slate-300/60 text-xs font-bold text-slate-600">
                No. 4 & No. 5 はカードを見ずに面接官の目を見て答えます
              </div>
              {onFlipCard && (
                <button
                  onClick={onFlipCard}
                  className="mt-4 text-xs text-slate-500 underline hover:text-slate-700 cursor-pointer"
                >
                  カードを表に戻して確認する (練習用)
                </button>
              )}
            </div>
          ) : (
            /* FRONT SIDE OF THE CARD */
            <div className="p-3 sm:p-4 bg-[#fffef9] rounded-2xl">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b-2 border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-900 text-white text-[11px] font-black px-1.5 py-0.5 rounded">
                    GRADE 3
                  </span>
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    EIKEN Interview Card
                  </span>
                </div>
                {currentStep === 'silent_reading' && (
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold animate-pulse">
                    <Clock className="w-3.5 h-3.5" />
                    <span>黙読: 残り {silentTimerSeconds} 秒</span>
                  </div>
                )}
                {onFlipCard && (
                  <button
                    onClick={onFlipCard}
                    className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCw className="w-3 h-3" />
                    裏返す
                  </button>
                )}
              </div>

              {/* Passage Section */}
              <div
                className={`p-2.5 sm:p-3 rounded-xl transition-all ${
                  isReadingFocus || isNo1Focus
                    ? 'bg-amber-100/70 ring-2 ring-amber-400'
                    : 'bg-amber-50/50 border border-amber-200/60'
                }`}
              >
                <div className="text-center font-bold text-base sm:text-lg text-slate-900 mb-1 font-serif underline decoration-amber-400 underline-offset-4">
                  {card.passageTitle}
                </div>
                <p className="text-xs sm:text-sm md:text-base text-slate-800 leading-relaxed font-serif tracking-normal text-justify">
                  {card.passageText}
                </p>

                {/* Vocabulary Tooltips */}
                {card.passageVocabulary && card.passageVocabulary.length > 0 && (
                  <div className="mt-2 pt-1.5 border-t border-amber-200/80 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-bold text-amber-800 flex items-center gap-1">
                      <Info className="w-3 h-3" /> 重要単語:
                    </span>
                    {card.passageVocabulary.map((vocab, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedWord(selectedWord?.word === vocab.word ? null : vocab)}
                        className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded border transition-colors cursor-pointer ${
                          selectedWord?.word === vocab.word
                            ? 'bg-amber-600 text-white border-amber-600'
                            : 'bg-white/80 hover:bg-amber-200 text-amber-900 border-amber-300'
                        }`}
                      >
                        {vocab.word}
                      </button>
                    ))}
                    {selectedWord && (
                      <span className="text-[11px] text-amber-950 font-semibold bg-amber-200/80 px-2 py-0.5 rounded">
                        {selectedWord.word} = {selectedWord.meaning}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Illustrations Section (Picture A & Picture B) */}
              <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Picture A */}
                <div
                  className={`p-1.5 sm:p-2 rounded-xl border transition-all ${
                    isPictureAFocus
                      ? 'ring-2 sm:ring-3 ring-indigo-400 border-indigo-500 bg-indigo-50/30'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 px-1">
                    <span className="text-[11px] font-bold text-slate-700">
                      Picture A (動作・行動)
                    </span>
                    {isPictureAFocus && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-600 text-white animate-bounce">
                        No. 2 対象
                      </span>
                    )}
                  </div>
                  <CardIllustration scene={card.pictureA.svgScene} />
                </div>

                {/* Picture B */}
                <div
                  className={`p-1.5 sm:p-2 rounded-xl border transition-all ${
                    isPictureBFocus
                      ? 'ring-2 sm:ring-3 ring-indigo-400 border-indigo-500 bg-indigo-50/30'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1 px-1">
                    <span className="text-[11px] font-bold text-slate-700">
                      Picture B (数・位置)
                    </span>
                    {isPictureBFocus && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-600 text-white animate-bounce">
                        No. 3 対象
                      </span>
                    )}
                  </div>
                  <CardIllustration scene={card.pictureB.svgScene} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
