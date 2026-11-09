import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Flame, Volume2, RotateCcw, ChevronRight, Pause, Play, Loader2, Lightbulb, AlertTriangle, BookOpen } from 'lucide-react';
import { AnswerRecord, ExamCard, StepFeedback } from '../types';
import { EvalResult } from '../lib/api';
import { ITEM_LABELS } from '../lib/scoring';
import { playSfx } from '../lib/sfx';
import { celebrateSmall } from '../lib/celebrate';
import { FeedbackAction } from '../engine/interview';
import { ModelReading, PronunciationNote, PronunciationView } from './ReadingReview';
import { SceneIllustration } from './SceneIllustration';

interface Props {
  card: ExamCard;
  rec: AnswerRecord;
  evalPromise: Promise<EvalResult>;
  autoAdvance: boolean;
  readModelAnswer: boolean;
  onSpeak: (text: string) => Promise<void>;
  onAction: (a: FeedbackAction) => void;
  /** この問題の直前までの連続高得点（4点以上）数 */
  prevStreak?: number;
}

export const ScoreDots: React.FC<{ score: number; max?: number; animate?: boolean }> = ({ score, max = 5, animate }) => (
  <span className="inline-flex gap-0.5">
    {Array.from({ length: max }).map((_, i) => {
      const cls = `h-2.5 w-2.5 rounded-full ${i < score ? (score >= 4 ? 'bg-emerald-500' : score >= 3 ? 'bg-amber-400' : 'bg-rose-400') : 'bg-slate-200'}`;
      return animate && i < score ? (
        <motion.span key={i} className={cls} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.07, type: 'spring', stiffness: 400, damping: 15 }} />
      ) : (
        <span key={i} className={cls} />
      );
    })}
  </span>
);

const AUTO_SEC = 12;

