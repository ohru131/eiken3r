import React, { useEffect } from 'react';
import { FinalReportData, ExamCard, QuestionRecord } from '../types';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle,
  XCircle,
  Share2,
  Printer,
  RotateCcw,
  ArrowRight,
  Sparkles,
  TrendingUp,
  BookOpen,
  MessageSquare,
} from 'lucide-react';

interface FinalReportModalProps {
  card: ExamCard;
  report: FinalReportData;
  records: QuestionRecord[];
  onRetryCard: () => void;
  onSelectNextCard: () => void;
  onOpenDrillMode: () => void;
}

export const FinalReportModal: React.FC<FinalReportModalProps> = ({
  card,
  report,
  records,
  onRetryCard,
  onSelectNextCard,
  onOpenDrillMode,
}) => {
  useEffect(() => {
    if (report.passed) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore
      }
    }
  }, [report.passed]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyReport = () => {
    const text = `【英検3級 2次試験 面接診断レポート】
カード: ${card.title} (${card.japaneseTitle})
総合スコア: ${report.totalScore}/33 点
合否判定: ${report.passed ? '合格圏内 (PASS)' : '要復習'} (${report.gradeLabel})

■ 内訳
・リーディング (音読): ${report.readingScore}/5
・No. 1 (パッセージ): ${report.no1Score}/5
・No. 2 (イラストA): ${report.no2Score}/5
・No. 3 (イラストB): ${report.no3Score}/5
・No. 4 (自由質問1): ${report.no4Score}/5
・No. 5 (自由質問2): ${report.no5Score}/5
・アティチュード (態度): ${report.attitudeScore}/3

■ AI総評
${report.overallSummary}

■ ステップアップ課題
${report.stepUpAdvice}
`;
    navigator.clipboard.writeText(text);
    alert('レポート結果をクリップボードにコピーしました！');
  };

  const passPercentage = Math.round((report.totalScore / 33) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Top Banner / Pass Badge */}
      <div
        className={`rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden ${
          report.passed
            ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700'
            : 'bg-gradient-to-r from-amber-600 via-orange-600 to-rose-700'
        }`}
      >
        <div className="absolute right-0 top-0 bottom-0 opacity-10 flex items-center pr-6 pointer-events-none">
          <Award className="w-64 h-64" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              EIKEN Grade 3 AI Interview Report
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              {report.passed ? '🎉 合格判定 (PASS)！' : 'あと一歩！(Keep Going)'}
            </h2>
            <p className="mt-1 text-sm sm:text-base text-white/90 font-medium">
              カード: {card.title} / {card.japaneseTitle}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-black/25 text-xs font-bold text-white border border-white/20">
                {report.gradeLabel}
              </span>
              <span className="text-xs text-white/80">
                合格基準目安: 19点以上
              </span>
            </div>
          </div>

          {/* Big Score Dial */}
          <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-5 text-center min-w-[170px] shadow-lg">
            <span className="text-xs uppercase font-bold text-white/80 tracking-wider">
              Total Score
            </span>
            <div className="text-4xl sm:text-5xl font-black mt-1">
              {report.totalScore}
              <span className="text-xl sm:text-2xl text-white/70 font-semibold">/33</span>
            </div>
            <div className="mt-2 text-xs font-semibold text-white/90">
              得点率 {passPercentage}%
            </div>
          </div>
        </div>
      </div>

      {/* Score Breakdown Grid */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-slate-200">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          <span>配点内訳 (英検3級 公式基準)</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { label: 'Reading', sub: '音読', score: report.readingScore, max: 5 },
            { label: 'No. 1', sub: 'パッセージ', score: report.no1Score, max: 5 },
            { label: 'No. 2', sub: 'イラストA', score: report.no2Score, max: 5 },
            { label: 'No. 3', sub: 'イラストB', score: report.no3Score, max: 5 },
            { label: 'No. 4', sub: '自由質問1', score: report.no4Score, max: 5 },
            { label: 'No. 5', sub: '自由質問2', score: report.no5Score, max: 5 },
            { label: 'Attitude', sub: '態度・意欲', score: report.attitudeScore, max: 3, highlight: true },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border text-center transition-all ${
                item.highlight
                  ? 'bg-amber-50/80 border-amber-300 ring-1 ring-amber-200'
                  : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="text-xs font-bold text-slate-700">{item.label}</div>
              <div className="text-[10px] text-slate-400 font-medium">{item.sub}</div>
              <div className="mt-2 text-xl font-black text-slate-900">
                {item.score}
                <span className="text-xs font-normal text-slate-400">/{item.max}</span>
              </div>
              <div className="mt-1.5 w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    item.score >= item.max * 0.8
                      ? 'bg-emerald-500'
                      : item.score >= item.max * 0.6
                      ? 'bg-blue-500'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${(item.score / item.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Overall Summary & Strengths */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Assessment */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-slate-200 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>AI面接官からの総評</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              {report.overallSummary}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>採点エンジン: Gemini 3.8 Flash</span>
            <button
              onClick={handleCopyReport}
              className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-bold cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" /> レポートをコピー
            </button>
          </div>
        </div>

        {/* Strengths & Improvements */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-slate-200 space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>良かった点 (Your Strengths)</span>
            </h4>
            <ul className="space-y-1.5">
              {report.strengths.map((str, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2 bg-emerald-50/60 p-2 rounded-lg border border-emerald-100">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-2">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <span>改善ポイント・伸び代 (Areas to Grow)</span>
            </h4>
            <ul className="space-y-1.5">
              {report.improvements.map((imp, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2 bg-amber-50/60 p-2 rounded-lg border border-amber-100">
                  <span className="text-amber-600 font-bold">→</span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Step by Step Question Breakdown */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-slate-200">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <span>設問別レビュー & 模範解答比較</span>
        </h3>

        <div className="space-y-3">
          {report.questionReviews.map((q, idx) => {
            const correspondingRecord = records.find(
              (r) => r.stepTitle.includes(q.questionTitle) || q.questionTitle.includes(r.stepTitle)
            );
            return (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-bold text-sm text-slate-900">{q.questionTitle}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                    {q.score} / 5 点
                  </span>
                </div>

                {correspondingRecord && (
                  <div className="mb-2 text-xs text-slate-600 bg-white p-2 rounded border border-slate-200">
                    <span className="font-bold text-slate-500">あなたの回答: </span>
                    <span className="italic font-medium text-slate-800">
                      "{correspondingRecord.userSpokenText || '(無発話)'}"
                    </span>
                  </div>
                )}

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {q.comment}
                </p>

                <div className="mt-2 text-xs text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-200">
                  <span className="font-bold">模範解答例: </span>
                  <span className="font-semibold font-serif">"{q.modelAnswer}"</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Up Action Advice */}
      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-5 sm:p-6 border border-indigo-200">
        <h3 className="text-base font-bold text-indigo-950 flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <span>ステップアップ学習アドバイス（英検3級合格〜準2級への道）</span>
        </h3>
        <p className="text-xs sm:text-sm text-indigo-900 leading-relaxed font-medium">
          {report.stepUpAdvice}
        </p>
      </div>

      {/* Action Footer for Continuing & Step Up */}
      <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onRetryCard}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>同じカードで再挑戦</span>
          </button>
          <button
            onClick={onOpenDrillMode}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors cursor-pointer"
          >
            <TrendingUp className="w-4 h-4" />
            <span>苦手パート特訓</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>印刷</span>
          </button>
          <button
            onClick={onSelectNextCard}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-md transition-all cursor-pointer"
          >
            <span>次の問題カードへ進む (Step Up)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
