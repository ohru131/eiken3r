import React from 'react';
import { ASPECTS, AspectKey, AspectResult } from '../lib/aspects';

interface Props {
  current: AspectResult;
  /** 比較用（前回の同じ級の回） */
  previous?: { values: Record<AspectKey, number>; label: string } | null;
}

const SIZE = 260;
const C = SIZE / 2;
const R = 80;

const point = (i: number, v: number) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / ASPECTS.length;
  const r = (Math.max(0, Math.min(5, v)) / 5) * R;
  return [C + r * Math.cos(a), C + r * Math.sin(a)] as const;
};
const poly = (vals: Record<AspectKey, number>) => ASPECTS.map((a, i) => point(i, vals[a.key]).join(',')).join(' ');

/** 観点別スコアのレーダーチャート（発音・流暢さ・文法・語彙・内容・態度） */
export const AspectRadar: React.FC<Props> = ({ current, previous }) => {
  const v = current.values;
  const weakest = [...ASPECTS].sort((a, b) => v[a.key] - v[b.key])[0];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-baseline gap-2">
        <div className="text-sm font-black text-slate-900">観点別スコア</div>
        <div className="text-[12px] text-slate-500">各5点。外側ほど良い</div>
        {current.estimated && <div className="text-[11px] text-amber-700">※文法・語彙・内容は AI 採点時に個別評価（いまは設問の点数から推定）</div>}
      </div>
      <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-60 w-60 shrink-0" role="img" aria-label={ASPECTS.map((a) => `${a.label} ${v[a.key]}点`).join('、')}>
          {[1, 2, 3, 4, 5].map((lv) => (
            <polygon key={lv} points={ASPECTS.map((_, i) => point(i, lv).join(',')).join(' ')} fill={lv === 5 ? '#f8fafc' : 'none'} stroke="#e2e8f0" strokeWidth={1} />
          ))}
          {ASPECTS.map((_, i) => {
            const [x, y] = point(i, 5);
            return <line key={i} x1={C} y1={C} x2={x} y2={y} stroke="#e2e8f0" strokeWidth={1} />;
          })}
          {previous && <polygon points={poly(previous.values)} fill="rgba(148,163,184,0.15)" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 3" />}
          <polygon points={poly(v)} fill="rgba(79,70,229,0.22)" stroke="#4f46e5" strokeWidth={2} />
          {ASPECTS.map((a, i) => {
            const [x, y] = point(i, v[a.key]);
            return <circle key={a.key} cx={x} cy={y} r={3.5} fill="#4f46e5" />;
          })}
          {ASPECTS.map((a, i) => {
            const [x, y] = point(i, 6.5);
            return (
              <text key={a.key} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="fill-slate-700 text-[12px] font-bold">
                {a.label}
              </text>
            );
          })}
        </svg>
        <div className="w-full min-w-0 flex-1 space-y-1.5">
          {ASPECTS.map((a) => {
            const diff = previous ? Math.round((v[a.key] - previous.values[a.key]) * 10) / 10 : 0;
            return (
              <div key={a.key} title={a.desc} className="flex items-center gap-2 text-[13px]">
                <span className="w-12 shrink-0 font-bold text-slate-700">{a.label}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${v[a.key] >= 4 ? 'bg-emerald-500' : v[a.key] >= 3 ? 'bg-amber-400' : 'bg-rose-400'}`} style={{ width: `${(v[a.key] / 5) * 100}%` }} />
                </div>
                <span className="w-8 shrink-0 text-right font-black tabular-nums text-slate-800">{v[a.key].toFixed(1)}</span>
                {previous && (
                  <span className={`w-10 shrink-0 text-right text-[11px] font-bold tabular-nums ${diff > 0 ? 'text-emerald-600' : diff < 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                    {diff > 0 ? `+${diff}` : diff < 0 ? diff : '±0'}
                  </span>
                )}
              </div>
            );
          })}
          <div className="pt-1 text-[12px] text-slate-500">
            {previous && <span className="mr-2 inline-flex items-center gap-1"><span className="inline-block h-0 w-4 border-t-2 border-dashed border-slate-400" /> {previous.label}</span>}
            いちばん伸ばしたいのは <span className="font-bold text-indigo-700">{weakest.label}</span>：{weakest.desc}
          </div>
        </div>
      </div>
    </div>
  );
};
