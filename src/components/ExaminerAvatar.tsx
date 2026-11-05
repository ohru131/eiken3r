import React, { useEffect, useState } from 'react';
import { ExaminerProfile } from '../types';
import { Volume2, RotateCcw, HelpCircle } from 'lucide-react';

interface ExaminerAvatarProps {
  examiner: ExaminerProfile;
  isSpeaking: boolean;
  isListening: boolean;
  currentSpeechText: string;
  onReplaySpeech: () => void;
  onPardonRequested: () => void;
  pardonCount: number;
}

export const ExaminerAvatar: React.FC<ExaminerAvatarProps> = ({
  examiner,
  isSpeaking,
  isListening,
  currentSpeechText,
  onReplaySpeech,
  onPardonRequested,
  pardonCount,
}) => {
  const [blink, setBlink] = useState(false);
  const [mouthPhase, setMouthPhase] = useState(0);

  // Natural blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 4000 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  // Mouth talking animation while speaking
  useEffect(() => {
    if (!isSpeaking) {
      setMouthPhase(0);
      return;
    }
    const mouthInterval = setInterval(() => {
      setMouthPhase((prev) => (prev + 1) % 4);
    }, 140);
    return () => clearInterval(mouthInterval);
  }, [isSpeaking]);

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl p-3 sm:p-3.5 text-white shadow-lg border border-slate-700/60 relative overflow-hidden">
      {/* Background interview room atmosphere */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      {/* Top Header / Examiner Name & Status */}
      <div className="w-full flex items-center justify-between mb-2 z-10 relative">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-300">
            Examiner Room 01
          </span>
        </div>
        <div className="flex items-center gap-1 bg-slate-800/90 px-2 py-0.5 rounded-full border border-slate-700 text-[11px] text-slate-300">
          <span className="font-semibold text-white">{examiner.name}</span>
          <span className="text-[9px] text-sky-400">({examiner.accent.split(' ')[0]})</span>
        </div>
      </div>

      {/* Side-by-side Layout: Avatar on left, Speech bubble on right */}
      <div className="flex items-center gap-3 relative z-10">
        {/* Compact Avatar Graphic */}
        <div className="shrink-0 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            {/* Glow halo when talking or listening */}
            <div
              className={`absolute -inset-2 rounded-full blur-md transition-all duration-300 ${
                isSpeaking
                  ? 'bg-sky-500/35 scale-105'
                  : isListening
                  ? 'bg-emerald-500/30 scale-100'
                  : 'bg-transparent'
              }`}
            />

            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-slate-700 to-slate-900 border-2 sm:border-3 border-slate-600/80 p-1 relative shadow-xl flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 160 160" className="w-full h-full">
                {/* Background collar/suit */}
                <path d="M20,160 Q80,110 140,160 Z" fill="#1e293b" />
                <path d="M50,160 L80,125 L110,160 Z" fill="#ffffff" />
                {/* Tie / Scarf */}
                <polygon points="76,130 84,130 86,160 74,160" fill={examiner.id === 'sarah' ? '#059669' : '#2563eb'} />

                {/* Neck */}
                <rect x="70" y="98" width="20" height="24" fill="#fed7aa" rx="2" />

                {/* Head */}
                <ellipse cx="80" cy="70" rx="36" ry="42" fill="#fed7aa" />

                {/* Hair style based on examiner */}
                {examiner.id === 'alex' && (
                  <path
                    d="M44,60 C40,30 60,18 80,18 C100,18 120,30 116,60 C110,40 100,28 80,28 C60,28 50,40 44,60 Z"
                    fill="#451a03"
                  />
                )}
                {examiner.id === 'sarah' && (
                  <g>
                    <path
                      d="M40,75 C35,35 55,16 80,16 C105,16 125,35 120,75 C125,100 118,125 116,135 C110,110 115,80 112,65 C108,35 95,28 80,28 C65,28 52,35 48,65 C45,80 50,110 44,135 C42,125 35,100 40,75 Z"
                      fill="#78350f"
                    />
                  </g>
                )}
                {examiner.id === 'david' && (
                  <path
                    d="M44,60 C40,32 58,24 80,24 C102,24 120,32 116,60 C110,42 98,32 80,32 C62,32 50,42 44,60 Z"
                    fill="#334155"
                  />
                )}

                {/* Eyebrows */}
                <path
                  d="M58,54 Q67,50 73,53"
                  stroke="#451a03"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M87,53 Q93,50 102,54"
                  stroke="#451a03"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Eyes (Open vs Blink) */}
                {blink ? (
                  <g>
                    <path d="M58,66 Q66,69 74,66" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    <path d="M86,66 Q94,69 102,66" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  </g>
                ) : (
                  <g>
                    <ellipse cx="66" cy="65" rx="5" ry="4" fill="#ffffff" />
                    <circle cx="67" cy="65" r="2.8" fill="#1e293b" />
                    <circle cx="68" cy="64" r="1" fill="#ffffff" />

                    <ellipse cx="94" cy="65" rx="5" ry="4" fill="#ffffff" />
                    <circle cx="95" cy="65" r="2.8" fill="#1e293b" />
                    <circle cx="96" cy="64" r="1" fill="#ffffff" />
                  </g>
                )}

                {/* Glasses for David */}
                {examiner.id === 'david' && (
                  <g stroke="#0f172a" strokeWidth="1.8" fill="none">
                    <rect x="56" y="58" width="18" height="14" rx="3" />
                    <rect x="86" y="58" width="18" height="14" rx="3" />
                    <line x1="74" y1="64" x2="86" y2="64" />
                  </g>
                )}

                {/* Nose */}
                <path d="M80,68 L78,79 L84,79" stroke="#d97706" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

                {/* Cheek blush */}
                <circle cx="56" cy="77" r="4.5" fill="#fca5a5" opacity="0.4" />
                <circle cx="104" cy="77" r="4.5" fill="#fca5a5" opacity="0.4" />

                {/* Mouth */}
                {isSpeaking ? (
                  mouthPhase === 0 ? (
                    <ellipse cx="80" cy="91" rx="8" ry="4.5" fill="#881337" />
                  ) : mouthPhase === 1 ? (
                    <path d="M72,90 Q80,98 88,90 Z" fill="#9f1239" />
                  ) : mouthPhase === 2 ? (
                    <ellipse cx="80" cy="90" rx="6" ry="6" fill="#881337" />
                  ) : (
                    <path d="M74,89 Q80,95 86,89" stroke="#881337" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  )
                ) : isListening ? (
                  <path d="M73,89 Q80,95 87,89" stroke="#9a3412" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                ) : (
                  <path d="M74,90 Q80,94 86,90" stroke="#9a3412" strokeWidth="2" fill="none" strokeLinecap="round" />
                )}
              </svg>
            </div>
          </div>

          {/* Status badge below avatar */}
          <div
            className={`mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider flex items-center gap-1 shadow-xs ${
              isSpeaking
                ? 'bg-sky-500 text-white animate-bounce'
                : isListening
                ? 'bg-emerald-500 text-white animate-pulse'
                : 'bg-slate-700/80 text-slate-300'
            }`}
          >
            {isSpeaking ? (
              <>
                <Volume2 className="w-2.5 h-2.5" /> Speaking
              </>
            ) : isListening ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" /> Listening
              </>
            ) : (
              'Waiting'
            )}
          </div>
        </div>

        {/* Speech Bubble / Spoken Prompt */}
        <div className="flex-1 bg-slate-800/90 border border-slate-700/80 rounded-xl p-2.5 sm:p-3 shadow-md">
          <div className="text-xs sm:text-sm font-medium text-slate-100 leading-snug">
            "{currentSpeechText}"
          </div>

          {/* Action Controls for Replay / Pardon */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-700/60 text-[11px]">
            <button
              onClick={onReplaySpeech}
              title="面接官の声をもう一度聞く"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-sky-400" />
              <span>もう一度聞く</span>
            </button>

            <button
              onClick={onPardonRequested}
              title="英検公式ルール：1回までの聞き返しは減点されません"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-400/40 text-indigo-200 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3 h-3 text-indigo-400" />
              <span>Pardon? ({pardonCount === 0 ? '減点なし' : '2回目'})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
