import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const markets = [
  {
    name: 'Stocks',
    emoji: '📈',
    description: 'Trade major company stocks',
    image: 'https://images.unsplash.com/photo-1766218329569-53c9270bb305?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMHRyYWRpbmclMjBjaGFydHxlbnwxfHx8fDE3NzA1MDY5MjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-blue-600 to-blue-400',
  },
  {
    name: 'Crypto',
    emoji: '₿',
    description: 'Digital currency trading',
    image: 'https://images.unsplash.com/photo-1659010878130-ae8b703bd3ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG9jdXJyZW5jeSUyMGJpdGNvaW58ZW58MXx8fHwxNzcwNDgwNjE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-orange-500 to-yellow-400',
  },
  {
    name: 'Futures',
    emoji: '📊',
    description: 'Contract-based trading',
    image: 'https://images.unsplash.com/photo-1624365168876-7916e095130c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmVzJTIwY29tbW9kaXR5JTIwZ29sZHxlbnwxfHx8fDE3NzA1MDY5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-purple-600 to-pink-500',
  },
  {
    name: 'Options',
    emoji: '⚡',
    description: 'Advanced derivatives',
    image: 'https://images.unsplash.com/photo-1642543348745-03b1219733d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcHRpb25zJTIwdHJhZGluZyUyMGZpbmFuY2lhbHxlbnwxfHx8fDE3NzA1MDY5MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-green-600 to-emerald-400',
  },
  {
    name: 'Forex',
    emoji: '💱',
    description: 'Currency exchange',
    image: 'https://images.unsplash.com/photo-1657972590667-5d94b96ec583?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3JleCUyMGN1cnJlbmN5JTIwZXhjaGFuZ2V8ZW58MXx8fHwxNzcwNTA2OTI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-teal-600 to-cyan-400',
  },
  {
    name: 'Commodities',
    emoji: '🛢️',
    description: 'Oil, gold, and more',
    image: 'https://images.unsplash.com/photo-1702480248432-7a87f4d9463e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tb2RpdGllcyUyMG9pbCUyMGJhcnJlbHxlbnwxfHx8fDE3NzA1MDY5Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    gradient: 'from-amber-600 to-orange-400',
  },
];

export function ProfessionalMarketsSection() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('markets-scroll');
    if (container) {
      const scrollAmount = 320;
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  return (
    <section id="markets" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Explore Markets</h2>
          <p className="text-xl text-gray-600">Trade any asset class with real-time data</p>
        </div>

        <div className="relative">
          {/* Scroll Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-lg bg-white"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="size-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full shadow-lg bg-white"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="size-4" />
          </Button>

          {/* Markets Scroll */}
          <div
            id="markets-scroll"
            className="flex gap-6 overflow-x-auto scrollbar-hide px-12 pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {markets.map((market, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-80 group cursor-pointer"
              >
                <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  {/* Background Image */}
                  <img
                    src={market.image}
                    alt={market.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${market.gradient} opacity-80`} />
                  
                  {/* Content */}
                  <div className="relative h-full p-6 flex flex-col justify-between text-white">
                    <div>
                      <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 mb-3">
                        Live Data
                      </Badge>
                      <div className="text-6xl mb-4">{market.emoji}</div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{market.name}</h3>
                      <p className="text-white/90">{market.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
