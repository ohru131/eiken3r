import React, { useState } from 'react';
import { Award, RotateCcw, Home, ChevronDown, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { AnswerRecord, ExamCard, FinalReport, ScoredItem } from '../types';
import { ITEM_LABELS, PASS_LINE } from '../lib/scoring';
import { FeedbackBody, ScoreDots } from './FeedbackPanel';
import { ModelReading, PronunciationView } from './ReadingReview';
import { Achievement, ScoreHero } from './ScoreHero';

interface Props {
  card: ExamCard;
  records: AnswerRecord[];
  report: FinalReport | null;
  aiPending: boolean;
  onSpeak: (t: string) => Promise<void>;
  onRetry: () => void;
  onNext: () => void;
  onHome: () => void;
  achievements: Achievement[];
}

const ORDER: ScoredItem[] = ['reading', 'q1', 'q2', 'q3', 'q4', 'q5'];

export const ReportView: React.FC<Props> = ({ card, records, report, aiPending, onSpeak, onRetry, onNext, onHome, achievements }) => {
  const [open, setOpen] = useState<ScoredItem | null>(null);
  if (!report) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-slate-600">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
        <div className="font-bold">採点を集計しています…</div>
      </div>
    );
  }
  return (
    <div className="mx-auto w-full max-w-4xl space-y-4 pb-10">
      <ScoreHero card={card} report={report} achievements={achievements} />

      {/* summary */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-2 flex items-center gap-2 text-sm font-black text-slate-900">
          <Sparkles className="h-4 w-4 text-indigo-600" /> 総合講評
          {aiPending && (
            <span className="inline-flex items-center gap-1 text-xs font-normal text-slate-400">
              <Loader2 className="h-3 w-3 animate-spin" /> Claude が講評を作成中…
            </span>
          )}
        </div>
        <p className="text-sm leading-relaxed text-slate-800">{report.summary}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-emerald-50 p-3">
            <div className="text-xs font-black text-emerald-800">良かった点</div>
            <ul className="ml-4 mt-1 list-disc space-y-0.5 text-[13px] text-emerald-950">
              {report.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-amber-50 p-3">
            <div className="text-xs font-black text-amber-800">伸ばすポイント</div>
            <ul className="ml-4 mt-1 list-disc space-y-0.5 text-[13px] text-amber-950">
              {report.improvements.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-3 rounded-xl bg-indigo-50 p-3 text-[13px] text-indigo-950">
          <span className="font-black">次の練習: </span>
          {report.nextSteps}
        </div>
      </div>

      {/* per-question */}
      <div className="space-y-2">
        <div className="px-1 text-sm font-black text-slate-900">設問ごとの振り返り</div>
        {ORDER.map((k) => {
          const rec = records.find((r) => r.item === k);
          const q = k === 'reading' ? null : card[k];
          const isOpen = open === k;
          return (
            <div key={k} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <button onClick={() => setOpen(isOpen ? null : k)} className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-slate-50">
                <div className="w-28 shrink-0 text-xs font-black text-slate-700">{ITEM_LABELS[k]}</div>
                <div className="min-w-0 flex-1 truncate text-sm text-slate-600">{[rec?.answer, rec?.followUpAnswer].filter(Boolean).join(' / ') || '（無回答）'}</div>
                <ScoreDots score={report.scores[k]} />
                <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="space-y-3 border-t border-slate-100 p-4 text-sm">
                  <div>
                    <div className="text-[11px] font-bold text-slate-500">質問</div>
                    <div className="font-semibold text-slate-900">{q ? q.text : 'Please read the passage aloud.'}</div>
                    {q && <div className="text-xs text-slate-500">{q.ja}</div>}
                  </div>
                  <div className="rounded-lg bg-slate-100 p-2.5">
                    <div className="text-[11px] font-bold text-slate-500">あなたの回答</div>
                    <div className="text-slate-900">{rec?.answer || '（無回答）'}</div>
                    {rec?.followUpQuestion && (
                      <div className="mt-1 text-slate-900">
                        <span className="text-[11px] text-slate-500">{rec.followUpQuestion} → </span>
                        {rec.followUpAnswer || '（無回答）'}
                      </div>
                    )}
                  </div>
                  {rec?.pronunciation && <PronunciationView a={rec.pronunciation} onSpeak={onSpeak} />}
                  {rec?.feedback && <FeedbackBody fb={rec.feedback} onSpeak={onSpeak} />}
                  {k === 'reading' && <ModelReading card={card} onSpeak={onSpeak} />}
                  {q && (
                    <div className="rounded-lg bg-indigo-50 p-3 text-[13px]">
                      <div className="text-xs font-black text-indigo-900">解説（{q.point}）</div>
                      <p className="mt-1 text-slate-800">{q.explanation}</p>
                      <div className="mt-1 text-[11px] font-bold text-indigo-800">模範解答</div>
                      <ul className="ml-4 list-disc">
                        {q.modelAnswers.map((m, i) => (
                          <li key={i}>
                            <button className="text-left hover:text-indigo-700" onClick={() => onSpeak(m)}>
                              {m} 🔊
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-2 pt-2">
        <button onClick={onRetry} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50">
          <RotateCcw className="h-4 w-4" /> 同じカードでもう一度
        </button>
        <button onClick={onNext} className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-700">
          次のカードへ <ArrowRight className="h-4 w-4" />
        </button>
        <button onClick={onHome} className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-100">
          <Home className="h-4 w-4" /> カード一覧
        </button>
      </div>
      <div className="flex justify-center">
        <Award className="h-5 w-5 text-slate-300" />
      </div>
    </div>
  );
};
