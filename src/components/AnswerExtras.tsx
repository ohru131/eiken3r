// 回答の下に出す補助パネル: 自分の録音の再生（模範解答と交互）・話し方の分析・表現帳への追加
import React, { useEffect, useRef, useState } from 'react';
import { BookmarkCheck, BookmarkPlus, Headphones, Mic, Repeat, Square, Timer } from 'lucide-react';
import { AnswerRecord, ExamCard } from '../types';
import { clipUrl, playClip } from '../lib/audioStore';
import { FILLER_PHRASES, fluencyIssues } from '../lib/fluency';
import { addPhrase, hasPhrase, removePhraseByText } from '../lib/phrasebook';
import { gradeOf } from '../lib/grade';
import { answerJa } from '../lib/hints';
import { stopSpeaking } from '../lib/speech';

type Speak = (text: string) => Promise<void>;

/** 録音した自分の回答を再生。「交互に」で 自分 → 模範解答 → 自分 … */
export const RecordingPlayer: React.FC<{ rec: AnswerRecord; model?: string; onSpeak: Speak }> = ({ rec, model, onSpeak }) => {
  const [urls, setUrls] = useState<{ main: string | null; follow: string | null } | null>(null);
  const [playing, setPlaying] = useState<null | 'mine' | 'alt'>(null);
  const [step, setStep] = useState<'mine' | 'model' | null>(null);
  const acRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let alive = true;
    Promise.all([rec.audioId ? clipUrl(rec.audioId) : null, rec.followUpAudioId ? clipUrl(rec.followUpAudioId) : null]).then(([main, follow]) => {
      if (alive) setUrls({ main, follow });
    });
    return () => {
      alive = false;
      acRef.current?.abort();
    };
  }, [rec.audioId, rec.followUpAudioId]);

  if (!rec.audioId && !rec.followUpAudioId) return null;
  if (urls && !urls.main && !urls.follow)
    return <div className="text-[12px] text-slate-400">（録音は保存容量の都合で削除されました）</div>;

  const stop = () => {
    acRef.current?.abort();
    acRef.current = null;
    stopSpeaking();
    setPlaying(null);
    setStep(null);
  };
  const playMine = async (signal: AbortSignal) => {
    setStep('mine');
    for (const u of [urls?.main, urls?.follow]) if (u && !signal.aborted) await playClip(u, signal);
  };
  const run = async (mode: 'mine' | 'alt') => {
    stop();
    const ac = new AbortController();
    acRef.current = ac;
    setPlaying(mode);
    try {
      if (mode === 'mine') await playMine(ac.signal);
      else {
        // 自分 → 模範 → 自分 の順で聞き比べる
        await playMine(ac.signal);
        if (!ac.signal.aborted && model) {
          setStep('model');
          await onSpeak(model).catch(() => {});
        }
        if (!ac.signal.aborted) await playMine(ac.signal);
      }
    } finally {
      if (acRef.current === ac) {
        setPlaying(null);
        setStep(null);
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-sky-200 bg-sky-50 px-3 py-2">
      <Headphones className="h-4 w-4 shrink-0 text-sky-700" />
      <span className="text-[12px] font-bold text-sky-900">自分の声</span>
      {playing ? (
        <button onClick={stop} className="inline-flex items-center gap-1 rounded-lg bg-sky-700 px-2.5 py-1 text-[12px] font-bold text-white">
          <Square className="h-3 w-3" /> 停止{step === 'model' ? '（模範解答を再生中）' : step === 'mine' ? '（自分の声を再生中）' : ''}
        </button>
      ) : (
        <>
          <button disabled={!urls} onClick={() => run('mine')} className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-[12px] font-bold text-sky-800 shadow-sm hover:bg-sky-100 disabled:opacity-50">
            <Mic className="h-3 w-3" /> 再生
          </button>
          {model && (
            <button disabled={!urls} onClick={() => run('alt')} className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-[12px] font-bold text-sky-800 shadow-sm hover:bg-sky-100 disabled:opacity-50">
              <Repeat className="h-3 w-3" /> 模範解答と聞き比べ
            </button>
          )}
        </>
      )}
    </div>
  );
};

/** 沈黙・つなぎ言葉の分析と、代わりに使える英語表現 */
export const FluencyView: React.FC<{ rec: AnswerRecord; onSpeak: Speak }> = ({ rec, onSpeak }) => {
  const issues = fluencyIssues(rec);
  if (rec.item === 'reading' || !rec.answer.trim()) return null;
  if (!issues.length)
    return (
      <div className="flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-2 text-[12px] text-emerald-800">
        <Timer className="h-3.5 w-3.5" /> 話し方: {rec.latencySec !== null ? `${rec.latencySec}秒で話し始め、` : ''}止まらずに言えました
      </div>
    );
  return (
    <div className="space-y-1.5 rounded-xl border border-amber-200 bg-amber-50/70 p-3">
      <div className="flex items-center gap-1 text-[12px] font-black text-amber-900">
        <Timer className="h-3.5 w-3.5" /> 話し方のチェック
      </div>
      <ul className="space-y-1 text-[13px] text-slate-800">
        {issues.map((i) => (
          <li key={i.label}>
            <span className="font-bold text-amber-900">{i.label}</span>：{i.detail}
          </li>
        ))}
      </ul>
      <div className="text-[12px] font-bold text-amber-900">沈黙・「えーと」の代わりに</div>
      <div className="flex flex-wrap gap-1">
        {FILLER_PHRASES.slice(0, 5).map((p) => (
          <button key={p.en} onClick={() => onSpeak(p.en)} title={`${p.ja}（${p.use}）`} className="rounded-full border border-amber-300 bg-white px-2 py-0.5 text-[12px] font-semibold text-amber-900 hover:bg-amber-100">
            🔊 {p.en}
          </button>
        ))}
      </div>
    </div>
  );
};

/** 表現帳に追加・削除するボタン */
export const PhraseButton: React.FC<{ card: ExamCard; rec: Pick<AnswerRecord, 'item' | 'question'>; en: string; ja?: string; source: 'model' | 'improved'; compact?: boolean }> = ({
  card,
  rec,
  en,
  ja,
  source,
  compact,
}) => {
  const [saved, setSaved] = useState(() => hasPhrase(en));
  useEffect(() => {
    const on = () => setSaved(hasPhrase(en));
    on();
    window.addEventListener('phrasebook-change', on);
    return () => window.removeEventListener('phrasebook-change', on);
  }, [en]);
  if (!en.trim()) return null;
  const toggle = () => {
    if (saved) removePhraseByText(en);
    else addPhrase({ en, ja, question: rec.question, cardId: card.id, item: rec.item, grade: gradeOf(card), source });
  };
  return (
    <button
      onClick={toggle}
      aria-pressed={saved}
      title={saved ? '表現帳から外す' : '表現帳に追加（ドリルで復習）'}
      className={`inline-flex shrink-0 items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-bold ${saved ? 'bg-violet-600 text-white' : 'border border-violet-300 bg-white text-violet-700 hover:bg-violet-50'}`}
    >
      {saved ? <BookmarkCheck className="h-3 w-3" /> : <BookmarkPlus className="h-3 w-3" />}
      {compact ? '' : saved ? '表現帳に追加済み' : '表現帳'}
    </button>
  );
};

/** 模範解答の和訳（Yes/No 付きの設問は該当側） */
export const modelJa = (card: ExamCard, rec: AnswerRecord, en: string, q: { modelAnswers: string[]; modelAnswersYes?: string[]; modelAnswersNo?: string[] } | null) => {
  if (!q || rec.item === 'reading') return undefined;
  if (q.modelAnswers[0] === en) return answerJa(card.id, rec.item);
  if (q.modelAnswersYes?.[0] === en) return answerJa(card.id, rec.item, 'yes');
  if (q.modelAnswersNo?.[0] === en) return answerJa(card.id, rec.item, 'no');
  return undefined;
};
