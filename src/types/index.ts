export interface ApkRelease {
  id: string;
  version: string;
  releaseDate: string;
  fileSize: string;
  minAndroid: string;
  fileName: string;
  downloadUrl: string;
  isLatest: boolean;
  isPublished: boolean;
  releaseNotes: string[];
  fileBlobUrl?: string; // If uploaded dynamically in admin
  downloadsCount: number;
}

export interface ScreenshotItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'mockup' | 'custom_image';
  screenKey: 'home' | 'target' | 'history' | 'analytics' | 'settings';
  imageUrl?: string; // base64 or object URL
  displayOrder: number;
  isPublished: boolean;
}

export interface FeatureItem {
  id: string;
  title: string;
  hindiTitle: string;
  description: string;
  iconName: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface WebsiteAnalytics {
  totalVisits: number;
  apkDownloads: number;
  screenshotViews: number;
  pageViews: Record<string, number>;
  recentActivity: Array<{
    id: string;
    action: string;
    time: string;
    details: string;
  }>;
}

export interface SiteConfig {
  appName: string;
  developer: string;
  developerEmail: string;
  tagline: string;
  heroSubheading: string;
  heroSupportingText: string;
  downloadButtonText: string;
  announcementBanner: string;
  officialDomain: string;
  minAndroidDefault: string;
}
