import { useState } from 'react';
import { useLocation } from 'wouter';
import { Sidebar } from '@/components/Sidebar';
import { MobileMenu } from '@/components/MobileMenu';
import { Trophy, Star, Lock, CheckCircle, PlayCircle, Award, Target, Zap, Crown, GraduationCap, Sparkles, TrendingUp } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'insider' | 'amateur' | 'planner' | 'planner-pro' | 'teachers-fav' | 'graduate';
  points: number;
  duration: string;
  questions: number;
  completed: boolean;
  locked: boolean;
  score?: number;
}

const LEVEL_CONFIG = {
  beginner: { name: 'Beginner', color: 'bg-green-500', icon: PlayCircle, required: 0 },
  insider: { name: 'Insider', color: 'bg-blue-500', icon: Target, required: 100 },
  amateur: { name: 'Amateur', color: 'bg-purple-500', icon: Zap, required: 300 },
  planner: { name: 'Planner', color: 'bg-orange-500', icon: TrendingUp, required: 600 },
  'planner-pro': { name: 'Planner Pro', color: 'bg-red-500', icon: Award, required: 1000 },
  'teachers-fav': { name: "Teacher's Fav", color: 'bg-pink-500', icon: Star, required: 1500 },
  graduate: { name: 'Graduate', color: 'bg-yellow-500', icon: GraduationCap, required: 2000 },
};

const MOCK_LESSONS: Lesson[] = [
  // Beginner Level
  { id: '1', title: 'Trading Basics 101', description: 'Learn the fundamentals of stock trading', level: 'beginner', points: 50, duration: '10 min', questions: 5, completed: true, locked: false, score: 50 },
  { id: '2', title: 'Understanding Market Orders', description: 'Master different order types', level: 'beginner', points: 50, duration: '12 min', questions: 5, completed: true, locked: false, score: 45 },
  { id: '3', title: 'Reading Stock Charts', description: 'Interpret candlesticks and trends', level: 'beginner', points: 60, duration: '15 min', questions: 6, completed: false, locked: false },
  
  // Insider Level
  { id: '4', title: 'Technical Analysis Intro', description: 'Learn key indicators and patterns', level: 'insider', points: 80, duration: '20 min', questions: 8, completed: false, locked: false },
  { id: '5', title: 'Risk Management Strategies', description: 'Protect your capital effectively', level: 'insider', points: 75, duration: '18 min', questions: 7, completed: false, locked: false },
  { id: '6', title: 'Market Psychology', description: 'Understand trader behavior', level: 'insider', points: 70, duration: '15 min', questions: 7, completed: false, locked: true },
  
  // Amateur Level
  { id: '7', title: 'Advanced Chart Patterns', description: 'Master head & shoulders, triangles, flags', level: 'amateur', points: 100, duration: '25 min', questions: 10, completed: false, locked: true },
  { id: '8', title: 'Options Trading Fundamentals', description: 'Calls, puts, and basic strategies', level: 'amateur', points: 120, duration: '30 min', questions: 12, completed: false, locked: true },
  { id: '9', title: 'Cryptocurrency Basics', description: 'Trade digital assets with confidence', level: 'amateur', points: 90, duration: '20 min', questions: 9, completed: false, locked: true },
  
  // Planner Level
  { id: '10', title: 'Portfolio Diversification', description: 'Build a balanced investment portfolio', level: 'planner', points: 150, duration: '35 min', questions: 15, completed: false, locked: true },
  { id: '11', title: 'Fundamental Analysis', description: 'Evaluate company financials', level: 'planner', points: 140, duration: '40 min', questions: 14, completed: false, locked: true },
  { id: '12', title: 'Market Cycles & Timing', description: 'Identify bull and bear markets', level: 'planner', points: 130, duration: '30 min', questions: 13, completed: false, locked: true },
  
  // Planner Pro Level
  { id: '13', title: 'Advanced Options Strategies', description: 'Spreads, straddles, and hedging', level: 'planner-pro', points: 200, duration: '45 min', questions: 20, completed: false, locked: true },
  { id: '14', title: 'Algorithmic Trading Concepts', description: 'Automated trading systems', level: 'planner-pro', points: 180, duration: '50 min', questions: 18, completed: false, locked: true },
  { id: '15', title: 'Advanced Risk Models', description: 'VaR, Black-Scholes, and more', level: 'planner-pro', points: 220, duration: '60 min', questions: 22, completed: false, locked: true },
  
  // Teacher's Fav Level
  { id: '16', title: 'Market Microstructure', description: 'How exchanges and liquidity work', level: 'teachers-fav', points: 250, duration: '55 min', questions: 25, completed: false, locked: true },
  { id: '17', title: 'Quantitative Trading', description: 'Statistical arbitrage and quant methods', level: 'teachers-fav', points: 280, duration: '70 min', questions: 28, completed: false, locked: true },
  { id: '18', title: 'Behavioral Finance', description: 'Cognitive biases in trading', level: 'teachers-fav', points: 260, duration: '50 min', questions: 26, completed: false, locked: true },
  
  // Graduate Level
  { id: '19', title: 'Professional Trading Psychology', description: 'Master your trading mindset', level: 'graduate', points: 350, duration: '90 min', questions: 35, completed: false, locked: true },
  { id: '20', title: 'Building Your Trading System', description: 'Create a complete strategy', level: 'graduate', points: 400, duration: '120 min', questions: 40, completed: false, locked: true },
  { id: '21', title: 'Final Trading Challenge', description: 'Demonstrate mastery of all concepts', level: 'graduate', points: 500, duration: '180 min', questions: 50, completed: false, locked: true },
];

