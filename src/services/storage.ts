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
import { db } from './firebase';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

export const OWNER_NAME = 'Shekhar Kumar';
export const ADMIN_PASSWORD = 'shekhar@32123';

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

// Global in-memory cache synchronized with Firebase Cloud Firestore
let cachedConfig: SiteConfig = initialSiteConfig;
let cachedReleases: ApkRelease[] = initialApkReleases;
let cachedScreenshots: ScreenshotItem[] = initialScreenshots;
let cachedFeatures: FeatureItem[] = initialFeatures;
let cachedFaqs: FaqItem[] = initialFaqs;
let cachedMessages: ContactMessage[] = [];

// Initialize local cache from localStorage if available
try {
  const localCfg = localStorage.getItem(STORAGE_KEYS.CONFIG);
  if (localCfg) cachedConfig = JSON.parse(localCfg);

  const localRel = localStorage.getItem(STORAGE_KEYS.RELEASES);
  if (localRel) cachedReleases = JSON.parse(localRel);

  const localScr = localStorage.getItem(STORAGE_KEYS.SCREENSHOTS);
  if (localScr) cachedScreenshots = JSON.parse(localScr);

  const localFeat = localStorage.getItem(STORAGE_KEYS.FEATURES);
  if (localFeat) cachedFeatures = JSON.parse(localFeat);

  const localFaq = localStorage.getItem(STORAGE_KEYS.FAQS);
  if (localFaq) cachedFaqs = JSON.parse(localFaq);

  const localMsg = localStorage.getItem(STORAGE_KEYS.MESSAGES);
  if (localMsg) cachedMessages = JSON.parse(localMsg);
} catch (e) {
  console.warn('Could not load local cache fallback', e);
}

// ----------------------------------------------------
// REAL-TIME FIRESTORE SYNCHRONIZATION
// ----------------------------------------------------
let isFirestoreInitialized = false;

export function initFirestoreRealtimeSync() {
  if (isFirestoreInitialized) return;
  isFirestoreInitialized = true;

  try {
    // 1. Site Config Sync
    const configDocRef = doc(db, 'site_config', 'main');
    onSnapshot(configDocRef, (snap) => {
      if (snap.exists()) {
        cachedConfig = snap.data() as SiteConfig;
        localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(cachedConfig));
        notifyListeners();
      } else {
        // Seed default config to cloud
        setDoc(configDocRef, initialSiteConfig, { merge: true });
      }
    }, (err) => console.warn('Config snapshot error:', err));

    // 2. APK Releases Sync
    const releasesColl = collection(db, 'apk_releases');
    onSnapshot(releasesColl, (snap) => {
      if (!snap.empty) {
        const items: ApkRelease[] = [];
        snap.forEach((d) => items.push({ ...d.data(), id: d.id } as ApkRelease));
        // Sort latest first
        items.sort((a, b) => (b.isLatest ? 1 : 0) - (a.isLatest ? 1 : 0));
        cachedReleases = items;
        localStorage.setItem(STORAGE_KEYS.RELEASES, JSON.stringify(cachedReleases));
        notifyListeners();
      } else {
        // Seed initial APK release to cloud
        initialApkReleases.forEach((rel) => {
          setDoc(doc(db, 'apk_releases', rel.id), rel);
        });
      }
    }, (err) => console.warn('Releases snapshot error:', err));

    // 3. Screenshots Sync
    const screenshotsColl = collection(db, 'screenshots');
    onSnapshot(screenshotsColl, (snap) => {
      if (!snap.empty) {
        const items: ScreenshotItem[] = [];
        snap.forEach((d) => items.push({ ...d.data(), id: d.id } as ScreenshotItem));
        items.sort((a, b) => a.displayOrder - b.displayOrder);
        cachedScreenshots = items;
        localStorage.setItem(STORAGE_KEYS.SCREENSHOTS, JSON.stringify(cachedScreenshots));
        notifyListeners();
      } else {
        // Seed initial screenshots to cloud
        initialScreenshots.forEach((s) => {
          setDoc(doc(db, 'screenshots', s.id), s);
        });
      }
    }, (err) => console.warn('Screenshots snapshot error:', err));

    // 4. Features Sync
    const featuresColl = collection(db, 'features');
    onSnapshot(featuresColl, (snap) => {
      if (!snap.empty) {
        const items: FeatureItem[] = [];
        snap.forEach((d) => items.push({ ...d.data(), id: d.id } as FeatureItem));
        items.sort((a, b) => a.displayOrder - b.displayOrder);
        cachedFeatures = items;
        localStorage.setItem(STORAGE_KEYS.FEATURES, JSON.stringify(cachedFeatures));
        notifyListeners();
      } else {
        initialFeatures.forEach((f) => {
          setDoc(doc(db, 'features', f.id), f);
        });
      }
    }, (err) => console.warn('Features snapshot error:', err));

    // 5. FAQs Sync
    const faqsColl = collection(db, 'faqs');
    onSnapshot(faqsColl, (snap) => {
      if (!snap.empty) {
        const items: FaqItem[] = [];
        snap.forEach((d) => items.push({ ...d.data(), id: d.id } as FaqItem));
        items.sort((a, b) => a.displayOrder - b.displayOrder);
        cachedFaqs = items;
        localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(cachedFaqs));
        notifyListeners();
      } else {
        initialFaqs.forEach((fq) => {
          setDoc(doc(db, 'faqs', fq.id), fq);
        });
      }
    }, (err) => console.warn('FAQs snapshot error:', err));

    // 6. Contact Messages Sync
    const messagesColl = collection(db, 'contact_messages');
    onSnapshot(messagesColl, (snap) => {
      const items: ContactMessage[] = [];
      snap.forEach((d) => items.push({ ...d.data(), id: d.id } as ContactMessage));
      items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      cachedMessages = items;
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(cachedMessages));
      notifyListeners();
    }, (err) => console.warn('Messages snapshot error:', err));

  } catch (err) {
    console.error('Failed to initialize Firestore real-time sync:', err);
  }
}

