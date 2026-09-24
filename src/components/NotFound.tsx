import React from 'react';
import { LotusIcon } from './LotusIcon';
import { Home, Download, Sparkles, ArrowLeft } from 'lucide-react';

interface NotFoundProps {
  onGoHome: () => void;
  onGoDownload: () => void;
  onGoFeatures: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onGoHome, onGoDownload, onGoFeatures }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full bg-white rounded-3xl p-8 sm:p-10 border border-amber-900/10 shadow-lg text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#111827] border border-amber-500/30 flex items-center justify-center mx-auto mb-6 shadow-md">
          <LotusIcon size={36} />
        </div>

        <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold tracking-wider mb-3">
          ERROR 404
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Page Not Found
        </h1>

        <p className="text-base text-slate-600 mb-8 leading-relaxed">
          The page you are looking for might have been moved, removed, or never existed.
          Please use the links below to navigate to the official pages.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onGoHome}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </button>

          <button
            type="button"
            onClick={onGoDownload}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-700 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download APK</span>
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-center gap-6 text-xs text-slate-500">
          <button
            type="button"
            onClick={onGoFeatures}
            className="hover:text-amber-800 transition-colors cursor-pointer"
          >
            App Features
          </button>
          <span>·</span>
          <span>Naam Jap Counter | Shekhar Kumar</span>
        </div>
      </div>
    </div>
  );
};
