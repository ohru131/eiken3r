// 学習記録のカレンダー。練習した日に印をつけ、日付を選ぶとその日の結果一覧 → 詳細の振り返りへ
import React, { useMemo, useState } from 'react';
import { ArrowLeft, CalendarDays, ChevronLeft, ChevronRight, Database, Eye, Flame } from 'lucide-react';
import { Grade, HistoryRecord } from '../types';
import { GRADES, GRADE_ORDER, historyGrade } from '../lib/grade';
import { listDetailIds, storageUsage } from '../lib/sessionLog';
import { practiceStreak } from '../lib/stats';
import { PASS_LINE } from '../lib/scoring';

interface Props {
  /** 全級の記録（新しい順） */
  history: HistoryRecord[];
  /** 選択中の日（YYYY-MM-DD） */
  day: string | null;
  onDayChange: (day: string | null) => void;
  /** 詳細を開く。開けなければ false */
  onOpen: (h: HistoryRecord) => boolean;
  onBack: () => void;
  cardExists: (cardId: string) => boolean;
}

const pad = (n: number) => String(n).padStart(2, '0');
const tsOf = (h: HistoryRecord) => Number(h.id) || 0;
export const dayKey = (t: number) => {
  const d = new Date(t);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
const monthKey = (t: number) => dayKey(t).slice(0, 7);
const WEEK = ['日', '月', '火', '水', '木', '金', '土'];

export const HistoryScreen: React.FC<Props> = ({ history, day, onDayChange, onOpen, onBack, cardExists }) => {
  const [grade, setGrade] = useState<'all' | Grade>('all');
  const [missing, setMissing] = useState<string | null>(null);
  const list = useMemo(() => (grade === 'all' ? history : history.filter((h) => historyGrade(h) === grade)), [history, grade]);
  const detailIds = useMemo(() => new Set(listDetailIds()), [history]);
  const usage = useMemo(() => storageUsage(), [history]);

  const byDay = useMemo(() => {
    const m = new Map<string, HistoryRecord[]>();
    list.forEach((h) => {
      const k = dayKey(tsOf(h));
      m.set(k, [...(m.get(k) ?? []), h]);
    });
    return m;
  }, [list]);

  const latest = history[0] ? tsOf(history[0]) : Date.now();
  const [month, setMonth] = useState(() => (day ? day.slice(0, 7) : monthKey(latest)));
  const [y, mo] = month.split('-').map(Number);
  const first = new Date(y, mo - 1, 1);
  const daysInMonth = new Date(y, mo, 0).getDate();
  const cells: (number | null)[] = [...Array(first.getDay()).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);
  const shiftMonth = (d: number) => {
    const t = new Date(y, mo - 1 + d, 1);
    setMonth(`${t.getFullYear()}-${pad(t.getMonth() + 1)}`);
  };
  const today = dayKey(Date.now());

  const monthRecs = list.filter((h) => monthKey(tsOf(h)) === month);
  const monthDays = new Set(monthRecs.map((h) => dayKey(tsOf(h)))).size;
  const monthAvg = monthRecs.length ? Math.round((monthRecs.reduce((a, h) => a + h.total, 0) / monthRecs.length) * 10) / 10 : null;
  const streak = practiceStreak(history);

  const selected = day ? (byDay.get(day) ?? []).slice().sort((a, b) => tsOf(a) - tsOf(b)) : [];

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4 pb-10">
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={onBack} className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-bold text-slate-600 hover:bg-slate-200">
          <ArrowLeft className="h-4 w-4" /> カード一覧
        </button>
        <h2 className="flex items-center gap-1.5 text-lg font-black text-slate-900">
          <CalendarDays className="h-5 w-5 text-indigo-600" /> 練習の記録
        </h2>
        <div className="ml-auto flex gap-1 rounded-xl bg-slate-200/70 p-1 text-xs font-bold">
          {(['all', ...GRADE_ORDER] as const).map((g) => (
            <button key={g} onClick={() => setGrade(g)} className={`rounded-lg px-2.5 py-1 ${grade === g ? 'bg-white text-slate-900 shadow' : 'text-slate-500'}`}>
              {g === 'all' ? 'すべての級' : GRADES[g].label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <button onClick={() => shiftMonth(-1)} aria-label="前の月" className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="text-base font-black tabular-nums text-slate-900">
            {y}年{mo}月
          </div>
          <button onClick={() => shiftMonth(1)} aria-label="次の月" className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100">
            <ChevronRight className="h-5 w-5" />
          </button>
          <button onClick={() => setMonth(monthKey(Date.now()))} className="rounded-lg border border-slate-200 px-2 py-0.5 text-xs font-bold text-slate-600 hover:bg-slate-50">
            今月
          </button>
          <div className="ml-auto text-right text-[12px] text-slate-500">
            練習 <span className="font-black text-slate-900">{monthDays}</span>日 · <span className="font-black text-slate-900">{monthRecs.length}</span>回
            {monthAvg !== null && (
              <>
                {' '}
                · 平均 <span className="font-black text-slate-900">{monthAvg}</span>
              </>
            )}
            {streak > 0 && (
              <span className="ml-2 inline-flex items-center gap-0.5 font-bold text-amber-600">
                <Flame className="h-3.5 w-3.5" /> {streak}日連続
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {WEEK.map((w, i) => (
            <div key={w} className={`pb-1 text-[11px] font-bold ${i === 0 ? 'text-rose-500' : i === 6 ? 'text-sky-600' : 'text-slate-400'}`}>
              {w}
            </div>
          ))}
          {cells.map((d, i) => {
            if (d === null) return <div key={i} />;
            const k = `${month}-${pad(d)}`;
            const recs = byDay.get(k) ?? [];
            const best = recs.length ? Math.max(...recs.map((h) => h.total)) : null;
            const isSel = k === day;
            const tone = best === null ? '' : best >= PASS_LINE ? 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200' : 'bg-amber-100 text-amber-900 hover:bg-amber-200';
            return (
              <button
                key={i}
                disabled={!recs.length}
                onClick={() => {
                  setMissing(null);
                  onDayChange(isSel ? null : k);
                }}
                className={`flex h-12 flex-col items-center justify-center rounded-xl text-sm transition sm:h-14 ${
                  recs.length ? `${tone} font-black` : 'text-slate-400'
                } ${isSel ? 'ring-2 ring-indigo-600 ring-offset-1' : k === today ? 'ring-1 ring-slate-400' : ''}`}
              >
                <span className="tabular-nums">{d}</span>
                {recs.length > 0 && (
                  <span className="mt-0.5 text-[10px] font-bold leading-none opacity-80">
                    {recs.length}回{best !== null && <span className="hidden sm:inline"> · {best}点</span>}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-1">
            <span className="h-3 w-3 rounded bg-emerald-100" /> 合格圏（{PASS_LINE}点以上）の回あり
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-3 w-3 rounded bg-amber-100" /> 練習した日
          </span>
          <span>日付をタップすると、その日の結果を表示</span>
        </div>
      </div>

      {day && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-2 text-sm font-black text-slate-900">
            {Number(day.slice(5, 7))}月{Number(day.slice(8))}日の練習（{selected.length}回）
          </div>
          {selected.length === 0 && <div className="text-sm text-slate-500">この日の記録はありません。</div>}
          <div className="divide-y divide-slate-100">
            {selected.map((h) => {
              const t = new Date(tsOf(h));
              const has = detailIds.has(h.id) && cardExists(h.cardId);
              return (
                <div key={h.id} className="flex flex-wrap items-center gap-2 py-2.5">
                  <span className="w-11 shrink-0 text-xs font-bold tabular-nums text-slate-500">
                    {pad(t.getHours())}:{pad(t.getMinutes())}
                  </span>
                  <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-black text-slate-600">{GRADES[historyGrade(h)].label}</span>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-black ${
                      h.mode === 'exam' ? 'bg-slate-900 text-white' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {h.mode === 'exam' ? '本番' : h.quick ? 'クイック' : '練習'}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-serif text-sm font-bold text-slate-900">{h.cardTitle}</span>
                  <span className={`shrink-0 text-sm font-black tabular-nums ${h.passed ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {h.total}
                    <span className="text-[11px] font-normal text-slate-400">/33</span>
                  </span>
                  {has ? (
                    <button
                      onClick={() => {
                        if (!onOpen(h)) setMissing(h.id);
                      }}
                      className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-indigo-600 px-2.5 py-1 text-xs font-bold text-white hover:bg-indigo-700"
                    >
                      <Eye className="h-3.5 w-3.5" /> 振り返る
                    </button>
                  ) : (
                    <span className="shrink-0 text-[11px] text-slate-400" title="保存容量を空けるため古い詳細は自動で削除されます。この機能の追加前の記録にも詳細はありません。">
                      詳細なし
                    </span>
                  )}
                  {missing === h.id && <div className="w-full text-[12px] text-rose-600">詳細を読み込めませんでした（削除済みの可能性）。</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {history.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-8 text-center text-sm text-slate-500">
          まだ記録がありません。面接を1回最後までやると、ここに残ります。
        </div>
      )}

      <div className="flex items-start gap-2 rounded-xl bg-slate-200/50 px-3 py-2 text-[12px] text-slate-500">
        <Database className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <span>
          記録はこのブラウザ内（localStorage）にのみ保存。使用量 約{Math.max(1, Math.round(usage.bytes / 1024))}KB · 詳細つきの記録 {usage.details}件。
          容量がいっぱいになると、古い記録の詳細（回答・解説）から自動で削除し、日付と点数は残す。
        </span>
      </div>
    </div>
  );
};
