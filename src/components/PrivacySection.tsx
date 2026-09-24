import React, { useState } from 'react';
import { ShieldCheck, Lock, Smartphone, BarChart3, HelpCircle, ChevronRight, ArrowRight } from 'lucide-react';
import { SiteConfig } from '../types';

interface PrivacySectionProps {
  config: SiteConfig;
  onContactClick?: () => void;
}

export const PrivacySection: React.FC<PrivacySectionProps> = ({ config, onContactClick }) => {
  const [showFullModal, setShowFullModal] = useState(false);

  return (
    <section id="privacy" className="py-16 md:py-24 bg-[#FAF7F2] border-b border-amber-900/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-amber-800 tracking-wider">
            TRANSPARENCY & TRUST
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 mb-3">
            Naam Jap Counter Privacy Policy
          </h2>
          <p className="text-base text-slate-600">
            आपकी साधना और व्यक्तिगत डेटा की सुरक्षा हमारी सर्वोच्च प्राथमिकता है।
          </p>
        </div>

        {/* Highlighted Policy Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-xs space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  100% On-Device Jap Storage
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  आपके सभी Naam Jap counts, दैनिक लक्ष्य, माला प्रगति और हिस्ट्री केवल आपके फोन के
                  लोकल डेटाबेस में सुरक्षित रहते हैं। इन्हें कभी किसी सर्वर या क्लाउड पर नहीं भेजा
                  जाता।
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Zero Advertising & No Data Selling
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  इस ऐप या वेबसाइट में कोई भी तृतीय-पक्ष विज्ञापन (third-party ads) या डेटा ट्रैकर
                  शामिल नहीं हैं। आपका डेटा किसी भी कंपनी के साथ बेचा या साझा नहीं किया जाता।
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  No Login or Personal Info Required
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  ऐप शुरू करने के लिए ईमेल, फोन नंबर, नाम या सोशल अकाउंट लॉगिन की कोई आवश्यकता नहीं
                  है। इंस्टॉल करते ही आप बिना रुकावट जाप शुरू कर सकते हैं।
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Complete Data Control
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  आप जब चाहें सेटिंग्स में जाकर अपने पुराने काउंट्स या हिस्ट्री को रीसेट या साफ़ कर
                  सकते हैं। ऐप अनइंस्टॉल करने पर सारा डेटा फोन से स्वतः डिलीट हो जाता है।
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              Last updated: September 2026 · Official policy by Shekhar Kumar
            </p>

            <button
              type="button"
              onClick={() => setShowFullModal(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-900 transition-colors cursor-pointer"
            >
              <span>Read Full Legal Terms</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Contact developer prompt */}
        <div className="mt-8 text-center">
          <a
            href="#contact"
            onClick={(e) => {
              if (onContactClick) {
                e.preventDefault();
                onContactClick();
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-amber-800 transition-colors"
          >
            <span>Have questions regarding privacy or your data? Contact developer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Full Modal */}
      {showFullModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[85vh] overflow-y-auto border border-amber-900/20 shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Naam Jap Counter – Full Privacy Document
            </h3>
            <div className="text-sm text-slate-600 space-y-4 leading-relaxed">
              <p>
                <strong>1. Overview:</strong> Naam Jap Counter is developed by Shekhar Kumar with a commitment to high standards of user privacy. It operates entirely as an offline utility tool for counting sacred names and mantras.
              </p>
              <p>
                <strong>2. Data Collection:</strong> We do not collect, transmit, or store any personal information on external servers. All counts, streaks, targets, and dates remain exclusively inside your Android device's local storage.
              </p>
              <p>
                <strong>3. Permissions:</strong> The app does not request invasive permissions such as contacts, camera, microphone, or GPS location.
              </p>
              <p>
                <strong>4. Third-Party Services:</strong> There are no advertising SDKs (such as AdMob), tracker SDKs, or third-party analytic trackers included in the app.
              </p>
              <p>
                <strong>5. Contact:</strong> For inquiries regarding this Privacy Policy, you may submit a message via the contact form on this website.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowFullModal(false)}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
