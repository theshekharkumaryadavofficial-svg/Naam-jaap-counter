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
      aria-label="Hero Overview"
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

            {/* Main H1 Heading with Primary Keywords for SEO */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-5">
              Naam Jap Counter
            </h1>

            <p className="text-xl sm:text-2xl font-medium text-amber-950/90 leading-relaxed mb-4">
              {config.heroSubheading || 'अपने Naam Jap को सरल तरीके से गिनें, लक्ष्य बनाएं और अपनी नियमितता देखें।'}
            </p>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl">
              {config.heroSupportingText || 'Naam Jap Counter एक सरल और उपयोगी Android ऐप है जिससे आप अपना Naam Jap गिन सकते हैं, daily target सेट कर सकते हैं और अपनी progress, streak तथा history देख सकते हैं।'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-6">
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  onDownloadClick();
                }}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white font-bold text-base rounded-xl shadow-md shadow-emerald-950/20 transition-all cursor-pointer whitespace-nowrap"
              >
                <Download className="w-5 h-5" />
                <span>{config.downloadButtonText || 'Download APK'}</span>
                {latestApk && (
                  <span className="text-xs font-normal opacity-90 pl-1">
                    (v{latestApk.version} · {latestApk.fileSize})
                  </span>
                )}
              </a>

              <a
                href="#screenshots"
                onClick={(e) => {
                  e.preventDefault();
                  onViewScreenshotsClick();
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-amber-50/80 active:bg-amber-100 text-slate-800 font-semibold text-base rounded-xl border border-amber-900/20 shadow-xs transition-all cursor-pointer whitespace-nowrap"
              >
                <Smartphone className="w-5 h-5 text-amber-700" />
                <span>View Screenshots</span>
              </a>
            </div>

            {/* Reassurance Note */}
            <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5 text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Free & No Ads</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Offline Support</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>108 Mala Tracker</span>
            </div>
          </div>

          {/* Right Column: Interactive Phone Mockup with Sacred Experience */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-[320px] sm:max-w-[340px]">
              {/* Subtle ambient halo */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-amber-400/20 via-orange-300/15 to-transparent rounded-[50px] blur-xl -z-10" />

              <PhoneMockup
                initialScreen="home"
                customImageUrl={heroScreenshot?.imageUrl}
                allowTabSwitch={true}
                interactive={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
