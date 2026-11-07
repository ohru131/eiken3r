import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { practiceStreak, practicedToday, recentAverage, weekCount } from '../lib/stats';
import { Play, Shuffle, GraduationCap, Dumbbell, Mic, Timer, MessageSquare, CheckCircle2, Flame } from 'lucide-react';
import { AppSettings, ExamCard, HistoryRecord, InterviewMode } from '../types';
import { EXAMINERS } from '../data/examiners';
import { PASS_LINE } from '../lib/scoring';

interface Props {
  cards: ExamCard[];
  settings: AppSettings;
  history: HistoryRecord[];
  onSettings: (s: AppSettings) => void;
  onStart: (card: ExamCard) => void;
}

const ProgressPanel: React.FC<{ history: HistoryRecord[]; total: number; passed: number }> = ({ history, total, passed }) => {
  const streak = practiceStreak(history);
  const today = practicedToday(history);
  const week = weekCount(history);
  const avg = recentAverage(history);
  return (
    <div className="w-full rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur lg:w-80">
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-indigo-100">
            <Flame className={`h-3.5 w-3.5 ${streak ? 'text-amber-300' : 'text-indigo-200'}`} /> 連続練習
          </div>
          <div className="text-3xl font-black tabular-nums">
            {streak}
            <span className="ml-0.5 text-sm font-bold opacity-70">日</span>
          </div>
        </div>
        <div className="text-right text-[11px] text-indigo-100">
          <div>
            今週 <span className="text-base font-black text-white">{week}</span> 回
          </div>
          <div>
            直近平均 <span className="text-base font-black text-white">{avg ?? '—'}</span>
            {avg !== null && <span className="opacity-70"> / 33</span>}
          </div>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex justify-between text-[11px] font-bold text-indigo-100">
          <span>合格圏のカード</span>
          <span className="tabular-nums text-white">
            {passed} / {total}
          </span>
        </div>
        <div className="mt-1 h-2 overflow-hidden rounded-full bg-white/15">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-emerald-300 to-teal-200"
            initial={{ width: 0 }}
            animate={{ width: `${(passed / total) * 100}%` }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          />
        </div>
      </div>
      <div className="mt-2.5 text-[11px] text-indigo-100">
        {today
          ? '今日の練習は完了。この調子で続けよう。'
          : streak
            ? `今日1回やれば ${streak + 1}日連続。`
            : 'まずは1枚。今日から記録をつけよう。'}
      </div>
    </div>
  );
};

const LEVEL_LABEL = { basic: '基礎', standard: '標準', challenge: '発展' } as const;
const LEVEL_COLOR = { basic: 'bg-sky-100 text-sky-800', standard: 'bg-indigo-100 text-indigo-800', challenge: 'bg-fuchsia-100 text-fuchsia-800' } as const;

type Status = 'untried' | 'almost' | 'passed';
const STATUS_LABEL: Record<Status, string> = { untried: '未挑戦', almost: 'あと少し', passed: '合格圏' };
const STATUS_BADGE: Record<Status, string> = {
  untried: 'bg-slate-100 text-slate-500 border border-slate-200',
  almost: 'bg-amber-100 text-amber-800 border border-amber-300',
  passed: 'bg-emerald-100 text-emerald-800 border border-emerald-300',
};
const STATUS_CARD: Record<Status, string> = {
  untried: 'border-slate-200 bg-white',
  almost: 'border-amber-300 bg-amber-50/40',
  passed: 'border-emerald-300 bg-emerald-50/40',
};

export const HomeScreen: React.FC<Props> = ({ cards, settings, history, onSettings, onStart }) => {
  const [level, setLevel] = useState<'all' | ExamCard['level']>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | Status>('all');
  const best = useMemo(() => {
    const m: Record<string, number> = {};
    history.forEach((h) => (m[h.cardId] = Math.max(m[h.cardId] ?? 0, h.total)));
    return m;
  }, [history]);
  const attempts = useMemo(() => {
    const m: Record<string, number> = {};
    history.forEach((h) => (m[h.cardId] = (m[h.cardId] ?? 0) + 1));
    return m;
  }, [history]);
  const statusOf = (c: ExamCard): Status => (best[c.id] === undefined ? 'untried' : best[c.id] >= PASS_LINE ? 'passed' : 'almost');
  const byLevel = cards.filter((c) => level === 'all' || c.level === level);
  const statusCount = (st: Status) => byLevel.filter((c) => statusOf(c) === st).length;
  const list = byLevel.filter((c) => statusFilter === 'all' || statusOf(c) === statusFilter);
  const setMode = (mode: InterviewMode) => onSettings({ ...settings, mode });
  const done = Object.keys(best).length;
  const passedCount = Object.values(best).filter((v) => v >= PASS_LINE).length;

  // ランダム: 絞り込み中はその中から。「すべて」のときは 未挑戦 → あと少し → 全カード の順に候補を絞る
  const untried = list.filter((c) => statusOf(c) === 'untried');
  const almost = list.filter((c) => statusOf(c) === 'almost');
  const randomPool = statusFilter !== 'all' ? list : untried.length ? untried : almost.length ? almost : list;
  const randomLabel =
    statusFilter !== 'all'
      ? `「${STATUS_LABEL[statusFilter]}」からランダム`
      : untried.length
        ? `未挑戦からランダム（残り${untried.length}枚）`
        : almost.length
          ? `あと少しのカードからランダム（${almost.length}枚）`
          : 'ランダムで開始';

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-10">
      {/* hero */}
      <section className="flex flex-col gap-5 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-sky-500 p-6 text-white shadow-xl sm:p-8 lg:flex-row lg:items-center">
        <div className="flex-1">
        <div className="text-xs font-bold tracking-widest text-indigo-100">英検3級 二次試験（面接）</div>
        <h2 className="mt-1 text-2xl font-black leading-tight sm:text-3xl">面接の練習をしよう</h2>
        <p className="mt-2 max-w-2xl text-sm text-indigo-50">
          入室から退室まで、本番と同じ順番で面接官が質問します。答え終わって少し待つと、次の質問に進みます。
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-bold">
          {[
            [Mic, 'マイクで回答・自動送信'],
            [Timer, '黙読20秒タイマー'],
            [MessageSquare, 'Pardon? で聞き返し'],
            [CheckCircle2, `${cards.length}枚の問題カード`],
          ].map(([Icon, t], i) => {
            const I = Icon as typeof Mic;
            return (
              <span key={i} className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1">
                <I className="h-3.5 w-3.5" /> {t as string}
              </span>
            );
          })}
        </div>
        </div>
        <ProgressPanel history={history} total={cards.length} passed={passedCount} />
      </section>

      {/* mode + examiner */}
      <section className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-2 text-sm font-black text-slate-900">モード</div>
          <div className="grid grid-cols-2 gap-2">
            <ModeBtn
              active={settings.mode === 'exam'}
              onClick={() => setMode('exam')}
              icon={<GraduationCap className="h-5 w-5" />}
              title="本番モード"
              desc="途中で止まらず最後まで。終了後にまとめて採点と解説"
            />
            <ModeBtn
              active={settings.mode === 'practice'}
              onClick={() => setMode('practice')}
              icon={<Dumbbell className="h-5 w-5" />}
              title="練習モード"
              desc="1問ごとに採点・解説・模範解答。やり直しもOK"
            />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-2 text-sm font-black text-slate-900">面接官</div>
          <div className="grid grid-cols-3 gap-2">
            {EXAMINERS.map((e) => (
              <button
                key={e.id}
                onClick={() => onSettings({ ...settings, examinerId: e.id })}
                className={`rounded-xl border-2 p-2 text-left transition ${
                  settings.examinerId === e.id ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className={`mb-1 h-1.5 w-8 rounded-full bg-gradient-to-r ${e.color}`} />
                <div className="text-xs font-black text-slate-900">{e.name}</div>
                <div className="mt-0.5 text-[10px] leading-snug text-slate-500">{e.description}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* cards */}
      <section>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h3 className="text-base font-black text-slate-900">問題カードを選ぶ</h3>
          <span className="text-xs text-slate-500">
            挑戦済み {done}/{cards.length} · 合格圏 {passedCount}
          </span>
          <button
            onClick={() => randomPool.length && onStart(randomPool[Math.floor(Math.random() * randomPool.length)])}
            disabled={!randomPool.length}
            className="ml-auto inline-flex items-center gap-1 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-700 disabled:opacity-40"
          >
            <Shuffle className="h-3.5 w-3.5" /> {randomLabel}
          </button>
        </div>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <div className="flex gap-1 rounded-xl bg-slate-200/70 p-1 text-xs font-bold">
            {(['all', 'untried', 'almost', 'passed'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`rounded-lg px-2.5 py-1 ${statusFilter === st ? 'bg-white text-slate-900 shadow' : 'text-slate-500'}`}
              >
                {st === 'all' ? `すべて ${byLevel.length}` : `${STATUS_LABEL[st]} ${statusCount(st)}`}
              </button>
            ))}
          </div>
          <div className="ml-auto flex gap-1 rounded-xl bg-slate-200/70 p-1 text-xs font-bold">
            {(['all', 'basic', 'standard', 'challenge'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLevel(l)}
                className={`rounded-lg px-2.5 py-1 ${level === l ? 'bg-white text-slate-900 shadow' : 'text-slate-500'}`}
              >
                {l === 'all' ? '全レベル' : LEVEL_LABEL[l]}
              </button>
            ))}
          </div>
        </div>
        {list.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 p-8 text-center text-sm text-slate-500">
            {statusFilter === 'untried' ? '未挑戦のカードはありません。全部挑戦しました！' : statusFilter === 'almost' ? '「あと少し」のカードはありません。' : '該当するカードがありません。'}
          </div>
        )}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => {
            const st = statusOf(c);
            return (
            <button
              key={c.id}
              onClick={() => onStart(c)}
              className={`group flex flex-col rounded-2xl border-2 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-400 hover:shadow-md ${STATUS_CARD[st]}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-400">#{String(cards.indexOf(c) + 1).padStart(2, '0')}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${LEVEL_COLOR[c.level]}`}>{LEVEL_LABEL[c.level]}</span>
                <span className="text-[10px] text-slate-500">{c.category}</span>
                <span className={`ml-auto shrink-0 rounded-full px-2 py-0.5 text-[10px] font-black ${STATUS_BADGE[st]}`}>
                  {st === 'untried' ? '未挑戦' : `${STATUS_LABEL[st]} ${best[c.id]}点`}
                </span>
              </div>
              <div className="mt-2 font-serif text-lg font-bold text-slate-900">{c.title}</div>
              <div className="text-xs text-slate-500">{c.japaneseTitle}</div>
              {st !== 'untried' && (
                <div className="mt-1 text-[10px] text-slate-500">
                  挑戦 {attempts[c.id]}回{st === 'almost' ? ` · 合格目安まであと${PASS_LINE - best[c.id]}点` : ''}
                </div>
              )}
              <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-indigo-600 opacity-0 transition group-hover:opacity-100">
                <Play className="h-3.5 w-3.5" /> このカードで面接開始
              </div>
            </button>
            );
          })}
        </div>
      </section>

      {history.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-2 text-sm font-black text-slate-900">最近の結果</div>
          <div className="flex items-end gap-1.5 overflow-x-auto pb-1">
            {history
              .slice(0, 20)
              .reverse()
              .map((h) => (
                <div key={h.id} className="flex w-8 shrink-0 flex-col items-center" title={`${h.date} ${h.cardTitle} ${h.total}点`}>
                  <div className="text-[10px] font-bold text-slate-600">{h.total}</div>
                  <div className={`w-5 rounded-t ${h.passed ? 'bg-emerald-500' : 'bg-amber-400'}`} style={{ height: `${(h.total / 33) * 80}px` }} />
                </div>
              ))}
          </div>
        </section>
      )}
    </div>
  );
};

const ModeBtn: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; title: string; desc: string }> = ({
  active,
  onClick,
  icon,
  title,
  desc,
}) => (
  <button
    onClick={onClick}
    className={`rounded-xl border-2 p-3 text-left transition ${active ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'}`}
  >
    <div className={`flex items-center gap-1.5 text-sm font-black ${active ? 'text-indigo-700' : 'text-slate-800'}`}>
      {icon}
      {title}
    </div>
    <div className="mt-1 text-[11px] leading-snug text-slate-500">{desc}</div>
  </button>
);
