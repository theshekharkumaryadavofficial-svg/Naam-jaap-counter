/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
    recordVisit('Home');

    return () => {
      unsubscribe();
    };
  }, []);

  // Determine current latest published APK
  const latestApk = releases.find((r) => r.isLatest && r.isPublished) || releases.find((r) => r.isPublished);

  // Determine hero screenshot (first published or specific home)
  const heroScreenshot =
    screenshots.find((s) => s.isPublished && s.screenKey === 'home') ||
    screenshots.find((s) => s.isPublished);

  const scrollToDownload = () => {
    const el = document.getElementById('download');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToScreenshots = () => {
    const el = document.getElementById('screenshots');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-slate-800 font-sans selection:bg-amber-100 selection:text-amber-900 pb-16 md:pb-0">
      {/* Optional Announcement Banner from CMS */}
      {config.announcementBanner && (
        <div className="bg-amber-800 text-amber-50 px-4 py-2 text-center text-xs font-semibold tracking-wide">
          {config.announcementBanner}
        </div>
      )}

      {/* Top Bar Contract Navigation */}
      <Navbar
        onDownloadClick={scrollToDownload}
        onAdminClick={() => setAdminModalOpen(true)}
      />

      {/* Main Content Flow */}
      <main className="flex-1">
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
        <FeaturesSection features={features} />

        {/* 4. App Screenshots with Lightbox */}
        <ScreenshotsSection screenshots={screenshots} />

        {/* 5. Official Download Section */}
        <DownloadSection latestApk={latestApk} config={config} />

        {/* 6. Version Updates & Changelog */}
        <UpdatesSection releases={releases} />

        {/* 7. Frequently Asked Questions */}
        <FaqSection faqs={faqs} />

        {/* 8. Privacy Policy */}
        <PrivacySection config={config} />

        {/* 9. Contact Developer */}
        <ContactSection config={config} />
      </main>

      {/* Footer */}
      <Footer config={config} onAdminClick={() => setAdminModalOpen(true)} />

      {/* Mobile-First Sticky Download Bar (strictly <= 12% viewport height) */}
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
