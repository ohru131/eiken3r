import React, { useEffect, useRef, useState } from 'react';
import { Award, RotateCcw, Home, ChevronDown, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { AnswerRecord, ExamCard, FinalReport, ScoredItem } from '../types';
import { PASS_LINE } from '../lib/scoring';
import { hasFollowUp, itemLabel, sceneFor } from '../lib/grade';
import { FeedbackBody, ScoreDots } from './FeedbackPanel';
import { ModelReading, PronunciationNote, PronunciationView } from './ReadingReview';
import { Achievement, ScoreHero } from './ScoreHero';
import { SceneIllustration } from './SceneIllustration';

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
  const [open, setOpen] = useState<Set<ScoredItem>>(new Set());
  const initialized = useRef(false);
  // 結果が出たら、点数が低い設問（3点以下）を最初から開いておく
  useEffect(() => {
    if (report && !initialized.current) {
      initialized.current = true;
      setOpen(new Set(ORDER.filter((k) => report.scores[k] <= 3)));
    }
  }, [report]);
  const toggle = (k: ScoredItem) =>
    setOpen((prev) => {
      const n = new Set(prev);
      n.has(k) ? n.delete(k) : n.add(k);
      return n;
    });
  const allOpen = open.size === ORDER.length;
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

      <div className="flex justify-center">
        <button
          onClick={() => document.getElementById('question-review')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-white px-4 py-2 text-sm font-bold text-indigo-700 shadow-sm hover:bg-indigo-50"
        >
          <ChevronDown className="h-4 w-4" /> 設問ごとの解説・模範解答を見る
        </button>
      </div>

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
            <ul className="ml-4 mt-1 list-disc space-y-0.5 text-[14px] text-emerald-950">
              {report.strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-amber-50 p-3">
            <div className="text-xs font-black text-amber-800">伸ばすポイント</div>
            <ul className="ml-4 mt-1 list-disc space-y-0.5 text-[14px] text-amber-950">
              {report.improvements.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-3 rounded-xl bg-indigo-50 p-3 text-[14px] text-indigo-950">
          <span className="font-black">次の練習: </span>
          {report.nextSteps}
        </div>
      </div>

      {/* per-question */}
      <div className="space-y-2">
        <div id="question-review" className="flex scroll-mt-20 flex-wrap items-end gap-2 px-1">
          <div>
            <div className="text-base font-black text-slate-900">設問ごとの振り返り</div>
            <div className="text-[13px] text-slate-500">各設問をタップすると、あなたの回答・解説・模範解答が開きます</div>
          </div>
          <button
            onClick={() => setOpen(allOpen ? new Set() : new Set(ORDER))}
            className="ml-auto inline-flex items-center gap-1 rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 hover:bg-indigo-100"
          >
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${allOpen ? 'rotate-180' : ''}`} />
            {allOpen ? 'すべて閉じる' : 'すべて開く'}
          </button>
        </div>
        {ORDER.map((k) => {
          const rec = records.find((r) => r.item === k);
          const q = k === 'reading' ? null : card[k];
          const pic = sceneFor(card, k);
          const isOpen = open.has(k);
          const sc = report.scores[k];
          return (
            <div
              key={k}
              className={`overflow-hidden rounded-2xl border-l-4 border border-slate-200 bg-white shadow-sm ${sc >= 4 ? 'border-l-emerald-400' : sc >= 3 ? 'border-l-amber-400' : 'border-l-rose-400'
                }`}
            >
              <button onClick={() => toggle(k)} aria-expanded={isOpen} className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-indigo-50/50">
                <div className="w-28 shrink-0 text-xs font-black text-slate-700">{itemLabel(card, k)}</div>
                <div className="min-w-0 flex-1 truncate text-sm text-slate-600">{[rec?.answer, rec?.followUpAnswer].filter(Boolean).join(' / ') || '（無回答）'}</div>
                <ScoreDots score={report.scores[k]} />
                <span className="inline-flex shrink-0 items-center gap-0.5 rounded-full bg-slate-100 px-2 py-0.5 text-[12px] font-bold text-indigo-700">
                  {isOpen ? '閉じる' : '詳しく'}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </span>
              </button>
              {isOpen && (
                <div className="space-y-3 border-t border-slate-100 p-4 text-sm">
                  <div>
                    <div className="text-[12px] font-bold text-slate-500">質問</div>
                    <div className="font-semibold text-slate-900">{q ? q.text : 'Please read the passage aloud.'}</div>
                    {q && <div className="text-xs text-slate-500">{q.ja}</div>}
                  </div>
                  {pic && (
                    <div>
                      <div className="mb-1 text-[12px] font-bold text-slate-500">イラスト{pic.label ?? ''}</div>
                      <div className="max-w-md">
                        <SceneIllustration scene={pic.scene} cardId={pic.cardId} label={pic.label} />
                      </div>
                    </div>
                  )}
                  {k === 'q1' && (
                    <div className="rounded-lg border border-slate-200 bg-[#fffef8] p-3">
                      <div className="mb-0.5 text-[12px] font-bold text-slate-500">パッセージ</div>
                      <div className="font-serif text-[15px] leading-relaxed text-slate-800">
                        <span className="font-bold">{card.title}.</span> {card.passage}
                      </div>
                    </div>
                  )}
                  <div className="rounded-lg bg-slate-100 p-2.5">
                    <div className="text-[12px] font-bold text-slate-500">あなたの回答</div>
                    <div className="text-slate-900">{rec?.answer || '（無回答）'}</div>
                    {rec?.followUpQuestion && (
                      <div className="mt-1 text-slate-900">
                        <span className="text-[12px] text-slate-500">{rec.followUpQuestion} → </span>
                        {rec.followUpAnswer || '（無回答）'}
                      </div>
                    )}
                  </div>
                  {rec?.pronunciation && <PronunciationView a={rec.pronunciation} onSpeak={onSpeak} />}
                  {!rec?.pronunciation && rec?.pronunciationNote && <PronunciationNote note={rec.pronunciationNote} />}
                  {rec?.feedback && <FeedbackBody fb={rec.feedback} onSpeak={onSpeak} />}
                  {k === 'reading' && <ModelReading card={card} onSpeak={onSpeak} />}
                  {q && (
                    <div className="rounded-lg bg-indigo-50 p-3 text-[14px]">
                      <div className="text-xs font-black text-indigo-900">解説（{q.point}）</div>
                      <p className="mt-1 text-slate-800">{q.explanation}</p>
                      <div className="mt-1 text-[12px] font-bold text-indigo-800">模範解答</div>
                      <ul className="ml-4 list-disc">
                        {q.modelAnswers.map((m, i) => (
                          <li key={i}>
                            <button className="text-left hover:text-indigo-700" onClick={() => onSpeak(m)}>
                              {m} 🔊
                            </button>
                          </li>
                        ))}
                      </ul>
                      {hasFollowUp(q) &&
                        ([
                          [`Yes →「${q.followUpYes}」`, q.modelAnswersYes],
                          [`No →「${q.followUpNo}」`, q.modelAnswersNo],
                        ] as const).map(([title, items]) => (
                          <div key={title}>
                            <div className="mt-1 text-[12px] font-bold text-indigo-800">{title}</div>
                            <ul className="ml-4 list-disc">
                              {items.map((m, i) => (
                                <li key={i}>
                                  <button className="text-left hover:text-indigo-700" onClick={() => onSpeak(m)}>
                                    {m} 🔊
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
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
