/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustSection } from './components/TrustSection';
import { FeaturesSection } from './components/FeaturesSection';
import { ScreenshotsSection } from './components/ScreenshotsSection';
import { DownloadSection } from './components/DownloadSection';
import { UpdatesSection } from './components/UpdatesSection';
import { FaqSection } from './components/FaqSection';
import { PrivacySection } from './components/PrivacySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { AdminModal } from './components/AdminModal';
import { NotFound } from './components/NotFound';
import { useSeo } from './services/seo';
import {
  getSiteConfig,
  getApkReleases,
  getScreenshots,
  getFeatures,
  getFaqs,
  getAnalytics,
  getContactMessages,
  subscribeToStore,
  recordVisit,
} from './services/storage';

export default function App() {
  const [config, setConfig] = useState(getSiteConfig());
  const [releases, setReleases] = useState(getApkReleases());
  const [screenshots, setScreenshots] = useState(getScreenshots());
  const [features, setFeatures] = useState(getFeatures());
  const [faqs, setFaqs] = useState(getFaqs());
  const [analytics, setAnalytics] = useState(getAnalytics());
  const [messages, setMessages] = useState(getContactMessages());
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Client-side route synchronization
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
      return path;
    }
    return '/';
  });

  // Map current pathname to SEO key
  const getPageKey = (path: string): string => {
    switch (path) {
      case '/':
      case '':
        return 'home';
      case '/features':
        return 'features';
      case '/screenshots':
        return 'screenshots';
      case '/download':
        return 'download';
      case '/updates':
        return 'updates';
      case '/faq':
        return 'faq';
      case '/privacy':
        return 'privacy';
      case '/contact':
        return 'contact';
      default:
        return 'notFound';
    }
  };

  const pageKey = getPageKey(currentPath);
  useSeo(pageKey);

  // Handle browser popstate (back / forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
      setCurrentPath(path);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle initial deep linking scroll if hash or path is provided
  useEffect(() => {
    const hash = window.location.hash;
    const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';

    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 200);
      }
    } else if (path !== '/') {
      const sectionId = path.replace('/', '');
      const el = document.getElementById(sectionId);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 200);
      }
    }
  }, []);

  // Router navigation helper
  const navigateTo = useCallback((targetPath: string) => {
    const normalized = targetPath.toLowerCase().replace(/\/$/, '') || '/';
    setCurrentPath(normalized);
    window.history.pushState({}, '', normalized);

    if (normalized === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const sectionId = normalized.replace('/', '');
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  // Subscribe to live reactive updates from storage
  useEffect(() => {
    const unsubscribe = subscribeToStore(() => {
      setConfig(getSiteConfig());
      setReleases(getApkReleases());
      setScreenshots(getScreenshots());
      setFeatures(getFeatures());
      setFaqs(getFaqs());
      setAnalytics(getAnalytics());
      setMessages(getContactMessages());
    });

    // Record initial visit
    recordVisit(pageKey === 'home' ? 'Home' : pageKey);

    return () => {
      unsubscribe();
    };
  }, [pageKey]);

  // Determine current latest published APK
  const latestApk = releases.find((r) => r.isLatest && r.isPublished) || releases.find((r) => r.isPublished);

  // Determine hero screenshot (first published or specific home)
  const heroScreenshot =
    screenshots.find((s) => s.isPublished && s.screenKey === 'home') ||
    screenshots.find((s) => s.isPublished);

  const scrollToDownload = () => {
    navigateTo('/download');
  };

  const scrollToScreenshots = () => {
    navigateTo('/screenshots');
  };

  const isKnownRoute = pageKey !== 'notFound';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-slate-800 font-sans selection:bg-amber-100 selection:text-amber-900 pb-16 md:pb-0">
      {/* Optional Announcement Banner from CMS */}
      {config.announcementBanner && (
        <div className="bg-amber-800 text-amber-50 px-4 py-2 text-center text-xs font-semibold tracking-wide">
          {config.announcementBanner}
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        onDownloadClick={scrollToDownload}
        onAdminClick={() => setAdminModalOpen(true)}
        activePath={currentPath}
        onNavigate={navigateTo}
      />

      {/* Main Content Flow */}
      <main className="flex-1">
        {isKnownRoute ? (
          <>
            {/* 1. Hero Section + Realistic Phone Mockup */}
            <Hero
              config={config}
              latestApk={latestApk}
              heroScreenshot={heroScreenshot}
              onDownloadClick={scrollToDownload}
              onViewScreenshotsClick={scrollToScreenshots}
            />

            {/* 2. Trust Section (Simple. Private. Easy to Use.) */}
            <TrustSection />

            {/* 3. App Features Grid */}
            <FeaturesSection
              features={features}
              onDownloadClick={scrollToDownload}
            />

            {/* 4. App Screenshots with Lightbox */}
            <ScreenshotsSection
              screenshots={screenshots}
              onDownloadClick={scrollToDownload}
            />

            {/* 5. Official Download Section */}
            <DownloadSection latestApk={latestApk} config={config} />

            {/* 6. Version Updates & Changelog */}
            <UpdatesSection
              releases={releases}
              onDownloadClick={scrollToDownload}
            />

            {/* 7. Frequently Asked Questions */}
            <FaqSection
              faqs={faqs}
              onDownloadClick={scrollToDownload}
              onPrivacyClick={() => navigateTo('/privacy')}
            />

            {/* 8. Privacy Policy */}
            <PrivacySection
              config={config}
              onContactClick={() => navigateTo('/contact')}
            />

            {/* 9. Contact Developer */}
            <ContactSection config={config} />
          </>
        ) : (
          <NotFound
            onGoHome={() => navigateTo('/')}
            onGoDownload={scrollToDownload}
            onGoFeatures={() => navigateTo('/features')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        config={config}
        onAdminClick={() => setAdminModalOpen(true)}
        onNavigate={navigateTo}
      />

      {/* Mobile-First Sticky Download Bar */}
      <MobileStickyBar
        latestApk={latestApk}
        onDownloadClick={scrollToDownload}
      />

      {/* Admin Panel Modal */}
      <AdminModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        config={config}
        releases={releases}
        screenshots={screenshots}
        features={features}
        faqs={faqs}
        analytics={analytics}
        messages={messages}
      />
    </div>
  );
}
