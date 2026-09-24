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
            Contact
          </h2>
          <p className="text-sm font-semibold text-amber-900 mb-1">
            Developer: {config.developer}
          </p>
          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            “Have feedback, found a bug, or want to suggest a feature? Send a message.”
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
              <p className="text-sm text-slate-600 max-w-md mx-auto mb-5">
                Thank you for your valuable feedback. Shekhar Kumar will review your message soon.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-bold text-slate-700 mb-1.5"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="आपका नाम (Your Name)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-amber-900/15 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-bold text-slate-700 mb-1.5"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-amber-900/15 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-bold text-slate-700 mb-1.5"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="अपना संदेश, समस्या या सुझाव यहाँ लिखें..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-amber-900/15 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all resize-y"
                  />
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3 bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
