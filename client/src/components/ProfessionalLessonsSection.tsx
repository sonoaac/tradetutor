import { ArrowRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Link } from 'wouter';

const lessons = [
  {
    title: 'Trading Basics',
    topics: 12,
    level: 'Beginner',
    levelColor: 'bg-green-100 text-green-700',
    description: 'Learn fundamental concepts',
    icon: '📚',
  },
  {
    title: 'Technical Analysis',
    topics: 18,
    level: 'Intermediate',
    levelColor: 'bg-blue-100 text-blue-700',
    description: 'Chart patterns and indicators',
    icon: '📊',
  },
  {
    title: 'Risk Management',
    topics: 10,
    level: 'Beginner',
    levelColor: 'bg-green-100 text-green-700',
    description: 'Protect your capital',
    icon: '🛡️',
  },
  {
    title: 'Advanced Strategies',
    topics: 15,
    level: 'Advanced',
    levelColor: 'bg-purple-100 text-purple-700',
    description: 'Complex trading techniques',
    icon: '🎯',
  },
  {
    title: 'Market Psychology',
    topics: 8,
    level: 'Intermediate',
    levelColor: 'bg-blue-100 text-blue-700',
    description: 'Understanding market behavior',
    icon: '🧠',
  },
  {
    title: 'Real-Time Trading',
    topics: 20,
    level: 'Advanced',
    levelColor: 'bg-purple-100 text-purple-700',
    description: 'Live market execution',
    icon: '⚡',
  },
];

export function ProfessionalLessonsSection() {
  return (
    <section id="learn" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-4">Learning Paths</h2>
            <p className="text-xl text-gray-600">Structured courses from beginner to expert</p>
          </div>
          <Link href="/lessons">
            <Button variant="ghost" className="text-blue-600 hidden sm:flex">
              View All Lessons
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{lesson.icon}</div>
                <Badge className={`${lesson.levelColor} border-0`}>
                  {lesson.level}
                </Badge>
              </div>
              
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {lesson.title}
              </h3>
              
              <p className="text-gray-600 mb-4">{lesson.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-500">{lesson.topics} topics</span>
                <ArrowRight className="size-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link href="/lessons">
            <Button variant="ghost" className="text-blue-600">
              View All Lessons
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
