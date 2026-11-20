import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BookOpen, CalendarDays, Settings, Square, Subtitles, Languages, Volume2, VolumeX, Sparkles, Maximize, Minimize } from 'lucide-react';
import { AnswerRecord, AppSettings, ExamCard, FinalReport, Grade, HistoryRecord, PhaseId, ScoredItem } from './types';
import { EXAM_CARDS } from './data/examCards';
import { PRE2_CARDS } from './data/pre2Cards';
import { GRADE2_CARDS } from './data/grade2Cards';
import { GRADES, gradeOf, historyGrade, maxScore, scoreOutOf5, scoredItems } from './lib/grade';
import { EXAMINERS } from './data/examiners';
import { loadHistory, loadSettings, saveHistory, saveSettings } from './lib/settings';
import { ServerStatus, aiName, canUseAI, fetchStatus, generateReport, EvalResult } from './lib/api';
import { setSfxEnabled, playSfx, unlockAudio } from './lib/sfx';
import { AbortedError, getActiveListen, speak, stopSpeaking, unlockSpeech } from './lib/speech';
import { PASS_LINE, scoreAttitude } from './lib/scoring';
import { Bridge, CardState, FeedbackAction, runInterview } from './engine/interview';
import { HomeScreen } from './components/HomeScreen';
import { ExaminerFigure } from './components/ExaminerFigure';
import { ExamCardView } from './components/ExamCardView';
import { MicBar } from './components/MicBar';
import { FeedbackPanel } from './components/FeedbackPanel';
import { ReportView } from './components/ReportView';
import { Achievement, buildAchievements } from './components/ScoreHero';
import { cardProgress, dateKey, passedCardCount, practiceStreak } from './lib/stats';
import { SettingsModal } from './components/SettingsModal';
import { StrategyGuideModal } from './components/StrategyGuideModal';
import { HistoryScreen } from './components/HistoryScreen';
import { SessionDetail, loadSessionDetail, saveSessionDetail } from './lib/sessionLog';
import { useModal } from './lib/useModal';
import { closeRecorderMic, openRecorderMic } from './lib/audioStore';
import { HintTarget } from './lib/hints';
import { computeAspects } from './lib/aspects';
import { HintBox } from './components/HintBox';
import { DrillScreen, DrillTab } from './components/DrillScreen';
import { Speaker } from './engine/interview';

type Screen = 'home' | 'interview' | 'report' | 'history' | 'review' | 'drill';

const CARDS_BY_GRADE: Record<Grade, ExamCard[]> = { '3': EXAM_CARDS, pre2: PRE2_CARDS, '2': GRADE2_CARDS };
const ALL_CARDS = [...EXAM_CARDS, ...PRE2_CARDS, ...GRADE2_CARDS];
const findCard = (id: string) => ALL_CARDS.find((c) => c.id === id);

