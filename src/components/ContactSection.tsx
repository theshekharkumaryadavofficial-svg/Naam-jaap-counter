import React, { useState } from 'react';
import { SiteConfig } from '../types';
import { submitContactMessage } from '../services/storage';
import { Send, CheckCircle2, User, Mail, MessageSquare } from 'lucide-react';

interface ContactSectionProps {
  config: SiteConfig;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ config }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      submitContactMessage(name.trim(), email.trim(), message.trim());
      setIsSubmitting(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 8000);
    }, 400);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white border-b border-amber-900/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold text-amber-800 tracking-wider">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1 mb-2">
            Contact – Naam Jap Counter
          </h2>
          <p className="text-sm font-semibold text-amber-900 mb-1">
            Developer: {config.developer}
          </p>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            “Have feedback, found a bug, or want to suggest a feature? Send a message directly to the developer.”
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-amber-900/15 shadow-xs">
          {submitted ? (
            <div className="py-10 text-center animate-in fade-in duration-300">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 border border-emerald-300">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                संदेश सफलतापूर्वक भेज दिया गया!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                धन्यवाद। आपका संदेश डेवलपर को प्राप्त हो गया है। हम जल्द ही आपकी प्रतिक्रिया पर ध्यान देंगे।
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  आपका नाम (Full Name) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="उदा. राहुल शर्मा"
                    className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-amber-900/20 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 text-sm text-slate-900 outline-hidden transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  ईमेल पता (Email Address) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-amber-900/20 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 text-sm text-slate-900 outline-hidden transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5"
                >
                  संदेश या सुझाव (Message) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3.5 pointer-events-none text-slate-400">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="अपना संदेश यहाँ लिखें..."
                    className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-amber-900/20 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 text-sm text-slate-900 outline-hidden transition-all resize-y"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-amber-800 hover:bg-amber-900 active:bg-amber-950 text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'भेजा जा रहा है...' : 'संदेश भेजें (Send Message)'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
