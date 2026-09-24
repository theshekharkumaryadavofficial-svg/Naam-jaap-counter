import React, { useState } from 'react';
import { ShieldCheck, Lock, Smartphone, BarChart3, HelpCircle, ChevronRight } from 'lucide-react';
import { SiteConfig } from '../types';

interface PrivacySectionProps {
  config: SiteConfig;
}

export const PrivacySection: React.FC<PrivacySectionProps> = ({ config }) => {
  const [showFullModal, setShowFullModal] = useState(false);

  return (
    <section id="privacy" className="py-16 md:py-24 bg-[#FAF7F2] border-b border-amber-900/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-amber-800 tracking-wider">
            TRANSPARENCY & TRUST
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 mb-3">
            Privacy Policy
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
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  Privacy-Conscious Analytics
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  वेबसाइट पर हम केवल कुल पेज विजिट और APK डाउनलोड की कुल संख्या गिनते हैं ताकि
                  सर्वर की उपलब्धता सुनिश्चित रहे। इसमें कोई भी व्यक्तिगत या निजी पहचान (IP) स्टोर नहीं
                  होती।
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">Contact for Privacy</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  गोपनीयता या डेटा संबंधित किसी भी प्रश्न के लिए आप सीधे डेवलपर {config.developer} से
                  संपर्क कर सकते हैं।
                </p>
              </div>
            </div>
          </div>

          {/* Full Policy Modal Trigger */}
          <div className="pt-4 border-t border-amber-900/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500">
              Last updated: September 2025 · App Version 1.0.0
            </span>
            <button
              type="button"
              onClick={() => setShowFullModal(true)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-900 underline underline-offset-4 cursor-pointer"
            >
              <span>पूरी Privacy Policy पढ़ें</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Full Privacy Policy Modal */}
      {showFullModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-amber-900/15">
            <div className="flex items-center justify-between pb-4 border-b border-amber-900/10 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-700" />
                <h3 className="text-xl font-bold text-slate-900">Privacy Policy (विस्तृत विवरण)</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowFullModal(false)}
                className="text-slate-500 hover:text-slate-800 text-sm font-semibold p-1"
              >
                ✕ बंद करें
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h4 className="font-bold text-slate-900 text-base">1. हम किन जानकारियों को एकत्र करते हैं?</h4>
              <p>
                <strong>वेबसाइट पर:</strong> जब आप हमारी वेबसाइट पर आते हैं, तो हम केवल सामान्य
                विज़िट और APK डाउनलोड की संख्या की गणना करते हैं। यदि आप कॉन्टैक्ट फॉर्म का उपयोग करते
                हैं, तो आपके द्वारा स्वेच्छा से दिया गया नाम, ईमेल और संदेश डेवलपर तक पहुँचाया जाता है।
              </p>

              <h4 className="font-bold text-slate-900 text-base">2. ऐप में क्या स्टोर होता है?</h4>
              <p>
                <strong>Naam Jap Counter Android App:</strong> ऐप आपके नाम जाप के आंकड़े, माला गणना,
                दैनिक लक्ष्य और सेटिंग्स को केवल आपके फोन की आंतरिक मेमोरी (Room / SQLite Database) में
                रखता है। यह डेटा कभी भी बाहरी सर्वर पर अपलोड नहीं होता।
              </p>

              <h4 className="font-bold text-slate-900 text-base">3. क्या इंटरनेट आवश्यक है?</h4>
              <p>
                नहीं। ऐप को बिना किसी इंटरनेट कनेक्शन के भी पूरी तरह से इस्तेमाल किया जा सकता है।
              </p>

              <h4 className="font-bold text-slate-900 text-base">4. विज्ञापन और थर्ड पार्टी</h4>
              <p>
                ऐप 100% विज्ञापन-मुक्त (Ad-free) है। हम किसी भी विज्ञापन नेटवर्क या डेटा-ब्रोकर के साथ
                साझेदारी नहीं करते।
              </p>

              <h4 className="font-bold text-slate-900 text-base">5. संपर्क विवरण</h4>
              <p>
                डेवलपर: <strong>{config.developer}</strong>
                <br />
                संपर्क: वेबसाइट पर दिए गए Contact फ़ॉर्म के माध्यम से कभी भी संदेश भेज सकते हैं।
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-amber-900/10 text-right">
              <button
                type="button"
                onClick={() => setShowFullModal(false)}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                समझ गया (Close)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
