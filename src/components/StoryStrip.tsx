import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { ExamCard, Story } from '../types';
import { panelImage } from '../lib/grade';
import { SceneIllustration } from './SceneIllustration';

/** 2級 No.2 の3コマ漫画。書き出しの1文・コマ上の言葉（矢印）・セリフは文字で表示し、絵には文字を入れない */
export const StoryStrip: React.FC<{ card: Pick<ExamCard, 'id'>; story: Story; className?: string }> = ({ card, story, className = '' }) => (
  <div className={className}>
    <div className="rounded-lg border border-slate-300 bg-white px-3 py-1.5">
      <div className="text-[11px] font-bold text-slate-500">Your story should begin with this sentence:</div>
      <div className="font-serif text-[15px] font-bold leading-snug text-slate-900">{story.firstSentence}</div>
    </div>
    <div className="mt-2 grid items-start gap-2 sm:grid-cols-3">
      {story.panels.map((p, i) => (
        <div key={i} className="flex min-w-0 flex-col">
          <div className="mb-1 flex items-end gap-1 sm:min-h-[2.5rem]">
            {i > 0 && <ArrowRight className="h-4 w-4 shrink-0 text-slate-700" aria-hidden />}
            {p.caption && (
              <span className="rounded border-2 border-slate-800 bg-white px-1.5 py-0.5 font-serif text-[12px] font-bold leading-tight text-slate-900">{p.caption}</span>
            )}
          </div>
          <SceneIllustration scene={{ ...p.scene, image: p.scene.image ?? panelImage(card, i) }} label={String(i + 1)} aspect="panel" />
          {p.speech && (
            <div className="mt-1 flex items-start gap-1 rounded-lg border border-slate-300 bg-white px-2 py-1 text-[13px] leading-snug text-slate-900">
              <MessageCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-600" aria-hidden />
              <span>
                <span className="font-bold">{p.speech.speaker}:</span> <span className="font-serif">“{p.speech.text}”</span>
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);
