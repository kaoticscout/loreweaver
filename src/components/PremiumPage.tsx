import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { SparklesIcon, CheckCircleIcon, StarIcon, ShieldCheckIcon, RocketLaunchIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export function PremiumPage() {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1B0A20]">
        <div className="text-[#fcedbe] text-center">
          <p className="text-xl mb-4">Please sign in to upgrade to premium</p>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#B67C3C] to-[#fcedbe] text-[#2A1B3D] font-medium hover:opacity-90 transition-opacity">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: <SparklesIcon className="h-6 w-6" />,
      title: "Unlimited Worlds",
      description: "Create as many worlds as your imagination can handle",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <StarIcon className="h-6 w-6" />,
      title: "Premium Templates",
      description: "Access to exclusive world-building templates and assets",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <ShieldCheckIcon className="h-6 w-6" />,
      title: "Advanced Security",
      description: "Enhanced backup and security features for your worlds",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <RocketLaunchIcon className="h-6 w-6" />,
      title: "Priority Support",
      description: "Get help when you need it with priority customer support",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-[#1B0A20] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#B67C3C]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#fcedbe]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="px-4 py-1 rounded-full bg-gradient-to-r from-[#B67C3C] to-[#fcedbe] text-[#2A1B3D] text-sm font-medium">
              LIMITED TIME OFFER
            </span>
          </div>
          <h1 className="text-5xl font-bold text-[#fcedbe] mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#B67C3C] to-[#fcedbe]">
            Upgrade to Premium
          </h1>
          <p className="text-xl text-[#B67C3C] max-w-2xl mx-auto">
            Unlock the full potential of your world-building journey with our premium features
          </p>
        </div>

        {/* Pricing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-[#2A1B3D] p-1 rounded-lg inline-flex shadow-lg shadow-[#B67C3C]/10">
            <button
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedPlan === 'monthly'
                  ? 'bg-gradient-to-r from-[#B67C3C] to-[#fcedbe] text-[#2A1B3D] shadow-lg'
                  : 'text-[#fcedbe] hover:bg-[#B67C3C]/20'
              }`}
              onClick={() => setSelectedPlan('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedPlan === 'yearly'
                  ? 'bg-gradient-to-r from-[#B67C3C] to-[#fcedbe] text-[#2A1B3D] shadow-lg'
                  : 'text-[#fcedbe] hover:bg-[#B67C3C]/20'
              }`}
              onClick={() => setSelectedPlan('yearly')}
            >
              Yearly
              <span className="ml-2 px-2 py-0.5 text-xs bg-[#B67C3C]/20 text-[#B67C3C] rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-[#2A1B3D] rounded-2xl p-8 border border-[#B67C3C]/20 hover:border-[#B67C3C]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#B67C3C]/10">
            <h2 className="text-2xl font-bold text-[#fcedbe] mb-2">Free Plan</h2>
            <p className="text-[#B67C3C] mb-6">Perfect for getting started</p>
            <div className="text-3xl font-bold text-[#fcedbe] mb-8">
              $0<span className="text-lg font-normal text-[#B67C3C]">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-[#fcedbe]">
                <CheckCircleIcon className="h-5 w-5 text-[#B67C3C]" />
                <span>3 Worlds</span>
              </li>
              <li className="flex items-center gap-3 text-[#fcedbe]">
                <CheckCircleIcon className="h-5 w-5 text-[#B67C3C]" />
                <span>Basic Templates</span>
              </li>
              <li className="flex items-center gap-3 text-[#fcedbe]">
                <CheckCircleIcon className="h-5 w-5 text-[#B67C3C]" />
                <span>Community Support</span>
              </li>
            </ul>
            <button className="w-full px-6 py-3 rounded-lg bg-[#B67C3C]/20 text-[#fcedbe] hover:bg-[#B67C3C]/30 transition-colors">
              Current Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-gradient-to-br from-[#B67C3C]/20 to-[#fcedbe]/10 rounded-2xl p-8 border border-[#B67C3C]/30 relative overflow-hidden hover:shadow-2xl hover:shadow-[#B67C3C]/20 transition-all duration-300">
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 text-sm font-medium bg-gradient-to-r from-[#B67C3C] to-[#fcedbe] text-[#2A1B3D] rounded-full animate-pulse">
                RECOMMENDED
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#fcedbe] mb-2">Premium Plan</h2>
            <p className="text-[#B67C3C] mb-6">For serious world builders</p>
            <div className="text-3xl font-bold text-[#fcedbe] mb-8">
              ${selectedPlan === 'monthly' ? '9.99' : '95.88'}<span className="text-lg font-normal text-[#B67C3C]">/month</span>
            </div>
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li 
                  key={index} 
                  className="flex items-center gap-3 text-[#fcedbe] group cursor-pointer"
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div className={`p-1 rounded-full bg-gradient-to-br ${feature.gradient} transition-transform duration-300 group-hover:scale-110`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium group-hover:text-[#B67C3C] transition-colors duration-300">{feature.title}</p>
                    <p className="text-sm text-[#B67C3C]">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <button className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#B67C3C] to-[#fcedbe] text-[#2A1B3D] font-medium hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-[#B67C3C]/20 group">
              <span className="flex items-center justify-center gap-2">
                Upgrade Now
                <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#fcedbe] mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-[#2A1B3D] rounded-xl p-6 border border-[#B67C3C]/20 hover:border-[#B67C3C]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#B67C3C]/10">
              <h3 className="text-lg font-semibold text-[#fcedbe] mb-2">Can I cancel my subscription anytime?</h3>
              <p className="text-[#B67C3C]">Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your billing period.</p>
            </div>
            <div className="bg-[#2A1B3D] rounded-xl p-6 border border-[#B67C3C]/20 hover:border-[#B67C3C]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#B67C3C]/10">
              <h3 className="text-lg font-semibold text-[#fcedbe] mb-2">What happens to my worlds if I downgrade?</h3>
              <p className="text-[#B67C3C]">Your worlds will remain accessible, but you'll be limited to the free plan's features. You can upgrade again anytime to regain premium access.</p>
            </div>
            <div className="bg-[#2A1B3D] rounded-xl p-6 border border-[#B67C3C]/20 hover:border-[#B67C3C]/40 transition-all duration-300 hover:shadow-lg hover:shadow-[#B67C3C]/10">
              <h3 className="text-lg font-semibold text-[#fcedbe] mb-2">Do you offer refunds?</h3>
              <p className="text-[#B67C3C]">We offer a 14-day money-back guarantee for all premium subscriptions. If you're not satisfied, contact our support team for a full refund.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 