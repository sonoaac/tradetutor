import { Users, TrendingUp, Award, Clock } from 'lucide-react';
import { Progress } from './ui/progress';

const stats = [
  {
    icon: Users,
    value: '50K+',
    label: 'Active Traders',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: TrendingUp,
    value: '1M+',
    label: 'Trades Simulated',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: Award,
    value: '98%',
    label: 'Success Rate',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: Clock,
    value: '24/7',
    label: 'Market Coverage',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
];

const indicators = [
  {
    label: 'Win Rate',
    value: 73,
    color: 'bg-green-500',
    textColor: 'text-green-700',
  },
  {
    label: 'Risk Management',
    value: 88,
    color: 'bg-blue-500',
    textColor: 'text-blue-700',
  },
  {
    label: 'Profit Factor',
    value: 65,
    color: 'bg-purple-500',
    textColor: 'text-purple-700',
  },
];

export function ProfessionalStatsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto">
        {/* Main Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className={`${stat.bg} ${stat.color} size-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="size-6" />
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Performance Indicators */}
        <div className="grid md:grid-cols-3 gap-6">
          {indicators.map((indicator, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold">{indicator.label}</span>
                <span className={`text-2xl font-bold ${indicator.textColor}`}>
                  {indicator.value}%
                </span>
              </div>
              <Progress value={indicator.value} className="h-3" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
