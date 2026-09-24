import React, { useState } from 'react';
import { ApkRelease, SiteConfig } from '../types';
import { LotusIcon } from './LotusIcon';
import { Download, ShieldAlert, CheckCircle, Clock } from 'lucide-react';
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
            Download Naam Jap Counter
          </h2>
          <p className="text-base text-slate-600">
            “Naam Jap Counter का latest Android version यहाँ से प्राप्त करें।”
          </p>
        </div>

        {/* Download Card Container */}
        <div className="max-w-4xl mx-auto bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-sm">
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
                    <span className="text-emerald-700 font-semibold">Latest Stable</span>
                    <span aria-hidden="true">·</span>
                    <span>{latestApk.releaseDate}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{latestApk.fileSize}</span>
                    <span aria-hidden="true">·</span>
                    <span>{latestApk.minAndroid}</span>
                  </div>

                  {/* Action Button */}
                  <div className="mt-5">
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white font-bold text-base rounded-xl shadow-md shadow-emerald-950/20 transition-all cursor-pointer whitespace-nowrap"
                    >
                      <Download className="w-5 h-5" />
                      <span>{config.downloadButtonText}</span>
                    </button>
                    <p className="text-xs text-slate-500 mt-2">
                      केवल official website से APK download करें।
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side: Android Security Notice */}
              <div className="lg:max-w-xs bg-amber-50/90 border border-amber-200/80 rounded-2xl p-4.5 text-xs text-amber-950 leading-relaxed flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-amber-900 mb-1">
                    Android Installation Safety
                  </span>
                  Android may display a security warning when installing apps obtained outside Google
                  Play. Only install APK files downloaded from this official website.
                </div>
              </div>
            </div>
          ) : (
            /* Error Handling: If APK is missing or being prepared */
            <div className="text-center py-10 px-4">
              <Clock className="w-12 h-12 text-amber-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Latest APK is currently being prepared.
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Please check again soon or contact Shekhar Kumar for the early beta build.
              </p>
            </div>
          )}

          {/* Download Success Notice */}
          {downloadSuccessToast && (
            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2.5 animate-in fade-in duration-200">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">APK डाउनलोड शुरू हो गया है!</span>
                यदि आपके फोन में “Install Unknown Apps” अनुमति मांगी जाए, तो केवल इस आधिकारिक फाइल को अनुमति दें। स्थापना के बाद आप तुरंत Jap शुरू कर सकते हैं।
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
