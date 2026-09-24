import React from 'react';
import { Target, History, Sparkles } from 'lucide-react';

export const TrustSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 bg-[#FAF7F2] border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Simple. Private. Easy to Use.
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">
            बिना किसी जटिलता या विज्ञापन के, केवल आपका नाम जाप और आपकी साधना।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Card 1: Easy Counting */}
          <div className="bg-white rounded-2xl p-6 border border-amber-900/10 shadow-xs hover:shadow-md transition-shadow text-center flex flex-col items-center">
            <div className="w-13 h-13 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4 border border-amber-200/50">
              <span className="text-2xl" role="img" aria-label="Jap Mala">
                📿
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Easy Counting</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              “एक tap से Naam Jap count करें।”
            </p>
          </div>

          {/* Card 2: Daily Goal */}
          <div className="bg-white rounded-2xl p-6 border border-amber-900/10 shadow-xs hover:shadow-md transition-shadow text-center flex flex-col items-center">
            <div className="w-13 h-13 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center mb-4 border border-rose-200/50">
              <Target className="w-6 h-6 text-rose-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Daily Goal</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              “अपना daily target तय करें और progress देखें।”
            </p>
          </div>

          {/* Card 3: History */}
          <div className="bg-white rounded-2xl p-6 border border-amber-900/10 shadow-xs hover:shadow-md transition-shadow text-center flex flex-col items-center">
            <div className="w-13 h-13 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 border border-emerald-200/50">
              <History className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">History</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              “अपने पुराने counts और consistency को देखें।”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
