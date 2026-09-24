import React, { useState, useRef } from 'react';
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
  getAdminAuth,
  setAdminAuth,
  verifyAdminPassword,
  OWNER_NAME,
  addOrUpdateApk,
  deleteApk,
  addOrUpdateScreenshot,
  replaceScreenshotImage,
  replaceAllScreenshots,
  deleteScreenshot,
  saveSiteConfig,
  saveFaqs,
  saveFeatures,
  markMessageRead,
  deleteMessage,
  AdminUser,
} from '../services/storage';
import { LotusIcon } from './LotusIcon';
import {
  X,
  Lock,
  LogOut,
  BarChart2,
  Package,
  Image as ImageIcon,
  FileText,
  Mail,
  Plus,
  Trash2,
  CheckCircle,
  Eye,
  EyeOff,
  Star,
  Download,
  Upload,
  ArrowUp,
  ArrowDown,
  RefreshCw,
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  releases: ApkRelease[];
  screenshots: ScreenshotItem[];
  features: FeatureItem[];
  faqs: FaqItem[];
  analytics: WebsiteAnalytics;
  messages: ContactMessage[];
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  config,
  releases,
  screenshots,
  features,
  faqs,
  analytics,
  messages,
}) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(getAdminAuth());
  const [activeTab, setActiveTab] = useState<'dashboard' | 'apks' | 'screenshots' | 'cms' | 'messages'>(
    'dashboard'
  );

  // Password-only login form state (shekhar@32123)
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // New APK form state (with Replace Old APK default)
  const [showAddApk, setShowAddApk] = useState(false);
  const [replacePreviousApk, setReplacePreviousApk] = useState(true);
  const [apkVersion, setApkVersion] = useState('');
  const [apkReleaseDate, setApkReleaseDate] = useState('');
  const [apkFileSize, setApkFileSize] = useState('');
  const [apkMinAndroid, setApkMinAndroid] = useState('Android 6.0+');
  const [apkNotes, setApkNotes] = useState('');
  const [apkIsPublished, setApkIsPublished] = useState(true);
  const [apkIsLatest, setApkIsLatest] = useState(true);
  const [uploadedApkFile, setUploadedApkFile] = useState<File | null>(null);
  const [apkUploadError, setApkUploadError] = useState('');
  const apkFileInputRef = useRef<HTMLInputElement>(null);

  // New Screenshot form state (with Replace functionality)
  const [showAddScreenshot, setShowAddScreenshot] = useState(false);
  const [replaceTargetMode, setReplaceTargetMode] = useState<
    'home' | 'target' | 'history' | 'analytics' | 'settings' | 'all' | 'new'
  >('home');
  const [replaceOldScreenshot, setReplaceOldScreenshot] = useState(true);
  const [screenshotTitle, setScreenshotTitle] = useState('Home Screen');
  const [screenshotSubtitle, setScreenshotSubtitle] = useState('मुख्य काउंटर स्क्रीन');
  const [screenshotDescription, setScreenshotDescription] = useState('');
  const [screenshotImagePreview, setScreenshotImagePreview] = useState<string>('');
  const [screenshotScreenKey, setScreenshotScreenKey] = useState<
    'home' | 'target' | 'history' | 'analytics' | 'settings'
  >('home');
  const screenshotFileInputRef = useRef<HTMLInputElement>(null);

  // Direct row image replace ref & active item id
  const rowImageInputRef = useRef<HTMLInputElement>(null);
  const [activeReplaceItemId, setActiveReplaceItemId] = useState<string | null>(null);

  // CMS form state
  const [cmsAppName, setCmsAppName] = useState(config.appName);
  const [cmsTagline, setCmsTagline] = useState(config.tagline);
  const [cmsHeroSubheading, setCmsHeroSubheading] = useState(config.heroSubheading);
  const [cmsHeroSupporting, setCmsHeroSupporting] = useState(config.heroSupportingText);
  const [cmsDownloadBtnText, setCmsDownloadBtnText] = useState(config.downloadButtonText);
  const [cmsAnnouncement, setCmsAnnouncement] = useState(config.announcementBanner);
  const [cmsSuccessMessage, setCmsSuccessMessage] = useState('');

  if (!isOpen) return null;

  // Password-only Authentication (password: shekhar@32123)
  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    if (verifyAdminPassword(adminPassword)) {
      setTimeout(() => {
        const user: AdminUser = {
          name: OWNER_NAME,
          role: 'owner',
          authenticatedAt: new Date().toISOString(),
        };
        setAdminAuth(user);
        setCurrentUser(user);
        setAuthLoading(false);
        setAdminPassword('');
      }, 350);
    } else {
      setAuthLoading(false);
      setAuthError('गलत पासवर्ड! कृपया सही पासवर्ड दर्ज करें। (Incorrect password)');
    }
  };

  const handleLogout = () => {
    setAdminAuth(null);
    setCurrentUser(null);
  };

  // APK file handling
  const handleApkFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.apk') && file.type !== 'application/vnd.android.package-archive') {
      setApkUploadError('Please select a valid Android .apk file.');
      return;
    }

    setApkUploadError('');
    setUploadedApkFile(file);

    // Calculate file size in MB
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
    setApkFileSize(sizeInMb);

    // Auto-fill version if matched
    const verMatch = file.name.match(/v?(\d+\.\d+\.\d+)/i);
    if (verMatch && verMatch[1]) {
      setApkVersion(verMatch[1]);
    }

    // Default release date to today
    const todayStr = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    setApkReleaseDate(todayStr);
  };

  const handleSaveApk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apkVersion.trim()) {
      setApkUploadError('Version number is required (e.g. 1.0.1)');
      return;
    }

    let fileBlobUrl = '';
    let fileName = `NaamJapCounter-v${apkVersion.trim()}.apk`;

    if (uploadedApkFile) {
      fileBlobUrl = URL.createObjectURL(uploadedApkFile);
      fileName = uploadedApkFile.name;
    }

    const notesList = apkNotes
      .split('\n')
      .map((s) => s.trim().replace(/^[-•*]\s*/, ''))
      .filter(Boolean);

    const newApk: ApkRelease = {
      id: 'rel-' + apkVersion.replace(/\./g, '-'),
      version: apkVersion.trim(),
      releaseDate:
        apkReleaseDate.trim() ||
        new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      fileSize: apkFileSize.trim() || '8.6 MB',
      minAndroid: apkMinAndroid.trim() || 'Android 6.0+',
      fileName,
      downloadUrl: fileBlobUrl || `/downloads/NaamJapCounter-v1.0.0.apk`,
      isLatest: apkIsLatest,
      isPublished: apkIsPublished,
      releaseNotes: notesList.length > 0 ? notesList : ['Maintenance updates and optimizations.'],
      fileBlobUrl: fileBlobUrl || undefined,
      downloadsCount: 0,
    };

    addOrUpdateApk(newApk, replacePreviousApk);
    setShowAddApk(false);
    setApkVersion('');
    setApkNotes('');
    setUploadedApkFile(null);
  };

  const handleTogglePublish = (apk: ApkRelease) => {
    addOrUpdateApk({
      ...apk,
      isPublished: !apk.isPublished,
    });
  };

  const handleSetLatest = (apk: ApkRelease) => {
    addOrUpdateApk({
      ...apk,
      isLatest: true,
      isPublished: true, // Latest must be published
    });
  };

  // Screenshot handling
  const handleScreenshotFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      alert('Only PNG, JPG, or WEBP images are supported.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      // Optimize image using HTML5 Canvas to keep bundle small
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 1200;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setScreenshotImagePreview(optimizedDataUrl);
        } else {
          setScreenshotImagePreview(result);
        }
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  // Direct Row Image Replacement
  const triggerRowImageReplace = (itemId: string) => {
    setActiveReplaceItemId(itemId);
    rowImageInputRef.current?.click();
  };

  const handleRowImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeReplaceItemId) return;

    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      alert('Only PNG, JPG, or WEBP images are supported.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 1200;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          replaceScreenshotImage(activeReplaceItemId, optimizedDataUrl);
        } else {
          replaceScreenshotImage(activeReplaceItemId, result);
        }
        setActiveReplaceItemId(null);
        if (rowImageInputRef.current) rowImageInputRef.current.value = '';
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleSaveScreenshot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!screenshotTitle.trim()) {
      alert('Screen title is required');
      return;
    }

    const newScreen: ScreenshotItem = {
      id: 'screen-' + Date.now(),
      title: screenshotTitle.trim(),
      subtitle: screenshotSubtitle.trim() || 'मुख्य स्क्रीन',
      description: screenshotDescription.trim() || 'Naam Jap Counter स्क्रीनशॉट।',
      type: screenshotImagePreview ? 'custom_image' : 'mockup',
      screenKey: screenshotScreenKey,
      imageUrl: screenshotImagePreview || undefined,
      displayOrder: 1,
      isPublished: true,
    };

    if (replaceOldScreenshot) {
      if (replaceTargetMode === 'all') {
        // Replace all previous screenshots with this newly uploaded screenshot
        replaceAllScreenshots([newScreen]);
      } else {
        // Replace existing screen of this type
        const existing = screenshots.find((s) => s.screenKey === replaceTargetMode);
        if (existing) {
          addOrUpdateScreenshot({
            ...existing,
            title: screenshotTitle.trim(),
            subtitle: screenshotSubtitle.trim() || existing.subtitle,
            imageUrl: screenshotImagePreview || existing.imageUrl,
            type: screenshotImagePreview ? 'custom_image' : existing.type,
          });
        } else {
          addOrUpdateScreenshot(newScreen);
        }
      }
    } else {
      newScreen.displayOrder = screenshots.length + 1;
      addOrUpdateScreenshot(newScreen);
    }

    setShowAddScreenshot(false);
    setScreenshotTitle('Home Screen');
    setScreenshotSubtitle('मुख्य काउंटर स्क्रीन');
    setScreenshotDescription('');
    setScreenshotImagePreview('');
  };

  const handleMoveScreenshotOrder = (index: number, direction: 'up' | 'down') => {
    const list = [...screenshots].sort((a, b) => a.displayOrder - b.displayOrder);
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[index].displayOrder;
    list[index].displayOrder = list[targetIdx].displayOrder;
    list[targetIdx].displayOrder = temp;

    list.forEach((item) => addOrUpdateScreenshot(item));
  };

  // CMS Save
  const handleSaveCms = (e: React.FormEvent) => {
    e.preventDefault();
    saveSiteConfig({
      ...config,
      appName: cmsAppName.trim(),
      tagline: cmsTagline.trim(),
      heroSubheading: cmsHeroSubheading.trim(),
      heroSupportingText: cmsHeroSupporting.trim(),
      downloadButtonText: cmsDownloadBtnText.trim(),
      announcementBanner: cmsAnnouncement.trim(),
    });
    setCmsSuccessMessage('Website content saved successfully!');
    setTimeout(() => setCmsSuccessMessage(''), 4000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl max-w-5xl w-full h-[90vh] max-h-[850px] shadow-2xl flex flex-col overflow-hidden border border-amber-900/15">
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#111827] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-amber-500/30 flex items-center justify-center">
              <LotusIcon size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold flex items-center gap-2">
                <span>Naam Jap Counter</span>
                <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded font-normal">
                  Admin Dashboard
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Owner: {OWNER_NAME}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentUser && (
              <button
                type="button"
                onClick={handleLogout}
                className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Auth Barrier if Not Logged In */}
        {!currentUser ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-[#FAF7F2]">
            <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-amber-900/10 shadow-lg text-center">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-4 border border-amber-200">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">Admin Access</h3>
              <p className="text-xs text-slate-500 mb-6">
                Developer <strong>{OWNER_NAME}</strong> के लिए सुरक्षित एडमिन पैनल।
              </p>

              {authError && (
                <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl text-left flex items-start gap-2">
                  <span className="font-bold">⚠️</span>
                  <span>{authError}</span>
                </div>
              )}

              {/* Password Form */}
              <form onSubmit={handlePasswordLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Admin Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="पासवर्ड दर्ज करें..."
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-amber-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white rounded-xl text-sm font-bold shadow-md shadow-amber-900/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>{authLoading ? 'Verifying...' : 'Unlock Admin Panel'}</span>
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-56 bg-slate-900 text-slate-300 p-3 flex md:flex-col gap-1 border-r border-slate-800 shrink-0 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-amber-600 text-white font-semibold'
                    : 'hover:bg-slate-800 text-slate-400'
                }`}
              >
                <BarChart2 className="w-4 h-4" />
                <span>Dashboard</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('apks')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'apks'
                    ? 'bg-amber-600 text-white font-semibold'
                    : 'hover:bg-slate-800 text-slate-400'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>APK Management</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('screenshots')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'screenshots'
                    ? 'bg-amber-600 text-white font-semibold'
                    : 'hover:bg-slate-800 text-slate-400'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Screenshots</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('cms')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'cms'
                    ? 'bg-amber-600 text-white font-semibold'
                    : 'hover:bg-slate-800 text-slate-400'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Content CMS</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('messages')}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === 'messages'
                    ? 'bg-amber-600 text-white font-semibold'
                    : 'hover:bg-slate-800 text-slate-400'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span className="flex-1 text-left">Messages</span>
                {messages.some((m) => !m.read) && (
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                )}
              </button>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-5 sm:p-6 overflow-y-auto bg-[#FAF7F2]">
              {/* TAB 1: DASHBOARD ANALYTICS */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Website & App Analytics</h3>
                    <p className="text-xs text-slate-500">
                      Privacy-conscious telemetry: total visits, APK downloads, and screenshot views.
                    </p>
                  </div>

                  {/* Stat Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-amber-900/10 shadow-xs">
                      <span className="text-xs text-slate-500 block mb-1">Total Visits</span>
                      <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                        {analytics.totalVisits.toLocaleString()}
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-amber-900/10 shadow-xs">
                      <span className="text-xs text-slate-500 block mb-1">APK Downloads</span>
                      <span className="text-2xl font-extrabold text-emerald-700 tabular-nums">
                        {analytics.apkDownloads.toLocaleString()}
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-amber-900/10 shadow-xs">
                      <span className="text-xs text-slate-500 block mb-1">Screenshot Views</span>
                      <span className="text-2xl font-extrabold text-amber-700 tabular-nums">
                        {analytics.screenshotViews.toLocaleString()}
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-2xl border border-amber-900/10 shadow-xs">
                      <span className="text-xs text-slate-500 block mb-1">Most Visited Page</span>
                      <span className="text-2xl font-extrabold text-slate-900">
                        Home Screen
                      </span>
                    </div>
                  </div>

                  {/* Section Views Breakdown */}
                  <div className="bg-white p-5 rounded-2xl border border-amber-900/10 shadow-xs">
                    <h4 className="text-sm font-bold text-slate-900 mb-3">
                      Section Views Breakdown
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      {Object.entries(analytics.pageViews).map(([sec, count]) => (
                        <div
                          key={sec}
                          className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between"
                        >
                          <span className="text-slate-600">{sec}</span>
                          <span className="font-bold text-slate-900 tabular-nums">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity Log */}
                  <div className="bg-white p-5 rounded-2xl border border-amber-900/10 shadow-xs">
                    <h4 className="text-sm font-bold text-slate-900 mb-3">Recent Activity Feed</h4>
                    <div className="space-y-2 text-xs">
                      {analytics.recentActivity.map((act) => (
                        <div
                          key={act.id}
                          className="flex items-center justify-between p-2.5 bg-[#FAF7F2] rounded-xl border border-amber-900/5"
                        >
                          <div>
                            <span className="font-bold text-slate-800">{act.action}</span>
                            <span className="text-slate-500 ml-2">{act.details}</span>
                          </div>
                          <span className="text-slate-400 shrink-0">{act.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: APK MANAGEMENT */}
              {activeTab === 'apks' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Android APK Management</h3>
                      <p className="text-xs text-slate-500">
                        Upload and manage APK builds. Only ONE version is marked Latest.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowAddApk(!showAddApk)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Upload New APK</span>
                    </button>
                  </div>

                  {/* Upload APK Form */}
                  {showAddApk && (
                    <form
                      onSubmit={handleSaveApk}
                      className="bg-white p-5 rounded-2xl border border-amber-900/15 shadow-sm space-y-4"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <h4 className="text-sm font-bold text-slate-900">Upload / Register APK</h4>
                        <button
                          type="button"
                          onClick={() => setShowAddApk(false)}
                          className="text-xs text-slate-400 hover:text-slate-700"
                        >
                          Cancel
                        </button>
                      </div>

                      {apkUploadError && (
                        <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                          {apkUploadError}
                        </div>
                      )}

                      {/* File Input */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          APK File (.apk)
                        </label>
                        <input
                          ref={apkFileInputRef}
                          type="file"
                          accept=".apk,application/vnd.android.package-archive"
                          onChange={handleApkFileSelected}
                          className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                        />
                        {uploadedApkFile && (
                          <p className="text-[11px] text-emerald-700 mt-1">
                            Selected: {uploadedApkFile.name} ({(uploadedApkFile.size / (1024 * 1024)).toFixed(1)} MB)
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Version (e.g. 1.0.1) *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="1.0.1"
                            value={apkVersion}
                            onChange={(e) => setApkVersion(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Release Date
                          </label>
                          <input
                            type="text"
                            placeholder="14 Oct 2025"
                            value={apkReleaseDate}
                            onChange={(e) => setApkReleaseDate(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            File Size
                          </label>
                          <input
                            type="text"
                            placeholder="8.8 MB"
                            value={apkFileSize}
                            onChange={(e) => setApkFileSize(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Minimum Android Version
                        </label>
                        <input
                          type="text"
                          value={apkMinAndroid}
                          onChange={(e) => setApkMinAndroid(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Release Notes (One item per line)
                        </label>
                        <textarea
                          rows={3}
                          placeholder="• Added prayer time reminders&#10;• Improved touch vibration feedback&#10;• Fixed history sorting"
                          value={apkNotes}
                          onChange={(e) => setApkNotes(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl">
                        <label className="flex items-center gap-2 text-xs font-bold text-amber-950 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={replacePreviousApk}
                            onChange={(e) => setReplacePreviousApk(e.target.checked)}
                            className="rounded text-amber-600 focus:ring-amber-500"
                          />
                          <span>पुराने APK को बदलें (Replace previous APK versions)</span>
                        </label>
                        <span className="text-[11px] text-amber-800">
                          (यह नया APK वेबसाइट पर एकमात्र सक्रिय डाउनलोड वर्ज़न बन जाएगा)
                        </span>
                      </div>

                      <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={apkIsPublished}
                            onChange={(e) => setApkIsPublished(e.target.checked)}
                            className="rounded text-emerald-600 focus:ring-emerald-500"
                          />
                          <span>Publish immediately</span>
                        </label>

                        <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={apkIsLatest}
                            onChange={(e) => setApkIsLatest(e.target.checked)}
                            className="rounded text-amber-600 focus:ring-amber-500"
                          />
                          <span>Set as Current Latest Version</span>
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      >
                        Publish & Update Website
                      </button>
                    </form>
                  )}

                  {/* List of Releases */}
                  <div className="space-y-3">
                    {releases.length === 0 ? (
                      <div className="bg-amber-50/60 border border-dashed border-amber-300 rounded-2xl p-8 text-center">
                        <Package className="w-10 h-10 text-amber-600/70 mx-auto mb-2" />
                        <h4 className="text-sm font-bold text-slate-900 mb-1">कोई APK अभी मौजूद नहीं है</h4>
                        <p className="text-xs text-slate-600 mb-4 max-w-sm mx-auto">
                          अपना नया Android APK अपलोड करने के लिए ऊपर दिए गए "Upload New APK" बटन पर क्लिक करें।
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddApk(true);
                            setReplacePreviousApk(true);
                          }}
                          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Upload APK Now</span>
                        </button>
                      </div>
                    ) : (
                      releases.map((rel) => (
                      <div
                        key={rel.id}
                        className="bg-white p-4 rounded-2xl border border-amber-900/10 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-base font-bold text-slate-900">
                              Version {rel.version}
                            </span>
                            {rel.isLatest && (
                              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">
                                LATEST
                              </span>
                            )}
                            <span
                              className={`px-2 py-0.5 text-[10px] font-semibold rounded ${
                                rel.isPublished
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {rel.isPublished ? 'Published' : 'Draft'}
                            </span>
                          </div>

                          <div className="text-xs text-slate-500 mt-1">
                            <span>{rel.releaseDate}</span> · <span>{rel.fileSize}</span> ·{' '}
                            <span>{rel.minAndroid}</span> ·{' '}
                            <span className="text-emerald-700 font-medium">
                              {rel.downloadsCount} downloads
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            type="button"
                            onClick={() => {
                              setShowAddApk(true);
                              setReplacePreviousApk(true);
                            }}
                            className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-300 flex items-center gap-1 cursor-pointer"
                            title="इस APK को नए फ़ाइल से बदलें (Replace APK)"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Replace APK</span>
                          </button>

                          {!rel.isLatest && (
                            <button
                              type="button"
                              onClick={() => handleSetLatest(rel)}
                              className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold rounded-lg border border-amber-200"
                            >
                              Make Latest
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleTogglePublish(rel)}
                            className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                            title={rel.isPublished ? 'Unpublish' : 'Publish'}
                          >
                            {rel.isPublished ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteApk(rel.id)}
                            className="p-1.5 text-red-600 hover:text-red-800 rounded-lg hover:bg-red-50"
                            title="Delete APK"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )))}
                  </div>
                </div>
              )}

              {/* TAB 3: SCREENSHOT MANAGEMENT */}
              {activeTab === 'screenshots' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Screenshot Management</h3>
                      <p className="text-xs text-slate-500">
                        Upload PNG/JPG/WEBP screenshots, change display order, or edit titles.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowAddScreenshot(!showAddScreenshot)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-xl cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Upload Screenshot</span>
                    </button>
                  </div>

                  {showAddScreenshot && (
                    <form
                      onSubmit={handleSaveScreenshot}
                      className="bg-white p-5 rounded-2xl border border-amber-900/15 shadow-sm space-y-4"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <h4 className="text-sm font-bold text-slate-900">Upload / Replace App Screenshot</h4>
                        <button
                          type="button"
                          onClick={() => setShowAddScreenshot(false)}
                          className="text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>

                      {/* Screen selection / Replacement Target */}
                      <div className="p-3 bg-amber-50/80 border border-amber-200/80 rounded-xl space-y-2">
                        <label className="block text-xs font-bold text-amber-950">
                          किस स्क्रीन को बदलना है? (Select Screen to Replace)
                        </label>
                        <select
                          value={replaceTargetMode}
                          onChange={(e) => {
                            const val = e.target.value as any;
                            setReplaceTargetMode(val);
                            if (val === 'home') {
                              setScreenshotTitle('Home Screen');
                              setScreenshotSubtitle('मुख्य काउंटर स्क्रीन');
                              setScreenshotScreenKey('home');
                            } else if (val === 'target') {
                              setScreenshotTitle('Daily Target');
                              setScreenshotSubtitle('दैनिक लक्ष्य निर्धारण');
                              setScreenshotScreenKey('target');
                            } else if (val === 'history') {
                              setScreenshotTitle('History & Progress');
                              setScreenshotSubtitle('पुराने Jap का रिकॉर्ड');
                              setScreenshotScreenKey('history');
                            } else if (val === 'analytics') {
                              setScreenshotTitle('Analytics & Streaks');
                              setScreenshotSubtitle('दैनिक व मासिक आँकड़े');
                              setScreenshotScreenKey('analytics');
                            } else if (val === 'settings') {
                              setScreenshotTitle('Settings');
                              setScreenshotSubtitle('सरल कॉन्फ़िगरेशन');
                              setScreenshotScreenKey('settings');
                            } else if (val === 'all') {
                              setScreenshotTitle('App Interface');
                              setScreenshotSubtitle('Naam Jap Counter');
                              setScreenshotScreenKey('home');
                            }
                          }}
                          className="w-full px-3 py-2 text-xs bg-white border border-amber-300 rounded-xl text-slate-800 font-medium"
                        >
                          <option value="home">1. Home Screen (मुख्य स्क्रीन को बदलें)</option>
                          <option value="target">2. Daily Target (लक्ष्य स्क्रीन को बदलें)</option>
                          <option value="history">3. History (इतिहास स्क्रीन को बदलें)</option>
                          <option value="analytics">4. Analytics (एनालिटिक्स स्क्रीन को बदलें)</option>
                          <option value="settings">5. Settings (सेटिंग्स स्क्रीन को बदलें)</option>
                          <option value="all">★ सभी पुराने स्क्रीनशॉट को हटाकर केवल इसे रखें (Replace ALL)</option>
                          <option value="new">+ नई स्क्रीन के रूप में जोड़ें (Add as new)</option>
                        </select>

                        <label className="flex items-center gap-2 text-xs font-semibold text-amber-950 cursor-pointer pt-1">
                          <input
                            type="checkbox"
                            checked={replaceOldScreenshot}
                            onChange={(e) => setReplaceOldScreenshot(e.target.checked)}
                            className="rounded text-amber-600 focus:ring-amber-500"
                          />
                          <span>पुराने स्क्रीनशॉट को इस अपलोड से रिप्लेस करें (Replace previous)</span>
                        </label>
                      </div>

                      {/* Image Upload */}
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          Screenshot File (PNG, JPG, WEBP) *
                        </label>
                        <input
                          ref={screenshotFileInputRef}
                          type="file"
                          accept="image/png,image/jpeg,image/webp"
                          onChange={handleScreenshotFileSelected}
                          className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-800 hover:file:bg-amber-100 cursor-pointer"
                        />
                        {screenshotImagePreview && (
                          <div className="mt-3 flex items-center gap-4">
                            <div className="w-24 h-40 rounded-xl overflow-hidden border-2 border-emerald-500 shadow-md">
                              <img
                                src={screenshotImagePreview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="text-xs text-emerald-800">
                              <span className="font-bold flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> फोटो तैयार है</span>
                              <p className="text-[11px] text-slate-500 mt-1">सेव करने पर यह स्क्रीनशॉट वेबसाइट पर तुरंत दिखेगा।</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Screen Title (English) *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Mala Completion Screen"
                            value={screenshotTitle}
                            onChange={(e) => setScreenshotTitle(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Subtitle (Hindi)
                          </label>
                          <input
                            type="text"
                            placeholder="माला पूर्ण स्क्रीन"
                            value={screenshotSubtitle}
                            onChange={(e) => setScreenshotSubtitle(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Short description of what users see on this screen."
                          value={screenshotDescription}
                          onChange={(e) => setScreenshotDescription(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
                      >
                        Save & Update Screenshot
                      </button>
                    </form>
                  )}

                  {/* Hidden input for direct row image replacement */}
                  <input
                    ref={rowImageInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleRowImageSelected}
                    className="hidden"
                  />

                  {/* Screenshots Table */}
                  <div className="space-y-3">
                    {screenshots
                      .sort((a, b) => a.displayOrder - b.displayOrder)
                      .map((item, idx) => (
                        <div
                          key={item.id}
                          className="bg-white p-4 rounded-2xl border border-amber-900/10 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-slate-400 w-5">
                              #{item.displayOrder}
                            </span>
                            {item.imageUrl ? (
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="w-10 h-16 rounded-lg object-cover border border-slate-200 shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-16 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-[10px] text-amber-800 font-bold shrink-0 text-center px-0.5">
                                UI Mock
                              </div>
                            )}
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                                <span
                                  className={`px-1.5 py-0.5 text-[9px] font-bold rounded ${
                                    item.type === 'custom_image'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : 'bg-amber-100 text-amber-800'
                                  }`}
                                >
                                  {item.type === 'custom_image' ? 'Uploaded Photo' : 'Interactive Mockup'}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500">{item.subtitle}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            {/* Direct Replace Image button */}
                            <button
                              type="button"
                              onClick={() => triggerRowImageReplace(item.id)}
                              className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                              title="इस स्क्रीन की छवि अपने अपलोड से बदलें (Replace Image)"
                            >
                              <Upload className="w-3.5 h-3.5 text-amber-700" />
                              <span>छवि बदलें (Replace)</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleMoveScreenshotOrder(idx, 'up')}
                              disabled={idx === 0}
                              className="p-1.5 text-slate-600 hover:bg-slate-100 disabled:opacity-30 rounded-lg cursor-pointer"
                              title="Move Up"
                            >
                              <ArrowUp className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveScreenshotOrder(idx, 'down')}
                              disabled={idx === screenshots.length - 1}
                              className="p-1.5 text-slate-600 hover:bg-slate-100 disabled:opacity-30 rounded-lg cursor-pointer"
                              title="Move Down"
                            >
                              <ArrowDown className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                addOrUpdateScreenshot({
                                  ...item,
                                  isPublished: !item.isPublished,
                                })
                              }
                              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                              title={item.isPublished ? 'Hide from website' : 'Publish'}
                            >
                              {item.isPublished ? (
                                <Eye className="w-4 h-4 text-emerald-600" />
                              ) : (
                                <EyeOff className="w-4 h-4 text-slate-400" />
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteScreenshot(item.id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                              title="Delete screenshot"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* TAB 4: CMS CONTENT CONTROL */}
              {activeTab === 'cms' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Website Content Management</h3>
                    <p className="text-xs text-slate-500">
                      Customize branding, headings, button labels, and descriptions without editing code.
                    </p>
                  </div>

                  {cmsSuccessMessage && (
                    <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-200">
                      {cmsSuccessMessage}
                    </div>
                  )}

                  <form onSubmit={handleSaveCms} className="space-y-4 bg-white p-5 rounded-2xl border border-amber-900/10 shadow-xs">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Application Brand Name
                      </label>
                      <input
                        type="text"
                        value={cmsAppName}
                        onChange={(e) => setCmsAppName(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Hero Subheading (Devanagari Hindi)
                      </label>
                      <input
                        type="text"
                        value={cmsHeroSubheading}
                        onChange={(e) => setCmsHeroSubheading(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Supporting Description
                      </label>
                      <textarea
                        rows={2}
                        value={cmsHeroSupporting}
                        onChange={(e) => setCmsHeroSupporting(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Download Button Text
                        </label>
                        <input
                          type="text"
                          value={cmsDownloadBtnText}
                          onChange={(e) => setCmsDownloadBtnText(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Core Tagline
                        </label>
                        <input
                          type="text"
                          value={cmsTagline}
                          onChange={(e) => setCmsTagline(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    >
                      Save All CMS Changes
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 5: MESSAGES INBOX */}
              {activeTab === 'messages' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Contact Messages</h3>
                    <p className="text-xs text-slate-500">
                      User inquiries, bug reports, and feature suggestions submitted through the Contact page.
                    </p>
                  </div>

                  {messages.length === 0 ? (
                    <div className="text-center py-10 bg-white rounded-2xl border border-slate-200">
                      <p className="text-xs text-slate-400">No messages in inbox yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`p-4 rounded-2xl border transition-colors ${
                            msg.read
                              ? 'bg-white border-slate-200'
                              : 'bg-amber-50/70 border-amber-200'
                          }`}
                        >
                          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                            <div>
                              <span className="text-xs font-bold text-slate-900">{msg.name}</span>
                              <span className="text-xs text-slate-500 ml-2">({msg.email})</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-slate-400">{msg.createdAt}</span>
                              {!msg.read && (
                                <button
                                  type="button"
                                  onClick={() => markMessageRead(msg.id)}
                                  className="text-[11px] text-amber-800 hover:underline"
                                >
                                  Mark as read
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => deleteMessage(msg.id)}
                                className="text-red-500 hover:text-red-700 p-1"
                                title="Delete message"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                            {msg.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
