import React, { useState } from 'react';
import { StepFeedback } from '../types';
import {
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  Sparkles,
  BookOpen,
  ThumbsUp,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface InstantFeedbackCardProps {
  feedback: StepFeedback;
  userAnswer: string;
  onNextStep: () => void;
  onRetry: () => void;
  isLastQuestion?: boolean;
  onSpeakAnswer?: (text: string) => void;
}

export const InstantFeedbackCard: React.FC<InstantFeedbackCardProps> = ({
  feedback,
  userAnswer,
  onNextStep,
  onRetry,
  isLastQuestion = false,
  onSpeakAnswer,
}) => {
  const [playingText, setPlayingText] = useState<string | null>(null);

  const isHigh = feedback.score >= 4;
  const isMid = feedback.score === 3;

  const badgeColor = isHigh
    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
    : isMid
    ? 'bg-blue-100 text-blue-800 border-blue-300'
    : 'bg-amber-100 text-amber-800 border-amber-300';

  const handlePlayVoice = (text: string) => {
    setPlayingText(text);
    if (onSpeakAnswer) {
      onSpeakAnswer(text);
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.onend = () => setPlayingText(null);
      utterance.onerror = () => setPlayingText(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-3.5 sm:p-4.5 shadow-xl border-2 border-indigo-100 animate-fadeIn">
      {/* Header with Score and Rating */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-black text-lg sm:text-xl shadow-xs ${
              isHigh
                ? 'bg-emerald-500 text-white'
                : isMid
                ? 'bg-blue-500 text-white'
                : 'bg-amber-500 text-white'
            }`}
          >
            {feedback.score}/5
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${badgeColor}`}>
                {feedback.ratingLabel}
              </span>
              <span className="text-[11px] font-semibold text-slate-400">英検3級基準判定</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-slate-800 mt-0.5 leading-snug">
              {feedback.quickFeedback}
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            やり直す
          </button>
          <button
            onClick={onNextStep}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer"
          >
            <span>{isLastQuestion ? '総合結果へ進む' : '次のステップへ'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Your Answer Recapped */}
      <div className="my-2.5 bg-indigo-50/70 rounded-xl p-2.5 sm:p-3 border border-indigo-200">
        <div className="flex items-center justify-between gap-2 mb-0.5">
          <span className="text-[10px] font-bold text-indigo-900 uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-indigo-600" />
            AIが解析したあなたの発話文:
          </span>
          <span className="text-[9px] font-semibold text-indigo-700 bg-white px-1.5 py-0.5 rounded border border-indigo-200">
            音声認識成功
          </span>
        </div>
        <p className="text-sm sm:text-base font-bold text-indigo-950 font-serif">
          "{feedback.analyzedSpokenText || userAnswer}"
        </p>
      </div>

      {/* Grammar & Wording Feedback */}
      <div className="space-y-2.5">
        <div className="flex items-start gap-2 bg-blue-50/70 rounded-xl p-2.5 border border-blue-100">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            <span className="font-bold text-blue-900 block mb-0.5">文法・表現アドバイス:</span>
            {feedback.grammarCheck}
          </div>
        </div>

        {/* Better / Model Answers with Native Voice Pronunciation */}
        {feedback.betterResponses && feedback.betterResponses.length > 0 && (
          <div className="bg-emerald-50/70 rounded-xl p-2.5 sm:p-3 border border-emerald-200">
            <div className="flex items-center justify-between mb-1.5 flex-wrap gap-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>3級合格にピッタリの模範解答例:</span>
              </div>
              <button
                onClick={() => handlePlayVoice(feedback.betterResponses[0])}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer"
                title="一番おすすめの模範解答を英語音声で発音再生します"
              >
                <Volume2 className="w-3 h-3" />
                <span>模範解答を英語で聞く</span>
              </button>
            </div>

            <ul className="space-y-1.5">
              {feedback.betterResponses.map((res, i) => {
                const isItemPlaying = playingText === res;
                return (
                  <li
                    key={i}
                    className={`text-xs sm:text-sm font-semibold text-emerald-900 bg-white/90 px-3 py-1.5 rounded-lg border flex items-center justify-between gap-2 transition-all ${
                      isItemPlaying
                        ? 'border-emerald-500 ring-2 ring-emerald-300 bg-emerald-50'
                        : 'border-emerald-200/80 hover:border-emerald-300'
                    }`}
                  >
                    <span className="font-serif">"{res}"</span>
                    <button
                      onClick={() => handlePlayVoice(res)}
                      className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold transition-colors cursor-pointer ${
                        isItemPlaying
                          ? 'bg-emerald-600 text-white animate-pulse'
                          : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                      }`}
                      title="この英文のネイティブ発音を再生"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>{isItemPlaying ? '再生中...' : '発音を聞く'}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Key Tip */}
        {feedback.keyTips && (
          <div className="flex items-start gap-1.5 text-xs text-slate-600 bg-slate-100/80 p-2 rounded-lg">
            <BookOpen className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong className="text-slate-800">面接のツボ:</strong> {feedback.keyTips}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
