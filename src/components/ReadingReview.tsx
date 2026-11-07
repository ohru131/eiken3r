import React from 'react';
import { Volume2, Mic2 } from 'lucide-react';
import { ExamCard, ReadingAssessment } from '../types';

const WORD_STYLE = {
  good: 'text-slate-900',
  fair: 'bg-amber-100 text-amber-900 rounded px-0.5',
  poor: 'bg-rose-100 text-rose-800 rounded px-0.5 underline decoration-wavy decoration-rose-400',
  omitted: 'text-slate-400 line-through',
} as const;

/** お手本音読（タイトル＋本文）を読み上げるブロック */
export const ModelReading: React.FC<{ card: ExamCard; onSpeak: (t: string) => Promise<void> }> = ({ card, onSpeak }) => (
  <div className="rounded-xl border border-sky-200 bg-sky-50 p-3">
    <div className="mb-1.5 flex items-center gap-2">
      <button
        onClick={() => onSpeak(`${card.title}. ${card.passage}`)}
        className="inline-flex items-center gap-1 rounded-full bg-sky-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-sky-700"
      >
        <Volume2 className="h-3.5 w-3.5" /> お手本音読を聞く
      </button>
      <span className="text-[11px] text-sky-800">区切りと強弱をまねして、もう一度声に出してみましょう</span>
    </div>
    <div className="font-serif text-[15px] leading-relaxed text-slate-900">
      <span className="font-bold">{card.title}.</span> {card.passage}
    </div>
  </div>
);

const Bar: React.FC<{ label: string; value: number | null }> = ({ label, value }) => (
  <div>
    <div className="flex justify-between text-[11px] font-bold text-slate-600">
      <span>{label}</span>
      <span className="tabular-nums text-slate-900">{value ?? '—'}</span>
    </div>
    <div className="mt-0.5 h-1.5 overflow-hidden rounded-full bg-slate-200">
      <div
        className={`h-full rounded-full ${value === null ? '' : value >= 80 ? 'bg-emerald-500' : value >= 60 ? 'bg-amber-400' : 'bg-rose-400'}`}
        style={{ width: `${value ?? 0}%` }}
      />
    </div>
  </div>
);

/** Azure 発音評価の結果表示（単語ごとの色分け・タップで発音を聞ける） */
export const PronunciationView: React.FC<{ a: ReadingAssessment; onSpeak: (t: string) => Promise<void> }> = ({ a, onSpeak }) => (
  <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-3">
    <div className="mb-2 flex items-center gap-1.5 text-xs font-black text-violet-900">
      <Mic2 className="h-3.5 w-3.5" /> 発音評価（Azure）
      <span className="ml-auto rounded-full bg-violet-600 px-2 py-0.5 text-[11px] text-white">総合 {a.overall}</span>
    </div>
    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-4">
      <Bar label="発音の正確さ" value={a.accuracy} />
      <Bar label="流暢さ" value={a.fluency} />
      <Bar label="読み切り" value={a.completeness} />
      <Bar label="抑揚・リズム" value={a.prosody} />
    </div>
    <div className="mt-3 font-serif text-[15px] leading-loose">
      {a.words.map((w, i) => (
        <React.Fragment key={i}>
          <button
            onClick={() => onSpeak(w.word.replace(/[^A-Za-z']/g, ''))}
            title={w.accuracy === null ? '読み落とし' : `正確さ ${w.accuracy}`}
            className={`${WORD_STYLE[w.status]} hover:outline hover:outline-1 hover:outline-violet-400`}
          >
            {w.word}
          </button>{' '}
        </React.Fragment>
      ))}
    </div>
    <div className="mt-1.5 flex flex-wrap gap-3 text-[10px] text-slate-500">
      <span>
        <span className="rounded bg-amber-100 px-1">黄</span> やや不明瞭
      </span>
      <span>
        <span className="rounded bg-rose-100 px-1">赤</span> 発音を直したい語
      </span>
      <span className="line-through">灰</span> 読み落とし
      <span>単語をタップすると発音を聞けます</span>
    </div>
    {a.insertions.length > 0 && <div className="mt-1 text-[11px] text-slate-500">本文にない語: {a.insertions.join(', ')}</div>}
  </div>
);

/** 発音評価ができなかった時の理由表示 */
export const PronunciationNote: React.FC<{ note: string }> = ({ note }) => (
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-[12px] text-amber-900">
    <div className="flex items-center gap-1 font-black">
      <Mic2 className="h-3.5 w-3.5" /> 発音評価（Azure）ができませんでした
    </div>
    <div className="mt-0.5">{note}</div>
  </div>
);
