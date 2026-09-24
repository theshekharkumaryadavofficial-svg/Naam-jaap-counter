import React, { useState } from 'react';
import { LotusIcon } from './LotusIcon';
import { Download, Menu, X } from 'lucide-react';

interface NavbarProps {
  onDownloadClick: () => void;
  onAdminClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onDownloadClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Screenshots', href: '#screenshots' },
    { label: 'Updates', href: '#updates' },
    { label: 'Download', href: '#download' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Privacy', href: '#privacy' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark with Sacred Lotus Emblem */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="flex items-center gap-2.5 group focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-xl bg-[#111927] flex items-center justify-center shadow-xs border border-amber-500/20 group-hover:scale-105 transition-transform">
            <LotusIcon size={22} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap">
            Naam Jap Counter
          </span>
        </a>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="hover:text-amber-800 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-600 hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
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
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-2.5 text-base font-medium text-slate-700 hover:text-amber-800 hover:bg-amber-50/60 rounded-lg transition-colors"
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