// Auto-start sync immediately
initFirestoreRealtimeSync();

// ----------------------------------------------------
// GETTERS
// ----------------------------------------------------

export function getSiteConfig(): SiteConfig {
  return cachedConfig;
}

export function saveSiteConfig(config: SiteConfig) {
  cachedConfig = config;
  localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
  notifyListeners();

  // Save to Firestore Cloud
  try {
    setDoc(doc(db, 'site_config', 'main'), config, { merge: true });
  } catch (e) {
    console.error('Failed to save config to Firestore', e);
  }
}

export function getApkReleases(): ApkRelease[] {
  return cachedReleases;
}

export function getLatestApk(): ApkRelease | undefined {
  const releases = getApkReleases();
  return releases.find((r) => r.isLatest && r.isPublished) || releases.find((r) => r.isPublished);
}

export function saveApkReleases(releases: ApkRelease[]) {
  cachedReleases = releases;
  localStorage.setItem(STORAGE_KEYS.RELEASES, JSON.stringify(releases));
  notifyListeners();
}

export async function addOrUpdateApk(apk: ApkRelease, replaceAll: boolean = false) {
  let releases = [...cachedReleases];

  if (replaceAll) {
    apk.isLatest = true;
    releases = [apk];

    // Remove old docs from Firestore
    try {
      const snap = await getDocs(collection(db, 'apk_releases'));
      snap.forEach(async (d) => {
        if (d.id !== apk.id) await deleteDoc(d.ref);
      });
    } catch (e) {
      console.warn('Error clearing old APKs in firestore', e);
    }
  } else {
    if (apk.isLatest) {
      releases = releases.map((r) => ({ ...r, isLatest: false }));
      // Update other documents in Firestore
      try {
        const snap = await getDocs(collection(db, 'apk_releases'));
        snap.forEach((d) => {
          if (d.id !== apk.id) {
            setDoc(d.ref, { isLatest: false }, { merge: true });
          }
        });
      } catch (e) {
        console.warn('Error updating isLatest on old APKs', e);
      }
    }

    const existingIndex = releases.findIndex((r) => r.id === apk.id);
    if (existingIndex >= 0) {
      releases[existingIndex] = apk;
    } else {
      releases.unshift(apk);
    }
  }

  saveApkReleases(releases);
  recordActivity('APK Update', `Version ${apk.version} ${apk.isPublished ? 'published' : 'saved as draft'}`);

  // Save document to Firestore Cloud
  try {
    await setDoc(doc(db, 'apk_releases', apk.id), apk);
  } catch (e) {
    console.error('Failed saving APK to cloud Firestore', e);
  }
}

export async function deleteApk(id: string) {
  let releases = cachedReleases.filter((r) => r.id !== id);
  if (releases.length > 0 && !releases.some((r) => r.isLatest)) {
    const nextPub = releases.find((r) => r.isPublished);
    if (nextPub) nextPub.isLatest = true;
  }

  saveApkReleases(releases);
  recordActivity('APK Deleted', `Version ${id} removed`);

  // Delete from Firestore Cloud
  try {
    await deleteDoc(doc(db, 'apk_releases', id));
  } catch (e) {
    console.error('Failed deleting APK from Firestore', e);
  }
}

