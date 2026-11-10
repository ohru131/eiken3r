import React from 'react';
import { ExamCard } from '../types';
import { SceneIllustration } from './SceneIllustration';
import { CardState } from '../engine/interview';
import { gradeInfo } from '../lib/grade';

interface Props {
  card: ExamCard;
  state: CardState;
  timer: number | null;
  showTranslation?: boolean;
}

export const ExamCardView: React.FC<Props> = ({ card, state, timer, showTranslation }) => {
  if (state === 'none') {
    return (
      <div className="flex h-full min-h-[260px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-white/50 p-6 text-center text-sm text-slate-400">
        問題カードは面接官から渡されます
      </div>
    );
  }
  const grade = gradeInfo(card);
  const pre2 = grade.id === 'pre2';
  return (
    <div className="relative h-full [perspective:1600px]">
      <div
        className="relative h-full transition-transform duration-700 [transform-style:preserve-3d]"
        style={{ transform: state === 'back' ? 'rotateY(180deg)' : 'none' }}
      >
        {/* front */}
        <div className="flex h-full flex-col overflow-y-auto rounded-2xl border border-slate-300 bg-[#fffef8] p-4 shadow-xl [backface-visibility:hidden] sm:p-5 lg:overflow-hidden">
          <div className="mb-2 flex items-center justify-between">
            <span className="rounded bg-slate-900 px-2 py-0.5 text-[11px] font-bold tracking-widest text-white">{grade.cardLabel}</span>
            {timer !== null && (
              <span className={`rounded-full px-3 py-1 text-sm font-black tabular-nums ${timer <= 5 ? 'bg-rose-500 text-white' : 'bg-indigo-600 text-white'}`}>
                黙読 {timer}s
              </span>
            )}
          </div>
          <h3 className={`text-center font-serif font-bold text-slate-900 ${pre2 ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'}`}>{card.title}</h3>
          <p className={`mt-2 font-serif leading-relaxed text-slate-800 ${pre2 ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'}`}>{card.passage}</p>
          {showTranslation && <p className="mt-2 rounded-lg bg-amber-50 p-2 text-xs leading-relaxed text-amber-900">{card.passageJa}</p>}
          {/* 大画面では残りの高さに収まるよう、縦横比 5:3 を保ったまま縮める */}
          {pre2 ? (
            // 準2級: イラストA・B を横に並べる（2枚で縦横比 10:3）
            <div className="mt-3 flex justify-center lg:min-h-[120px] lg:flex-1 lg:[container-type:size]">
              <div className="grid w-full gap-2 sm:grid-cols-2 lg:w-[min(100cqw,calc(100cqh*10/3))]">
                <SceneIllustration scene={card.scene} label="A" />
                {card.sceneB && <SceneIllustration scene={card.sceneB} label="B" />}
              </div>
            </div>
          ) : (
            <div className="mt-3 flex justify-center lg:min-h-[140px] lg:flex-1 lg:[container-type:size]">
              <div className="w-full lg:w-[min(100cqw,calc(100cqh*5/3))]">
                <SceneIllustration scene={card.scene} cardId={card.id} />
              </div>
            </div>
          )}
        </div>
        {/* back */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 p-6 text-center text-white shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="text-5xl font-black tracking-widest opacity-90">英検</div>
          <div className="mt-1 text-lg font-bold tracking-[0.4em] opacity-70">{grade.cardLabel}</div>
          <p className="mt-6 text-sm text-indigo-200">
            カードを裏返しました。
            <br />
            {pre2 ? 'ここからはカードを見ずに、あなたの意見を答える質問です。' : 'ここからは「あなた自身」についての質問です。'}
          </p>
        </div>
      </div>
    </div>
  );
};