type Step = { id: PhaseId[]; label: string };
const STEPS_HEAD: Step[] = [
  { id: ['entrance', 'greeting'], label: '入室' },
  { id: ['silent_reading'], label: '黙読' },
  { id: ['reading_aloud'], label: '音読' },
  { id: ['q1'], label: 'No.1' },
];
const STEPS_TAIL: Step[] = [{ id: ['exit', 'scoring'], label: '退室' }];
/** 進行バーの段階。2級は No.2 に準備時間があり、No.3 の前にカードを裏返し、No.5 が無い */
const STEPS_BY_GRADE: Record<Grade, Step[]> = (() => {
  const five: Step[] = [
    ...STEPS_HEAD,
    { id: ['q2'], label: 'No.2' },
    { id: ['q3'], label: 'No.3' },
    { id: ['turnover', 'q4'], label: 'No.4' },
    { id: ['q5'], label: 'No.5' },
    ...STEPS_TAIL,
  ];
  const four: Step[] = [
    ...STEPS_HEAD,
    { id: ['q2_prep', 'q2'], label: 'No.2' },
    { id: ['turnover', 'q3'], label: 'No.3' },
    { id: ['q4'], label: 'No.4' },
    ...STEPS_TAIL,
  ];
  return { '3': five, pre2: five, '2': four };
})();
/** クイック開始（あいさつ省略）では入室を出さず、最後は「採点」 */
const quickSteps = (steps: Step[]): Step[] =>
  steps.filter((s) => !s.id.includes('entrance')).map((s) => (s.id.includes('exit') ? { ...s, label: '採点' } : s));

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
  const [line, setLine] = useState<{ text: string; ja?: string; who?: Speaker } | null>(null);
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
  const [quickRun, setQuickRun] = useState(false);
  // お手本デモ（受験者役も自動で話す）。done = 最後まで再生した
  const [demoRun, setDemoRun] = useState<null | 'running' | 'done'>(null);
  const [drillTab, setDrillTab] = useState<DrillTab>('repeat');
  // 練習モードのヒント
  const [hintTarget, setHintTarget] = useState<HintTarget | null>(null);
  const [hintShown, setHintShown] = useState(0);
  const hintsUsedRef = useRef(0);
  // 結果画面に出している回の ID（前回との比較用）
  const [reportId, setReportId] = useState<string | null>(null);
  // 記録の振り返り
  const [review, setReview] = useState<{ detail: SessionDetail; card: ExamCard; date: string } | null>(null);
  const [historyDay, setHistoryDay] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  // 面接の途中で画面を離れる操作の確認（null なら非表示）
  const [leave, setLeave] = useState<{ run: () => void } | null>(null);
  const cardPaneRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const interviewRef = useRef<HTMLDivElement>(null);
  const micWrapRef = useRef<HTMLDivElement>(null);

  const examiner = useMemo(() => EXAMINERS.find((e) => e.id === settings.examinerId) || EXAMINERS[0], [settings.examinerId]);
  const useClaude = canUseAI(settings, status);
  const ai = aiName(settings);
  const cards = CARDS_BY_GRADE[settings.grade] ?? EXAM_CARDS;
  const steps = useMemo(() => (quickRun ? quickSteps(STEPS_BY_GRADE[gradeOf(card)]) : STEPS_BY_GRADE[gradeOf(card)]), [card, quickRun]);
  // 進行バー用: その級の段階を並べた順番（先頭 idle、末尾 report）
  const phaseOrder = useMemo<PhaseId[]>(() => ['idle', ...steps.flatMap((s) => s.id), 'report'], [steps]);
  // 面接中・結果画面は表示中カードの級、ホームは選択中の級
  const shownGrade =
    screen === 'review' && review
      ? GRADES[gradeOf(review.card)]
      : screen === 'home' || screen === 'history'
        ? GRADES[settings.grade] ?? GRADES['3']
        : GRADES[gradeOf(card)];
  const gradeHistory = useMemo(() => history.filter((h) => historyGrade(h) === settings.grade), [history, settings.grade]);
  // 本番モード: 字幕・ヒント・認識文字・黙読タイマーを出さない
  const examMode = settings.mode === 'exam' && !demoRun;

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
    setHintTarget(null);
    setHintShown(0);
    hintsUsedRef.current = 0;
    setDemoRun(null);
  };

  const stopInterview = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    stopSpeaking();
    closeRecorderMic();
  };

  const goHome = () => {
    stopInterview();
    resetLive();
    setScreen('home');
  };

  const start = async (c: ExamCard, opts: { demo?: boolean } = {}) => {
    const demo = !!opts.demo;
    unlockAudio();
    stopInterview();
    unlockSpeech();
    resetLive();
    setCard(c);
    setReview(null);
    setDemoRun(demo ? 'running' : null);
    const quick = settings.mode === 'practice' && settings.quickStart && !demo;
    setQuickRun(quick);
    setShowJa(settings.mode === 'practice' || demo);
    setScreen('interview');
    window.scrollTo({ top: 0 });

    if (!demo) {
      // マイク許可を先に取っておく（本番中にダイアログが出ないように）。録音する場合はマイクを開いたままにする
      if (settings.recordAudio && (await openRecorderMic())) {
        /* 録音用に開いたまま */
      } else {
        try {
          const s = await navigator.mediaDevices?.getUserMedia({ audio: true });
          s?.getTracks().forEach((t) => t.stop());
        } catch {
          /* キーボード入力で続行 */
        }
      }
    }

    const ac = new AbortController();
    abortRef.current = ac;
    const recMap = new Map<ScoredItem, AnswerRecord>();
    const bridge: Bridge = {
      setPhase,
      setLine: (text, ja, who) => setLine(text ? { text, ja, who } : null),
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
      setHintTarget: (t) => {
        setHintTarget(t);
        setHintShown(0);
      },
      takeHintsUsed: () => {
        const n = hintsUsedRef.current;
        hintsUsedRef.current = 0;
        return n;
      },
    };

    // デモの受験者役: 面接官とは別の声
    const other = EXAMINERS.find((e) => e.id !== examiner.id) ?? examiner;
    try {
      const result = await runInterview(c, examiner, { ...settings }, useClaude, bridge, ac.signal, {
        demo,
        candidateVoice: { voiceHints: other.voiceHints, rate: other.rate, pitch: Math.min(1.4, other.pitch + 0.15) },
      });
      closeRecorderMic();
      if (demo) {
        if (!ac.signal.aborted) {
          setPhase('report');
          setDemoRun('done');
        }
        return;
      }
      setPhase('scoring');
      await result.evals;
      if (ac.signal.aborted) return;
      const recs = Array.from(recMap.values());
      const scores = { reading: 0, q1: 0, q2: 0, q3: 0, q4: 0, q5: 0 } as Record<ScoredItem, number>;
      const items = scoredItems(c);
      recs.forEach((r) => {
        if (items.includes(r.item)) scores[r.item] = Math.min(maxScore(c, r.item), r.feedback?.score ?? 0);
      });
      const attitude = scoreAttitude(recs.filter((r) => r.item !== 'reading'), result.greetingAnswered, result.greetingTotal);
      const total = items.reduce((a, k) => a + scores[k], 0) + attitude;
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
        ...(quick ? { quick: true } : {}),
      };
      // 振り返り用の詳細（容量不足なら古い詳細から削除される）
      // 講評の生成前に画面を離れた場合に備え、仮の文言ではなく「未保存」と残す
      const detail: SessionDetail = {
        id: h.id,
        cardId: c.id,
        grade: gradeOf(c),
        mode: settings.mode,
        quick: quick || undefined,
        records: recs,
        report: { ...base, summary: '（総合講評の作成前に画面を移動したため、講評は保存されていません）' },
      };
      // 別タブで増えた記録を消さないよう、保存済みの一覧を読み直して先頭に追加
      const nextHistory = [h, ...loadHistory().filter((x) => x.id !== h.id)];
      const sameGrade = nextHistory.filter((x) => historyGrade(x) === gradeOf(c));
      setAchievements(
        buildAchievements(c, base, cardProgress(history, c.id), practiceStreak(nextHistory), passedCardCount(sameGrade), CARDS_BY_GRADE[gradeOf(c)].length)
      );
      setHistory(saveHistory(nextHistory));
      saveSessionDetail(detail);
      setHistoryDay(null); // 次に記録を開いたときは最新の日を表示
      setReportId(h.id);
      setReport(base);
      setRecords(recs);
      setPhase('report');
      setScreen('report');

      setAiPending(useClaude);
      const text = await generateReport(c, recs, scores, attitude, total, PASS_LINE, settings, useClaude);
      const full = { ...base, ...text };
      // 画面を離れていても、記録には完成した講評を残す
      saveSessionDetail({ ...detail, report: full });
      if (ac.signal.aborted) return;
      setReport(full);
      setAiPending(false);
    } catch (e) {
      if (!(e instanceof AbortedError)) console.error(e);
    }
  };

  /** 前回（同じ級で、この回より前）の観点別スコア */
  const previousAspects = (id: string | null, grade: Grade) => {
    if (!id) return null;
    for (const h of history) {
      if (h.id === id || Number(h.id) >= Number(id) || historyGrade(h) !== grade) continue;
      const d = loadSessionDetail(h.id);
      const c = findCard(h.cardId);
      if (!d || !c) continue;
      return { values: computeAspects(c, d.records, d.report).values, label: `前回（${h.date.split(' ')[0]}）` };
    }
    return null;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reportPrev = useMemo(() => previousAspects(reportId, gradeOf(card)), [reportId, card, history]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reviewPrev = useMemo(() => (review ? previousAspects(review.detail.id, gradeOf(review.card)) : null), [review, history]);

  const openDrill = (tab: DrillTab) => {
    stopInterview();
    resetLive();
    setDrillTab(tab);
    setScreen('drill');
    window.scrollTo({ top: 0 });
  };

  const revealHint = () => {
    setHintShown((n) => {
      hintsUsedRef.current = Math.max(hintsUsedRef.current, n + 1);
      return n + 1;
    });
    // ヒントを読んでいる間に「無言」で打ち切られないよう延長
    getActiveListen()?.extend?.();
  };

  /** 面接の途中なら確認してから実行（記録が残らないため） */
  const guardLeave = (run: () => void) => {
    if (screen === 'interview' && phase !== 'idle' && !demoRun) setLeave({ run });
    else run();
  };
  const closeLeave = useCallback(() => setLeave(null), []);
  useModal(!!leave, closeLeave);
  // 確認中に面接が終わったら、確認は閉じる
  useEffect(() => {
    if (screen !== 'interview') setLeave(null);
  }, [screen]);

  // スマホ: カードが渡されたとき・解説が出たときに、その位置まで自動でスクロール
  const hasPending = !!pending;
  useEffect(() => {
    if (screen !== 'interview' || window.innerWidth >= 1024) return;
    if (cardState === 'none' && !hasPending) return;
    cardPaneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [screen, cardState, hasPending]);
  // スマホ: 下に固定したマイク欄の高さぶん、ページ下に余白を取る（カードの下端まで読めるように）
  useEffect(() => {
    const wrap = micWrapRef.current;
    const root = interviewRef.current;
    if (screen !== 'interview' || !wrap || !root || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => root.style.setProperty('--mic-h', `${wrap.offsetHeight}px`));
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [screen]);
  // 進行バー: 現在の段階が見える位置まで横スクロール
  useEffect(() => {
    const box = stepsRef.current;
    const el = box?.querySelector<HTMLElement>('[aria-current="step"]');
    if (!box || !el) return;
    const b = box.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    box.scrollTo({ left: box.scrollLeft + r.left - b.left - (b.width - r.width) / 2, behavior: 'smooth' });
  }, [phase]);

  const nextCard = () => {
    const list = CARDS_BY_GRADE[gradeOf(card)];
    const i = list.findIndex((c) => c.id === card.id);
    start(list[(i + 1) % list.length]);
  };

  const phaseIdx = phaseOrder.indexOf(phase);
  // デモの受験者役が話している間は、面接官の口を動かさない
  const examinerSpeaking = speaking && line?.who !== 'candidate';

  const openHistory = () => {
    stopInterview();
    resetLive();
    setReview(null);
    // 初回は最後に練習した日を選んでおく
    setHistoryDay((d) => d ?? (history[0] ? dateKey(Number(history[0].id) || 0) : null));
    setScreen('history');
    window.scrollTo({ top: 0 });
  };

  /** 記録の詳細を開く。カードが見つからない・詳細が削除済みなら false */
  const openReview = (h: HistoryRecord) => {
    const detail = loadSessionDetail(h.id);
    const c = findCard(h.cardId);
    if (!detail || !c) return false;
    setReview({ detail, card: c, date: h.date });
    setScreen('review');
    window.scrollTo({ top: 0 });
    return true;
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-3 sm:px-5">
          <button onClick={() => guardLeave(goHome)} aria-label="ホームへ戻る" className="flex min-w-0 items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 text-sm font-black text-white">{shownGrade.badge}</div>
            <div className="min-w-0 text-left">
              <div className="truncate text-sm font-black leading-tight sm:text-base">
                英検{shownGrade.label} 面接<span className="hidden min-[420px]:inline">シミュレーター</span>
              </div>
              <div className="hidden text-[11px] text-slate-500 sm:block">2次試験（スピーキング）本番形式トレーニング</div>
            </div>
          </button>
          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-1.5">
            <span
              className={`hidden items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold sm:inline-flex ${
                useClaude ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}
            >
              <Sparkles className="h-3 w-3" /> {useClaude ? `${ai} 採点 ON` : '簡易採点'}
            </span>
            <button
              onClick={() => guardLeave(openHistory)}
              aria-label="練習の記録"
              className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-bold hover:bg-indigo-50 ${screen === 'history' || screen === 'review' ? 'bg-indigo-50 text-indigo-700' : 'text-indigo-700'}`}
            >
              <CalendarDays className="h-4 w-4" /> <span className="hidden sm:inline">記録</span>
            </button>
            <button onClick={() => setShowGuide(true)} aria-label="攻略ガイド" className="inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-bold text-amber-800 hover:bg-amber-50">
              <BookOpen className="h-4 w-4" /> <span className="hidden sm:inline">攻略ガイド</span>
            </button>
            <button onClick={() => setShowSettings(true)} aria-label="設定" className="inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100">
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
          <div className="mx-auto mb-4 flex w-full max-w-6xl items-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-[13px] text-amber-900 sm:px-4 sm:py-3 sm:text-sm">
            <Sparkles className="h-4 w-4 shrink-0" />
            <span className="flex-1">
              <span className="sm:hidden">いまは簡易採点。APIキーを設定するとAIが詳しく採点・講評。</span>
              <span className="hidden sm:inline">Claude または Gemini の APIキーを設定すると、あなたの発話に合わせた詳しいAI採点・講評になります（未設定でも簡易採点で練習可能）。</span>
            </span>
            <button onClick={() => setShowSettings(true)} className="shrink-0 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-700">
              APIキーを設定
            </button>
          </div>
        )}
        {screen === 'home' && <HomeScreen cards={cards} settings={settings} history={gradeHistory} allHistory={history} onSettings={setSettings} onStart={(c) => start(c)} onOpenHistory={openHistory} onDemo={(c) => start(c, { demo: true })} onOpenDrill={openDrill} />}

        {screen === 'drill' && <DrillScreen key={drillTab} cards={cards} gradeLabel={GRADES[settings.grade]?.label ?? '3級'} onSpeak={speakModel} onBack={goHome} initialTab={drillTab} />}

        {screen === 'history' && (
          <HistoryScreen history={history} day={historyDay} onDayChange={setHistoryDay} onOpen={openReview} onBack={goHome} cardExists={(id) => !!findCard(id)} />
        )}

        {screen === 'review' && review && (
          <ReportView
            key={review.detail.id}
            card={review.card}
            records={review.detail.records}
            report={review.detail.report}
            aiPending={false}
            onSpeak={speakModel}
            onRetry={() => start(review.card)}
            previousAspects={reviewPrev}
            onNext={() => {}}
            onHome={openHistory}
            achievements={[]}
            review={{
              date: review.date,
              mode: review.detail.mode,
              quick: !!review.detail.quick,
              retryLabel: `このカードでもう一度（${settings.mode === 'exam' ? '本番モード' : settings.quickStart ? 'クイック練習' : '練習モード'}）`,
            }}
          />
        )}

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
            previousAspects={reportPrev}
          />
        )}

        {screen === 'interview' && (
          <div ref={interviewRef} className="flex flex-1 flex-col gap-3 pb-[calc(var(--mic-h,11rem)+0.5rem)] lg:h-[calc(100dvh-3.5rem-2.75rem)] lg:min-h-0 lg:flex-none lg:pb-0">
            {/* progress */}
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <span className={`rounded-md px-2 py-0.5 text-[11px] font-black ${demoRun ? 'bg-violet-600 text-white' : settings.mode === 'exam' ? 'bg-slate-900 text-white' : 'bg-emerald-600 text-white'}`}>
                {demoRun ? 'お手本デモ' : settings.mode === 'exam' ? '本番' : quickRun ? 'クイック練習' : '練習'}
              </span>
              <div ref={stepsRef} className="flex flex-1 items-center gap-1 overflow-x-auto [scrollbar-width:none]">
                {steps.map((s, i) => {
                  const firstIdx = phaseOrder.indexOf(s.id[0]);
                  const lastIdx = phaseOrder.indexOf(s.id[s.id.length - 1]);
                  const active = phaseIdx >= firstIdx && phaseIdx <= lastIdx;
                  const done = phaseIdx > lastIdx;
                  return (
                    <React.Fragment key={s.label}>
                      {i > 0 && <div className={`h-0.5 w-2 shrink-0 sm:w-4 ${done || active ? 'bg-indigo-400' : 'bg-slate-200'}`} />}
                      <span
                        aria-current={active ? 'step' : undefined}
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
                onClick={() => guardLeave(goHome)}
                className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-[12px] font-bold text-rose-600 hover:bg-rose-50"
              >
                <Square className="h-3 w-3" /> 中断
              </button>
            </div>

            <div className="grid flex-1 grid-cols-1 gap-3 lg:min-h-0 lg:grid-cols-12">
              {/* examiner side */}
              <div className="flex min-w-0 flex-col gap-3 lg:col-span-5 lg:min-h-0 lg:overflow-y-auto">
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
                  <div className="mx-auto h-36 w-36 pt-3 sm:h-56 sm:w-56 sm:pt-4">
                    <ExaminerFigure examiner={examiner} speaking={examinerSpeaking} listening={listening} />
                  </div>
                  <div className="min-h-[4.5rem] border-t border-slate-200 bg-white/90 px-4 py-3 sm:min-h-[5.5rem]" aria-live="polite">
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
                        {line.who === 'candidate' && (
                          <div className="mb-0.5 inline-block rounded bg-violet-600 px-1.5 py-0.5 text-[10px] font-black text-white">受験者（お手本）</div>
                        )}
                        {showSubs ? (
                          <div className={`text-base font-semibold leading-snug sm:text-lg ${line.who === 'candidate' ? 'text-violet-900' : speaking ? 'text-slate-900' : 'text-slate-600'}`}>“{line.text}”</div>
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
                {/* スマホではカードを読みながら答えられるよう、画面下に固定 */}
                <div ref={micWrapRef} className="fixed inset-x-0 bottom-0 z-20 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:static lg:p-0">
                {hintTarget && listening && !examMode && <HintBox target={hintTarget} shown={hintShown} onReveal={revealHint} />}
                <MicBar
                  exam={examMode}
                  speaking={examinerSpeaking}
                  listening={listening}
                  hint={hint}
                  interim={interim}
                  silence={silence}
                  busyLabel={demoRun ? (demoRun === 'done' ? 'お手本デモはここまで' : 'お手本デモ：受験者役の答え方をよく聞きましょう') : phase === 'silent_reading' ? '黙読中（声に出さずに読みましょう）' : phase === 'q2_prep' ? '準備時間（20秒）：3コマの流れを頭の中で組み立てましょう' : phase === 'scoring' ? '採点中…' : pending ? '解説を確認しましょう' : undefined}
                />
                </div>
              </div>

              {/* card / feedback side */}
              <div ref={cardPaneRef} className="min-h-[420px] min-w-0 scroll-mt-[4.25rem] lg:col-span-7 lg:h-full lg:min-h-0">
                {demoRun === 'done' ? (
                  <div className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-violet-200 bg-violet-50 p-6 text-center shadow-sm">
                    <div className="text-lg font-black text-violet-900">お手本デモはここまで</div>
                    <p className="max-w-sm text-sm text-violet-900/80">流れと答え方をつかんだら、同じカードで実際に答えてみましょう。</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <button onClick={() => start(card)} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700">
                        このカードで挑戦（{settings.mode === 'exam' ? '本番モード' : '練習モード'}）
                      </button>
                      <button onClick={() => start(card, { demo: true })} className="rounded-xl border border-violet-300 bg-white px-4 py-2 text-sm font-bold text-violet-800 hover:bg-violet-100">
                        もう一度見る
                      </button>
                      <button onClick={goHome} className="rounded-xl px-4 py-2 text-sm font-bold text-slate-600 hover:bg-white">
                        ホームへ
                      </button>
                    </div>
                  </div>
                ) : pending ? (
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
                    prevStreak={streakBefore(card, pending.rec.item, records)}
                  />
                ) : (
                  <ExamCardView card={card} state={cardState} timer={examMode ? null : timer} timerLabel={phase === 'q2_prep' ? '準備' : '黙読'} showTranslation={showJa && !examMode} />
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {leave && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fadeIn" onClick={closeLeave}>
          <div role="alertdialog" aria-modal="true" aria-labelledby="leave-title" className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 id="leave-title" className="text-base font-black text-slate-900">面接を中断しますか？</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">ここまでの回答と採点は記録に残りません。</p>
            <div className="mt-4 flex justify-end gap-2">
              <button autoFocus onClick={closeLeave} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700">
                面接を続ける
              </button>
              <button
                onClick={() => {
                  const run = leave.run;
                  setLeave(null);
                  run();
                }}
                className="rounded-xl border border-rose-200 px-4 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50"
              >
                中断する
              </button>
            </div>
          </div>
        </div>
      )}

      <SettingsModal open={showSettings} settings={settings} status={status} onChange={setSettings} onClose={() => setShowSettings(false)} />
      <StrategyGuideModal isOpen={showGuide} grade={shownGrade.id} onClose={() => setShowGuide(false)} />
    </div>
  );
}

/** この設問の直前まで、4点以上が何問続いているか */
function streakBefore(card: ExamCard, item: ScoredItem, records: AnswerRecord[]): number {
  const order = scoredItems(card);
  let n = 0;
  for (let i = order.indexOf(item) - 1; i >= 0; i--) {
    const sc = records.find((r) => r.item === order[i])?.feedback?.score;
    if (sc !== undefined && scoreOutOf5(sc, maxScore(card, order[i])) >= 4) n++;
    else break;
  }
  return n;
}

const IconToggle: React.FC<{ on: boolean; onClick: () => void; title: string; children: React.ReactNode }> = ({ on, onClick, title, children }) => (
  <button
    onClick={onClick}
    title={title}
    aria-label={title}
    aria-pressed={on}
    className={`rounded-full p-1.5 transition ${on ? 'bg-indigo-600 text-white' : 'bg-white/80 text-slate-500 hover:bg-white'}`}
  >
    {children}
  </button>
);
