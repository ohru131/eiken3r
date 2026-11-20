// ドリル: シャドーイング / リピーティング、瞬間英作文、表現帳の復習
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, BookmarkPlus, BookmarkCheck, Check, Ear, Languages, Mic, Play, RotateCcw, SkipForward, Trash2, Volume2, Plus, Send } from 'lucide-react';
import { ExamCard } from '../types';
import { DrillItem, compareSpeech, drillItems, WordMatch } from '../lib/drill';
import { MASTERED_BOX, Phrase, ReviewGrade, addPhrase, daysUntil, duePhrases, hasPhrase, loadPhrases, removePhrase, reviewPhrase } from '../lib/phrasebook';
import { FILLER_PHRASES } from '../lib/fluency';
import { AbortedError, getActiveListen, hasSpeechRecognition, listen, stopSpeaking } from '../lib/speech';
import { playSfx } from '../lib/sfx';

export type DrillTab = 'repeat' | 'instant' | 'phrasebook';

interface Props {
  cards: ExamCard[];
  gradeLabel: string;
  onSpeak: (text: string) => Promise<void>;
  onBack: () => void;
  initialTab?: DrillTab;
}

const TABS: { id: DrillTab; label: string; icon: React.ReactNode }[] = [
  { id: 'repeat', label: 'シャドーイング', icon: <Ear className="h-4 w-4" /> },
  { id: 'instant', label: '瞬間英作文', icon: <Languages className="h-4 w-4" /> },
  { id: 'phrasebook', label: '表現帳', icon: <BookmarkCheck className="h-4 w-4" /> },
];

const SESSION_SIZE = 10;
const shuffle = <T,>(a: T[]): T[] => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};
const scoreColor = (s: number) => (s >= 85 ? 'text-emerald-600' : s >= 60 ? 'text-amber-600' : 'text-rose-600');

// ---------------- 音声入力 ----------------

interface HeardResult {
  text: string;
  latencySec: number | null;
}

/** マイク入力（音声認識が無い場合はテキスト入力）を一元管理。アンマウントで中断 */
function useListener() {
  const ctrl = useRef<AbortController | null>(null);
  const typedResolve = useRef<((r: HeardResult | null) => void) | null>(null);
  const typedStart = useRef(0);
  const [listening, setListening] = useState(false);
  const [typing, setTyping] = useState(false);
  const [interim, setInterim] = useState('');
  const [silence, setSilence] = useState(0);

  const abort = useCallback(() => {
    ctrl.current?.abort();
    ctrl.current = null;
    typedResolve.current?.(null);
    typedResolve.current = null;
    setListening(false);
    setTyping(false);
    setInterim('');
    setSilence(0);
  }, []);

  const run = useCallback(
    async (opts: { silenceMs?: number } = {}): Promise<HeardResult | null> => {
      abort();
      const c = new AbortController();
      ctrl.current = c;
      if (!hasSpeechRecognition()) {
        setTyping(true);
        typedStart.current = performance.now();
        return new Promise((resolve) => {
          typedResolve.current = resolve;
        });
      }
      setListening(true);
      playSfx('micOn');
      try {
        const r = await listen({
          silenceMs: opts.silenceMs ?? 2000,
          noSpeechMs: 10000,
          maxMs: 30000,
          signal: c.signal,
          onInterim: setInterim,
          onSilenceProgress: setSilence,
        });
        return { text: r.text, latencySec: r.latencySec };
      } catch (e) {
        if (e instanceof AbortedError || c.signal.aborted) return null;
        return { text: '', latencySec: null };
      } finally {
        if (ctrl.current === c) {
          ctrl.current = null;
          setListening(false);
          setInterim('');
          setSilence(0);
          playSfx('micOff');
        }
      }
    },
    [abort],
  );

  const submitTyped = useCallback((text: string) => {
    const r = typedResolve.current;
    typedResolve.current = null;
    setTyping(false);
    r?.({ text, latencySec: Math.round(((performance.now() - typedStart.current) / 1000) * 10) / 10 });
  }, []);

  useEffect(
    () => () => {
      ctrl.current?.abort();
      typedResolve.current?.(null);
      stopSpeaking();
    },
    [],
  );

  return { listening, typing, interim, silence, run, abort, submitTyped };
}
type Listener = ReturnType<typeof useListener>;

