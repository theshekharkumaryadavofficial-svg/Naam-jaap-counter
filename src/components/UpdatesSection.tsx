import React from 'react';
import { ApkRelease } from '../types';
import { Download, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { recordApkDownload } from '../services/storage';

interface UpdatesSectionProps {
  releases: ApkRelease[];
  onDownloadClick?: () => void;
}

export const UpdatesSection: React.FC<UpdatesSectionProps> = ({ releases, onDownloadClick }) => {
  // Sort newest releases first
  const publishedReleases = releases
    .filter((r) => r.isPublished)
    .sort((a, b) => {
      if (a.isLatest) return -1;
      if (b.isLatest) return 1;
      return 0;
    });

  const handleDownloadRelease = (rel: ApkRelease) => {
    recordApkDownload(rel.version);
    const link = document.createElement('a');
    link.href = rel.fileBlobUrl || rel.downloadUrl || '/downloads/NaamJapCounter-v1.0.0.apk';
    link.download = rel.fileName || `NaamJapCounter-v${rel.version}.apk`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="updates" className="py-16 md:py-24 bg-[#FAF7F2] border-b border-amber-900/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs font-semibold text-amber-800 tracking-wider">
            VERSION HISTORY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 mb-3">
            Naam Jap Counter Updates & Changelog
          </h2>
          <p className="text-base text-slate-600">
            ऐप के आधिकारिक वर्ज़न और उनमें किए गए सुधारों की संपूर्ण सूची।
          </p>
        </div>

        {/* Timeline of Releases */}
        <div className="space-y-6">
          {publishedReleases.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-amber-900/10 text-center shadow-xs">
              <Sparkles className="w-10 h-10 text-amber-600/70 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Version 1.0.0 (Initial Official Release)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-4">
                पहला आधिकारिक स्थिर वर्ज़न जिसमें 108 माला काउंटर, दैनिक लक्ष्य, ऑफ़लाइन हिस्ट्री, और स्ट्रीक ट्रैकर शामिल हैं।
              </p>
              <a
                href="#download"
                onClick={(e) => {
                  if (onDownloadClick) {
                    e.preventDefault();
                    onDownloadClick();
                  }
                }}
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-700 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-200"
              >
                <span>Download v1.0.0 APK</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ) : (
            publishedReleases.map((rel) => (
              <div
                key={rel.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-900/10 shadow-xs relative overflow-hidden"
              >
                {rel.isLatest && (
                  <div className="absolute top-0 right-0 bg-emerald-700 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                    Latest Version
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-slate-900">
                        Version {rel.version}
                      </h3>
                      <span className="text-xs text-slate-500 font-medium">
                        {rel.releaseDate}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      File Size: {rel.fileSize} · Min Android: {rel.minAndroid}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDownloadRelease(rel)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-300 transition-colors cursor-pointer w-fit"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download v{rel.version}</span>
                  </button>
                </div>

                {/* Release Notes */}
                {rel.releaseNotes && rel.releaseNotes.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      What's New in this version:
                    </h4>
                    <ul className="space-y-1.5">
                      {rel.releaseNotes.map((note, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
