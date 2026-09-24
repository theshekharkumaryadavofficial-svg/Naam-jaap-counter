import React from 'react';
import { LotusIcon } from './LotusIcon';
import { ArrowUp, Lock } from 'lucide-react';
import { SiteConfig } from '../types';

interface FooterProps {
  config: SiteConfig;
  onAdminClick: () => void;
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onAdminClick, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', path: '/', hash: '#home' },
    { label: 'Features', path: '/features', hash: '#features' },
    { label: 'Screenshots', path: '/screenshots', hash: '#screenshots' },
    { label: 'Updates', path: '/updates', hash: '#updates' },
    { label: 'Download', path: '/download', hash: '#download' },
    { label: 'FAQ', path: '/faq', hash: '#faq' },
    { label: 'Privacy', path: '/privacy', hash: '#privacy' },
    { label: 'Contact', path: '/contact', hash: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, hash: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-[#111827] text-slate-400 py-14 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-slate-800">
          {/* Brand & Developer */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-amber-500/20 flex items-center justify-center shrink-0">
              <LotusIcon size={24} />
            </div>
            <div>
              <span className="text-xl font-bold text-white tracking-tight block">
                {config.appName}
              </span>
              <span className="text-xs text-slate-400">
                Developed by {config.developer}
              </span>
            </div>
          </div>

          {/* Navigation Links Mirror */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-300" aria-label="Footer Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path, link.hash)}
                className="hover:text-amber-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Back to top */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors shrink-0 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom bar with copyright and discrete Admin Panel trigger */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2025–2026 {config.appName}. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span>Free & Open Product for Devotees</span>
            <span aria-hidden="true">·</span>
            {/* Discrete Admin Panel link for owner Shekhar Kumar */}
            <button
              type="button"
              onClick={onAdminClick}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