const ListenPanel: React.FC<{ l: Listener }> = ({ l }) => {
  const [text, setText] = useState('');
  useEffect(() => {
    if (!l.typing) setText('');
  }, [l.typing]);
  if (l.listening)
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-3" role="status" aria-live="polite">
        <div className="flex items-center gap-2 text-[13px] font-bold text-rose-700">
          <Mic className="h-4 w-4 animate-pulse" /> 聞き取り中…
        </div>
        <p className="mt-1 min-h-[1.25rem] break-words text-[14px] text-slate-700">{l.interim}</p>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-rose-100">
          <div className="h-full bg-rose-400 transition-all" style={{ width: `${Math.round(l.silence * 100)}%` }} />
        </div>
        <button
          type="button"
          aria-label="言い終わった"
          onClick={() => getActiveListen()?.finish()}
          className="mt-2 w-full rounded-xl bg-rose-600 py-2 text-[13px] font-bold text-white active:scale-[0.99]"
        >
          言い終わった
        </button>
      </div>
    );
  if (l.typing)
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-3">
        <p className="text-[12px] text-slate-500">このブラウザは音声認識に対応していないため、英文を入力してください。</p>
        <textarea
          aria-label="英語の回答を入力"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          className="mt-2 w-full rounded-xl border border-slate-200 p-2 text-[14px] outline-none focus:border-indigo-400"
        />
        <button
          type="button"
          aria-label="回答を送信"
          onClick={() => l.submitTyped(text)}
          className="mt-2 flex w-full items-center justify-center gap-1 rounded-xl bg-indigo-600 py-2 text-[13px] font-bold text-white"
        >
          <Send className="h-4 w-4" /> 送信
        </button>
      </div>
    );
  return null;
};

// ---------------- 共通パーツ ----------------

const WordsView: React.FC<{ words: WordMatch[] }> = ({ words }) => (
  <p className="break-words text-[15px] font-semibold leading-relaxed">
    {words.map((w, i) => (
      <span key={i} className={w.hit ? 'text-emerald-600' : 'text-rose-600 underline decoration-rose-300 decoration-2 underline-offset-2'}>
        {w.word}{' '}
      </span>
    ))}
  </p>
);

const AddPhraseButton: React.FC<{ item: DrillItem }> = ({ item }) => {
  const [added, setAdded] = useState(() => hasPhrase(item.en));
  useEffect(() => {
    const f = () => setAdded(hasPhrase(item.en));
    f();
    window.addEventListener('phrasebook-change', f);
    return () => window.removeEventListener('phrasebook-change', f);
  }, [item.en]);
  return (
    <button
      type="button"
      disabled={added}
      aria-label={added ? '表現帳に追加済み' : '表現帳に追加'}
      onClick={() => addPhrase({ en: item.en, ja: item.ja, question: item.question, cardId: item.cardId, item: item.item, source: 'model' })}
      className={`flex items-center gap-1 rounded-full border px-3 py-1.5 text-[12px] font-bold ${added ? 'border-slate-200 text-slate-400' : 'border-indigo-200 bg-indigo-50 text-indigo-700 active:scale-95'}`}
    >
      {added ? <BookmarkCheck className="h-3.5 w-3.5" /> : <BookmarkPlus className="h-3.5 w-3.5" />}
      {added ? '追加済み' : '＋表現帳'}
    </button>
  );
};

// ---------------- ドリル 1・2 ----------------

interface QResult {
  text: string;
  score: number;
  words: WordMatch[];
  latencySec: number | null;
}