// ----------------------------------------------------
// SCREENSHOTS
// ----------------------------------------------------

export function getScreenshots(): ScreenshotItem[] {
  return cachedScreenshots;
}

export function saveScreenshots(screenshots: ScreenshotItem[]) {
  cachedScreenshots = screenshots;
  localStorage.setItem(STORAGE_KEYS.SCREENSHOTS, JSON.stringify(screenshots));
  notifyListeners();
}

export async function addOrUpdateScreenshot(screenshot: ScreenshotItem, replaceAll: boolean = false) {
  let list = [...cachedScreenshots];

  if (replaceAll) {
    list = [{ ...screenshot, displayOrder: 1 }];
    try {
      const snap = await getDocs(collection(db, 'screenshots'));
      snap.forEach(async (d) => {
        if (d.id !== screenshot.id) await deleteDoc(d.ref);
      });
    } catch (e) {
      console.warn('Error replacing screenshots in firestore', e);
    }
  } else {
    const existingIndex = list.findIndex((s) => s.id === screenshot.id);
    if (existingIndex >= 0) {
      list[existingIndex] = screenshot;
    } else {
      list.push(screenshot);
    }
  }

  saveScreenshots(list);
  recordActivity('Screenshot Added', screenshot.title);

  // Save to Firestore Cloud
  try {
    await setDoc(doc(db, 'screenshots', screenshot.id), screenshot);
  } catch (e) {
    console.error('Failed saving screenshot to cloud', e);
  }
}

export async function replaceScreenshotImage(id: string, newImageUrl: string) {
  const list = [...cachedScreenshots];
  const target = list.find((s) => s.id === id);
  if (target) {
    target.imageUrl = newImageUrl;
    target.updatedAt = new Date().toISOString();
    saveScreenshots(list);
    recordActivity('Screenshot Replaced', `Image replaced for ${target.title}`);

    // Update in Firestore
    try {
      await setDoc(doc(db, 'screenshots', id), { imageUrl: newImageUrl, updatedAt: target.updatedAt }, { merge: true });
    } catch (e) {
      console.error('Failed updating screenshot image in Firestore', e);
    }
  }
}

export async function replaceAllScreenshots(newScreenshots: ScreenshotItem[]) {
  saveScreenshots(newScreenshots);
  recordActivity('Screenshots Updated', `Replaced all screenshots with ${newScreenshots.length} new items`);

  try {
    const snap = await getDocs(collection(db, 'screenshots'));
    snap.forEach(async (d) => await deleteDoc(d.ref));
    newScreenshots.forEach(async (s) => {
      await setDoc(doc(db, 'screenshots', s.id), s);
    });
  } catch (e) {
    console.error('Failed replacing all screenshots in Firestore', e);
  }
}

export async function deleteScreenshot(id: string) {
  const target = cachedScreenshots.find((s) => s.id === id);
  const list = cachedScreenshots.filter((s) => s.id !== id);
  saveScreenshots(list);
  recordActivity('Screenshot Deleted', target?.title || id);

  try {
    await deleteDoc(doc(db, 'screenshots', id));
  } catch (e) {
    console.error('Failed deleting screenshot from Firestore', e);
  }
}

// ----------------------------------------------------
// FEATURES & FAQS
// ----------------------------------------------------

export function getFeatures(): FeatureItem[] {
  return cachedFeatures;
}

export async function saveFeatures(features: FeatureItem[]) {
  cachedFeatures = features;
  localStorage.setItem(STORAGE_KEYS.FEATURES, JSON.stringify(features));
  notifyListeners();

  try {
    const snap = await getDocs(collection(db, 'features'));
    snap.forEach(async (d) => await deleteDoc(d.ref));
    features.forEach(async (f) => {
      await setDoc(doc(db, 'features', f.id), f);
    });
  } catch (e) {
    console.error('Failed saving features to Firestore', e);
  }
}

export function getFaqs(): FaqItem[] {
  return cachedFaqs;
}

export async function saveFaqs(faqs: FaqItem[]) {
  cachedFaqs = faqs;
  localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
  notifyListeners();

  try {
    const snap = await getDocs(collection(db, 'faqs'));
    snap.forEach(async (d) => await deleteDoc(d.ref));
    faqs.forEach(async (fq) => {
      await setDoc(doc(db, 'faqs', fq.id), fq);
    });
  } catch (e) {
    console.error('Failed saving FAQs to Firestore', e);
  }
}

