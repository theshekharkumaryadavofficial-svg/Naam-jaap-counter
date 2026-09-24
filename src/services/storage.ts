import {
  ApkRelease,
  ScreenshotItem,
  FeatureItem,
  FaqItem,
  SiteConfig,
  ContactMessage,
  WebsiteAnalytics,
} from '../types';
import {
  initialApkReleases,
  initialScreenshots,
  initialFeatures,
  initialFaqs,
  initialSiteConfig,
} from '../data/initialData';

const STORAGE_KEYS = {
  CONFIG: 'njc_site_config_v2',
  RELEASES: 'njc_apk_releases_v2',
  SCREENSHOTS: 'njc_screenshots_v2',
  FEATURES: 'njc_features_v2',
  FAQS: 'njc_faqs_v2',
  MESSAGES: 'njc_contact_messages_v2',
  ANALYTICS: 'njc_analytics_v2',
  ADMIN_AUTH: 'njc_admin_auth_v2',
};

// Clean up legacy v1 dummy data if present
try {
  const legacyKeys = [
    'njc_site_config_v1',
    'njc_apk_releases_v1',
    'njc_contact_messages_v1',
    'njc_analytics_v1',
    'njc_admin_auth_v1',
  ];
  legacyKeys.forEach((k) => localStorage.removeItem(k));
} catch {
  // Ignore in SSR/restricted environments
}

// Event dispatcher for reactive updates
type StorageListener = () => void;
const listeners = new Set<StorageListener>();

export function subscribeToStore(listener: StorageListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notifyListeners() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (err) {
      console.error('Error notifying storage listener:', err);
    }
  });
}

// 1. Site Config
export function getSiteConfig(): SiteConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading site config', e);
  }
  return initialSiteConfig;
}

export function saveSiteConfig(config: SiteConfig) {
  localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
  notifyListeners();
}

// 2. APK Releases
export function getApkReleases(): ApkRelease[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RELEASES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading APK releases', e);
  }
  return initialApkReleases;
}

export function getLatestApk(): ApkRelease | undefined {
  const releases = getApkReleases();
  return releases.find((r) => r.isLatest && r.isPublished) || releases.find((r) => r.isPublished);
}

export function saveApkReleases(releases: ApkRelease[]) {
  localStorage.setItem(STORAGE_KEYS.RELEASES, JSON.stringify(releases));
  notifyListeners();
}

export function addOrUpdateApk(apk: ApkRelease, replaceAll: boolean = false) {
  let releases = getApkReleases();

  if (replaceAll) {
    // Replace all previous APK releases with this newly uploaded APK
    apk.isLatest = true;
    releases = [apk];
  } else {
    const existingIndex = releases.findIndex((r) => r.id === apk.id);

    if (apk.isLatest) {
      releases = releases.map((r) => ({ ...r, isLatest: false }));
    }

    if (existingIndex >= 0) {
      releases[existingIndex] = apk;
    } else {
      releases.unshift(apk);
    }
  }

  saveApkReleases(releases);
  recordActivity('APK Update', `Version ${apk.version} ${apk.isPublished ? 'published' : 'saved as draft'}`);
}

export function deleteApk(id: string) {
  let releases = getApkReleases();
  const target = releases.find((r) => r.id === id);
  releases = releases.filter((r) => r.id !== id);

  if (target?.isLatest && releases.length > 0) {
    const nextPub = releases.find((r) => r.isPublished);
    if (nextPub) nextPub.isLatest = true;
  }

  saveApkReleases(releases);
  recordActivity('APK Deleted', `Version ${target?.version || id} removed`);
}

// 3. Screenshots
export function getScreenshots(): ScreenshotItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SCREENSHOTS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading screenshots', e);
  }
  return initialScreenshots;
}

export function saveScreenshots(screenshots: ScreenshotItem[]) {
  localStorage.setItem(STORAGE_KEYS.SCREENSHOTS, JSON.stringify(screenshots));
  notifyListeners();
}

export function addOrUpdateScreenshot(screenshot: ScreenshotItem, replaceAll: boolean = false) {
  let list = getScreenshots();

  if (replaceAll) {
    // Replace all screenshots with this new one
    list = [screenshot];
  } else {
    const idx = list.findIndex((s) => s.id === screenshot.id);
    if (idx >= 0) {
      list[idx] = screenshot;
    } else {
      list.push(screenshot);
    }
  }

  list.sort((a, b) => a.displayOrder - b.displayOrder);
  saveScreenshots(list);
  recordActivity('Screenshot Updated', `Screen "${screenshot.title}" saved`);
}

