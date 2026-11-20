// 練習モード: 回答中に詰まったら日本語ヒントを1段階ずつ開く
import React from 'react';
import { Lightbulb } from 'lucide-react';
import { HintTarget, buildHints } from '../lib/hints';

interface Props {
  target: HintTarget;
  /** 開いた段階数 */
  shown: number;
  onReveal: () => void;
}

export const HintBox: React.FC<Props> = ({ target, shown, onReveal }) => {
  const steps = buildHints(target);
  const next = steps[shown];
  return (
    <div className="mb-2 rounded-2xl border border-violet-200 bg-violet-50/95 p-2.5 shadow-sm backdrop-blur">
      {shown > 0 && (
        <ol className="mb-1.5 max-h-28 space-y-1 overflow-y-auto">
          {steps.slice(0, shown).map((s, i) => (
            <li key={s.title} className="text-[13px] leading-snug text-slate-800">
              <span className="mr-1 rounded bg-violet-600 px-1 py-0.5 text-[10px] font-black text-white">
                {i + 1} {s.title}
              </span>
              <span className={s.title === '単語の頭文字' ? 'font-mono' : ''}>{s.body}</span>
            </li>
          ))}
        </ol>
      )}
      <div className="flex items-center gap-2">
        <button
          onClick={onReveal}
          disabled={!next}
          className="inline-flex items-center gap-1 rounded-lg bg-violet-600 px-2.5 py-1 text-[12px] font-bold text-white hover:bg-violet-700 disabled:opacity-40"
        >
          <Lightbulb className="h-3.5 w-3.5" />
          {next ? `ヒント${shown + 1}: ${next.title}` : 'ヒントは以上'}
        </button>
        <span className="text-[11px] text-violet-800">
          {shown === 0 ? '詰まったら押す（見ている間は待ってくれる）' : `${shown}/${steps.length} 段階`}
        </span>
      </div>
    </div>
  );
};
