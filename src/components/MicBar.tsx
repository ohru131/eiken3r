import React, { useEffect, useRef, useState } from 'react';
import { Mic, Keyboard, Send, HelpCircle, SkipForward, Check, Volume2 } from 'lucide-react';
import { getActiveListen, hasSpeechRecognition } from '../lib/speech';

interface Props {
  speaking: boolean;
  listening: boolean;
  hint: string;
  interim: string;
  silence: number;
  busyLabel?: string;
  /** 本番モード: ヒントと認識文字を出さない */
  exam?: boolean;
}

export const MicBar: React.FC<Props> = ({ speaking, listening, hint, interim, silence, busyLabel, exam }) => {
  const supported = hasSpeechRecognition();
  const [typing, setTyping] = useState(!supported);
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (listening && typing) {
      getActiveListen()?.hold();
      inputRef.current?.focus();
    }
    if (!listening) setText('');
  }, [listening, typing]);

  // Space / Enter で回答終了
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!listening || typing) return;
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        getActiveListen()?.finish();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [listening, typing]);

  const submit = () => {
    if (!text.trim()) return;
    getActiveListen()?.submitText(text);
    setText('');
  };

  return (
    <div
      className={`rounded-2xl border p-3 shadow-sm transition-colors sm:p-4 ${
        listening ? 'border-rose-300 bg-rose-50' : speaking ? 'border-indigo-200 bg-indigo-50' : 'border-slate-200 bg-white'
      }`}
    >
      <div className="flex items-center gap-3">
        {/* status orb */}
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
          {listening && (
            <>
              <span className="absolute inset-0 animate-ping rounded-full bg-rose-400/40" />
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="26" fill="none" stroke="#fecdd3" strokeWidth="4" />
                <circle
                  cx="28"
                  cy="28"
                  r="26"
                  fill="none"
                  stroke="#e11d48"
                  strokeWidth="4"
                  strokeDasharray={163}
                  strokeDashoffset={163 * (1 - silence)}
                  strokeLinecap="round"
                />
              </svg>
            </>
          )}
          <div
            className={`relative flex h-11 w-11 items-center justify-center rounded-full text-white ${
              listening ? 'bg-rose-600' : speaking ? 'bg-indigo-600' : 'bg-slate-400'
            }`}
          >
            {speaking ? <Volume2 className="h-5 w-5 animate-pulse" /> : <Mic className="h-5 w-5" />}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className={`text-xs font-bold ${listening ? 'text-rose-700' : speaking ? 'text-indigo-700' : 'text-slate-500'}`}>
            {listening ? (exam ? '🎤 どうぞ、英語で話してください' : `🎤 ${hint}`) : speaking ? '面接官が話しています…' : busyLabel || '待機中'}
          </div>
          <div className="mt-0.5 min-h-[1.75rem] text-base font-semibold text-slate-900 sm:text-lg">
            {listening &&
              !typing &&
              (exam ? (
                <span className={`text-sm font-medium ${interim ? 'text-rose-600' : 'text-slate-400'}`}>
                  {interim ? '● 声を聞き取っています…' : '（話し始めてください）'}
                </span>
              ) : (
                interim || <span className="text-slate-400">（話し始めると文字が表示されます）</span>
              ))}
            {listening && typing && (
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
              >
                <input
                  ref={inputRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="英語で入力して Enter"
                  className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-base outline-none focus:border-indigo-500"
                />
                <button className="rounded-lg bg-indigo-600 px-3 text-white">
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {listening && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          {!typing && (
            <button
              onClick={() => getActiveListen()?.finish()}
              className="inline-flex items-center gap-1 rounded-full bg-rose-600 px-3 py-1.5 font-bold text-white hover:bg-rose-700"
            >
              <Check className="h-3.5 w-3.5" /> 回答終了 <kbd className="ml-1 rounded bg-white/20 px-1 text-[11px]">Space</kbd>
            </button>
          )}
          <button
            onClick={() => getActiveListen()?.pardon()}
            className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1.5 font-bold text-slate-700 hover:bg-slate-50"
          >
            <HelpCircle className="h-3.5 w-3.5" /> Pardon?（聞き返す）
          </button>
          <button
            onClick={() => getActiveListen()?.skip()}
            className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-3 py-1.5 font-bold text-slate-500 hover:bg-slate-50"
          >
            <SkipForward className="h-3.5 w-3.5" /> パス
          </button>
          {supported && (
            <button onClick={() => setTyping((t) => !t)} className="ml-auto inline-flex items-center gap-1 text-slate-500 hover:text-slate-800">
              <Keyboard className="h-3.5 w-3.5" /> {typing ? '音声で答える' : 'キーボード入力'}
            </button>
          )}
          {!typing && <span className="w-full text-[12px] text-slate-500">話し終えて少し黙ると自動で次に進みます</span>}
        </div>
      )}
    </div>
  );
};
