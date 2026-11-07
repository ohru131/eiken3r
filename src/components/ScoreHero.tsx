import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Trophy, Flame, Target, Star } from 'lucide-react';
import { ExamCard, FinalReport, ScoredItem } from '../types';
import { ITEM_LABELS, PASS_LINE } from '../lib/scoring';
import { CardProgress } from '../lib/stats';
import { celebratePass, celebrateSmall } from '../lib/celebrate';
import { playSfx } from '../lib/sfx';

const ORDER: ScoredItem[] = ['reading', 'q1', 'q2', 'q3', 'q4', 'q5'];

function useCountUp(target: number, ms = 1100, delay = 250) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / ms));
      setV(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms, delay]);
  return v;
}

export interface Achievement {
  icon: React.ReactNode;
  text: string;
  tone: 'gold' | 'green' | 'blue';
}

export function buildAchievements(report: FinalReport, progress: CardProgress | null, streak: number, passedCards: number, totalCards: number): Achievement[] {
  const a: Achievement[] = [];
  if (progress) {
    if (progress.prevBest !== null && report.total > progress.prevBest)
      a.push({ icon: <TrendingUp className="h-3.5 w-3.5" />, text: `自己ベスト更新 +${report.total - progress.prevBest}点`, tone: 'gold' });
    if (report.passed && !progress.wasPassed)
      a.push({
        icon: <Trophy className="h-3.5 w-3.5" />,
        text: progress.attempts === 0 ? '初挑戦で合格圏' : `${progress.attempts + 1}回目で合格圏に到達`,
        tone: 'green',
      });
  }
  const perfect = ORDER.filter((k) => report.scores[k] === 5).length;
  if (perfect >= 3) a.push({ icon: <Star className="h-3.5 w-3.5" />, text: `満点の設問 ×${perfect}`, tone: 'gold' });
  if (report.passed) a.push({ icon: <Target className="h-3.5 w-3.5" />, text: `合格圏のカード ${passedCards}/${totalCards}`, tone: 'blue' });
  if (streak >= 2) a.push({ icon: <Flame className="h-3.5 w-3.5" />, text: `${streak}日連続で練習中`, tone: 'gold' });
  return a;
}

const TONE = {
  gold: 'border-amber-300/40 bg-amber-400/15 text-amber-200',
  green: 'border-emerald-300/40 bg-emerald-400/15 text-emerald-200',
  blue: 'border-sky-300/40 bg-sky-400/15 text-sky-200',
};

export const ScoreHero: React.FC<{ card: ExamCard; report: FinalReport; achievements: Achievement[] }> = ({ card, report, achievements }) => {
  const shown = useCountUp(report.total);
  const pct = shown / 33;
  const newBest = achievements.some((x) => x.tone === 'gold' && x.text.startsWith('自己ベスト'));

  useEffect(() => {
    const t = setTimeout(() => {
      if (report.passed) {
        celebratePass();
        playSfx('fanfare');
      } else if (newBest) {
        celebrateSmall(0.3, 0.35);
        playSfx('good');
      } else playSfx('chime');
    }, 1350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 p-6 text-white shadow-xl sm:p-8">
      {/* 背景の光 */}
      <motion.div
        className={`pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full blur-3xl ${report.passed ? 'bg-emerald-500/25' : 'bg-indigo-500/25'}`}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4 }}
      />
      <div className="relative flex flex-col items-center gap-6 sm:flex-row">
        <div className="relative h-40 w-40 shrink-0">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke={report.passed ? '#34d399' : '#818cf8'}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={327}
              strokeDashoffset={327 * (1 - pct)}
              style={{ filter: `drop-shadow(0 0 6px ${report.passed ? '#34d39988' : '#818cf888'})` }}
            />
            <circle cx="60" cy="60" r="52" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="1.5 325.5" strokeDashoffset={-327 * (PASS_LINE / 33)} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-black tabular-nums tracking-tight">{shown}</div>
            <div className="text-xs opacity-60">/ 33</div>
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="text-xs font-bold tracking-widest text-slate-400">{card.title}</div>
          <motion.div
            initial={{ opacity: 0, y: 8, letterSpacing: '0.3em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.02em' }}
            transition={{ delay: 1.3, duration: 0.6, ease: 'easeOut' }}
            className={`mt-1 text-3xl font-black sm:text-4xl ${
              report.passed ? 'bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-transparent' : 'text-indigo-200'
            }`}
          >
            {report.passed ? 'PASS LINE CLEAR' : `あと ${PASS_LINE - report.total} 点`}
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-1 text-sm text-slate-300">
            {report.passed
              ? `合格目安 ${PASS_LINE}点を ${report.total - PASS_LINE}点 上回りました。`
              : `合格目安 ${PASS_LINE}点まで、あと少し。解説を見てもう一度挑戦しよう。`}
          </motion.p>

          {achievements.length > 0 && (
            <div className="mt-3 flex flex-wrap justify-center gap-1.5 sm:justify-start">
              {achievements.map((a, i) => (
                <motion.span
                  key={a.text}
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.7 + i * 0.15, duration: 0.35 }}
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[12px] font-bold ${TONE[a.tone]}`}
                >
                  {a.icon}
                  {a.text}
                </motion.span>
              ))}
            </div>
          )}

          <div className="mt-4 grid grid-cols-4 gap-2 text-center sm:grid-cols-7">
            {[...ORDER.map((k) => ({ k, label: ITEM_LABELS[k].split(' ')[0], v: report.scores[k], max: 5 })), { k: 'att', label: '態度', v: report.attitude, max: 3 }].map(
              (x, i) => (
                <motion.div
                  key={x.k}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className={`rounded-lg px-1 py-1.5 ${x.v === x.max ? 'bg-amber-400/15 ring-1 ring-amber-300/40' : 'bg-white/10'}`}
                >
                  <div className="text-[11px] opacity-60">{x.label}</div>
                  <div className={`text-lg font-black ${x.v === x.max ? 'text-amber-200' : ''}`}>
                    {x.v}
                    <span className="text-[11px] font-normal opacity-50">/{x.max}</span>
                  </div>
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
