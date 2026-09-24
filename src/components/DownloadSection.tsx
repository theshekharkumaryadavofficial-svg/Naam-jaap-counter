import React, { useState } from 'react';
import { ApkRelease, SiteConfig } from '../types';
import { LotusIcon } from './LotusIcon';
import { Download, ShieldAlert, CheckCircle, Clock, Smartphone, Info } from 'lucide-react';
import { recordApkDownload } from '../services/storage';

interface DownloadSectionProps {
  latestApk?: ApkRelease;
  config: SiteConfig;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({ latestApk, config }) => {
  const [downloadSuccessToast, setDownloadSuccessToast] = useState(false);

  const handleDownload = () => {
    if (!latestApk) return;

    recordApkDownload(latestApk.version);

    // Trigger real browser file download
    const link = document.createElement('a');
    link.href = latestApk.fileBlobUrl || latestApk.downloadUrl || '/downloads/NaamJapCounter-v1.0.0.apk';
    link.download = latestApk.fileName || `NaamJapCounter-v${latestApk.version}.apk`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccessToast(true);
    setTimeout(() => {
      setDownloadSuccessToast(false);
    }, 6000);
  };

  return (
    <section id="download" className="py-16 md:py-24 bg-white border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-amber-800 tracking-wider">
            OFFICIAL ANDROID RELEASE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 mb-3">
            Download Naam Jap Counter for Android
          </h2>
          <p className="text-base text-slate-600">
            Naam Jap Counter का नवीनतम आधिकारिक Android APK यहाँ से सुरक्षित डाउनलोड करें।
          </p>
        </div>

        {/* Download Card Container */}
        <div className="max-w-4xl mx-auto bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-xs">
          {latestApk ? (
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-8">
              {/* Left Side: App Icon & Version Metadata */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#111927] border border-amber-500/30 flex items-center justify-center shadow-md shrink-0">
                  <LotusIcon size={40} />
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-2xl font-bold text-slate-900">{config.appName}</h3>
                    <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-md text-xs font-semibold">
                      Version {latestApk.version}
                    </span>
                  </div>

                  {/* Clean Metadata without noisy pill badges */}
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500 mt-2 font-medium">
                    <span className="text-emerald-700 font-semibold">Latest Official Stable</span>
                    <span aria-hidden="true">·</span>
                    <span>File Size: {latestApk.fileSize || '3.2 MB'}</span>
                    <span aria-hidden="true">·</span>
                    <span>Supports: {latestApk.minAndroid || 'Android 6.0 and up'}</span>
                    <span aria-hidden="true">·</span>
                    <span>Released: {latestApk.releaseDate || '2026'}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 mt-3 max-w-md">
                    Direct and official APK package built and signed for Android devices.
                  </p>
                </div>
              </div>

              {/* Right Side: CTA Button */}
              <div className="flex flex-col items-stretch sm:items-end justify-center shrink-0">
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white font-bold text-base rounded-2xl shadow-lg shadow-emerald-900/20 hover:shadow-xl transition-all cursor-pointer"
                >
                  <Download className="w-5 h-5" />
                  <span>Download APK (v{latestApk.version})</span>
                </button>
                <span className="text-[11px] text-slate-500 mt-2 text-center sm:text-right font-medium">
                  Direct download · 100% Free & No Ads
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-[#111927] border border-amber-500/30 flex items-center justify-center mx-auto mb-4 shadow-md">
                <LotusIcon size={36} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Official Android APK (Version 1.0.0)
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                Naam Jap Counter for Android is available for direct installation.
              </p>
              <a
                href="/downloads/NaamJapCounter-v1.0.0.apk"
                download="NaamJapCounter-v1.0.0.apk"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-md cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Official APK</span>
              </a>
            </div>
          )}

          {/* Transparent Installation Guide & Safety Information */}
          <div className="mt-8 pt-6 border-t border-amber-900/10 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
            <div>
              <h4 className="font-bold text-slate-800 flex items-center gap-1.5 mb-2 text-sm">
                <Smartphone className="w-4 h-4 text-amber-700" />
                <span>How to Install APK on Android:</span>
              </h4>
              <ol className="list-decimal list-inside space-y-1 text-slate-600 leading-relaxed">
                <li>Click the <strong>Download APK</strong> button above.</li>
                <li>When prompted by your browser, tap <strong>Download anyway</strong>.</li>
                <li>Open the downloaded file and select <strong>Install</strong>.</li>
                <li>If prompted, allow installation from your browser source.</li>
              </ol>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 flex items-center gap-1.5 mb-2 text-sm">
                <Info className="w-4 h-4 text-emerald-700" />
                <span>Safety & Integrity Note:</span>
              </h4>
              <p className="leading-relaxed text-slate-600">
                This APK is the official build created directly by developer <strong>Shekhar Kumar</strong>. It contains no analytics trackers, no advertising libraries, and requires only standard local storage permissions for saving your count offline.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Download Success Toast */}
      {downloadSuccessToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500/30 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <span className="font-bold block">Downloading Naam Jap Counter APK</span>
            <span className="text-slate-300">Check your browser notifications for progress.</span>
          </div>
        </div>
      )}
    </section>
  );
};
