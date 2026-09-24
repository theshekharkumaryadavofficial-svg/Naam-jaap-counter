import React from 'react';
import { PhoneMockup } from './PhoneMockup';
import { Download, Smartphone, ShieldCheck, Sparkles } from 'lucide-react';
import { SiteConfig, ApkRelease, ScreenshotItem } from '../types';

interface HeroProps {
  config: SiteConfig;
  latestApk?: ApkRelease;
  heroScreenshot?: ScreenshotItem;
  onDownloadClick: () => void;
  onViewScreenshotsClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  config,
  latestApk,
  heroScreenshot,
  onDownloadClick,
  onViewScreenshotsClick,
}) => {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 border-b border-amber-900/10"
    >
      {/* Subtle Devotional Background Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-24 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-amber-200/40 via-amber-100/20 to-transparent blur-3xl" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-emerald-100/30 via-amber-100/10 to-transparent blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Subheading & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Clean editorial label - NO pill clutter */}
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 tracking-wider mb-4">
              <span>OFFICIAL ANDROID APP</span>
              <span aria-hidden="true">·</span>
              <span>BY SHEKHAR KUMAR</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-5">
              {config.appName}
            </h1>

            <h2 className="text-xl sm:text-2xl font-medium text-amber-950/90 leading-relaxed mb-4">
              {config.heroSubheading}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl">
              “{config.heroSupportingText}”
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-6">
              <button
                type="button"
                onClick={onDownloadClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white font-bold text-base rounded-xl shadow-md shadow-emerald-950/20 transition-all cursor-pointer whitespace-nowrap"
              >
                <Download className="w-5 h-5" />
                <span>{config.downloadButtonText}</span>
                {latestApk && (
                  <span className="text-xs font-normal opacity-90 pl-1">
                    (v{latestApk.version} · {latestApk.fileSize})
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={onViewScreenshotsClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-amber-50/80 active:bg-amber-100 text-slate-800 font-semibold text-base rounded-xl border border-amber-900/20 shadow-xs transition-all cursor-pointer whitespace-nowrap"
              >
                <Smartphone className="w-5 h-5 text-amber-700" />
                <span>View Screenshots</span>
              </button>
            </div>

            {/* Respectful Trust Indicators */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-500 pt-2 border-t border-amber-900/10 w-full">
              <span className="flex items-center gap-1.5 text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                No Ads / विज्ञापन रहित
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-700">100% Offline (डेटा फोन में सुरक्षित)</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-700">Android 6.0+</span>
            </div>
          </div>

          {/* Right Column: Realistic Android Phone Mockup */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Subtle devotional art backdrop halo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full bg-amber-400/15 filter blur-2xl" />
            </div>

            <div className="relative z-10 w-full max-w-[340px]">
              <PhoneMockup
                initialScreen="home"
                customImageUrl={heroScreenshot?.imageUrl}
                allowTabSwitch={true}
                interactive={true}
              />

              {/* Interactive hint microcopy */}
              <div className="mt-3 text-center">
                <p className="text-xs text-slate-500 inline-flex items-center gap-1.5 bg-amber-50/80 px-3 py-1 rounded-full border border-amber-900/10">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Interactive: फोन में +1 या +108 टैप करके देखें</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
