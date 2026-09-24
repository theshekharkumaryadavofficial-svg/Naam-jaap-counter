import React, { useState } from 'react';
import { LotusIcon } from './LotusIcon';
import { Download, Menu, X } from 'lucide-react';

interface NavbarProps {
  onDownloadClick: () => void;
  onAdminClick?: () => void;
  activePath?: string;
  onNavigate?: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onDownloadClick,
  activePath = '/',
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    setMobileMenuOpen(false);

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
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark with Sacred Lotus Emblem */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/', '#home')}
          className="flex items-center gap-2.5 group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
          aria-label="Naam Jap Counter Home"
        >
          <div className="w-9 h-9 rounded-xl bg-[#111927] flex items-center justify-center shadow-xs border border-amber-500/20 group-hover:scale-105 transition-transform">
            <LotusIcon size={22} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap leading-tight">
              Naam Jap Counter
            </span>
            <span className="text-[10px] font-medium text-amber-800 tracking-wide hidden sm:block">
              Developed by Shekhar Kumar
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activePath === link.path;
            return (
              <a
                key={link.label}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path, link.hash)}
                className={`py-1 relative transition-colors cursor-pointer ${
                  isActive
                    ? 'text-amber-900 font-bold after:w-full after:bg-amber-700'
                    : 'hover:text-amber-800 after:w-0 hover:after:w-full after:bg-amber-600'
                } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:transition-all`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onDownloadClick}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs shadow-emerald-900/20 transition-all cursor-pointer whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>Download App</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-amber-900/10 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path, link.hash)}
                className={`px-3 py-2.5 text-base font-medium rounded-lg transition-colors ${
                  activePath === link.path
                    ? 'bg-amber-100/80 text-amber-950 font-bold'
                    : 'text-slate-700 hover:text-amber-800 hover:bg-amber-50/60'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
