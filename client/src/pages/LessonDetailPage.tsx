/**
 * LessonDetailPage — Teaching slides → Quiz (87% to pass) → Results
 * On pass, writes completion to LessonsPage localStorage.
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRoute, useLocation } from 'wouter';
import {
  ArrowLeft, CheckCircle, XCircle, Trophy, Star, ChevronRight, ChevronLeft,
  BookOpen, Lightbulb, TrendingUp, AlertCircle, Target, Zap,
} from 'lucide-react';
import LESSONS_DATABASE from '@/data/lessonsData';

// ── PRNG (deterministic per lesson+question) ──────────────────────────────────

function hashStr(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleIndices(length: number, rng: () => number): number[] {
  const indices = Array.from({ length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

// ── LessonsPage localStorage writer ──────────────────────────────────────────

const LS_LESSONS = 'tt_lessons_v2';

function markLessonComplete(lessonId: string, xpReward: number) {
  try {
    const raw  = localStorage.getItem(LS_LESSONS);
    const data = raw ? JSON.parse(raw) : { completed: [], xp: 0, streak: 0, lastStudyDay: '', todayCount: 0 };
    if ((data.completed as string[]).includes(lessonId)) return; // idempotent
    const today     = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const sameDay    = data.lastStudyDay === today;
    const consecutive = data.lastStudyDay === yesterday || sameDay;
    data.completed   = [...data.completed, lessonId];
    data.xp          = (data.xp || 0) + xpReward;
    data.streak      = consecutive ? (sameDay ? data.streak : (data.streak || 0) + 1) : 1;
    data.lastStudyDay = today;
    data.todayCount  = sameDay ? (data.todayCount || 0) + 1 : 1;
    localStorage.setItem(LS_LESSONS, JSON.stringify(data));
  } catch { /* */ }
}

const LABELS = ['A', 'B', 'C', 'D'];

// ── Component ─────────────────────────────────────────────────────────────────

