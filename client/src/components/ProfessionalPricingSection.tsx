import { Check, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Link } from 'wouter';

const pricingPlans = [
  {
    name: 'Starter Monthly',
    price: '$9.99',
    period: '/month',
    features: [
      'Basic trading simulation',
      'Limited market access',
      '10 trades per day',
      'Email support',
    ],
    popular: false,
  },
  {
    name: 'Starter Yearly',
    price: '$99.99',
    period: '/year',
    savings: 'Save $20',
    features: [
      'Basic trading simulation',
      'Limited market access',
      '10 trades per day',
      'Email support',
    ],
    popular: false,
  },
  {
    name: 'Pro Monthly',
    price: '$19.99',
    period: '/month',
    features: [
      'Unlimited trading',
      'All markets & assets',
      'AI coaching',
      'Priority support',
      'Advanced analytics',
    ],
    popular: true,
  },
  {
    name: 'Pro Yearly',
    price: '$179.99',
    period: '/year',
    savings: 'Save $60',
    features: [
      'Unlimited trading',
      'All markets & assets',
      'AI coaching',
      'Priority support',
      'Advanced analytics',
    ],
    popular: false,
  },
];

export function ProfessionalPricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Simple Pricing</h2>
          <p className="text-xl text-gray-600">Choose the plan that's right for you</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-white shadow-lg scale-105'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white">
                  Most Popular
                </Badge>
              )}
              
              {plan.savings && (
                <Badge className="absolute -top-3 right-4 bg-green-600 text-white">
                  {plan.savings}
                </Badge>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">{plan.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <Check className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/auth">
                <Button
                  className={`w-full rounded-full ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-900 hover:bg-gray-800'
                  }`}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/pricing">
            <Button variant="ghost" className="text-blue-600 text-lg">
              View All Plans
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
