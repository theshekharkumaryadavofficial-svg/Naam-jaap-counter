import React from 'react';
import { ApkRelease } from '../types';
import { Download, Sparkles, CheckCircle2 } from 'lucide-react';
import { recordApkDownload } from '../services/storage';

interface UpdatesSectionProps {
  releases: ApkRelease[];
}

export const UpdatesSection: React.FC<UpdatesSectionProps> = ({ releases }) => {
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
            Latest Updates
          </h2>
          <p className="text-base text-slate-600">
            App ke naye versions aur unmein kiye gaye changes.
          </p>
        </div>

        {/* Timeline of Releases */}
        <div className="space-y-6">
          {publishedReleases.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 border border-amber-900/10 text-center shadow-xs">
              <Sparkles className="w-10 h-10 text-amber-600/70 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900 mb-1">
                नया अपडेट जल्द ही उपलब्ध होगा
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                डेवलपर द्वारा नया वर्ज़न प्रकाशित किए जाने पर यहाँ changelog और APK डाउनलोड उपलब्ध होगा।
              </p>
            </div>
          ) : (
            publishedReleases.map((rel) => (
            <div
              key={rel.id}
              className={`bg-white rounded-2xl p-6 sm:p-7 border transition-all ${
                rel.isLatest
                  ? 'border-emerald-600/40 shadow-sm ring-1 ring-emerald-500/20'
                  : 'border-amber-900/10 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-amber-900/10">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                      rel.isLatest
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {rel.isLatest ? <Sparkles className="w-5 h-5 text-emerald-700" /> : 'v'}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-900">
                        Version {rel.version}
                      </h3>
                      {rel.isLatest && (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-semibold rounded-md border border-emerald-300">
                          Latest Release
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      <span>Released on {rel.releaseDate}</span>
                      <span aria-hidden="true" className="mx-1.5">·</span>
                      <span className="tabular-nums">{rel.fileSize}</span>
                      <span aria-hidden="true" className="mx-1.5">·</span>
                      <span>{rel.minAndroid}</span>
                    </div>
                  </div>
                </div>

                {/* Download Button for this version */}
                <button
                  type="button"
                  onClick={() => handleDownloadRelease(rel)}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap self-start sm:self-center ${
                    rel.isLatest
                      ? 'bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                  }`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download APK</span>
                </button>
              </div>

              {/* Release Notes */}
              <div className="mt-4">
                <h4 className="text-xs font-semibold text-slate-700 tracking-wide mb-2.5">
                  CHANGES & IMPROVEMENTS
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                  {rel.releaseNotes.map((note, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )))}
        </div>
      </div>
    </section>
  );
};
