import { Shield, Activity, Brain, PieChart, BookOpen, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Risk-Free Trading',
    description: 'Practice without risking real money',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Activity,
    title: 'Real-Time Data',
    description: 'Live market feeds and updates',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  {
    icon: Brain,
    title: 'AI Coaching',
    description: 'Smart insights and recommendations',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: PieChart,
    title: 'Portfolio Tracking',
    description: 'Monitor your performance in real-time',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  {
    icon: BookOpen,
    title: 'Structured Lessons',
    description: 'Learn from basics to advanced',
    color: 'text-teal-600',
    bg: 'bg-teal-50',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'See your improvement over time',
    color: 'text-pink-600',
    bg: 'bg-pink-50',
  },
];

export function ProfessionalFeaturesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600">Everything you need to become a successful trader</p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group"
              >
                <div className={`${feature.bg} ${feature.color} size-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="size-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Chart Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Candlestick Chart */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Candlestick Analysis</h3>
            <div className="h-64 flex items-end justify-around gap-2">
              {[
                { open: 60, close: 80, high: 85, low: 55, up: true },
                { open: 80, close: 70, high: 82, low: 65, up: false },
                { open: 70, close: 90, high: 95, low: 68, up: true },
                { open: 90, close: 85, high: 92, low: 82, up: false },
                { open: 85, close: 100, high: 105, low: 83, up: true },
                { open: 100, close: 95, high: 102, low: 90, up: false },
                { open: 95, close: 110, high: 115, low: 93, up: true },
                { open: 110, close: 105, high: 112, low: 100, up: false },
              ].map((candle, i) => (
                <div key={i} className="flex flex-col items-center" style={{ width: '40px' }}>
                  {/* Wick */}
                  <div
                    className="w-0.5 bg-gray-400"
                    style={{
                      height: `${candle.high - candle.low}px`,
                      marginBottom: `${candle.low}px`,
                    }}
                  />
                  {/* Body */}
                  <div
                    className={`w-full ${candle.up ? 'bg-green-500' : 'bg-red-500'}`}
                    style={{
                      height: `${Math.abs(candle.close - candle.open)}px`,
                      marginTop: `-${Math.max(candle.open, candle.close)}px`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio Growth Chart */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Portfolio Growth</h3>
            <div className="h-64">
              <svg viewBox="0 0 400 200" className="w-full h-full">
                <defs>
                  <linearGradient id="portfolioGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Grid */}
                {[0, 50, 100, 150, 200].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="400"
                    y2={y}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                ))}
                
                {/* Area */}
                <path
                  d="M 0 150 L 50 140 L 100 145 L 150 120 L 200 115 L 250 90 L 300 85 L 350 60 L 400 50 L 400 200 L 0 200 Z"
                  fill="url(#portfolioGradient)"
                />
                
                {/* Line */}
                <path
                  d="M 0 150 L 50 140 L 100 145 L 150 120 L 200 115 L 250 90 L 300 85 L 350 60 L 400 50"
                  fill="none"
                  stroke="rgb(34, 197, 94)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
                {/* Data points */}
                {[
                  [0, 150], [50, 140], [100, 145], [150, 120],
                  [200, 115], [250, 90], [300, 85], [350, 60], [400, 50]
                ].map(([x, y], i) => (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="rgb(34, 197, 94)"
                    className="hover:r-6 transition-all"
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
