import { useState, useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import { Sidebar } from '@/components/Sidebar';
import { MobileMenu } from '@/components/MobileMenu';
import { ArrowLeft, CheckCircle, XCircle, Trophy, Star, Target, ChevronRight, BookOpen, Lightbulb, TrendingUp, AlertCircle } from 'lucide-react';
import LESSONS_DATABASE from '@/data/lessonsData';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  realLifeInsight: string;
  category: string;
}

interface LessonContent {
  title: string;
  level: string;
  totalQuestions: number;
  passingScore: number;
  pointsAwarded: number;
  description: string;
  learningObjectives: string[];
  keyTakeaways: string[];
  questions: Question[];
}

export default function LessonDetailPage() {
  const [, params] = useRoute('/lessons/:id');
  const [, navigate] = useLocation();
  const lessonId = params?.id || '1';
  
  const lesson = LESSONS_DATABASE[lessonId] || LESSONS_DATABASE['1'];
  
  const [currentStep, setCurrentStep] = useState<'intro' | 'quiz' | 'results'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleSelectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    setShowExplanation(false);
  };

  const handleNext = () => {
    if (currentQuestion < lesson.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      setCurrentStep('results');
      setQuizComplete(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };

  const calculateResults = () => {
    let correct = 0;
    lesson.questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });
    const percentage = (correct / lesson.totalQuestions) * 100;
    const passed = percentage >= lesson.passingScore;
    const pointsEarned = passed ? Math.round((percentage / 100) * lesson.pointsAwarded) : 0;
    
    return { correct, percentage, passed, pointsEarned };
  };

  const results = quizComplete ? calculateResults() : null;
  const question = lesson.questions[currentQuestion];
  const hasAnswered = selectedAnswers[currentQuestion] !== undefined;
  const isCorrect = hasAnswered && selectedAnswers[currentQuestion] === question?.correctAnswer;

  return (
    <div className="flex bg-white min-h-screen">
      <Sidebar />
      
      <main className="flex-1 md:ml-64 pb-24 md:pb-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 md:px-8 py-4 sm:py-6 border-b border-blue-700 sm:border-b-2">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => navigate('/lessons')}
              className="flex items-center gap-2 text-white hover:text-blue-100 mb-4 font-semibold transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Lessons
            </button>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="text-blue-100 text-sm mb-1">{lesson.level} Level</div>
                <h1 className="text-3xl font-bold text-white mb-2">{lesson.title}</h1>
                <p className="text-blue-100">{lesson.description}</p>
              </div>
              
              <div className="text-right">
                <div className="bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
                  <div className="text-blue-100 text-xs mb-1">Potential Points</div>
                  <div className="text-white text-2xl font-bold flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-300" />
                    {lesson.pointsAwarded}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Introduction */}
        {currentStep === 'intro' && (
          <div className="p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Learning Objectives */}
              <div className="bg-white border-2 border-blue-200 rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-600" />
                  Learning Objectives
                </h2>
                
                {/* Study Guide Button */}
                <button
                  onClick={() => window.open(`/study-guides/lesson-${lessonId}.html`, '_blank')}
                  className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                  title="Opens study guide in new tab. Right-click and 'Print to PDF' to save as PDF."
                >
                  <BookOpen className="w-4 h-4" />
                  Click to Read Full Study Guide
                </button>
                
                <ul className="space-y-2">
                  {lesson.learningObjectives.map((obj, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Takeaways */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-yellow-600" />
                  Key Takeaways
                </h2>
                <ul className="space-y-2">
                  {lesson.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quiz Info */}
              <div className="bg-white border-2 border-purple-200 rounded-xl p-6 shadow-md">
                <h2 className="text-2xl font-bold text-black mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                  Quiz Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <div className="text-purple-600 text-sm font-semibold mb-1">Total Questions</div>
                    <div className="text-3xl font-bold text-black">{lesson.totalQuestions}</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-green-600 text-sm font-semibold mb-1">Passing Score</div>
                    <div className="text-3xl font-bold text-black">{lesson.passingScore}%</div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4 text-center">
                    <div className="text-yellow-600 text-sm font-semibold mb-1">Points Available</div>
                    <div className="text-3xl font-bold text-black">{lesson.pointsAwarded}</div>
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <button
                onClick={() => setCurrentStep('quiz')}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <TrendingUp className="w-6 h-6" />
                Start Quiz
              </button>
            </div>
          </div>
        )}

        {/* Quiz */}
        {currentStep === 'quiz' && question && (
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Question {currentQuestion + 1} of {lesson.totalQuestions}</span>
                  <span className="font-semibold">{Math.round(((currentQuestion + 1) / lesson.totalQuestions) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / lesson.totalQuestions) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg mb-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {currentQuestion + 1}
                  </div>
                  <div>
                    <div className="text-xs text-blue-600 font-semibold mb-1">{question.category}</div>
                    <h3 className="text-xl font-bold text-black">{question.question}</h3>
                  </div>
                </div>

                {/* Answer Options */}
                <div className="space-y-3">
                  {question.options.map((option, index) => {
                    const isSelected = selectedAnswers[currentQuestion] === index;
                    const isCorrectAnswer = index === question.correctAnswer;
                    const showResult = hasAnswered && showExplanation;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleSelectAnswer(index)}
                        disabled={showExplanation}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          showResult && isCorrectAnswer
                            ? 'border-green-500 bg-green-50'
                            : showResult && isSelected && !isCorrectAnswer
                            ? 'border-red-500 bg-red-50'
                            : isSelected
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            showResult && isCorrectAnswer
                              ? 'border-green-600 bg-green-600'
                              : showResult && isSelected && !isCorrectAnswer
                              ? 'border-red-600 bg-red-600'
                              : isSelected
                              ? 'border-blue-600 bg-blue-600'
                              : 'border-gray-400'
                          }`}>
                            {showResult && isCorrectAnswer && <CheckCircle className="w-4 h-4 text-white" />}
                            {showResult && isSelected && !isCorrectAnswer && <XCircle className="w-4 h-4 text-white" />}
                            {isSelected && !showResult && <div className="w-3 h-3 bg-white rounded-full" />}
                          </div>
                          <span className={`font-semibold ${
                            showResult && isCorrectAnswer
                              ? 'text-green-700'
                              : showResult && isSelected && !isCorrectAnswer
                              ? 'text-red-700'
                              : isSelected
                              ? 'text-blue-700'
                              : 'text-gray-700'
                          }`}>
                            {option}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Check Answer Button */}
                {hasAnswered && !showExplanation && (
                  <button
                    onClick={() => setShowExplanation(true)}
                    className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                  >
                    Check Answer
                  </button>
                )}
              </div>

              {/* Explanation */}
              {showExplanation && (
                <div className="space-y-4 mb-6">
                  <div className={`border-2 rounded-xl p-6 ${
                    isCorrect
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-500'
                  }`}>
                    <div className="flex items-center gap-3 mb-3">
                      {isCorrect ? (
                        <>
                          <CheckCircle className="w-6 h-6 text-green-600" />
                          <h4 className="text-xl font-bold text-green-700">Correct!</h4>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-6 h-6 text-red-600" />
                          <h4 className="text-xl font-bold text-red-700">Not quite</h4>
                        </>
                      )}
                    </div>
                    <p className="text-gray-700">{question.explanation}</p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Lightbulb className="w-6 h-6 text-yellow-600" />
                      <h4 className="text-xl font-bold text-black">Real-Life Insight</h4>
                    </div>
                    <p className="text-gray-700">{question.realLifeInsight}</p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-3">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 text-gray-800 font-bold rounded-lg transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={!hasAnswered || !showExplanation}
                  className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:text-gray-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {currentQuestion === lesson.totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {currentStep === 'results' && results && (
          <div className="p-6">
            <div className="max-w-4xl mx-auto">
              <div className={`border-4 rounded-2xl p-8 text-center mb-6 ${
                results.passed
                  ? 'bg-gradient-to-r from-green-50 to-blue-50 border-green-500'
                  : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-500'
              }`}>
                <div className="mb-4">
                  {results.passed ? (
                    <Trophy className="w-20 h-20 text-yellow-500 mx-auto" />
                  ) : (
                    <AlertCircle className="w-20 h-20 text-red-500 mx-auto" />
                  )}
                </div>
                
                <h2 className="text-4xl font-bold text-black mb-2">
                  {results.passed ? 'Congratulations!' : 'Keep Learning!'}
                </h2>
                <p className="text-xl text-gray-700 mb-6">
                  {results.passed 
                    ? 'You passed the quiz and earned points!'
                    : `You need ${lesson.passingScore}% to pass. Try again!`
                  }
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
                    <div className="text-gray-600 text-sm mb-1">Score</div>
                    <div className={`text-4xl font-bold ${
                      results.passed ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {results.percentage.toFixed(0)}%
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
                    <div className="text-gray-600 text-sm mb-1">Correct</div>
                    <div className="text-4xl font-bold text-black">
                      {results.correct}/{lesson.totalQuestions}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
                    <div className="text-gray-600 text-sm mb-1">Points Earned</div>
                    <div className="text-4xl font-bold text-yellow-600 flex items-center justify-center gap-1">
                      <Star className="w-8 h-8" />
                      {results.pointsEarned}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate('/lessons')}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                  >
                    Back to Lessons
                  </button>
                  <button
                    onClick={() => {
                      setCurrentStep('intro');
                      setCurrentQuestion(0);
                      setSelectedAnswers([]);
                      setShowExplanation(false);
                      setQuizComplete(false);
                    }}
                    className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <MobileMenu />
    </div>
  );
}
