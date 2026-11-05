/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ExamCard,
  ExaminerProfile,
  SimulationStepId,
  InterviewMode,
  QuestionRecord,
  StepFeedback,
  FinalReportData,
  HistoryRecord,
} from './types';
import { EXAM_CARDS, EXAMINERS } from './data/examCards';
import { ExaminerAvatar } from './components/ExaminerAvatar';
import { ProblemCardView } from './components/ProblemCardView';
import { SpeechInputPanel } from './components/SpeechInputPanel';
import { InstantFeedbackCard } from './components/InstantFeedbackCard';
import { FinalReportModal } from './components/FinalReportModal';
import { StrategyGuideModal } from './components/StrategyGuideModal';
import { CardSelectorModal } from './components/CardSelectorModal';
import {
  Volume2,
  VolumeX,
  BookOpen,
  Sparkles,
  RefreshCw,
  Award,
  ChevronRight,
  HelpCircle,
  Layers,
  Settings2,
  Play,
  RotateCcw,
  Maximize,
  Minimize,
  FileText,
} from 'lucide-react';

export default function App() {
  // State: Selected Card, Examiner, Mode
  const [selectedCard, setSelectedCard] = useState<ExamCard>(EXAM_CARDS[0]);
  const [selectedExaminer, setSelectedExaminer] = useState<ExaminerProfile>(EXAMINERS[0]);
  const [mode, setMode] = useState<InterviewMode>('exam');

  // State: Interview Steps & Records
  const [currentStep, setCurrentStep] = useState<SimulationStepId>('welcome_entrance');
  const [currentSpeechText, setCurrentSpeechText] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isUserListening, setIsUserListening] = useState<boolean>(false);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [records, setRecords] = useState<QuestionRecord[]>([]);
  const [currentFeedback, setCurrentFeedback] = useState<StepFeedback | null>(null);
  const [lastUserAnswer, setLastUserAnswer] = useState<string>('');
  const [pardonCount, setPardonCount] = useState<number>(0);

  // Silent reading 20-second timer
  const [silentTimer, setSilentTimer] = useState<number>(20);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Final Report Data
  const [finalReport, setFinalReport] = useState<FinalReportData | null>(null);
  const [history, setHistory] = useState<HistoryRecord[]>(() => {
    try {
      const saved = localStorage.getItem('eiken3_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI Modals, Fullscreen & Settings
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isCardSelectorOpen, setIsCardSelectorOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [rightPaneTab, setRightPaneTab] = useState<'card' | 'feedback'>('card');

  // Monitor fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => console.warn(err));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => console.warn(err));
      }
    }
  };

  // Text-To-Speech function
  const speakText = useCallback(
    (text: string) => {
      setCurrentSpeechText(text);
      if (isMuted || !('speechSynthesis' in window)) return;

      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.92; // Slightly natural and clear pace for Grade 3 candidates
        utterance.pitch = 1.0;

        const voices = window.speechSynthesis.getVoices();
        const matchedVoice = voices.find((v) =>
          selectedExaminer.speechVoiceNameHint.some((hint) => v.name.includes(hint) || v.lang.includes(hint))
        );
        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('TTS error:', err);
        setIsSpeaking(false);
      }
    },
    [isMuted, selectedExaminer]
  );

  // Initialize or Step Change Controller
  useEffect(() => {
    setCurrentFeedback(null);
    setPardonCount(0);

    let prompt = '';
    switch (currentStep) {
      case 'welcome_entrance':
        prompt = 'Hello! May I have your score sheet, please?';
        break;
      case 'interview_warmup':
        prompt = `Thank you. My name is ${selectedExaminer.name}. What's your name, please? And how are you today?`;
        break;
      case 'card_receive':
        prompt = 'This is your card. Please take it and have a look.';
        break;
      case 'silent_reading':
        prompt = 'First, please read the passage silently for 20 seconds. All right, begin.';
        setSilentTimer(20);
        setIsTimerRunning(true);
        break;
      case 'aloud_reading':
        prompt = 'Now, please read the passage aloud.';
        break;
      case 'qa_no1':
        prompt = selectedCard.question1.questionText;
        break;
      case 'qa_no2':
        prompt = selectedCard.pictureA.questionText;
        break;
      case 'qa_no3':
        prompt = selectedCard.pictureB.questionText;
        break;
      case 'card_turnover':
        prompt = 'Now, please turn over the card and put it down.';
        setIsCardFlipped(true);
        break;
      case 'qa_no4':
        prompt = selectedCard.question4.questionText;
        break;
      case 'qa_no5':
        prompt = selectedCard.question5.questionText;
        break;
      case 'exam_finish':
        prompt = 'This is the end of the test. Could you give me the card back, please? You may go now. Have a nice day! Goodbye.';
        break;
      case 'final_report':
        prompt = 'Here is your final evaluation report. Great effort today!';
        break;
      default:
        prompt = 'Hello.';
    }

    speakText(prompt);
  }, [currentStep, selectedCard, selectedExaminer]);

  // Silent reading countdown timer
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && silentTimer > 0) {
      interval = setInterval(() => {
        setSilentTimer((prev) => prev - 1);
      }, 1000);
    } else if (silentTimer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      // Auto move to reading aloud
      setCurrentStep('aloud_reading');
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, silentTimer]);

  // Handle User Voice / Answer Submission
  const handleAnswerSubmit = async (spokenText: string) => {
    setLastUserAnswer(spokenText);
    setIsEvaluating(true);

    try {
      // Setup payload for step evaluation
      const payload = {
        cardTitle: selectedCard.title,
        stepId: currentStep,
        stepType: currentStep,
        promptQuestion: currentSpeechText,
        passageText: selectedCard.passageText,
        pictureInfo:
          currentStep === 'qa_no2'
            ? selectedCard.pictureA.title
            : currentStep === 'qa_no3'
            ? selectedCard.pictureB.title
            : '',
        userAnswer: spokenText,
        targetGrammar:
          currentStep === 'qa_no1'
            ? selectedCard.question1.grammarKey
            : currentStep === 'qa_no2'
            ? selectedCard.pictureA.grammarKey
            : currentStep === 'qa_no3'
            ? selectedCard.pictureB.grammarKey
            : 'Grade 3 standard spoken response',
        modelAnswers:
          currentStep === 'qa_no1'
            ? selectedCard.question1.modelAnswers
            : currentStep === 'qa_no2'
            ? selectedCard.pictureA.modelAnswers
            : currentStep === 'qa_no3'
            ? selectedCard.pictureB.modelAnswers
            : currentStep === 'qa_no4'
            ? selectedCard.question4.modelAnswers
            : currentStep === 'qa_no5'
            ? selectedCard.question5.modelAnswers
            : ['Here you are.', 'Thank you.'],
      };

      const res = await fetch('/api/evaluate-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const feedbackData: StepFeedback = await res.json();
      setCurrentFeedback(feedbackData);
      setRightPaneTab('feedback');

      // Record question answer
      setRecords((prev) => [
        ...prev.filter((r) => r.stepId !== currentStep),
        {
          stepId: currentStep,
          stepTitle: getStepDisplayName(currentStep),
          examinerPrompt: currentSpeechText,
          userSpokenText: spokenText,
          feedback: feedbackData,
          score: feedbackData.score,
        },
      ]);
    } catch (err) {
      console.error('Evaluation error:', err);
      // Fallback feedback
      const fallbackFeedback: StepFeedback = {
        score: 4,
        ratingLabel: 'Good Job!',
        quickFeedback: 'しっかり声に出して英語で応答できました！',
        grammarCheck: '主語と動詞をしっかり意識して答えられています。',
        betterResponses: ['Very good answer.'],
        keyTips: '笑顔と明瞭な発音を心がけましょう。',
      };
      setCurrentFeedback(fallbackFeedback);
      setRightPaneTab('feedback');
    } finally {
      setIsEvaluating(false);
    }
  };

  // Move to Next Step
  const handleNextStep = () => {
    setCurrentFeedback(null);
    setLastUserAnswer('');
    setRightPaneTab('card');
    switch (currentStep) {
      case 'welcome_entrance':
        setCurrentStep('interview_warmup');
        break;
      case 'interview_warmup':
        setCurrentStep('card_receive');
        break;
      case 'card_receive':
        setCurrentStep('silent_reading');
        break;
      case 'silent_reading':
        setIsTimerRunning(false);
        setCurrentStep('aloud_reading');
        break;
      case 'aloud_reading':
        setCurrentStep('qa_no1');
        break;
      case 'qa_no1':
        setCurrentStep('qa_no2');
        break;
      case 'qa_no2':
        setCurrentStep('qa_no3');
        break;
      case 'qa_no3':
        setCurrentStep('card_turnover');
        break;
      case 'card_turnover':
        setCurrentStep('qa_no4');
        break;
      case 'qa_no4':
        setCurrentStep('qa_no5');
        break;
      case 'qa_no5':
        setCurrentStep('exam_finish');
        break;
      case 'exam_finish':
        generateFinalReport();
        break;
      default:
        break;
    }
  };

  // Generate Final Report using Gemini API
  const generateFinalReport = async () => {
    setIsEvaluating(true);
    setCurrentStep('final_report');

    try {
      const payload = {
        cardTitle: `${selectedCard.title} (${selectedCard.japaneseTitle})`,
        userAnswersRecord: records,
        attitudeObservations: {
          pardonCount,
          responsiveness: 'Prompt and clear voice',
          eyeContact: 'Good',
        },
      };

      const res = await fetch('/api/generate-final-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const reportData: FinalReportData = await res.json();
      setFinalReport(reportData);

      // Save to local history
      const newHistoryItem: HistoryRecord = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('ja-JP'),
        cardId: selectedCard.id,
        cardTitle: selectedCard.title,
        mode,
        totalScore: reportData.totalScore,
        passed: reportData.passed,
        gradeLabel: reportData.gradeLabel,
      };

      const updatedHistory = [newHistoryItem, ...history.slice(0, 19)];
      setHistory(updatedHistory);
      try {
        localStorage.setItem('eiken3_history', JSON.stringify(updatedHistory));
      } catch (e) {
        // ignore
      }
    } catch (err) {
      console.error('Final report generation error:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Pardon Button Handler
  const handlePardon = () => {
    setPardonCount((prev) => prev + 1);
    const pardonPrompt = `I will say it once more: ${currentSpeechText}`;
    speakText(pardonPrompt);
  };

  // Replay Speech
  const handleReplaySpeech = () => {
    speakText(currentSpeechText);
  };

  // Step display name helper
  const getStepDisplayName = (step: SimulationStepId): string => {
    switch (step) {
      case 'welcome_entrance':
        return '入室・挨拶 (Entrance)';
      case 'interview_warmup':
        return '氏名確認・ウォームアップ (Warm-up)';
      case 'card_receive':
        return '問題カード受け取り (Card)';
      case 'silent_reading':
        return 'パッセージ黙読 20秒 (Silent Reading)';
      case 'aloud_reading':
        return 'パッセージ音読 (Reading Aloud)';
      case 'qa_no1':
        return 'No. 1 パッセージ質問 (Passage Q)';
      case 'qa_no2':
        return 'No. 2 イラストA 動作 (Picture A)';
      case 'qa_no3':
        return 'No. 3 イラストB 位置・数 (Picture B)';
      case 'card_turnover':
        return 'カードを裏返す (Turn over)';
      case 'qa_no4':
        return 'No. 4 受験者自身への質問1 (Preference)';
      case 'qa_no5':
        return 'No. 5 受験者自身への質問2 (Yes/No Q)';
      case 'exam_finish':
        return 'カード返却・退室 (Exit)';
      case 'final_report':
        return '総合判定レポート (Final Report)';
    }
  };

  // Reset interview session
  const handleResetSession = () => {
    setCurrentStep('welcome_entrance');
    setRecords([]);
    setCurrentFeedback(null);
    setFinalReport(null);
    setIsCardFlipped(false);
    setSilentTimer(20);
    setIsTimerRunning(false);
    setRightPaneTab('card');
  };

  // Suggested phrases based on step
  const getSuggestedPhrasesForStep = (): string[] => {
    switch (currentStep) {
      case 'welcome_entrance':
        return ['May I come in?', 'Here you are.', 'Thank you.'];
      case 'interview_warmup':
        return ["My name is Hanako Sato.", "I'm fine, thank you.", "I'm a little nervous, but ready!"];
      case 'card_receive':
        return ['Thank you.', 'All right.'];
      case 'aloud_reading':
        return [selectedCard.passageTitle];
      case 'qa_no1':
        return selectedCard.question1.modelAnswers.slice(0, 1);
      case 'qa_no2':
        return selectedCard.pictureA.modelAnswers.slice(0, 1);
      case 'qa_no3':
        return selectedCard.pictureB.modelAnswers.slice(0, 1);
      case 'card_turnover':
        return ['I have turned it over.'];
      case 'qa_no4':
        return ['I like...', 'Because it is interesting.'];
      case 'qa_no5':
        return ['Yes. I usually...', 'No. But I like to...'];
      case 'exam_finish':
        return ['Here is the card.', 'Thank you very much. Goodbye!'];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-900 flex flex-col font-sans lg:h-screen lg:overflow-hidden">
      {/* Top Global Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs shrink-0">
        <div className="max-w-7xl mx-auto px-3 sm:px-5 h-13 sm:h-14 flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo & App Title */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white font-black text-sm sm:text-base shadow-xs shrink-0">
              3級
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm sm:text-base font-black tracking-tight text-slate-900">
                  英検3級 2次試験 面接シミュレーター
                </h1>
                <span className="hidden md:inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                  AI Realtime Prep
                </span>
              </div>
              <p className="hidden sm:block text-[11px] text-slate-500 font-medium">
                面接官アバター × リアルタイム音声認識 × 即時AIフィードバック
              </p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Guide Button */}
            <button
              onClick={() => setIsGuideOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">合格虎の巻</span>
              <span className="sm:hidden">ガイド</span>
            </button>

            {/* Card & Mode Selector Button */}
            <button
              onClick={() => setIsCardSelectorOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors cursor-pointer"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">カード変更 ({selectedCard.title.split(' ')[0]})</span>
              <span className="sm:hidden">カード</span>
            </button>

            {/* Audio Voice Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? '面接官の音声をオンにする' : 'ミュートにする'}
              className={`p-1.5 sm:p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                isMuted
                  ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? '全画面表示を解除 (Exit Fullscreen)' : '全画面表示 (Fullscreen)'}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors cursor-pointer"
            >
              {isFullscreen ? (
                <>
                  <Minimize className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">全画面解除</span>
                </>
              ) : (
                <>
                  <Maximize className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">全画面</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-2 sm:p-3 lg:p-3 flex flex-col overflow-y-auto lg:overflow-hidden">
        {currentStep === 'final_report' && finalReport ? (
          /* FINAL COMPREHENSIVE REPORT VIEW */
          <div className="overflow-y-auto max-h-full pr-1">
            <FinalReportModal
              card={selectedCard}
              report={finalReport}
              records={records}
              onRetryCard={handleResetSession}
              onSelectNextCard={() => {
                const currentIndex = EXAM_CARDS.findIndex((c) => c.id === selectedCard.id);
                const nextCard = EXAM_CARDS[(currentIndex + 1) % EXAM_CARDS.length];
                setSelectedCard(nextCard);
                handleResetSession();
              }}
              onOpenDrillMode={() => {
                setMode('drill');
                setIsCardSelectorOpen(true);
              }}
            />
          </div>
        ) : (
          /* ACTIVE INTERVIEW SIMULATION VIEW */
          <div className="flex flex-col gap-2 flex-1 lg:overflow-hidden">
            {/* Step Progress Breadcrumb */}
            <div className="bg-white rounded-xl px-2.5 py-1.5 shadow-2xs border border-slate-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900 text-white">
                  Step
                </span>
                <span className="text-xs sm:text-sm font-black text-slate-900">
                  {getStepDisplayName(currentStep)}
                </span>
              </div>

              {/* Progress Dots / Steps */}
              <div className="flex items-center gap-1 text-xs overflow-x-auto py-0.5">
                {[
                  { id: 'welcome_entrance', label: '挨拶' },
                  { id: 'card_receive', label: 'カード' },
                  { id: 'aloud_reading', label: '音読' },
                  { id: 'qa_no1', label: 'No.1' },
                  { id: 'qa_no2', label: 'No.2' },
                  { id: 'qa_no3', label: 'No.3' },
                  { id: 'qa_no4', label: 'No.4' },
                  { id: 'qa_no5', label: 'No.5' },
                  { id: 'exam_finish', label: '終了' },
                ].map((s) => {
                  const isCurrent = currentStep.includes(s.id);
                  const isDone = records.some((r) => r.stepId === s.id);

                  return (
                    <span
                      key={s.id}
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                        isCurrent
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : isDone
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {s.label}
                    </span>
                  );
                })}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleResetSession}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  title="最初からやり直す"
                >
                  <RotateCcw className="w-3 h-3" /> 最初から
                </button>
              </div>
            </div>

            {/* Split Screen Layout: Left Examiner & Speech / Right Problem Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 lg:gap-3 items-start flex-1 lg:overflow-hidden">
              {/* Left Column: Examiner Avatar & Speech Recognition (5 cols) */}
              <div className="lg:col-span-5 space-y-2 flex flex-col shrink-0">
                <ExaminerAvatar
                  examiner={selectedExaminer}
                  isSpeaking={isSpeaking}
                  isListening={isUserListening}
                  currentSpeechText={currentSpeechText}
                  onReplaySpeech={handleReplaySpeech}
                  onPardonRequested={handlePardon}
                  pardonCount={pardonCount}
                />

                {/* Speech Input & Real-time Transcript */}
                <SpeechInputPanel
                  key={currentStep}
                  stepId={currentStep}
                  onAnswerSubmit={handleAnswerSubmit}
                  isEvaluating={isEvaluating}
                  onListeningChange={setIsUserListening}
                  suggestedPhrases={mode === 'practice' ? getSuggestedPhrasesForStep() : []}
                  placeholder="マイクボタンを押して英語で発話してください..."
                />

                {/* Quick Skip or Next Step Button */}
                <div className="flex items-center justify-between px-1">
                  <span className="text-[11px] text-slate-400">
                    発話後に「送信して即座に判定」を押すとAI分析が行われます
                  </span>
                  <button
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-0.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    <span>スキップして次へ</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Problem Card & Instant Feedback (7 cols) with Tab Switch */}
              <div className="lg:col-span-7 flex flex-col gap-2 lg:overflow-y-auto lg:max-h-[calc(100vh-125px)] pr-1">
                {currentFeedback && (
                  <div className="flex items-center justify-between bg-white rounded-xl p-1 border border-slate-200 shadow-2xs shrink-0">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setRightPaneTab('feedback')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          rightPaneTab === 'feedback'
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AI判定 & 模範解答</span>
                      </button>
                      <button
                        onClick={() => setRightPaneTab('card')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          rightPaneTab === 'card'
                            ? 'bg-slate-800 text-white shadow-xs'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>問題カード確認</span>
                      </button>
                    </div>
                    <span className="text-[10px] text-slate-400 mr-2 hidden sm:inline font-medium">
                      タブでカードと解説を切替
                    </span>
                  </div>
                )}

                {currentFeedback && rightPaneTab === 'feedback' ? (
                  /* Instant Feedback Card with Native English Pronunciation */
                  <InstantFeedbackCard
                    feedback={currentFeedback}
                    userAnswer={lastUserAnswer}
                    onNextStep={handleNextStep}
                    onRetry={() => {
                      setCurrentFeedback(null);
                      setRightPaneTab('card');
                    }}
                    isLastQuestion={currentStep === 'qa_no5' || currentStep === 'exam_finish'}
                    onSpeakAnswer={speakText}
                  />
                ) : (
                  /* The Physical Eiken Grade 3 Question Card */
                  <>
                    <ProblemCardView
                      card={selectedCard}
                      currentStep={currentStep}
                      isFlipped={isCardFlipped}
                      onFlipCard={() => setIsCardFlipped(!isCardFlipped)}
                      silentTimerSeconds={silentTimer}
                    />

                    {/* Practice Mode In-depth Hints when enabled */}
                    {mode === 'practice' && (
                      <div className="bg-emerald-50 rounded-xl p-2.5 border border-emerald-200/80 text-xs text-emerald-950">
                        <div className="flex items-center gap-1 font-bold text-emerald-900 mb-0.5">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                          <span>練習モード・合格ヒント:</span>
                        </div>
                        {currentStep === 'qa_no1' && (
                          <p>{selectedCard.question1.hint}</p>
                        )}
                        {currentStep === 'qa_no2' && (
                          <p>{selectedCard.pictureA.hint}</p>
                        )}
                        {currentStep === 'qa_no3' && (
                          <p>{selectedCard.pictureB.hint}</p>
                        )}
                        {currentStep === 'qa_no4' && (
                          <p>{selectedCard.question4.hint}</p>
                        )}
                        {currentStep === 'qa_no5' && (
                          <p>{selectedCard.question5.hint}</p>
                        )}
                        {currentStep === 'aloud_reading' && (
                          <p>タイトル「{selectedCard.passageTitle}」を忘れずに読み始めましょう。ピリオドでしっかり息継ぎをすると自然に聞こえます。</p>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-slate-200 py-1 text-center text-[10px] text-slate-400 shrink-0">
        英検3級 2次試験 面接シミュレーター | Powered by Gemini 3.8 Flash & Web Speech API
      </footer>

      {/* Modals */}
      <StrategyGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <CardSelectorModal
        isOpen={isCardSelectorOpen}
        onClose={() => setIsCardSelectorOpen(false)}
        selectedCardId={selectedCard.id}
        onSelectCard={(card) => {
          setSelectedCard(card);
          handleResetSession();
        }}
        selectedExaminerId={selectedExaminer.id}
        onSelectExaminer={(examiner) => setSelectedExaminer(examiner)}
        mode={mode}
        onSelectMode={(newMode) => setMode(newMode)}
        history={history}
      />
    </div>
  );
}
