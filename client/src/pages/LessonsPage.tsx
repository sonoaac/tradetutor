/**
 * LessonsPage — Duolingo-style gamified learning path.
 * All progress persisted to localStorage. Zero backend required.
 */
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';
import {
  Lock, CheckCircle, Star, Flame, Trophy, Zap, Target, BookOpen,
  PlayCircle, Award, GraduationCap, TrendingUp, BarChart2, Brain,
  Shield, Layers, Activity, ChevronRight, Crown
} from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

export type LessonId = string;

interface Lesson {
  id: LessonId;
  title: string;
  desc: string;
  xp: number;
  duration: string;
  difficulty: 1 | 2 | 3;
  icon: React.ElementType;
}

interface Module {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  bg: string;
  icon: React.ElementType;
  lessons: Lesson[];
}

const MODULES: Module[] = [
  {
    id: 'foundations',
    title: 'Trading Foundations',
    subtitle: 'Start here — learn what trading actually is',
    color: '#26a69a',
    bg: '#26a69a20',
    icon: BookOpen,
    lessons: [
      { id: 'f1', title: 'What is Trading?',         desc: 'Markets, assets, and the basics of buying & selling', xp: 50,  duration: '8 min',  difficulty: 1, icon: BookOpen },
      { id: 'f2', title: 'Stocks vs Crypto vs Forex', desc: 'How each asset class behaves differently',            xp: 60,  duration: '10 min', difficulty: 1, icon: Layers },
      { id: 'f3', title: 'Order Types Explained',     desc: 'Market orders, limit orders, stop orders',           xp: 70,  duration: '12 min', difficulty: 1, icon: Activity },
      { id: 'f4', title: 'Bulls, Bears & Trends',     desc: 'Understand market direction and momentum',           xp: 60,  duration: '10 min', difficulty: 1, icon: TrendingUp },
    ],
  },
  {
    id: 'charts',
    title: 'Reading the Chart',
    subtitle: 'Learn to see what the price is telling you',
    color: '#2196f3',
    bg: '#2196f320',
    icon: BarChart2,
    lessons: [
      { id: 'c1', title: 'Candlestick Basics',        desc: 'Open, high, low, close — the DNA of every candle',   xp: 80,  duration: '12 min', difficulty: 1, icon: BarChart2 },
      { id: 'c2', title: 'Support & Resistance',      desc: 'Price floors and ceilings every trader watches',     xp: 90,  duration: '15 min', difficulty: 2, icon: Activity },
      { id: 'c3', title: 'Trend Lines & Channels',    desc: 'Draw the path price is travelling',                  xp: 90,  duration: '14 min', difficulty: 2, icon: TrendingUp },
      { id: 'c4', title: 'Chart Patterns',            desc: 'Flags, triangles, head & shoulders',                 xp: 120, duration: '20 min', difficulty: 2, icon: BarChart2 },
    ],
  },
  {
    id: 'indicators',
    title: 'Technical Indicators',
    subtitle: 'Use math to find trading signals',
    color: '#9c27b0',
    bg: '#9c27b020',
    icon: Brain,
    lessons: [
      { id: 'i1', title: 'Moving Averages (MA)',       desc: 'MA9, MA21, MA50 — smooth the noise',                xp: 100, duration: '15 min', difficulty: 2, icon: Activity },
      { id: 'i2', title: 'RSI — Overbought/Oversold', desc: 'Find extreme prices before reversals',              xp: 110, duration: '18 min', difficulty: 2, icon: Brain },
      { id: 'i3', title: 'Bollinger Bands',            desc: 'Volatility-based channels that squeeze before breakouts', xp: 120, duration: '20 min', difficulty: 2, icon: Layers },
      { id: 'i4', title: 'Volume Analysis',            desc: 'Confirm moves with trading volume',                 xp: 100, duration: '15 min', difficulty: 2, icon: BarChart2 },
    ],
  },
  {
    id: 'risk',
    title: 'Risk & Strategy',
    subtitle: 'The most important chapter — protect your capital',
    color: '#ef5350',
    bg: '#ef535020',
    icon: Shield,
    lessons: [
      { id: 'r1', title: 'Stop Loss & Take Profit',   desc: 'Define your exit before you enter',                 xp: 130, duration: '18 min', difficulty: 2, icon: Shield },
      { id: 'r2', title: 'Risk/Reward Ratio',         desc: 'Why 1:2 R:R changes everything',                   xp: 140, duration: '20 min', difficulty: 2, icon: Target },
      { id: 'r3', title: 'Position Sizing',           desc: 'Never risk more than 1–2% per trade',               xp: 150, duration: '22 min', difficulty: 3, icon: Activity },
      { id: 'r4', title: 'Trading Psychology',        desc: 'Fear, greed, and how to master your emotions',      xp: 160, duration: '25 min', difficulty: 3, icon: Brain },
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced Concepts',
    subtitle: 'Level up your edge with professional techniques',
    color: '#ff9800',
    bg: '#ff980020',
    icon: Trophy,
    lessons: [
      { id: 'a1', title: 'Market Structure',           desc: 'Higher highs, lower lows — reading the macro picture', xp: 180, duration: '28 min', difficulty: 3, icon: Layers },
      { id: 'a2', title: 'Multi-Timeframe Analysis',  desc: 'Align daily, 4h, and 1h charts for precision entries', xp: 200, duration: '30 min', difficulty: 3, icon: BarChart2 },
      { id: 'a3', title: 'Fundamental vs Technical',  desc: 'When news drives price, technicals are secondary',    xp: 170, duration: '25 min', difficulty: 3, icon: Brain },
      { id: 'a4', title: 'Building a Trading System', desc: 'Rules, back-testing, and staying consistent',         xp: 250, duration: '40 min', difficulty: 3, icon: Crown },
    ],
  },
  {
    id: 'final',
    title: 'Final Challenge',
    subtitle: 'Prove your mastery across all modules',
    color: '#f5c842',
    bg: '#f5c84220',
    icon: GraduationCap,
    lessons: [
      { id: 'x1', title: 'Grand Final Exam',          desc: '50 questions covering everything you have learned',   xp: 500, duration: '60 min', difficulty: 3, icon: GraduationCap },
    ],
  },
];

const ALL_LESSONS = MODULES.flatMap(m => m.lessons);
const TOTAL_XP    = ALL_LESSONS.reduce((s, l) => s + l.xp, 0);

// ─── localStorage persistence ─────────────────────────────────────────────────

const LS_KEY = 'tt_lessons_v2';

interface SavedProgress {
  completed: LessonId[];
  xp: number;
  streak: number;
  lastStudyDay: string;
  todayCount: number;
}

function loadProgress(): SavedProgress {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* */ }
  return { completed: [], xp: 0, streak: 0, lastStudyDay: '', todayCount: 0 };
}