// ----------------------------------------------------
// CONTACT MESSAGES
// ----------------------------------------------------

export function getContactMessages(): ContactMessage[] {
  return cachedMessages;
}

export async function submitContactMessage(name: string, email: string, message: string) {
  const newMsg: ContactMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    name,
    email,
    message,
    timestamp: new Date().toISOString(),
    isRead: false,
  };

  cachedMessages = [newMsg, ...cachedMessages];
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(cachedMessages));
  notifyListeners();

  try {
    await setDoc(doc(db, 'contact_messages', newMsg.id), newMsg);
  } catch (e) {
    console.error('Failed sending message to Firestore', e);
  }
}

export async function markMessageRead(id: string) {
  const list = cachedMessages.map((m) => (m.id === id ? { ...m, isRead: true } : m));
  cachedMessages = list;
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(list));
  notifyListeners();

  try {
    await setDoc(doc(db, 'contact_messages', id), { isRead: true }, { merge: true });
  } catch (e) {
    console.error('Failed marking message read in Firestore', e);
  }
}

export async function deleteMessage(id: string) {
  const list = cachedMessages.filter((m) => m.id !== id);
  cachedMessages = list;
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(list));
  notifyListeners();

  try {
    await deleteDoc(doc(db, 'contact_messages', id));
  } catch (e) {
    console.error('Failed deleting message in Firestore', e);
  }
}

// ----------------------------------------------------
// ANALYTICS & ACTIVITY LOGS
// ----------------------------------------------------

export function getAnalytics(): WebsiteAnalytics {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading analytics', e);
  }
  return {
    totalVisitors: 1,
    todayVisitors: 1,
    totalDownloads: 0,
    versionDownloads: {},
    screenshotViews: {},
    dailyVisits: [{ date: new Date().toISOString().split('T')[0], count: 1 }],
    recentActivities: [],
  };
}

export function saveAnalytics(analytics: WebsiteAnalytics) {
  localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));
  notifyListeners();
}

export function recordVisit(page: string = 'Home') {
  const a = getAnalytics();
  const today = new Date().toISOString().split('T')[0];

  a.totalVisitors = (a.totalVisitors || 0) + 1;
  a.todayVisitors = (a.todayVisitors || 0) + 1;

  if (!a.dailyVisits) a.dailyVisits = [];
  const existingDay = a.dailyVisits.find((d) => d.date === today);
  if (existingDay) {
    existingDay.count += 1;
  } else {
    a.dailyVisits.push({ date: today, count: 1 });
    if (a.dailyVisits.length > 30) a.dailyVisits.shift();
  }

  saveAnalytics(a);
}

export function recordApkDownload(version: string) {
  const a = getAnalytics();
  a.totalDownloads = (a.totalDownloads || 0) + 1;
  if (!a.versionDownloads) a.versionDownloads = {};
  a.versionDownloads[version] = (a.versionDownloads[version] || 0) + 1;

  if (!a.recentActivities) a.recentActivities = [];
  a.recentActivities.unshift({
    id: `act-${Date.now()}`,
    action: 'APK Downloaded',
    details: `Version ${version} downloaded by user`,
    timestamp: new Date().toISOString(),
  });
  if (a.recentActivities.length > 50) a.recentActivities.pop();

  saveAnalytics(a);
}

export function recordScreenshotView(title: string) {
  const a = getAnalytics();
  if (!a.screenshotViews) a.screenshotViews = {};
  a.screenshotViews[title] = (a.screenshotViews[title] || 0) + 1;
  saveAnalytics(a);
}

export function recordActivity(action: string, details: string) {
  const a = getAnalytics();
  if (!a.recentActivities) a.recentActivities = [];
  a.recentActivities.unshift({
    id: `act-${Date.now()}`,
    action,
    details,
    timestamp: new Date().toISOString(),
  });
  if (a.recentActivities.length > 50) a.recentActivities.pop();
  saveAnalytics(a);
}

// ----------------------------------------------------
// AUTHENTICATION
// ----------------------------------------------------

export interface AdminUser {
  name: string;
  loginTime: string;
}

export function getAdminAuth(): AdminUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading admin auth', e);
  }
  return null;
}

export function setAdminAuth(user: AdminUser | null) {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  }
}

export function verifyAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}