const DrillSession: React.FC<{ kind: 'repeat' | 'instant'; items: DrillItem[]; onSpeak: Props['onSpeak'] }> = ({ kind, items, onSpeak }) => {
  const labels = useMemo(() => [...new Set(items.map((i) => i.itemLabel))], [items]);
  const [filter, setFilter] = useState<string[]>([]);
  const [sub, setSub] = useState<'repeat' | 'shadow'>('repeat');
  const [queue, setQueue] = useState<DrillItem[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [results, setResults] = useState<(QResult | undefined)[]>([]);
  const [stage, setStage] = useState<'speaking' | 'listening' | 'result'>('listening');
  const l = useListener();
  const pool = useMemo(() => (filter.length ? items.filter((i) => filter.includes(i.itemLabel)) : items), [items, filter]);

  const start = () => {
    setQueue(shuffle(pool).slice(0, SESSION_SIZE));
    setIdx(0);
    setAttempt(0);
    setResults([]);
  };
  const cur = queue?.[idx];

  useEffect(() => {
    if (!cur) return;
    let cancelled = false;
    const finish = (r: HeardResult | null) => {
      if (cancelled || !r) return;
      const c = compareSpeech(r.text, cur.en);
      setResults((p) => {
        const n = [...p];
        n[idx] = { ...c, text: r.text, latencySec: r.latencySec };
        return n;
      });
      setStage('result');
      playSfx(c.score >= 85 ? 'correct' : c.score >= 60 ? 'good' : 'retry');
      if (kind === 'instant') onSpeak(cur.en).catch(() => {});
    };
    (async () => {
      try {
        if (kind === 'instant') {
          setStage('listening');
          finish(await l.run({ silenceMs: 2500 }));
        } else if (sub === 'shadow') {
          setStage('listening');
          onSpeak(cur.en).catch(() => {});
          finish(await l.run());
        } else {
          setStage('speaking');
          await onSpeak(cur.en);
          if (cancelled) return;
          setStage('listening');
          finish(await l.run());
        }
      } catch {
        /* 読み上げ中断などは無視 */
      }
    })();
    return () => {
      cancelled = true;
      l.abort();
      stopSpeaking();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cur, attempt, kind, sub]);

  const toggle = (lb: string) => setFilter((f) => (f.includes(lb) ? f.filter((x) => x !== lb) : [...f, lb]));

  if (!queue)
    return (
      <div className="space-y-4">
        {kind === 'repeat' && (
          <div className="rounded-2xl border border-slate-200 bg-white p-3">
            <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="練習方法">
              {(
                [
                  ['repeat', 'リピート', '聞いてから言う'],
                  ['shadow', 'シャドーイング', '音声と同時に言う'],
                ] as const
              ).map(([id, t, d]) => (
                <button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={sub === id}
                  onClick={() => setSub(id)}
                  className={`rounded-xl border p-2 text-left ${sub === id ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200'}`}
                >
                  <div className="text-[13px] font-bold text-slate-800">{t}</div>
                  <div className="text-[11px] text-slate-500">{d}</div>
                </button>
              ))}
            </div>
            {sub === 'shadow' && <p className="mt-2 text-[12px] text-amber-700">音声を拾わないよう、イヤホンの使用をおすすめします。</p>}
          </div>
        )}
        <div className="rounded-2xl border border-slate-200 bg-white p-3">
          <div className="mb-2 text-[12px] font-bold text-slate-500">出題範囲（設問タイプ）</div>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              aria-pressed={filter.length === 0}
              onClick={() => setFilter([])}
              className={`rounded-full border px-3 py-1 text-[12px] font-bold ${filter.length === 0 ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 text-slate-600'}`}
            >
              全部
            </button>
            {labels.map((lb) => (
              <button
                key={lb}
                type="button"
                aria-pressed={filter.includes(lb)}
                onClick={() => toggle(lb)}
                className={`rounded-full border px-3 py-1 text-[12px] font-bold ${filter.includes(lb) ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 text-slate-600'}`}
              >
                {lb}
              </button>
            ))}
          </div>
          <p className="mt-2 text-[12px] text-slate-500">対象 {pool.length} 問からランダムに {Math.min(SESSION_SIZE, pool.length)} 問出題します。</p>
        </div>
        <button
          type="button"
          disabled={!pool.length}
          aria-label="ドリルを開始"
          onClick={start}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-3 text-[14px] font-bold text-white disabled:opacity-40"
        >
          <Play className="h-4 w-4" /> 開始
        </button>
      </div>
    );

  if (!cur) {
    const done = results.filter((r): r is QResult => !!r);
    const avg = done.length ? Math.round(done.reduce((a, r) => a + r.score, 0) / done.length) : 0;
    const lat = done.filter((r) => r.latencySec !== null);
    const avgLat = lat.length ? Math.round((lat.reduce((a, r) => a + (r.latencySec ?? 0), 0) / lat.length) * 10) / 10 : null;
    return (
      <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 text-center">
        <div className="text-[13px] font-bold text-slate-500">おつかれさまでした</div>
        <div className={`text-5xl font-black tabular-nums ${scoreColor(avg)}`}>
          {avg}
          <span className="text-lg">%</span>
        </div>
        <div className="text-[13px] text-slate-600">
          平均一致率（{done.length}/{queue.length}問）{kind === 'instant' && avgLat !== null && ` ・ 平均 ${avgLat}秒で話し始め`}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={start} className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-[13px] font-bold text-white">
            もう10問
          </button>
          <button type="button" onClick={() => setQueue(null)} className="flex-1 rounded-xl border border-slate-200 py-2.5 text-[13px] font-bold text-slate-600">
            範囲を変える
          </button>
        </div>
      </div>
    );
  }

  const res = results[idx];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-[12px] font-bold text-slate-500" aria-label={`進捗 ${idx + 1}/${queue.length}`}>
        <span>
          {idx + 1}/{queue.length}
        </span>
        <span className="truncate pl-2">{cur.itemLabel}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full bg-indigo-500 transition-all" style={{ width: `${((idx + (res ? 1 : 0)) / queue.length) * 100}%` }} />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        {kind === 'instant' ? (
          cur.ja ? (
            <>
              <div className="text-[11px] font-bold text-slate-400">この日本語を英語で言いましょう</div>
              <p className="mt-1 break-words text-[16px] font-bold text-slate-800">{cur.ja}</p>
            </>
          ) : (
            <>
              <div className="text-[11px] font-bold text-slate-400">質問に英語で答えましょう（模範解答の和訳は未収録）</div>
              <p className="mt-1 break-words text-[15px] font-bold text-slate-800">{cur.question}</p>
              <p className="mt-1 text-[13px] text-slate-500">質問: {cur.questionJa}</p>
            </>
          )
        ) : stage === 'result' ? (
          <>
            <div className="text-[11px] font-bold text-slate-400">模範解答</div>
            <p className="mt-1 break-words text-[15px] font-semibold text-slate-800">{cur.en}</p>
            {cur.ja && <p className="mt-1 text-[12px] text-slate-500">{cur.ja}</p>}
          </>
        ) : (
          <>
            <div className="flex items-center gap-1 text-[12px] font-bold text-indigo-600">
              <Volume2 className="h-4 w-4" /> {stage === 'speaking' ? '音声を聞いてください…' : sub === 'shadow' ? '音声と同時に言いましょう' : 'もう一度言ってみましょう'}
            </div>
            <p className="mt-1 break-words text-[15px] font-semibold text-slate-800">{cur.en}</p>
            {cur.ja && <p className="mt-1 text-[12px] text-slate-500">{cur.ja}</p>}
          </>
        )}
      </div>

      <ListenPanel l={l} />

      {res && (
        <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4" aria-live="polite">
          <div className="flex items-baseline justify-between">
            <span className="text-[12px] font-bold text-slate-500">一致率</span>
            <span className={`text-2xl font-black tabular-nums ${scoreColor(res.score)}`}>{res.score}%</span>
          </div>
          {kind === 'instant' && res.latencySec !== null && (
            <div className={`text-[13px] font-bold ${res.latencySec <= 3 ? 'text-emerald-600' : 'text-amber-600'}`}>
              話し始めまで {res.latencySec}秒 {res.latencySec <= 3 ? '◎' : '（3秒以内が目標）'}
            </div>
          )}
          <WordsView words={res.words} />
          <p className="break-words text-[12px] text-slate-500">あなた: {res.text || '（認識できませんでした）'}</p>
          <div className="text-[11px] text-slate-400">緑=言えた語 / 赤=抜けた語</div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {res && (
          <>
            <button type="button" aria-label="お手本をもう一度聞く" onClick={() => onSpeak(cur.en).catch(() => {})} className="flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-[12px] font-bold text-slate-600">
              <Volume2 className="h-3.5 w-3.5" /> お手本
            </button>
            <button type="button" aria-label="もう一度" onClick={() => setAttempt((a) => a + 1)} className="flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-[12px] font-bold text-slate-600">
              <RotateCcw className="h-3.5 w-3.5" /> もう一度
            </button>
          </>
        )}
        <AddPhraseButton item={cur} />
        <button
          type="button"
          aria-label="次へ"
          onClick={() => {
            setIdx((i) => i + 1);
            setAttempt(0);
          }}
          className="ml-auto flex items-center gap-1 rounded-full bg-indigo-600 px-4 py-1.5 text-[12px] font-bold text-white"
        >
          {res ? (idx + 1 >= queue.length ? '結果を見る' : '次へ') : 'スキップ'} <SkipForward className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};

// ---------------- 表現帳 ----------------

const mask = (en: string) => en.split(/\s+/).map((w) => '＿'.repeat(Math.min(Math.max(w.replace(/[^A-Za-z0-9']/g, '').length, 1), 6))).join(' ');

const PhraseReview: React.FC<{ queue: Phrase[]; onSpeak: Props['onSpeak']; onExit: () => void }> = ({ queue, onSpeak, onExit }) => {
  const [idx, setIdx] = useState(0);
  const [res, setRes] = useState<QResult | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [counts, setCounts] = useState({ good: 0, hard: 0, again: 0 });
  const [started, setStarted] = useState(0);
  const l = useListener();
  const cur = queue[idx];

  useEffect(() => {
    if (!cur) return;
    let cancelled = false;
    setRes(null);
    setRevealed(false);
    l.run().then((r) => {
      if (cancelled || !r) return;
      const c = compareSpeech(r.text, cur.en);
      setRes({ ...c, text: r.text, latencySec: r.latencySec });
      setRevealed(true);
      playSfx(c.score >= 85 ? 'correct' : c.score >= 60 ? 'good' : 'retry');
      onSpeak(cur.en).catch(() => {});
    });
    return () => {
      cancelled = true;
      l.abort();
      stopSpeaking();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, started]);

  if (!cur)
    return (
      <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 text-center">
        <div className="text-[14px] font-bold text-slate-700">今日の復習が終わりました</div>
        <div className="text-[13px] text-slate-600">
          言えた {counts.good} ・ あいまい {counts.hard} ・ まだ {counts.again}
        </div>
        <button type="button" onClick={onExit} className="w-full rounded-xl bg-indigo-600 py-2.5 text-[13px] font-bold text-white">
          一覧に戻る
        </button>
      </div>
    );

  const suggest: ReviewGrade | null = res ? (res.score >= 85 ? 'good' : res.score >= 60 ? 'hard' : 'again') : null;
  const answer = (g: ReviewGrade) => {
    reviewPhrase(cur.id, g);
    setCounts((c) => ({ ...c, [g]: c[g] + 1 }));
    setIdx((i) => i + 1);
  };
  const btns: [ReviewGrade, string, string][] = [
    ['good', '言えた', 'emerald'],
    ['hard', 'あいまい', 'amber'],
    ['again', 'まだ', 'rose'],
  ];
  const cls: Record<string, string> = {
    emerald: 'border-emerald-300 text-emerald-700',
    amber: 'border-amber-300 text-amber-700',
    rose: 'border-rose-300 text-rose-700',
  };
  const ring: Record<string, string> = { emerald: 'bg-emerald-500 text-white border-emerald-500', amber: 'bg-amber-500 text-white border-amber-500', rose: 'bg-rose-500 text-white border-rose-500' };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-[12px] font-bold text-slate-500">
        <span aria-label={`進捗 ${idx + 1}/${queue.length}`}>
          {idx + 1}/{queue.length}
        </span>
        <button type="button" onClick={onExit} className="text-slate-400 underline">
          中断
        </button>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        {cur.ja ? (
          <>
            <div className="text-[11px] font-bold text-slate-400">この日本語を英語で言いましょう</div>
            <p className="mt-1 break-words text-[16px] font-bold text-slate-800">{cur.ja}</p>
          </>
        ) : (
          <>
            {cur.question && <p className="break-words text-[13px] text-slate-500">質問: {cur.question}</p>}
            <div className="mt-1 text-[11px] font-bold text-slate-400">この英文を思い出して言いましょう</div>
            <p className="mt-1 break-words font-mono text-[15px] tracking-wide text-slate-400">{mask(cur.en)}</p>
          </>
        )}
        {revealed && <p className="mt-2 break-words border-t border-slate-100 pt-2 text-[15px] font-semibold text-slate-800">{cur.en}</p>}
      </div>
      <ListenPanel l={l} />
      {res && (
        <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4" aria-live="polite">
          <div className="flex items-baseline justify-between">
            <span className="text-[12px] font-bold text-slate-500">一致率</span>
            <span className={`text-2xl font-black tabular-nums ${scoreColor(res.score)}`}>{res.score}%</span>
          </div>
          <WordsView words={res.words} />
          <p className="break-words text-[12px] text-slate-500">あなた: {res.text || '（認識できませんでした）'}</p>
        </div>
      )}
      {!revealed && !l.listening && !l.typing && (
        <button type="button" onClick={() => setStarted((s) => s + 1)} className="text-[12px] font-bold text-indigo-600 underline">
          もう一度マイクを開始
        </button>
      )}
      <div className="flex items-center gap-2">
        {!revealed && (
          <button
            type="button"
            onClick={() => {
              l.abort();
              setRevealed(true);
            }}
            className="rounded-xl border border-slate-200 px-3 py-2 text-[12px] font-bold text-slate-600"
          >
            答えを見る
          </button>
        )}
        {revealed && (
          <button type="button" aria-label="お手本を聞く" onClick={() => onSpeak(cur.en).catch(() => {})} className="rounded-xl border border-slate-200 px-3 py-2 text-[12px] font-bold text-slate-600">
            <Volume2 className="inline h-3.5 w-3.5" /> お手本
          </button>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2" role="group" aria-label="自己評価">
        {btns.map(([g, label, c]) => (
          <button
            key={g}
            type="button"
            aria-label={label}
            onClick={() => answer(g)}
            className={`rounded-xl border-2 py-2.5 text-[13px] font-bold ${suggest === g ? ring[c] : `bg-white ${cls[c]}`}`}
          >
            {label}
            {suggest === g && <span className="block text-[10px] font-normal">おすすめ</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

const PhrasebookTab: React.FC<{ onSpeak: Props['onSpeak'] }> = ({ onSpeak }) => {
  const [list, setList] = useState<Phrase[]>(loadPhrases);
  const [queue, setQueue] = useState<Phrase[] | null>(null);
  useEffect(() => {
    const f = () => setList(loadPhrases());
    window.addEventListener('phrasebook-change', f);
    return () => window.removeEventListener('phrasebook-change', f);
  }, []);
  const due = duePhrases(list);

  if (queue) return <PhraseReview queue={queue} onSpeak={onSpeak} onExit={() => setQueue(null)} />;

  const addFillers = () => FILLER_PHRASES.forEach((f) => addPhrase({ en: f.en, ja: f.ja, source: 'filler' }));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-4">
        <div>
          <div className="text-[12px] font-bold text-slate-500">今日の復習</div>
          <div className="text-2xl font-black tabular-nums text-slate-800">
            {due.length}
            <span className="ml-0.5 text-sm font-bold text-slate-400">件</span>
          </div>
        </div>
        <button
          type="button"
          disabled={!due.length}
          aria-label="復習を開始"
          onClick={() => setQueue(due)}
          className="flex items-center gap-1 rounded-xl bg-indigo-600 px-4 py-2.5 text-[13px] font-bold text-white disabled:opacity-40"
        >
          <Play className="h-4 w-4" /> 復習開始
        </button>
      </div>

      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-center">
          <p className="text-[13px] text-slate-600">表現帳はまだ空です。解説画面の「＋表現帳」ボタンで、使いたい英文を追加できます。</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {list.map((p) => (
            <li key={p.id} className="rounded-2xl border border-slate-200 bg-white p-3">
              <div className="flex items-start justify-between gap-2">
                <p className="min-w-0 break-words text-[14px] font-semibold text-slate-800">{p.en}</p>
                <div className="flex shrink-0 items-center gap-1">
                  <button type="button" aria-label="読み上げ" onClick={() => onSpeak(p.en).catch(() => {})} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
                    <Volume2 className="h-4 w-4" />
                  </button>
                  <button type="button" aria-label="表現帳から削除" onClick={() => removePhrase(p.id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {p.ja && <p className="mt-0.5 break-words text-[12px] text-slate-500">{p.ja}</p>}
              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                {p.box >= MASTERED_BOX && (
                  <span className="flex items-center gap-0.5 rounded-full bg-emerald-100 px-2 py-0.5 font-bold text-emerald-700">
                    <Check className="h-3 w-3" /> 習得済み
                  </span>
                )}
                <span>{p.due <= Date.now() ? '今日復習' : `次回まで ${daysUntil(p)}日`}</span>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={addFillers}
        aria-label="つなぎ表現をまとめて追加"
        className="flex w-full items-center justify-center gap-1 rounded-2xl border border-indigo-200 bg-indigo-50 py-2.5 text-[13px] font-bold text-indigo-700"
      >
        <Plus className="h-4 w-4" /> 沈黙を埋めるつなぎ表現（{FILLER_PHRASES.length}件）を追加
      </button>
    </div>
  );
};

// ---------------- 本体 ----------------

export const DrillScreen: React.FC<Props> = ({ cards, gradeLabel, onSpeak, onBack, initialTab = 'repeat' }) => {
  const [tab, setTab] = useState<DrillTab>(initialTab);
  const items = useMemo(() => drillItems(cards), [cards]);

  const speak = useCallback((t: string) => onSpeak(t), [onSpeak]);

  const switchTab = (t: DrillTab) => {
    stopSpeaking();
    setTab(t);
  };

  return (
    <div className="mx-auto w-full max-w-xl px-3 pb-10 pt-4">
      <div className="mb-3 flex items-center gap-2">
        <button type="button" aria-label="戻る" onClick={onBack} className="rounded-full p-2 text-slate-500 hover:bg-slate-100">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-[16px] font-black text-slate-800">ドリル</h1>
        <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[11px] font-bold text-indigo-700">{gradeLabel}</span>
      </div>
      <div className="mb-4 grid grid-cols-3 gap-1 rounded-2xl bg-slate-100 p-1" role="tablist" aria-label="ドリルの種類">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => switchTab(t.id)}
            className={`flex flex-col items-center justify-center gap-0.5 rounded-xl py-2 text-[11px] font-bold sm:flex-row sm:gap-1 sm:text-[12px] ${tab === t.id ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500'}`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>
      {tab === 'phrasebook' ? (
        <PhrasebookTab onSpeak={speak} />
      ) : items.length ? (
        <DrillSession key={tab} kind={tab} items={items} onSpeak={speak} />
      ) : (
        <p className="rounded-2xl border border-slate-200 bg-white p-5 text-center text-[13px] text-slate-500">この級にはドリル素材がありません。</p>
      )}
    </div>
  );
};