function saveProgress(p: SavedProgress) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(p)); } catch { /* */ }
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

// ─── XP → level ────────────────────────────────────────────────────────────────

function xpToLevel(xp: number): { level: number; title: string; pct: number; toNext: number } {
  const levels = [
    { min: 0,    title: 'Rookie' },
    { min: 200,  title: 'Student' },
    { min: 500,  title: 'Trader' },
    { min: 900,  title: 'Analyst' },
    { min: 1400, title: 'Strategist' },
    { min: 2000, title: 'Pro Trader' },
    { min: 2700, title: 'Expert' },
    { min: 3500, title: 'Master' },
  ];
  let level = 1;
  for (let i = levels.length - 1; i >= 0; i--) {
    if (xp >= levels[i].min) { level = i + 1; break; }
  }
  const curr = levels[level - 1].min;
  const next = level < levels.length ? levels[level].min : TOTAL_XP;
  const pct  = Math.min(100, ((xp - curr) / (next - curr)) * 100);
  return { level, title: levels[level - 1].title, pct, toNext: next - xp };
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function DifficultyStars({ n }: { n: 1 | 2 | 3 }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3].map(i => (
        <Star key={i} size={10} fill={i <= n ? '#f5c842' : 'none'} stroke={i <= n ? '#f5c842' : '#4b5563'} />
      ))}
    </span>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function LessonsPage() {
  const [, navigate] = useLocation();
  const [progress, setProgress] = useState<SavedProgress>(loadProgress);
  const [activeModule, setActiveModule] = useState<string | null>(null);

  // Persist on change
  useEffect(() => { saveProgress(progress); }, [progress]);

  // Streak calculation on mount
  useEffect(() => {
    const today = todayKey();
    setProgress(p => {
      if (p.lastStudyDay === today) return p;
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const newStreak = p.lastStudyDay === yesterday ? p.streak : 0;
      return { ...p, streak: newStreak };
    });
  }, []);

  const completeLesson = useCallback((lessonId: LessonId, xpReward: number) => {
    const today = todayKey();
    setProgress(p => {
      if (p.completed.includes(lessonId)) return p;
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const sameDay    = p.lastStudyDay === today;
      const consecutive = p.lastStudyDay === yesterday || sameDay;
      return {
        completed: [...p.completed, lessonId],
        xp: p.xp + xpReward,
        streak: consecutive ? (sameDay ? p.streak : p.streak + 1) : 1,
        lastStudyDay: today,
        todayCount: sameDay ? p.todayCount + 1 : 1,
      };
    });
  }, []);

  const resetAll = useCallback(() => {
    const fresh: SavedProgress = { completed: [], xp: 0, streak: 0, lastStudyDay: '', todayCount: 0 };
    setProgress(fresh);
  }, []);

  const { level, title: levelTitle, pct: levelPct, toNext } = xpToLevel(progress.xp);
  const completedCount = progress.completed.length;
  const totalLessons   = ALL_LESSONS.length;

  // Is a lesson unlocked? First lesson of first module is always unlocked.
  // Each lesson unlocks after the previous one is completed.
  function isUnlocked(lesson: Lesson, moduleIndex: number, lessonIndex: number): boolean {
    if (moduleIndex === 0 && lessonIndex === 0) return true;
    // Need previous lesson done
    const flat = ALL_LESSONS;
    const myIdx = flat.findIndex(l => l.id === lesson.id);
    if (myIdx === 0) return true;
    return progress.completed.includes(flat[myIdx - 1].id);
  }

  function isCompleted(id: LessonId) { return progress.completed.includes(id); }

  return (
    <div className="max-w-2xl mx-auto px-3 py-4 pb-24">

      {/* ── XP / Level header ──────────────────────────────────────────────── */}
      <div className="rounded-2xl p-5 mb-6" style={{ background: '#1e2230', border: '1px solid #2a2e3e' }}>
        {/* Level badge + title */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg"
              style={{ background: '#2196f3', color: '#fff' }}
            >
              {level}
            </div>
            <div>
              <p className="font-bold text-white text-lg leading-tight">{levelTitle}</p>
              <p className="text-xs" style={{ color: '#6b7280' }}>Level {level} · {progress.xp.toLocaleString()} XP earned</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 flex-col">
              <div className="flex items-center gap-1">
                <Flame size={16} style={{ color: progress.streak > 0 ? '#ef5350' : '#4b5563' }} />
                <span className="font-bold text-white">{progress.streak}</span>
              </div>
              <span className="text-[10px]" style={{ color: '#6b7280' }}>Streak</span>
            </div>
            <div className="flex items-center gap-1.5 flex-col">
              <div className="flex items-center gap-1">
                <Trophy size={16} style={{ color: '#f5c842' }} />
                <span className="font-bold text-white">{completedCount}</span>
              </div>
              <span className="text-[10px]" style={{ color: '#6b7280' }}>Done</span>
            </div>
            <div className="flex items-center gap-1.5 flex-col">
              <div className="flex items-center gap-1">
                <Target size={16} style={{ color: '#26a69a' }} />
                <span className="font-bold text-white">{progress.todayCount}</span>
              </div>
              <span className="text-[10px]" style={{ color: '#6b7280' }}>Today</span>
            </div>
          </div>
        </div>

        {/* XP progress bar */}
        <div>
          <div className="flex justify-between text-xs mb-1" style={{ color: '#6b7280' }}>
            <span>Progress to Level {level + 1}</span>
            <span>{toNext > 0 ? `${toNext} XP to go` : 'Max level!'}</span>
          </div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: '#131722' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${levelPct}%`, background: 'linear-gradient(90deg, #2196f3, #00bcd4)' }}
            />
          </div>
        </div>

        {/* Overall progress */}
        <div className="mt-3 flex items-center justify-between text-xs" style={{ color: '#6b7280' }}>
          <span>{completedCount} / {totalLessons} lessons completed</span>
          <span>{Math.round((completedCount / totalLessons) * 100)}% complete</span>
        </div>
        <div className="h-1.5 rounded-full mt-1 overflow-hidden" style={{ background: '#131722' }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${(completedCount / totalLessons) * 100}%`, background: '#26a69a' }}
          />
        </div>
      </div>

      {/* ── Daily goal card ────────────────────────────────────────────────── */}
      <div
        className="rounded-xl p-3 mb-6 flex items-center gap-3"
        style={{ background: progress.todayCount >= 3 ? '#26a69a15' : '#f5c84215', border: `1px solid ${progress.todayCount >= 3 ? '#26a69a30' : '#f5c84230'}` }}
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
          style={{ background: progress.todayCount >= 3 ? '#26a69a' : '#f5c842', color: '#fff' }}
        >
          {Math.min(progress.todayCount, 3)}/3
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-white">
            {progress.todayCount >= 3 ? 'Daily goal complete!' : `Complete ${3 - progress.todayCount} more lesson${3 - progress.todayCount !== 1 ? 's' : ''} today`}
          </p>
          <div className="flex gap-1.5 mt-1">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="h-1.5 flex-1 rounded-full"
                style={{ background: i <= progress.todayCount ? '#26a69a' : '#2a2e3e' }}
              />
            ))}
          </div>
        </div>
        {progress.todayCount >= 3 && <CheckCircle size={20} style={{ color: '#26a69a', flexShrink: 0 }} />}
      </div>

      {/* ── Module path ────────────────────────────────────────────────────── */}
      <div className="space-y-4">
        {MODULES.map((mod, modIdx) => {
          const modCompleted = mod.lessons.every(l => isCompleted(l.id));
          const modStarted   = mod.lessons.some(l => isCompleted(l.id));
          const firstUnlockedIdx = mod.lessons.findIndex(
            (l, li) => !isCompleted(l.id) && isUnlocked(l, modIdx, li)
          );
          const isExpanded = activeModule === mod.id || modStarted;
          const ModIcon = mod.icon;

          return (
            <div key={mod.id}>
              {/* Module header */}
              <button
                className="w-full rounded-2xl p-4 flex items-center gap-3 transition-all"
                style={{
                  background: modCompleted ? mod.bg : isExpanded ? mod.bg : '#1e2230',
                  border: `2px solid ${modCompleted ? mod.color : isExpanded ? mod.color + '66' : '#2a2e3e'}`,
                }}
                onClick={() => setActiveModule(activeModule === mod.id ? null : mod.id)}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: modCompleted ? mod.color : '#131722', border: `2px solid ${mod.color}` }}
                >
                  {modCompleted
                    ? <CheckCircle size={22} style={{ color: '#fff' }} />
                    : <ModIcon size={22} style={{ color: mod.color }} />
                  }
                </div>

                {/* Text */}
                <div className="flex-1 text-left">
                  <p className="font-bold text-white">{mod.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>{mod.subtitle}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px]" style={{ color: mod.color }}>
                      {mod.lessons.filter(l => isCompleted(l.id)).length}/{mod.lessons.length} lessons
                    </span>
                    <span className="text-[10px]" style={{ color: '#6b7280' }}>
                      {mod.lessons.reduce((s, l) => s + l.xp, 0)} XP total
                    </span>
                  </div>
                </div>

                {/* Chevron */}
                <ChevronRight
                  size={18}
                  style={{ color: '#6b7280', transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}
                />
              </button>

              {/* Lessons list */}
              {isExpanded && (
                <div className="ml-6 mt-2 space-y-2 pl-4" style={{ borderLeft: `2px solid ${mod.color}44` }}>
                  {mod.lessons.map((lesson, lessonIdx) => {
                    const done       = isCompleted(lesson.id);
                    const unlocked   = isUnlocked(lesson, modIdx, lessonIdx);
                    const isCurrent  = !done && unlocked;
                    const LessonIcon = lesson.icon;

                    return (
                      <div
                        key={lesson.id}
                        className="relative"
                      >
                        {/* Connector dot */}
                        <div
                          className="absolute -left-5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                          style={{ background: done ? mod.color : isCurrent ? mod.color : '#2a2e3e', border: `2px solid ${done ? mod.color : '#2a2e3e'}` }}
                        />

                        <div
                          className="rounded-xl p-3 transition-all"
                          style={{
                            background: done ? mod.bg : isCurrent ? '#1e2230' : '#131722',
                            border: `1px solid ${done ? mod.color + '44' : isCurrent ? mod.color + '44' : '#2a2e3e'}`,
                            opacity: !unlocked && !done ? 0.5 : 1,
                          }}
                        >
                          <div className="flex items-center gap-3">
                            {/* Status icon */}
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{
                                background: done ? mod.color : isCurrent ? mod.color + '22' : '#1e2230',
                                border: `1.5px solid ${done ? mod.color : '#2a2e3e'}`,
                              }}
                            >
                              {done
                                ? <CheckCircle size={18} style={{ color: '#fff' }} />
                                : !unlocked
                                ? <Lock size={16} style={{ color: '#4b5563' }} />
                                : <LessonIcon size={18} style={{ color: mod.color }} />
                              }
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-sm font-bold text-white leading-tight">{lesson.title}</p>
                                {isCurrent && (
                                  <span
                                    className="text-[9px] px-1.5 py-0.5 rounded-full font-bold animate-pulse"
                                    style={{ background: mod.color, color: '#fff' }}
                                  >
                                    START
                                  </span>
                                )}
                                {done && (
                                  <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold" style={{ background: mod.color + '33', color: mod.color }}>
                                    DONE
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] mt-0.5 truncate" style={{ color: '#6b7280' }}>{lesson.desc}</p>
                              <div className="flex items-center gap-3 mt-1">
                                <div className="flex items-center gap-1">
                                  <Zap size={10} style={{ color: '#f5c842' }} />
                                  <span className="text-[10px] font-medium" style={{ color: '#f5c842' }}>{lesson.xp} XP</span>
                                </div>
                                <span className="text-[10px]" style={{ color: '#4b5563' }}>{lesson.duration}</span>
                                <DifficultyStars n={lesson.difficulty} />
                              </div>
                            </div>

                            {/* Action button */}
                            {unlocked && (
                              <button
                                onClick={() => {
                                  if (!done) completeLesson(lesson.id, lesson.xp);
                                  // navigate to lesson detail if you have one
                                  // navigate(`/lessons/${lesson.id}`);
                                }}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold flex-shrink-0 transition-all"
                                style={{
                                  background: done ? '#1e2230' : mod.color,
                                  color: done ? '#6b7280' : '#fff',
                                }}
                              >
                                {done ? (
                                  <>Review</>
                                ) : (
                                  <><PlayCircle size={13} /> Study</>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* "Next up" prompt when module is collapsed and has an active lesson */}
              {!isExpanded && modStarted && !modCompleted && firstUnlockedIdx >= 0 && (
                <div
                  className="mx-2 -mt-1 rounded-b-xl px-4 py-2 flex items-center justify-between"
                  style={{ background: mod.bg, border: `1px solid ${mod.color}33`, borderTop: 'none' }}
                >
                  <span className="text-xs" style={{ color: mod.color }}>
                    Next: {mod.lessons[firstUnlockedIdx].title}
                  </span>
                  <button
                    onClick={() => {
                      const l = mod.lessons[firstUnlockedIdx];
                      completeLesson(l.id, l.xp);
                    }}
                    className="text-xs font-bold px-3 py-1 rounded-lg"
                    style={{ background: mod.color, color: '#fff' }}
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Achievement badges ─────────────────────────────────────────────── */}
      <div className="mt-8 rounded-2xl p-4" style={{ background: '#1e2230', border: '1px solid #2a2e3e' }}>
        <h3 className="font-bold text-white mb-3 flex items-center gap-2">
          <Award size={16} style={{ color: '#f5c842' }} /> Rank Badges
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {[
            { title: 'Rookie',     xp: 0,    color: '#26a69a',  icon: BookOpen },
            { title: 'Student',    xp: 200,  color: '#2196f3',  icon: GraduationCap },
            { title: 'Trader',     xp: 500,  color: '#9c27b0',  icon: TrendingUp },
            { title: 'Analyst',    xp: 900,  color: '#ff9800',  icon: BarChart2 },
            { title: 'Strategist', xp: 1400, color: '#ef5350',  icon: Brain },
            { title: 'Pro Trader', xp: 2000, color: '#f5c842',  icon: Trophy },
            { title: 'Expert',     xp: 2700, color: '#00bcd4',  icon: Shield },
            { title: 'Master',     xp: 3500, color: '#ff5722',  icon: Crown },
          ].map(badge => {
            const unlocked = progress.xp >= badge.xp;
            const BadgeIcon = badge.icon;
            return (
              <div
                key={badge.title}
                className="flex flex-col items-center p-2 rounded-xl gap-1"
                style={{ background: unlocked ? badge.color + '20' : '#131722', opacity: unlocked ? 1 : 0.4 }}
                title={`${badge.xp} XP required`}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: unlocked ? badge.color : '#2a2e3e' }}
                >
                  <BadgeIcon size={16} style={{ color: unlocked ? '#fff' : '#4b5563' }} />
                </div>
                <span className="text-[9px] text-center leading-tight font-medium" style={{ color: unlocked ? badge.color : '#4b5563' }}>
                  {badge.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset */}
      <div className="mt-4 text-center">
        <button
          onClick={resetAll}
          className="text-xs px-3 py-1.5 rounded-lg"
          style={{ background: '#1e2230', color: '#4b5563' }}
        >
          Reset Progress
        </button>
      </div>
    </div>
  );
}
