import React, { useEffect } from 'react';
import { ScreenshotItem } from '../types';
import { PhoneMockup } from './PhoneMockup';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ScreenshotLightboxProps {
  screenshot: ScreenshotItem | null;
  screenshots: ScreenshotItem[];
  onClose: () => void;
  onSelect: (item: ScreenshotItem) => void;
}

export const ScreenshotLightbox: React.FC<ScreenshotLightboxProps> = ({
  screenshot,
  screenshots,
  onClose,
  onSelect,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!screenshot) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screenshot, screenshots]);

  if (!screenshot) return null;

  const currentIndex = screenshots.findIndex((s) => s.id === screenshot.id);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
    onSelect(screenshots[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % screenshots.length;
    onSelect(screenshots[nextIndex]);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close Lightbox"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded-full transition-colors z-20 cursor-pointer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Nav buttons */}
      {screenshots.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous Screenshot"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded-full transition-colors z-20 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next Screenshot"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded-full transition-colors z-20 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Main Content Modal */}
      <div className="relative max-w-4xl w-full max-h-[92vh] flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10 p-2 sm:p-6 overflow-y-auto">
        {/* Phone Frame */}
        <div className="w-full max-w-[290px] sm:max-w-[320px] shrink-0">
          <PhoneMockup
            initialScreen={screenshot.screenKey}
            customImageUrl={screenshot.imageUrl}
            allowTabSwitch={true}
            interactive={true}
          />
        </div>

        {/* Text Details */}
        <div className="text-white max-w-md text-left flex flex-col justify-center">
          <div className="text-xs font-semibold text-amber-400 tracking-wider mb-1">
            SCREEN {currentIndex + 1} OF {screenshots.length}
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1 text-white">
            {screenshot.title}
          </h3>
          <p className="text-sm font-medium text-amber-200/90 mb-4">
            {screenshot.subtitle}
          </p>
          <p className="text-sm text-slate-300 leading-relaxed mb-6 bg-white/5 p-4 rounded-xl border border-white/10">
            {screenshot.description}
          </p>

          {/* Quick instructions */}
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>Tip: You can use Left/Right arrows or swipe to navigate</span>
          </div>
        </div>
      </div>
    </div>
  );
};