export const FeedbackPanel: React.FC<Props> = ({ card, rec, evalPromise, autoAdvance, readModelAnswer, onSpeak, onAction, prevStreak = 0 }) => {
  const [fb, setFb] = useState<EvalResult | null>(null);
  const [left, setLeft] = useState(AUTO_SEC);
  const [paused, setPaused] = useState(!autoAdvance);
  const [speakingModel, setSpeakingModel] = useState(false);
  const acted = useRef(false);

  const act = (a: FeedbackAction) => {
    if (acted.current) return;
    acted.current = true;
    playSfx('click');
    onAction(a);
  };

  useEffect(() => {
    let alive = true;
    evalPromise.then(async (r) => {
      if (!alive) return;
      setFb(r);
      playSfx(r.score >= 5 ? 'correct' : r.score >= 3 ? 'good' : 'retry');
      if (r.score >= 5) setTimeout(() => alive && celebrateSmall(0.75, 0.25), 450);
      // 音読はお手本（タイトル＋本文）を必ず読み上げ。その他は満点解答
      const modelText = rec.item === 'reading' ? `${card.title}. ${card.passage}` : r.improvedAnswer;
      if (readModelAnswer && modelText) {
        setSpeakingModel(true);
        await new Promise((res) => setTimeout(res, 700));
        if (alive) await onSpeak(modelText).catch(() => { });
        if (alive) setSpeakingModel(false);
      }
    });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evalPromise]);

  useEffect(() => {
    if (!fb || paused || speakingModel) return;
    if (left <= 0) return act('next');
    const t = setTimeout(() => setLeft((l) => l - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fb, paused, left, speakingModel]);

  const q = rec.item === 'reading' ? null : card[rec.item];
  const models =
    rec.item === 'q5'
      ? [...card.q5.modelAnswers]
      : q
        ? q.modelAnswers
        : [`${card.title}. ${card.passage}`];

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-2.5">
        <div className="text-sm font-black text-slate-800">{ITEM_LABELS[rec.item]} の解説</div>
        {fb && (
          <div className="flex items-center gap-2">
            {fb.score >= 4 && prevStreak + 1 >= 2 && (
              <motion.span
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-2 py-0.5 text-[11px] font-bold text-amber-300"
              >
                <Flame className="h-3 w-3" /> {prevStreak + 1}問連続 高得点
              </motion.span>
            )}
            <ScoreDots score={fb.score} animate />
            <motion.span
              initial={{ scale: 1.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.35 }}
              className={`text-lg font-black tabular-nums ${fb.score === 5 ? 'bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent' : 'text-slate-900'}`}
            >
              {fb.score}/5
            </motion.span>
          </div>
        )}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
        <div className="rounded-xl bg-slate-100 p-3">
          <div className="text-[12px] font-bold text-slate-500">あなたの回答</div>
          <div className="mt-0.5 font-semibold text-slate-900">{rec.answer || '（無回答）'}</div>
          {rec.followUpQuestion && (
            <div className="mt-1.5 text-slate-700">
              <span className="text-[12px] font-bold text-slate-500">{rec.followUpQuestion}</span>
              <div className="font-semibold text-slate-900">{rec.followUpAnswer || '（無回答）'}</div>
            </div>
          )}
        </div>

        {rec.pronunciation && <PronunciationView a={rec.pronunciation} onSpeak={onSpeak} />}
        {!rec.pronunciation && rec.pronunciationNote && <PronunciationNote note={rec.pronunciationNote} />}
        {rec.item === 'reading' && <ModelReading card={card} onSpeak={onSpeak} />}
        {(rec.item === 'q2' || rec.item === 'q3') && (
          <div className="max-w-sm">
            <SceneIllustration scene={card.scene} cardId={card.id} />
          </div>
        )}

        {!fb ? (
          <div className="flex items-center gap-2 py-6 text-slate-500">
            <Loader2 className="h-5 w-5 animate-spin" /> 採点中…
          </div>
        ) : (
          <FeedbackBody fb={fb} onSpeak={onSpeak} />
        )}

        {q && (
          <div className="space-y-2 rounded-xl border border-indigo-100 bg-indigo-50/60 p-3">
            <div className="flex items-center gap-1 text-xs font-black text-indigo-900">
              <BookOpen className="h-3.5 w-3.5" /> 解説
              <span className="ml-1 rounded bg-indigo-600 px-1.5 py-0.5 text-[11px] font-bold text-white">{q.point}</span>
            </div>
            <p className="text-[14px] leading-relaxed text-slate-800">{q.explanation}</p>
            <div className="text-[12px] text-slate-500">{q.ja}</div>
            <ModelList title="模範解答" items={models} onSpeak={onSpeak} />
            {rec.item === 'q5' && (
              <>
                <ModelList title={`Yes の後「${card.q5.followUpYes}」への答え方`} items={card.q5.modelAnswersYes} onSpeak={onSpeak} />
                <ModelList title={`No の後「${card.q5.followUpNo}」への答え方`} items={card.q5.modelAnswersNo} onSpeak={onSpeak} />
              </>
            )}
            {q.commonMistakes && q.commonMistakes.length > 0 && (
              <div>
                <div className="flex items-center gap-1 text-[12px] font-bold text-rose-700">
                  <AlertTriangle className="h-3 w-3" /> よくある間違い
                </div>
                <ul className="ml-4 list-disc text-[13px] text-slate-700">
                  {q.commonMistakes.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 border-t border-slate-100 p-3">
        <button
          onClick={() => act('retry')}
          disabled={rec.item === 'reading'}
          className="inline-flex items-center gap-1 rounded-xl border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40"
        >
          <RotateCcw className="h-3.5 w-3.5" /> もう一度答える
        </button>
        {fb && (
          <button onClick={() => setPaused((p) => !p)} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100" title="自動進行を一時停止">
            {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
        )}
        <button
          onClick={() => act('next')}
          className="relative ml-auto inline-flex items-center gap-1 overflow-hidden rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700"
        >
          {fb && !paused && !speakingModel && (
            <span className="absolute inset-y-0 left-0 bg-white/20 transition-all duration-1000 ease-linear" style={{ width: `${((AUTO_SEC - left) / AUTO_SEC) * 100}%` }} />
          )}
          <span className="relative">次へ{fb && !paused && !speakingModel ? ` (${left})` : ''}</span>
          <ChevronRight className="relative h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export const FeedbackBody: React.FC<{ fb: StepFeedback & { error?: string }; onSpeak: (t: string) => Promise<void> }> = ({ fb, onSpeak }) => (
  <div className="space-y-2.5">
    <div className="flex items-center gap-2">
      <span
        className={`rounded-full px-2.5 py-0.5 text-xs font-black ${fb.score >= 5 ? 'bg-emerald-100 text-emerald-800' : fb.score >= 3 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
          }`}
      >
        {fb.verdict}
      </span>
      <span className="text-[11px] text-slate-400">{fb.source === 'claude' ? 'Claude AI 採点' : '簡易採点（APIキー未設定）'}</span>
      {fb.error && <span className="text-[11px] text-rose-500">※AI採点失敗: {fb.error}</span>}
    </div>
    <p className="text-slate-800">
      <span className="font-bold text-emerald-700">◎ </span>
      {fb.goodPoints}
    </p>
    <p className="text-slate-800">
      <span className="font-bold text-rose-600">△ </span>
      {fb.corrections}
    </p>
    <div className="flex items-start gap-2 rounded-lg bg-emerald-50 p-2.5">
      <button onClick={() => onSpeak(fb.improvedAnswer)} className="mt-0.5 shrink-0 rounded-full bg-emerald-600 p-1.5 text-white hover:bg-emerald-700">
        <Volume2 className="h-3.5 w-3.5" />
      </button>
      <div>
        <div className="text-[11px] font-bold text-emerald-700">こう言えば満点</div>
        <div className="font-semibold text-emerald-950">{fb.improvedAnswer}</div>
      </div>
    </div>
    <p className="flex items-start gap-1 text-[13px] text-slate-600">
      <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
      {fb.tip}
    </p>
  </div>
);

const ModelList: React.FC<{ title: string; items: string[]; onSpeak: (t: string) => Promise<void> }> = ({ title, items, onSpeak }) =>
  items?.length ? (
    <div>
      <div className="text-[12px] font-bold text-indigo-800">{title}</div>
      <ul className="mt-0.5 space-y-0.5">
        {items.map((m, i) => (
          <li key={i} className="flex items-start gap-1.5">
            <button onClick={() => onSpeak(m)} className="mt-0.5 shrink-0 text-indigo-500 hover:text-indigo-800">
              <Volume2 className="h-3.5 w-3.5" />
            </button>
            <span className="text-slate-900">{m}</span>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
