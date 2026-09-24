import React from 'react';
import { Download } from 'lucide-react';
import { ApkRelease } from '../types';

interface MobileStickyBarProps {
  latestApk?: ApkRelease;
  onDownloadClick: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  latestApk,
  onDownloadClick,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#111827]/95 backdrop-blur-md border-t border-slate-800 p-2.5 px-4 shadow-2xl flex items-center justify-between gap-3 max-h-[12vh]">
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-bold text-white truncate">
          Naam Jap Counter
        </span>
        <span className="text-[10px] text-amber-400 font-medium">
          {latestApk ? `v${latestApk.version} · ${latestApk.fileSize}` : 'Free Android App'}
        </span>
      </div>

      <button
        type="button"
        onClick={onDownloadClick}
        className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 active:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-950/40 shrink-0 cursor-pointer"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Download APK</span>
      </button>
    </div>
  );
};
