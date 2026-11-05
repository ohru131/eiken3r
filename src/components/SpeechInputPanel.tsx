import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, RefreshCw, Edit3, Volume2, ShieldCheck, Check } from 'lucide-react';

interface SpeechInputPanelProps {
  onAnswerSubmit: (transcript: string) => void;
  isEvaluating: boolean;
  disabled?: boolean;
  placeholder?: string;
  suggestedPhrases?: string[];
  autoListen?: boolean;
  stepId?: string;
  onListeningChange?: (listening: boolean) => void;
}

export const SpeechInputPanel: React.FC<SpeechInputPanelProps> = ({
  onAnswerSubmit,
  isEvaluating,
  disabled = false,
  placeholder = 'マイクボタンを押して、英語で声に出して答えてください...',
  suggestedPhrases = [],
  stepId,
  onListeningChange,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [hasSpeechSupport, setHasSpeechSupport] = useState(true);
  const [manualMode, setManualMode] = useState(false);
  const [autoKeepAlive, setAutoKeepAlive] = useState(true);

  // Auto-clear transcripts whenever stepId changes
  useEffect(() => {
    setTranscript('');
    setInterimTranscript('');
    stopListening();
  }, [stepId]);

  useEffect(() => {
    onListeningChange?.(isListening);
  }, [isListening, onListeningChange]);

  const recognitionRef = useRef<any>(null);
  const shouldKeepListeningRef = useRef<boolean>(false);
  const restartTimerRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setHasSpeechSupport(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      let finalStr = '';
      let interimStr = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalStr += event.results[i][0].transcript + ' ';
        } else {
          interimStr += event.results[i][0].transcript;
        }
      }

      if (finalStr) {
        setTranscript((prev) => (prev ? `${prev.trim()} ${finalStr.trim()}` : finalStr.trim()));
      }
      setInterimTranscript(interimStr);
    };

    recognition.onerror = (event: any) => {
      console.warn('Speech recognition status:', event.error);
      // 'no-speech' happens when user is thinking or silent. We do NOT want to kill the mic!
      if (event.error === 'no-speech') {
        return;
      }
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        shouldKeepListeningRef.current = false;
        setIsListening(false);
      }
    };

    recognition.onend = () => {
      // If user did NOT manually stop the mic, automatically keep it running!
      if (shouldKeepListeningRef.current && autoKeepAlive) {
        clearTimeout(restartTimerRef.current);
        restartTimerRef.current = setTimeout(() => {
          if (shouldKeepListeningRef.current) {
            try {
              recognition.start();
              setIsListening(true);
            } catch (err) {
              console.warn('Speech recognition auto-restart retry:', err);
            }
          }
        }, 150);
      } else {
        setIsListening(false);
        setInterimTranscript('');
      }
    };

    recognitionRef.current = recognition;

    return () => {
      shouldKeepListeningRef.current = false;
      clearTimeout(restartTimerRef.current);
      try {
        recognition.stop();
      } catch (e) {
        // ignore
      }
    };
  }, [autoKeepAlive]);

  const startListening = () => {
    if (disabled || isEvaluating) return;
    shouldKeepListeningRef.current = true;
    try {
      setInterimTranscript('');
      recognitionRef.current?.start();
      setIsListening(true);
    } catch (e: any) {
      // In case already running or transient error, retry
      try {
        recognitionRef.current?.stop();
      } catch {}
      setTimeout(() => {
        try {
          recognitionRef.current?.start();
          setIsListening(true);
        } catch (err) {
          console.error('Failed to start speech recognition:', err);
        }
      }, 100);
    }
  };

  const stopListening = () => {
    shouldKeepListeningRef.current = false;
    clearTimeout(restartTimerRef.current);
    try {
      recognitionRef.current?.stop();
    } catch (e) {
      console.error(e);
    }
    setIsListening(false);
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleClear = () => {
    setTranscript('');
    setInterimTranscript('');
  };

  const handleSubmit = () => {
    const fullText = (transcript + ' ' + interimTranscript).trim();
    if (!fullText) return;
    stopListening();
    setTranscript('');
    setInterimTranscript('');
    onAnswerSubmit(fullText);
  };

  const handleUsePhrase = (phrase: string) => {
    setTranscript((prev) => (prev ? `${prev.trim()} ${phrase}` : phrase));
  };

  return (
    <div className="bg-white rounded-2xl p-3 sm:p-3.5 shadow-md border border-slate-200">
      {/* Header and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
            <Mic className="w-3.5 h-3.5 text-indigo-600" />
            Your Answer (音声認識)
          </span>
          {isListening && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              録音中
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {/* Keep-alive toggle */}
          <button
            onClick={() => setAutoKeepAlive(!autoKeepAlive)}
            className={`text-[10px] px-2 py-0.5 rounded-md border flex items-center gap-1 transition-colors cursor-pointer ${
              autoKeepAlive
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold'
                : 'bg-slate-50 text-slate-500 border-slate-200'
            }`}
            title="沈黙してもマイクが自動終了せず継続するモード"
          >
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            <span>切断防止: {autoKeepAlive ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => setManualMode(!manualMode)}
            className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors cursor-pointer"
            title="キーボード入力と切り替え"
          >
            <Edit3 className="w-3 h-3" />
            {manualMode ? '音声' : 'テキスト'}
          </button>

          {(transcript || interimTranscript) && (
            <button
              onClick={handleClear}
              className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-0.5 transition-colors cursor-pointer"
              title="リセット"
            >
              <RefreshCw className="w-2.5 h-2.5" />
              クリア
            </button>
          )}
        </div>
      </div>

      {/* Spoken Text Display Box */}
      <div
        className={`relative min-h-[58px] sm:min-h-[64px] rounded-xl p-2.5 sm:p-3 border transition-all ${
          isListening
            ? 'border-indigo-500 bg-indigo-50/40 ring-2 ring-indigo-200'
            : 'border-slate-200 bg-slate-50/70'
        }`}
      >
        {manualMode ? (
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            disabled={disabled || isEvaluating}
            placeholder="キーボードで英文を入力または直接修正できます..."
            className="w-full h-14 bg-transparent text-slate-800 text-sm font-medium resize-none focus:outline-none"
          />
        ) : (
          <div className="text-sm sm:text-base font-medium text-slate-800 leading-snug min-h-[36px]">
            {transcript ? (
              <span className="text-slate-900">{transcript}</span>
            ) : null}
            {interimTranscript ? (
              <span className="text-indigo-600 italic font-semibold underline decoration-indigo-300 ml-1">
                {interimTranscript}
              </span>
            ) : null}
            {!transcript && !interimTranscript && (
              <span className="text-slate-400 text-xs sm:text-sm">{placeholder}</span>
            )}
          </div>
        )}

        {/* Audio Visualizer Waves when listening */}
        {isListening && (
          <div className="flex items-center justify-between mt-1 pt-1 border-t border-indigo-100">
            <div className="flex items-center gap-1">
              {[40, 70, 30, 90, 60, 80, 50, 95, 45, 65].map((height, i) => (
                <div
                  key={i}
                  className="w-1 bg-indigo-600 rounded-full transition-all duration-150 animate-pulse"
                  style={{
                    height: `${height * 0.2}px`,
                    animationDelay: `${i * 70}ms`,
                  }}
                />
              ))}
              <span className="text-[11px] text-indigo-700 font-medium ml-1.5">
                録音中：ゆっくり英語で話してください
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested phrases (especially helpful for warm-up or greetings) */}
      {suggestedPhrases.length > 0 && (
        <div className="mt-1.5 flex flex-wrap items-center gap-1">
          <span className="text-[10px] font-semibold text-slate-400">ワンタップ:</span>
          {suggestedPhrases.map((phrase, idx) => (
            <button
              key={idx}
              onClick={() => handleUsePhrase(phrase)}
              className="text-[11px] px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full border border-slate-200 transition-colors cursor-pointer"
            >
              "{phrase}"
            </button>
          ))}
        </div>
      )}

      {/* Bottom Controls */}
      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          {hasSpeechSupport ? (
            <button
              onClick={toggleListening}
              disabled={disabled || isEvaluating}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer ${
                isListening
                  ? 'bg-rose-600 hover:bg-rose-700 text-white ring-2 ring-rose-200'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-md'
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-3.5 h-3.5" />
                  <span>録音を終了</span>
                </>
              ) : (
                <>
                  <Mic className="w-3.5 h-3.5" />
                  <span>マイクで話す</span>
                </>
              )}
            </button>
          ) : (
            <div className="text-[11px] text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              音声認識非対応（キーボードをご利用ください）
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={disabled || isEvaluating || (!transcript.trim() && !interimTranscript.trim())}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 sm:py-2 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-xs disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          {isEvaluating ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>判定中...</span>
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>送信して即座に判定</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
