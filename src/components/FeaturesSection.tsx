import React from 'react';
import { FeatureItem } from '../types';
import {
  Smartphone,
  Target,
  CircleDot,
  BarChart2,
  Flame,
  History,
  Bell,
  TrendingUp,
  Layout,
  WifiOff,
} from 'lucide-react';

interface FeaturesSectionProps {
  features: FeatureItem[];
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features }) => {
  // Mapping of icon names to Lucide icons with subtle thematic soft colors
  const getFeatureIcon = (name: string, index: number) => {
    const iconColors = [
      { bg: 'bg-amber-100/80', text: 'text-amber-700', border: 'border-amber-200' },
      { bg: 'bg-rose-100/80', text: 'text-rose-700', border: 'border-rose-200' },
      { bg: 'bg-emerald-100/80', text: 'text-emerald-700', border: 'border-emerald-200' },
      { bg: 'bg-blue-100/80', text: 'text-blue-700', border: 'border-blue-200' },
      { bg: 'bg-orange-100/80', text: 'text-orange-700', border: 'border-orange-200' },
      { bg: 'bg-cyan-100/80', text: 'text-cyan-700', border: 'border-cyan-200' },
      { bg: 'bg-red-100/80', text: 'text-red-700', border: 'border-red-200' },
      { bg: 'bg-indigo-100/80', text: 'text-indigo-700', border: 'border-indigo-200' },
      { bg: 'bg-purple-100/80', text: 'text-purple-700', border: 'border-purple-200' },
      { bg: 'bg-teal-100/80', text: 'text-teal-700', border: 'border-teal-200' },
    ];
    const theme = iconColors[index % iconColors.length];

    const iconMap: Record<string, React.ReactNode> = {
      disc: <Smartphone className="w-5 h-5" />,
      target: <Target className="w-5 h-5" />,
      'circle-dot': <CircleDot className="w-5 h-5" />,
      'bar-chart-2': <BarChart2 className="w-5 h-5" />,
      flame: <Flame className="w-5 h-5" />,
      history: <History className="w-5 h-5" />,
      bell: <Bell className="w-5 h-5" />,
      'trending-up': <TrendingUp className="w-5 h-5" />,
      layout: <Layout className="w-5 h-5" />,
      'wifi-off': <WifiOff className="w-5 h-5" />,
    };

    return (
      <div
        className={`w-11 h-11 rounded-xl ${theme.bg} ${theme.text} ${theme.border} border flex items-center justify-center shrink-0 mb-3`}
      >
        {iconMap[name] || <CircleDot className="w-5 h-5" />}
      </div>
    );
  };

  return (
    <section id="features" className="py-16 md:py-24 bg-white border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-xs font-semibold text-amber-800 tracking-wider">
            APP CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 mb-3">
            App Features
          </h2>
          <p className="text-base text-slate-600">
            Naam Jap Counter में आपको ये सभी सुविधाएं मिलती हैं।
          </p>
        </div>

        {/* Responsive Grid: 2 columns on mobile, 3 columns on tablet, 5 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {features.map((feature, idx) => (
            <div
              key={feature.id}
              className="bg-[#FAF7F2] rounded-2xl p-5 border border-amber-900/10 shadow-xs hover:border-amber-500/40 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {getFeatureIcon(feature.iconName, idx)}
                <h3 className="text-base font-bold text-slate-900 mb-1.5">{feature.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
