import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BookOpen, Settings, Square, Subtitles, Languages, Volume2, VolumeX, Sparkles, Maximize, Minimize } from 'lucide-react';
import { AnswerRecord, AppSettings, ExamCard, FinalReport, HistoryRecord, PhaseId, ScoredItem } from './types';
import { EXAM_CARDS } from './data/examCards';
import { PRE2_CARDS } from './data/pre2Cards';
import { GRADES, gradeOf } from './lib/grade';
import { EXAMINERS } from './data/examiners';
import { loadHistory, loadSettings, saveHistory, saveSettings } from './lib/settings';
import { ServerStatus, canUseClaude, fetchStatus, generateReport, EvalResult } from './lib/api';
import { setSfxEnabled, playSfx, unlockAudio } from './lib/sfx';
import { AbortedError, speak, stopSpeaking, unlockSpeech } from './lib/speech';
import { PASS_LINE, scoreAttitude } from './lib/scoring';
import { Bridge, CardState, FeedbackAction, runInterview } from './engine/interview';
import { HomeScreen } from './components/HomeScreen';
import { ExaminerFigure } from './components/ExaminerFigure';
import { ExamCardView } from './components/ExamCardView';
import { MicBar } from './components/MicBar';
import { FeedbackPanel } from './components/FeedbackPanel';
import { ReportView } from './components/ReportView';
import { Achievement, buildAchievements } from './components/ScoreHero';
import { cardProgress, passedCardCount, practiceStreak } from './lib/stats';
import { SettingsModal } from './components/SettingsModal';
import { StrategyGuideModal } from './components/StrategyGuideModal';

type Screen = 'home' | 'interview' | 'report';

const CARDS_BY_GRADE = { '3': EXAM_CARDS, pre2: PRE2_CARDS } as const;
/** 記録の級（grade 追加前の記録は 3級） */
const historyGrade = (h: HistoryRecord) => h.grade ?? (h.cardId.startsWith('pre2-') ? 'pre2' : '3');

const STEPS: { id: PhaseId[]; label: string }[] = [
  { id: ['entrance', 'greeting'], label: '入室' },
  { id: ['silent_reading'], label: '黙読' },
  { id: ['reading_aloud'], label: '音読' },
  { id: ['q1'], label: 'No.1' },
  { id: ['q2'], label: 'No.2' },
  { id: ['q3'], label: 'No.3' },
  { id: ['turnover', 'q4'], label: 'No.4' },
  { id: ['q5'], label: 'No.5' },
  { id: ['exit', 'scoring'], label: '退室' },
];
const PHASE_ORDER: PhaseId[] = ['idle', 'entrance', 'greeting', 'silent_reading', 'reading_aloud', 'q1', 'q2', 'q3', 'turnover', 'q4', 'q5', 'exit', 'scoring', 'report'];

interface PendingFeedback {
  rec: AnswerRecord;
  promise: Promise<EvalResult>;
  resolve: (a: FeedbackAction) => void;
}

