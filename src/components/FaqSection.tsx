import React, { useState } from 'react';
import { FaqItem } from '../types';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

interface FaqSectionProps {
  faqs: FaqItem[];
  onDownloadClick?: () => void;
  onPrivacyClick?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  faqs,
  onDownloadClick,
  onPrivacyClick,
}) => {
  const [openIds, setOpenIds] = useState<string[]>([faqs[0]?.id || 'faq-1']);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white border-b border-amber-900/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-amber-800 tracking-wider">
            QUESTIONS & ANSWERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 mb-3">
            Naam Jap Counter FAQ
          </h2>
          <p className="text-base text-slate-600">
            Naam Jap Counter ऐप से जुड़े सामान्य सवाल और उनके स्पष्ट उत्तर।
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-[#FAF7F2] rounded-2xl border border-amber-900/10 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-amber-800 transition-colors cursor-pointer"
                >
                  <span className="text-base sm:text-lg flex items-center gap-2.5">
                    <HelpCircle className="w-5 h-5 text-amber-700 shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-amber-800' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-amber-900/5">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Helpful links underneath FAQ */}
        <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-600">
          <span>Need more details?</span>
          <a
            href="#download"
            onClick={(e) => {
              if (onDownloadClick) {
                e.preventDefault();
                onDownloadClick();
              }
            }}
            className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1"
          >
            <span>Download Section</span>
            <ArrowRight className="w-3 h-3" />
          </a>
          <span>·</span>
          <a
            href="#privacy"
            onClick={(e) => {
              if (onPrivacyClick) {
                e.preventDefault();
                onPrivacyClick();
              }
            }}
            className="text-amber-800 hover:text-amber-900 font-semibold inline-flex items-center gap-1"
          >
            <span>Read Privacy Policy</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
};