export default function LessonsPage() {
  const [, navigate] = useLocation();
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  
  const totalPoints = 145; // User's current points (based on completed lessons)
  const totalPossible = MOCK_LESSONS.reduce((sum, lesson) => sum + lesson.points, 0);
  const completedCount = MOCK_LESSONS.filter(l => l.completed).length;

  // Calculate current level based on points
  const currentLevel = Object.entries(LEVEL_CONFIG)
    .reverse()
    .find(([_, config]) => totalPoints >= config.required)?.[0] || 'beginner';

  const nextLevel = Object.entries(LEVEL_CONFIG)
    .find(([_, config]) => config.required > totalPoints);

  const progressToNext = nextLevel 
    ? ((totalPoints - LEVEL_CONFIG[currentLevel as keyof typeof LEVEL_CONFIG].required) / 
       (nextLevel[1].required - LEVEL_CONFIG[currentLevel as keyof typeof LEVEL_CONFIG].required)) * 100
    : 100;

  const filteredLessons = selectedLevel === 'all' 
    ? MOCK_LESSONS 
    : MOCK_LESSONS.filter(l => l.level === selectedLevel);

  const CurrentLevelIcon = LEVEL_CONFIG[currentLevel as keyof typeof LEVEL_CONFIG].icon;

  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar />
      
      <main className="flex-1 md:ml-64 pb-24 md:pb-8">
        {/* Top Progress Bar */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 ${LEVEL_CONFIG[currentLevel as keyof typeof LEVEL_CONFIG].color} rounded-full flex items-center justify-center shadow-lg`}>
                  <CurrentLevelIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Learning Journey</h1>
                  <p className="text-purple-100">
                    Level: {LEVEL_CONFIG[currentLevel as keyof typeof LEVEL_CONFIG].name}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-2 text-white mb-1">
                  <Trophy className="w-6 h-6 text-yellow-300" />
                  <span className="text-3xl font-bold font-mono">{totalPoints}</span>
                  <span className="text-purple-200">/ {totalPossible} pts</span>
                </div>
                <div className="text-purple-100 text-sm">
                  {completedCount} of {MOCK_LESSONS.length} lessons completed
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {nextLevel && (
              <div>
                <div className="flex items-center justify-between text-white text-sm mb-2">
                  <span>Progress to {nextLevel[1].name}</span>
                  <span className="font-semibold">{Math.round(progressToNext)}%</span>
                </div>
                <div className="w-full bg-purple-800/30 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-yellow-300 h-full transition-all duration-500 rounded-full"
                    style={{ width: `${progressToNext}%` }}
                  />
                </div>
                <div className="text-purple-100 text-xs mt-1">
                  {nextLevel[1].required - totalPoints} points until {nextLevel[1].name}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Level Filter Pills */}
        <div className="bg-gray-50 border-b-2 border-gray-200 px-6 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedLevel('all')}
                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                  selectedLevel === 'all'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400'
                }`}
              >
                All Levels
              </button>
              {Object.entries(LEVEL_CONFIG).map(([key, config]) => {
                const LevelIcon = config.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedLevel(key)}
                    className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                      selectedLevel === key
                        ? `${config.color} text-white shadow-lg`
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-blue-400'
                    }`}
                  >
                    <LevelIcon className="w-4 h-4" />
                    {config.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLessons.map((lesson) => {
                const levelConfig = LEVEL_CONFIG[lesson.level];
                const LevelIcon = levelConfig.icon;
                
                return (
                  <div
                    key={lesson.id}
                    className={`bg-white border-2 rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl ${
                      lesson.locked 
                        ? 'border-gray-300 opacity-75' 
                        : lesson.completed
                        ? 'border-green-500'
                        : 'border-gray-200 hover:border-blue-500'
                    }`}
                  >
                    {/* Lesson Header */}
                    <div className={`${levelConfig.color} px-4 py-3 flex items-center justify-between`}>
                      <div className="flex items-center gap-2">
                        <LevelIcon className="w-5 h-5 text-white" />
                        <span className="text-white font-semibold text-sm">{levelConfig.name}</span>
                      </div>
                      {lesson.completed && (
                        <CheckCircle className="w-5 h-5 text-white" />
                      )}
                      {lesson.locked && (
                        <Lock className="w-5 h-5 text-white" />
                      )}
                    </div>

                    {/* Lesson Body */}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-black mb-2">{lesson.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{lesson.description}</p>

                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="bg-gray-50 rounded-lg p-2 text-center">
                          <div className="text-xs text-gray-600">Points</div>
                          <div className="font-bold text-black flex items-center justify-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            {lesson.points}
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2 text-center">
                          <div className="text-xs text-gray-600">Questions</div>
                          <div className="font-bold text-black">{lesson.questions}</div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-2 text-center">
                          <div className="text-xs text-gray-600">Duration</div>
                          <div className="font-bold text-black text-xs">{lesson.duration}</div>
                        </div>
                      </div>

                      {lesson.completed && lesson.score && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-2 mb-3">
                          <div className="flex items-center justify-between">
                            <span className="text-green-700 text-sm font-semibold">Score</span>
                            <span className="text-green-700 font-bold">{lesson.score}/{lesson.points}</span>
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => !lesson.locked && navigate(`/lessons/${lesson.id}`)}
                        disabled={lesson.locked}
                        className={`w-full py-2 rounded-lg font-bold transition-all ${
                          lesson.locked
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : lesson.completed
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
                        }`}
                      >
                        {lesson.locked ? (
                          <span className="flex items-center justify-center gap-2">
                            <Lock className="w-4 h-4" />
                            Locked
                          </span>
                        ) : lesson.completed ? (
                          'Review Lesson'
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Start Learning
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Achievement Badges Section */}
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
              <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                <Crown className="w-7 h-7 text-yellow-500" />
                Your Achievements
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {Object.entries(LEVEL_CONFIG).map(([key, config]) => {
                  const LevelIcon = config.icon;
                  const isUnlocked = totalPoints >= config.required;
                  return (
                    <div
                      key={key}
                      className={`text-center p-4 rounded-xl border-2 transition-all ${
                        isUnlocked
                          ? `${config.color} border-transparent text-white shadow-lg`
                          : 'bg-gray-100 border-gray-300 text-gray-400'
                      }`}
                    >
                      <LevelIcon className={`w-8 h-8 mx-auto mb-2 ${isUnlocked ? 'text-white' : 'text-gray-400'}`} />
                      <div className="font-bold text-sm">{config.name}</div>
                      <div className="text-xs opacity-90">{config.required} pts</div>
                      {isUnlocked && (
                        <CheckCircle className="w-4 h-4 mx-auto mt-1" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <MobileMenu />
    </div>
  );
}