export default function App() {
  const [settings, setSettings] = useState<AppSettings>(loadSettings);
  const [status, setStatus] = useState<ServerStatus>({ serverKey: false, defaultModel: '' });
  const [history, setHistory] = useState<HistoryRecord[]>(loadHistory);
  const [screen, setScreen] = useState<Screen>('home');
  const [card, setCard] = useState<ExamCard>(EXAM_CARDS[0]);
  const [showSettings, setShowSettings] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showSubs, setShowSubs] = useState(true);
  const [showJa, setShowJa] = useState(false);
  const [muted, setMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const canFullscreen = typeof document !== 'undefined' && !!document.documentElement.requestFullscreen;

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);
  const toggleFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
    else void document.documentElement.requestFullscreen().catch(() => {});
  };

  // interview live state
  const [phase, setPhase] = useState<PhaseId>('idle');
  const [line, setLine] = useState<{ text: string; ja?: string } | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [hint, setHint] = useState('');
  const [interim, setInterim] = useState('');
  const [silence, setSilence] = useState(0);
  const [cardState, setCardState] = useState<CardState>('none');
  const [timer, setTimer] = useState<number | null>(null);
  const [records, setRecords] = useState<AnswerRecord[]>([]);
  const [pending, setPending] = useState<PendingFeedback | null>(null);
  const [report, setReport] = useState<FinalReport | null>(null);
  const [aiPending, setAiPending] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  const examiner = useMemo(() => EXAMINERS.find((e) => e.id === settings.examinerId) || EXAMINERS[0], [settings.examinerId]);
  const useClaude = canUseClaude(settings, status);
  const cards = CARDS_BY_GRADE[settings.grade] ?? EXAM_CARDS;
  // 面接中・結果画面は表示中カードの級、ホームは選択中の級
  const shownGrade = screen === 'home' ? GRADES[settings.grade] ?? GRADES['3'] : GRADES[gradeOf(card)];
  const gradeHistory = useMemo(() => history.filter((h) => historyGrade(h) === settings.grade), [history, settings.grade]);
  // 本番モード: 字幕・ヒント・認識文字・黙読タイマーを出さない
  const examMode = settings.mode === 'exam';

  useEffect(() => {
    fetchStatus().then(setStatus);
  }, []);
  useEffect(() => {
    saveSettings(settings);
    setSfxEnabled(settings.sfx);
  }, [settings]);

  const speakModel = useCallback(
    (text: string) => speak(text, { voiceHints: examiner.voiceHints, rate: examiner.rate * settings.speechRate * 0.95, pitch: examiner.pitch, muted }),
    [examiner, settings.speechRate, muted]
  );

  const resetLive = () => {
    setPhase('idle');
    setLine(null);
    setSpeaking(false);
    setListening(false);
    setInterim('');
    setSilence(0);
    setCardState('none');
    setTimer(null);
    setRecords([]);
    setPending(null);
    setReport(null);
    setAiPending(false);
  };

  const stopInterview = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    stopSpeaking();
  };

  const goHome = () => {
    stopInterview();
    resetLive();
    setScreen('home');
  };

  const start = async (c: ExamCard) => {
    unlockAudio();
    stopInterview();
    unlockSpeech();
    resetLive();
    setCard(c);
    setShowJa(settings.mode === 'practice');
    setScreen('interview');
    window.scrollTo({ top: 0 });

    // マイク許可を先に取っておく（本番中にダイアログが出ないように）
    try {
      const s = await navigator.mediaDevices?.getUserMedia({ audio: true });
      s?.getTracks().forEach((t) => t.stop());
    } catch {
      /* キーボード入力で続行 */
    }

    const ac = new AbortController();
    abortRef.current = ac;
    const recMap = new Map<ScoredItem, AnswerRecord>();
    const bridge: Bridge = {
      setPhase,
      setLine: (text, ja) => setLine(text ? { text, ja } : null),
      setSpeaking,
      setListening: (a, h) => {
        setListening(a);
        if (h) setHint(h);
      },
      setInterim,
      setSilence,
      setCardState,
      setTimer,
      upsertRecord: (rec) => {
        recMap.set(rec.item, rec);
        setRecords(Array.from(recMap.values()));
      },
      showFeedback: (rec, promise) =>
        new Promise<FeedbackAction>((resolve) => {
          setPending({ rec, promise, resolve });
        }).finally(() => setPending(null)),
    };

    try {
      const result = await runInterview(c, examiner, { ...settings }, useClaude, bridge, ac.signal);
      setPhase('scoring');
      await result.evals;
      if (ac.signal.aborted) return;
      const recs = Array.from(recMap.values());
      const scores = { reading: 0, q1: 0, q2: 0, q3: 0, q4: 0, q5: 0 } as Record<ScoredItem, number>;
      recs.forEach((r) => (scores[r.item] = r.feedback?.score ?? 0));
      const attitude = scoreAttitude(recs.filter((r) => r.item !== 'reading'), result.greetingAnswered, result.greetingTotal);
      const total = Object.values(scores).reduce((a, b) => a + b, 0) + attitude;
      const passed = total >= PASS_LINE;

      const base: FinalReport = {
        scores,
        attitude,
        total,
        passed,
        summary: '講評を作成しています…',
        strengths: [],
        improvements: [],
        nextSteps: '',
        source: 'local',
      };
      const h: HistoryRecord = {
        id: String(Date.now()),
        date: new Date().toLocaleString('ja-JP'),
        cardId: c.id,
        cardTitle: c.title,
        mode: settings.mode,
        total,
        passed,
        grade: gradeOf(c),
      };
      const nextHistory = [h, ...history];
      const sameGrade = nextHistory.filter((x) => historyGrade(x) === gradeOf(c));
      setAchievements(
        buildAchievements(base, cardProgress(history, c.id), practiceStreak(nextHistory), passedCardCount(sameGrade), CARDS_BY_GRADE[gradeOf(c)].length)
      );
      setHistory(nextHistory);
      saveHistory(nextHistory);
      setReport(base);
      setRecords(recs);
      setPhase('report');
      setScreen('report');

      setAiPending(useClaude);
      const text = await generateReport(c, recs, scores, attitude, total, PASS_LINE, settings, useClaude);
      if (ac.signal.aborted) return;
      setReport({ ...base, ...text });
      setAiPending(false);
    } catch (e) {
      if (!(e instanceof AbortedError)) console.error(e);
    }
  };

  const nextCard = () => {
    const list = CARDS_BY_GRADE[gradeOf(card)];
    const i = list.findIndex((c) => c.id === card.id);
    start(list[(i + 1) % list.length]);
  };

  const phaseIdx = PHASE_ORDER.indexOf(phase);

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-3 sm:px-5">
          <button onClick={goHome} className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 text-sm font-black text-white">{shownGrade.badge}</div>
            <div className="text-left">
              <div className="text-sm font-black leading-tight sm:text-base">英検{shownGrade.label} 面接シミュレーター</div>
              <div className="hidden text-[11px] text-slate-500 sm:block">2次試験（スピーキング）本番形式トレーニング</div>
            </div>
          </button>
          <div className="ml-auto flex items-center gap-1.5">
            <span
              className={`hidden items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold sm:inline-flex ${
                useClaude ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}
            >
              <Sparkles className="h-3 w-3" /> {useClaude ? 'Claude 採点 ON' : '簡易採点'}
            </span>
            <button onClick={() => setShowGuide(true)} className="inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-50">
              <BookOpen className="h-4 w-4" /> <span className="hidden sm:inline">攻略ガイド</span>
            </button>
            <button onClick={() => setShowSettings(true)} className="inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100">
              <Settings className="h-4 w-4" /> <span className="hidden sm:inline">設定</span>
            </button>
            {canFullscreen && (
              <button
                onClick={toggleFullscreen}
                title={isFullscreen ? '全画面表示を終了（Esc）' : '全画面表示'}
                aria-label={isFullscreen ? '全画面表示を終了' : '全画面表示'}
                className="rounded-xl p-2 text-slate-700 hover:bg-slate-100"
              >
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col p-3 sm:p-5">
        {screen === 'home' && !useClaude && (
          <div className="mx-auto mb-4 flex w-full max-w-6xl flex-wrap items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <Sparkles className="h-4 w-4 shrink-0" />
            <span className="flex-1">Claude APIキーを設定すると、あなたの発話に合わせた詳しいAI採点・講評になります（未設定でも簡易採点で練習可能）。</span>
            <button onClick={() => setShowSettings(true)} className="rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-700">
              APIキーを設定
            </button>
          </div>
        )}
        {screen === 'home' && <HomeScreen cards={cards} settings={settings} history={gradeHistory} allHistory={history} onSettings={setSettings} onStart={start} />}

        {screen === 'report' && (
          <ReportView
            card={card}
            records={records}
            report={report}
            aiPending={aiPending}
            onSpeak={speakModel}
            onRetry={() => start(card)}
            onNext={nextCard}
            onHome={goHome}
            achievements={achievements}
          />
        )}

        {screen === 'interview' && (
          <div className="flex flex-1 flex-col gap-3 lg:h-[calc(100dvh-3.5rem-2.75rem)] lg:min-h-0 lg:flex-none">
            {/* progress */}
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <span className={`rounded-md px-2 py-0.5 text-[11px] font-black ${settings.mode === 'exam' ? 'bg-slate-900 text-white' : 'bg-emerald-600 text-white'}`}>
                {settings.mode === 'exam' ? '本番' : '練習'}
              </span>
              <div className="flex flex-1 items-center gap-1 overflow-x-auto">
                {STEPS.map((s, i) => {
                  const firstIdx = PHASE_ORDER.indexOf(s.id[0]);
                  const lastIdx = PHASE_ORDER.indexOf(s.id[s.id.length - 1]);
                  const active = phaseIdx >= firstIdx && phaseIdx <= lastIdx;
                  const done = phaseIdx > lastIdx;
                  return (
                    <React.Fragment key={s.label}>
                      {i > 0 && <div className={`h-0.5 w-2 shrink-0 sm:w-4 ${done || active ? 'bg-indigo-400' : 'bg-slate-200'}`} />}
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[12px] font-bold ${
                          active ? 'bg-indigo-600 text-white shadow' : done ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {s.label}
                      </span>
                    </React.Fragment>
                  );
                })}
              </div>
              <button
                onClick={goHome}
                className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-[12px] font-bold text-rose-600 hover:bg-rose-50"
              >
                <Square className="h-3 w-3" /> 中断
              </button>
            </div>

            <div className="grid flex-1 gap-3 lg:min-h-0 lg:grid-cols-12">
              {/* examiner side */}
              <div className="flex flex-col gap-3 lg:col-span-5 lg:min-h-0 lg:overflow-y-auto">
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-200 to-slate-100 shadow-sm">
                  <div className="absolute left-3 top-3 z-10 flex items-center gap-1">
                    <span className="rounded-full bg-white/80 px-2 py-0.5 text-[11px] font-bold text-slate-700">{examiner.name}</span>
                  </div>
                  <div className="absolute right-3 top-3 z-10 flex gap-1">
                    {!examMode && (
                      <>
                        <IconToggle on={showSubs} onClick={() => setShowSubs((v) => !v)} title="英語字幕">
                          <Subtitles className="h-3.5 w-3.5" />
                        </IconToggle>
                        <IconToggle on={showJa} onClick={() => setShowJa((v) => !v)} title="和訳">
                          <Languages className="h-3.5 w-3.5" />
                        </IconToggle>
                      </>
                    )}
                    <IconToggle on={!muted} onClick={() => setMuted((v) => !v)} title="解説の読み上げ音声">
                      {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                    </IconToggle>
                  </div>
                  <div className="mx-auto h-48 w-48 pt-4 sm:h-56 sm:w-56">
                    <ExaminerFigure examiner={examiner} speaking={speaking} listening={listening} />
                  </div>
                  <div className="min-h-[5.5rem] border-t border-slate-200 bg-white/90 px-4 py-3">
                    {examMode && phase !== 'scoring' ? (
                      <div className="flex items-center gap-3">
                        <div className="flex h-6 items-end gap-0.5">
                          {[0, 1, 2, 3, 4].map((i) => (
                            <span
                              key={i}
                              className={`w-1 rounded-full ${speaking ? 'animate-pulse motion-reduce:animate-none bg-indigo-500' : 'bg-slate-300'}`}
                              style={{ height: speaking ? `${[40, 80, 100, 70, 50][i]}%` : '25%', animationDelay: `${i * 0.12}s` }}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-slate-500">
                          {speaking ? '面接官が話しています。よく聞きましょう。' : listening ? 'あなたが答える番です。' : '本番モード：字幕は表示されません'}
                        </div>
                      </div>
                    ) : line ? (
                      <>
                        {showSubs ? (
                          <div className={`text-base font-semibold leading-snug sm:text-lg ${speaking ? 'text-slate-900' : 'text-slate-600'}`}>“{line.text}”</div>
                        ) : (
                          <div className="text-sm text-slate-400">（字幕オフ：耳で聞き取りましょう）</div>
                        )}
                        {showJa && line.ja && <div className="mt-1 text-xs text-slate-500">{line.ja}</div>}
                      </>
                    ) : (
                      <div className="text-sm text-slate-400">{phase === 'scoring' ? '採点しています…' : 'まもなく面接が始まります'}</div>
                    )}
                  </div>
                </div>
                <MicBar
                  exam={examMode}
                  speaking={speaking}
                  listening={listening}
                  hint={hint}
                  interim={interim}
                  silence={silence}
                  busyLabel={phase === 'silent_reading' ? '黙読中（声に出さずに読みましょう）' : phase === 'scoring' ? '採点中…' : pending ? '解説を確認しましょう' : undefined}
                />
              </div>

              {/* card / feedback side */}
              <div className="min-h-[420px] lg:col-span-7 lg:h-full lg:min-h-0">
                {pending ? (
                  <FeedbackPanel
                    key={pending.rec.item + pending.rec.answer}
                    card={card}
                    rec={pending.rec}
                    evalPromise={pending.promise}
                    autoAdvance={settings.autoAdvance}
                    readModelAnswer={settings.readModelAnswer && !muted}
                    onSpeak={speakModel}
                    onAction={(a) => {
                      stopSpeaking();
                      pending.resolve(a);
                    }}
                    prevStreak={streakBefore(pending.rec.item, records)}
                  />
                ) : (
                  <ExamCardView card={card} state={cardState} timer={examMode ? null : timer} showTranslation={showJa && !examMode} />
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <SettingsModal open={showSettings} settings={settings} status={status} onChange={setSettings} onClose={() => setShowSettings(false)} />
      <StrategyGuideModal isOpen={showGuide} grade={shownGrade.id} onClose={() => setShowGuide(false)} />
    </div>
  );
}

/** この設問の直前まで、4点以上が何問続いているか */
function streakBefore(item: ScoredItem, records: AnswerRecord[]): number {
  const order: ScoredItem[] = ['reading', 'q1', 'q2', 'q3', 'q4', 'q5'];
  let n = 0;
  for (let i = order.indexOf(item) - 1; i >= 0; i--) {
    const sc = records.find((r) => r.item === order[i])?.feedback?.score;
    if (sc !== undefined && sc >= 4) n++;
    else break;
  }
  return n;
}

const IconToggle: React.FC<{ on: boolean; onClick: () => void; title: string; children: React.ReactNode }> = ({ on, onClick, title, children }) => (
  <button
    onClick={onClick}
    title={title}
    className={`rounded-full p-1.5 transition ${on ? 'bg-indigo-600 text-white' : 'bg-white/80 text-slate-500 hover:bg-white'}`}
  >
    {children}
  </button>
);
