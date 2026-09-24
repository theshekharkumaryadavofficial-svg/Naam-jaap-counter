import React, { useState } from 'react';
import { ScreenshotItem } from '../types';
import { PhoneMockup } from './PhoneMockup';
import { ScreenshotLightbox } from './ScreenshotLightbox';
import { Maximize2 } from 'lucide-react';
import { recordScreenshotView } from '../services/storage';

interface ScreenshotsSectionProps {
  screenshots: ScreenshotItem[];
}

export const ScreenshotsSection: React.FC<ScreenshotsSectionProps> = ({ screenshots }) => {
  const [selectedScreenshot, setSelectedScreenshot] = useState<ScreenshotItem | null>(null);

  // Filter only published screenshots sorted by displayOrder
  const publishedScreenshots = screenshots
    .filter((s) => s.isPublished)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const handleOpenLightbox = (item: ScreenshotItem) => {
    setSelectedScreenshot(item);
    recordScreenshotView(item.title);
  };

  return (
    <section id="screenshots" className="py-16 md:py-24 bg-[#FAF7F2] border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-xs font-semibold text-amber-800 tracking-wider">
            REAL INTERFACES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 mb-3">
            App Screenshots
          </h2>
          <p className="text-base text-slate-600">
            “Naam Jap Counter को इस्तेमाल करते समय मिलने वाले मुख्य screens।”
          </p>
        </div>

        {/* Gallery Grid: 1-2 on mobile, 3 on tablet, 4-5 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-6 items-start justify-center">
          {publishedScreenshots.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(item)}
              className="group cursor-pointer flex flex-col items-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 rounded-3xl p-2 transition-transform duration-200 hover:-translate-y-1.5"
            >
              {/* Phone Thumbnail */}
              <div className="relative w-full max-w-[240px] sm:max-w-none">
                <PhoneMockup
                  initialScreen={item.screenKey}
                  customImageUrl={item.imageUrl}
                  allowTabSwitch={false}
                  interactive={false}
                  className="shadow-lg group-hover:shadow-2xl transition-shadow"
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/40 rounded-[42px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="px-3.5 py-2 bg-white/90 backdrop-blur-xs text-slate-900 text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5 transform scale-90 group-hover:scale-100 transition-transform">
                    <Maximize2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>View Screen</span>
                  </div>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="mt-4 text-center">
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-800 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <ScreenshotLightbox
        screenshot={selectedScreenshot}
        screenshots={publishedScreenshots}
        onClose={() => setSelectedScreenshot(null)}
        onSelect={(item) => {
          setSelectedScreenshot(item);
          recordScreenshotView(item.title);
        }}
      />
    </section>
  );
};