export default function LessonDetailPage() {
  const [, params]   = useRoute('/lessons/:id');
  const [, navigate] = useLocation();
  const lessonId     = params?.id || '1';

  const baseLesson = (LESSONS_DATABASE as any)[lessonId] || (LESSONS_DATABASE as any)['1'];

  // Shuffle answer options deterministically per lesson+question
  const lesson = useMemo(() => {
    const seedBase  = hashStr(String(lessonId));
    const questions = (baseLesson.questions || []).map((q: any, idx: number) => {
      const rng   = mulberry32(seedBase ^ hashStr(`${q.id}:${idx}:${q.question}`));
      const order = shuffleIndices(q.options.length, rng);
      return {
        ...q,
        options:       order.map((i: number) => q.options[i]),
        correctAnswer: order.indexOf(q.correctAnswer),
      };
    });
    return { ...baseLesson, questions, totalQuestions: baseLesson.totalQuestions || questions.length };
  }, [baseLesson, lessonId]);

  const sections = (lesson.sections || []) as Array<{ title: string; body: string; bullets: string[]; tip?: string }>;
  const hasSections = sections.length > 0;

  type Step = 'slides' | 'quiz' | 'results';
  const [step,            setStep]            = useState<Step>(hasSections ? 'slides' : 'quiz');
  const [slideIndex,      setSlideIndex]      = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizComplete,    setQuizComplete]    = useState(false);
  const completedRef = useRef(false);

  // Reset on lesson change
  useEffect(() => {
    setStep(hasSections ? 'slides' : 'quiz');
    setSlideIndex(0);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowExplanation(false);
    setQuizComplete(false);
    completedRef.current = false;
  }, [lessonId, hasSections]);

  // ── Results calculation ──────────────────────────────────────────────────
  function calculateResults() {
    let correct = 0;
    lesson.questions.forEach((q: any, i: number) => {
      if (selectedAnswers[i] === q.correctAnswer) correct++;
    });
    const percentage   = (correct / lesson.totalQuestions) * 100;
    const passingScore = lesson.passingScore || 87;
    const passed       = percentage >= passingScore;
    const pointsEarned = passed ? Math.round((percentage / 100) * lesson.pointsAwarded) : 0;
    return { correct, percentage, passed, pointsEarned };
  }

  const results = quizComplete ? calculateResults() : null;

  // Write completion to LessonsPage state on pass (once)
  useEffect(() => {
    if (results?.passed && !completedRef.current) {
      completedRef.current = true;
      markLessonComplete(lessonId, results.pointsEarned);
    }
  }, [results, lessonId]);

  const question   = lesson.questions[currentQuestion];
  const hasAnswered = selectedAnswers[currentQuestion] !== undefined;
  const isCorrect   = hasAnswered && selectedAnswers[currentQuestion] === question?.correctAnswer;
  const passingScore = lesson.passingScore || 87;

  // ── Handlers ──────────────────────────────────────────────────────────────
  function handleSelectAnswer(idx: number) {
    if (showExplanation) return;
    const next = [...selectedAnswers];
    next[currentQuestion] = idx;
    setSelectedAnswers(next);
    setShowExplanation(false);
  }

  function handleNext() {
    if (currentQuestion < lesson.questions.length - 1) {
      setCurrentQuestion(q => q + 1);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
      setStep('results');
    }
  }

  function handlePrev() {
    if (currentQuestion > 0) { setCurrentQuestion(q => q - 1); setShowExplanation(false); }
  }

  function retake() {
    setStep(hasSections ? 'slides' : 'quiz');
    setSlideIndex(0);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowExplanation(false);
    setQuizComplete(false);
    completedRef.current = false;
  }

  // ── Render ────────────────────────────────────────────────────────────────

  const currentSlide = sections[slideIndex] || null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 py-4 sm:py-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/lessons')}
            className="flex items-center gap-2 text-white hover:text-blue-100 mb-4 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Lessons
          </button>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-blue-100 text-sm mb-1">{lesson.level} Level</div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{lesson.title}</h1>
              <p className="text-blue-100 text-sm">{lesson.description}</p>
            </div>
            <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm text-center flex-shrink-0">
              <div className="text-blue-100 text-xs mb-1">Points</div>
              <div className="text-white text-2xl font-bold flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-300" />
                {lesson.pointsAwarded}
              </div>
            </div>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mt-4">
            {hasSections && (
              <div className="flex items-center gap-1.5">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 'slides' ? 'bg-white text-blue-600' : 'bg-white/30 text-white'}`}>1</div>
                <span className={`text-xs ${step === 'slides' ? 'text-white font-semibold' : 'text-blue-200'}`}>Learn</span>
              </div>
            )}
            {hasSections && <div className="w-6 h-0.5 bg-white/30" />}
            <div className="flex items-center gap-1.5">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 'quiz' ? 'bg-white text-blue-600' : step === 'results' ? 'bg-green-400 text-white' : 'bg-white/30 text-white'}`}>
                {hasSections ? '2' : '1'}
              </div>
              <span className={`text-xs ${step === 'quiz' ? 'text-white font-semibold' : 'text-blue-200'}`}>Quiz</span>
            </div>
            <div className="w-6 h-0.5 bg-white/30" />
            <div className="flex items-center gap-1.5">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 'results' ? 'bg-white text-blue-600' : 'bg-white/30 text-white'}`}>
                {hasSections ? '3' : '2'}
              </div>
              <span className={`text-xs ${step === 'results' ? 'text-white font-semibold' : 'text-blue-200'}`}>Results</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── SLIDES STEP ──────────────────────────────────────────────────────── */}
      {step === 'slides' && currentSlide && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Progress */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <span>Slide {slideIndex + 1} of {sections.length}</span>
            <span>{Math.round(((slideIndex + 1) / sections.length) * 100)}% complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mb-6 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
              style={{ width: `${((slideIndex + 1) / sections.length) * 100}%` }}
            />
          </div>

          {/* Slide card */}
          <div className="bg-card border-2 border-blue-200 dark:border-blue-900 rounded-2xl p-6 sm:p-8 shadow-lg mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600 flex-shrink-0" />
              {currentSlide.title}
            </h2>
            <p className="text-muted-foreground mb-5 leading-relaxed">{currentSlide.body}</p>

            <ul className="space-y-3">
              {currentSlide.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-foreground leading-snug">{b}</span>
                </li>
              ))}
            </ul>

            {currentSlide.tip && (
              <div className="mt-5 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 flex gap-3">
                <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">{currentSlide.tip}</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            <button
              onClick={() => setSlideIndex(i => i - 1)}
              disabled={slideIndex === 0}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-muted transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" /> Previous
            </button>
            {slideIndex < sections.length - 1 ? (
              <button
                onClick={() => setSlideIndex(i => i + 1)}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                Next <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={() => setStep('quiz')}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                <TrendingUp className="w-5 h-5" /> Start Quiz
              </button>
            )}
          </div>

          {/* Objectives & takeaways */}
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" /> Learning Objectives
              </h3>
              <ul className="space-y-1.5">
                {lesson.learningObjectives.map((obj: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-3.5 h-3.5 text-green-600 mt-0.5 flex-shrink-0" />
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900 rounded-xl p-4">
              <h3 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-yellow-600" /> Key Takeaways
              </h3>
              <ul className="space-y-1.5">
                {lesson.keyTakeaways.map((t: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-[9px] flex-shrink-0 mt-0.5">{i + 1}</div>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quiz info */}
          <div className="mt-4 bg-card border border-border rounded-xl p-4">
            <h3 className="font-bold text-foreground text-sm mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-600" /> Quiz Information
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 text-center">
                <p className="text-[10px] text-muted-foreground mb-1">Questions</p>
                <p className="text-2xl font-bold text-foreground">{lesson.totalQuestions}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 text-center">
                <p className="text-[10px] text-muted-foreground mb-1">Pass Score</p>
                <p className="text-2xl font-bold text-foreground">{passingScore}%</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 text-center">
                <p className="text-[10px] text-muted-foreground mb-1">Points</p>
                <p className="text-2xl font-bold text-foreground">{lesson.pointsAwarded}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── QUIZ STEP ────────────────────────────────────────────────────────── */}
      {step === 'quiz' && question && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Progress */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Question {currentQuestion + 1} of {lesson.totalQuestions}</span>
            <span className="font-semibold">{Math.round(((currentQuestion + 1) / lesson.totalQuestions) * 100)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden mb-6">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / lesson.totalQuestions) * 100}%` }}
            />
          </div>

          {/* Need 87% notice */}
          <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
            <Zap size={13} className="text-primary" />
            Score {passingScore}% or higher to pass and earn {lesson.pointsAwarded} XP
          </div>

          {/* Question card */}
          <div className="bg-white dark:bg-card border-2 border-border rounded-xl p-6 shadow-lg mb-5">
            <div className="flex items-start gap-3 mb-5">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                {currentQuestion + 1}
              </div>
              <div>
                <div className="text-xs text-blue-600 font-semibold mb-1">{question.category}</div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground">{question.question}</h3>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {question.options.map((option: string, idx: number) => {
                const isSelected    = selectedAnswers[currentQuestion] === idx;
                const isCorrectAns  = idx === question.correctAnswer;
                const showResult    = hasAnswered && showExplanation;

                let borderColor = 'border-border hover:border-blue-400';
                let bgColor     = 'hover:bg-muted/30';
                let textColor   = 'text-foreground';

                if (showResult && isCorrectAns) {
                  borderColor = 'border-green-500'; bgColor = 'bg-green-50 dark:bg-green-900/20'; textColor = 'text-green-700 dark:text-green-300';
                } else if (showResult && isSelected && !isCorrectAns) {
                  borderColor = 'border-red-500'; bgColor = 'bg-red-50 dark:bg-red-900/20'; textColor = 'text-red-700 dark:text-red-300';
                } else if (isSelected) {
                  borderColor = 'border-blue-500'; bgColor = 'bg-blue-50 dark:bg-blue-900/20'; textColor = 'text-blue-700 dark:text-blue-300';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    disabled={showExplanation}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${borderColor} ${bgColor}`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Letter label */}
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                        showResult && isCorrectAns ? 'border-green-600 bg-green-600 text-white' :
                        showResult && isSelected && !isCorrectAns ? 'border-red-600 bg-red-600 text-white' :
                        isSelected ? 'border-blue-600 bg-blue-600 text-white' :
                        'border-border text-muted-foreground'
                      }`}>
                        {showResult && isCorrectAns ? <CheckCircle className="w-4 h-4" /> :
                         showResult && isSelected && !isCorrectAns ? <XCircle className="w-4 h-4" /> :
                         LABELS[idx]}
                      </div>
                      <span className={`font-semibold ${textColor}`}>{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {hasAnswered && !showExplanation && (
              <button
                onClick={() => setShowExplanation(true)}
                className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
              >
                Check Answer
              </button>
            )}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="space-y-3 mb-5">
              <div className={`border-2 rounded-xl p-5 ${isCorrect ? 'bg-green-50 dark:bg-green-900/20 border-green-500' : 'bg-red-50 dark:bg-red-900/20 border-red-500'}`}>
                <div className="flex items-center gap-3 mb-2">
                  {isCorrect
                    ? <><CheckCircle className="w-6 h-6 text-green-600" /><h4 className="text-lg font-bold text-green-700 dark:text-green-300">Correct!</h4></>
                    : <><XCircle className="w-6 h-6 text-red-600" /><h4 className="text-lg font-bold text-red-700 dark:text-red-300">Not quite — keep going!</h4></>
                  }
                </div>
                <p className="text-sm text-muted-foreground">{question.explanation}</p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/10 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  <h4 className="font-bold text-foreground">Real-Life Insight</h4>
                </div>
                <p className="text-sm text-muted-foreground">{question.realLifeInsight}</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className="px-5 py-3 rounded-xl border border-border text-foreground font-bold hover:bg-muted transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <ChevronLeft className="w-5 h-5" /> Prev
            </button>
            <button
              onClick={handleNext}
              disabled={!hasAnswered || !showExplanation}
              className="flex-1 py-3 bg-green-600 hover:bg-green-700 disabled:bg-muted disabled:text-muted-foreground text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {currentQuestion === lesson.totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ── RESULTS STEP ─────────────────────────────────────────────────────── */}
      {step === 'results' && results && (
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className={`border-4 rounded-2xl p-8 text-center mb-6 ${
            results.passed
              ? 'bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-500'
              : 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-500'
          }`}>
            <div className="mb-4">
              {results.passed
                ? <Trophy className="w-20 h-20 text-yellow-500 mx-auto" />
                : <AlertCircle className="w-20 h-20 text-red-500 mx-auto" />
              }
            </div>

            <h2 className="text-4xl font-bold text-foreground mb-2">
              {results.passed ? 'Passed!' : 'Keep Learning!'}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {results.passed
                ? `Great work — you scored ${results.percentage.toFixed(0)}% and earned ${results.pointsEarned} XP!`
                : `You need ${passingScore}% to pass. You scored ${results.percentage.toFixed(0)}%. Try again!`
              }
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6 max-w-md mx-auto">
              <div className="bg-white dark:bg-card rounded-xl p-4 border-2 border-border">
                <p className="text-xs text-muted-foreground mb-1">Score</p>
                <p className={`text-3xl font-bold ${results.passed ? 'text-green-600' : 'text-red-600'}`}>
                  {results.percentage.toFixed(0)}%
                </p>
              </div>
              <div className="bg-white dark:bg-card rounded-xl p-4 border-2 border-border">
                <p className="text-xs text-muted-foreground mb-1">Correct</p>
                <p className="text-3xl font-bold text-foreground">{results.correct}/{lesson.totalQuestions}</p>
              </div>
              <div className="bg-white dark:bg-card rounded-xl p-4 border-2 border-border">
                <p className="text-xs text-muted-foreground mb-1">XP Earned</p>
                <p className="text-3xl font-bold text-yellow-600 flex items-center justify-center gap-1">
                  <Star className="w-6 h-6" /> {results.pointsEarned}
                </p>
              </div>
            </div>

            {/* Pass threshold bar */}
            <div className="max-w-sm mx-auto mb-6">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Your score: {results.percentage.toFixed(0)}%</span>
                <span>Pass: {passingScore}%</span>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.min(100, results.percentage)}%`,
                    background: results.passed ? '#26a69a' : '#ef5350',
                  }}
                />
              </div>
              {!results.passed && (
                <p className="text-xs text-muted-foreground mt-1">
                  Need {Math.ceil((passingScore / 100) * lesson.totalQuestions) - results.correct} more correct answer{Math.ceil((passingScore / 100) * lesson.totalQuestions) - results.correct !== 1 ? 's' : ''} to pass
                </p>
              )}
            </div>

            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={() => navigate('/lessons')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
              >
                Back to Lessons
              </button>
              <button
                onClick={retake}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors"
              >
                {results.passed ? 'Review Again' : 'Try Again'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No-slides fallback intro */}
      {step === 'quiz' && !hasSections && lesson.learningObjectives && (
        <div className="max-w-4xl mx-auto px-4 pt-6">
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-bold text-foreground text-sm mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-600" /> Objectives
              </h3>
              <ul className="space-y-1">
                {lesson.learningObjectives.map((o: string, i: number) => (
                  <li key={i} className="flex gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-3.5 h-3.5 text-green-600 mt-0.5 flex-shrink-0" />{o}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="font-bold text-foreground text-sm mb-2">Quiz Info</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-muted rounded-lg p-2 text-center">
                  <p className="text-[10px] text-muted-foreground">Questions</p>
                  <p className="font-bold text-foreground">{lesson.totalQuestions}</p>
                </div>
                <div className="bg-muted rounded-lg p-2 text-center">
                  <p className="text-[10px] text-muted-foreground">Pass Score</p>
                  <p className="font-bold text-foreground">{passingScore}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