export function replaceScreenshotImage(targetId: string, newImageUrl: string) {
  const list = getScreenshots();
  const target = list.find((s) => s.id === targetId);
  if (target) {
    target.imageUrl = newImageUrl;
    target.type = 'custom_image';
    saveScreenshots(list);
    recordActivity('Screenshot Replaced', `Image for "${target.title}" replaced with upload`);
  }
}

export function replaceAllScreenshots(newScreens: ScreenshotItem[]) {
  saveScreenshots(newScreens);
  recordActivity('Screenshots Reset', 'Screenshots replaced with new uploaded images');
}

export function deleteScreenshot(id: string) {
  let list = getScreenshots();
  const target = list.find((s) => s.id === id);
  list = list.filter((s) => s.id !== id);
  saveScreenshots(list);
  recordActivity('Screenshot Removed', `Screen "${target?.title || id}" deleted`);
}

// 4. Features & FAQs
export function getFeatures(): FeatureItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FEATURES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading features', e);
  }
  return initialFeatures;
}

export function saveFeatures(features: FeatureItem[]) {
  localStorage.setItem(STORAGE_KEYS.FEATURES, JSON.stringify(features));
  notifyListeners();
}

export function getFaqs(): FaqItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAQS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading faqs', e);
  }
  return initialFaqs;
}

export function saveFaqs(faqs: FaqItem[]) {
  localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
  notifyListeners();
}

// 5. Contact Messages (Zero dummy messages)
export function getContactMessages(): ContactMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading messages', e);
  }
  return [];
}

export function submitContactMessage(name: string, email: string, message: string): ContactMessage {
  const messages = getContactMessages();
  const dateStr = new Date().toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const newMsg: ContactMessage = {
    id: 'msg-' + Date.now(),
    name,
    email,
    message,
    createdAt: dateStr,
    read: false,
  };
  messages.unshift(newMsg);
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  recordActivity('New Message', `Feedback received from ${name}`);
  notifyListeners();
  return newMsg;
}

export function markMessageRead(id: string) {
  const messages = getContactMessages();
  const msg = messages.find((m) => m.id === id);
  if (msg) {
    msg.read = true;
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
    notifyListeners();
  }
}

export function deleteMessage(id: string) {
  const messages = getContactMessages().filter((m) => m.id !== id);
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  notifyListeners();
}

// 6. Analytics (Zero dummy data, real counts from clean zero)
export function getAnalytics(): WebsiteAnalytics {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading analytics', e);
  }
  return {
    totalVisits: 0,
    apkDownloads: 0,
    screenshotViews: 0,
    pageViews: {
      Home: 0,
      Features: 0,
      Screenshots: 0,
      Download: 0,
      Updates: 0,
      FAQ: 0,
      Privacy: 0,
      Contact: 0,
    },
    recentActivity: [],
  };
}

export function saveAnalytics(analytics: WebsiteAnalytics) {
  localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));
  notifyListeners();
}

export function recordVisit(section: string = 'Home') {
  const analytics = getAnalytics();
  analytics.totalVisits += 1;
  analytics.pageViews[section] = (analytics.pageViews[section] || 0) + 1;
  saveAnalytics(analytics);
}

export function recordApkDownload(version: string) {
  const analytics = getAnalytics();
  analytics.apkDownloads += 1;
  const releases = getApkReleases();
  const rel = releases.find((r) => r.version === version);
  if (rel) {
    rel.downloadsCount = (rel.downloadsCount || 0) + 1;
    saveApkReleases(releases);
  }
  recordActivity('APK Download', `Version ${version} downloaded`);
  saveAnalytics(analytics);
}

export function recordScreenshotView(title: string) {
  const analytics = getAnalytics();
  analytics.screenshotViews += 1;
  saveAnalytics(analytics);
}

export function recordActivity(action: string, details: string) {
  const analytics = getAnalytics();
  const timeStr = 'Just now';
  analytics.recentActivity.unshift({
    id: 'act-' + Date.now(),
    action,
    time: timeStr,
    details,
  });
  if (analytics.recentActivity.length > 20) {
    analytics.recentActivity = analytics.recentActivity.slice(0, 20);
  }
  saveAnalytics(analytics);
}

// 7. Admin Auth with Password shekhar@32123
export interface AdminUser {
  name: string;
  role: 'owner';
  authenticatedAt: string;
}

export const ADMIN_PASSWORD = 'shekhar@32123';
export const OWNER_NAME = 'Shekhar Kumar';

export function verifyAdminPassword(inputPass: string): boolean {
  return inputPass.trim() === ADMIN_PASSWORD;
}

export function getAdminAuth(): AdminUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading admin session', e);
  }
  return null;
}

export function setAdminAuth(user: AdminUser | null) {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  }
  notifyListeners();
}
