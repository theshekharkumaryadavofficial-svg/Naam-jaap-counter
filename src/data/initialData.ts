import { ApkRelease, ScreenshotItem, FeatureItem, FaqItem, SiteConfig } from '../types';

export const initialSiteConfig: SiteConfig = {
  appName: 'Naam Jap Counter',
  developer: 'Shekhar Kumar',
  developerEmail: '',
  tagline: 'Simple. Private. Easy to Use.',
  heroSubheading: 'अपने Naam Jap को सरल तरीके से गिनें, लक्ष्य बनाएं और अपनी नियमितता देखें।',
  heroSupportingText: 'Naam Jap Counter एक सरल digital counter है जिसे daily Naam Jap को व्यवस्थित तरीके से track करने के लिए बनाया गया है।',
  downloadButtonText: 'Download APK',
  announcementBanner: '',
  officialDomain: 'naamjapcounter.in',
  minAndroidDefault: 'Android 6.0+',
};

export const initialApkReleases: ApkRelease[] = [];

export const initialScreenshots: ScreenshotItem[] = [
  {
    id: 'screen-1',
    title: 'Home Screen',
    subtitle: 'मुख्य काउंटर स्क्रीन',
    description: 'सरल और ध्यानपूर्वक डिज़ाइन किया गया मुख्य काउंटर जहाँ आप एक tap से अपना जाप गिन सकते हैं और 108 माला प्रगति देख सकते हैं।',
    type: 'mockup',
    screenKey: 'home',
    displayOrder: 1,
    isPublished: true,
  },
  {
    id: 'screen-2',
    title: 'Daily Target',
    subtitle: 'अपना लक्ष्य सेट करें',
    description: '108, 216, 504, 1008 या अपनी पसंद अनुसार कस्टम दैनिक लक्ष्य निर्धारित करें ताकि आपका अभ्यास नियमित रहे।',
    type: 'mockup',
    screenKey: 'target',
    displayOrder: 2,
    isPublished: true,
  },
  {
    id: 'screen-3',
    title: 'History',
    subtitle: 'अपने पुराने counts देखें',
    description: 'Day, Week और Month के आधार पर अपने पिछले दिनों के सभी Jap counts और लगातार दिनों का रिकॉर्ड साफ-साफ देखें।',
    type: 'mockup',
    screenKey: 'history',
    displayOrder: 3,
    isPublished: true,
  },
  {
    id: 'screen-4',
    title: 'Analytics',
    subtitle: 'अपनी प्रगति देखें',
    description: 'दैनिक और साप्ताहिक ग्राफ के जरिए अपनी साधना की गति और निरंतरता को ट्रैक करें।',
    type: 'mockup',
    screenKey: 'analytics',
    displayOrder: 4,
    isPublished: true,
  },
  {
    id: 'screen-5',
    title: 'Settings',
    subtitle: 'ऐप सेटिंग्स',
    description: 'समय पर याद दिलाने वाले Reminders, डार्क थीम, साउंड व वाइब्रेशन फीडबैक को अपनी सुविधा अनुसार नियंत्रित करें।',
    type: 'mockup',
    screenKey: 'settings',
    displayOrder: 5,
    isPublished: true,
  },
];

export const initialFeatures: FeatureItem[] = [
  {
    id: 'feat-1',
    title: 'Digital Naam Jap Counter',
    hindiTitle: 'डिजिटल नाम जाप काउंटर',
    description: 'Tap करके count बढ़ाएं। स्क्रीन पर कहीं भी सुविधा से टैप करें।',
    iconName: 'disc',
  },
  {
    id: 'feat-2',
    title: 'Daily Target',
    hindiTitle: 'दैनिक लक्ष्य (Daily Target)',
    description: '108, 1008 या अपनी पसंद का target निर्धारित करें।',
    iconName: 'target',
  },
  {
    id: 'feat-3',
    title: 'Mala Counter',
    hindiTitle: 'माला काउंटर',
    description: '108 counts को एक Mala के रूप में track करें।',
    iconName: 'circle-dot',
  },
  {
    id: 'feat-4',
    title: 'Daily Progress',
    hindiTitle: 'दैनिक प्रगति',
    description: 'आज का लक्ष्य कितना पूरा हुआ, तुरंत देखें।',
    iconName: 'bar-chart-2',
  },
  {
    id: 'feat-5',
    title: 'Streak',
    hindiTitle: 'साधना स्ट्रीक (Streak)',
    description: 'लगातार Naam Jap किए गए दिनों को track करें।',
    iconName: 'flame',
  },
  {
    id: 'feat-6',
    title: 'History',
    hindiTitle: 'इतिहास (History)',
    description: 'पुराने दिनों का Naam Jap record देखें।',
    iconName: 'history',
  },
  {
    id: 'feat-7',
    title: 'Reminders',
    hindiTitle: 'रिमाइंडर (Reminders)',
    description: 'अपने निर्धारित समय पर reminder प्राप्त करें।',
    iconName: 'bell',
  },
  {
    id: 'feat-8',
    title: 'Analytics',
    hindiTitle: 'एनालिटिक्स (Analytics)',
    description: 'Daily, weekly और monthly progress देखें।',
    iconName: 'trending-up',
  },
  {
    id: 'feat-9',
    title: 'Simple Interface',
    hindiTitle: 'सरल और शांत इंटरफ़ेस',
    description: 'अनावश्यक features और distractions से बचते हुए साफ interface।',
    iconName: 'layout',
  },
  {
    id: 'feat-10',
    title: 'Offline Support',
    hindiTitle: 'पूर्णतः ऑफलाइन सपोर्ट',
    description: 'जहाँ संभव हो, basic counting और history को internet के बिना भी काम करने दें।',
    iconName: 'wifi-off',
  },
];

export const initialFaqs: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Naam Jap Counter क्या है?',
    answer: 'Naam Jap Counter एक सरल और विश्वसनीय Android application है जिसे daily Naam Jap को व्यवस्थित तरीके से track करने, 108 की माला गिनने, लक्ष्य पूरा करने और अपनी नियमितता (consistency) बनाए रखने के लिए बनाया गया है।',
  },
  {
    id: 'faq-2',
    question: 'क्या यह ऐप मुफ्त है?',
    answer: 'हाँ, Naam Jap Counter पूरी तरह से निःशुल्क (100% Free) है। इसमें कोई विज्ञापन (ads) या छिपा हुआ शुल्क नहीं है। यह एक निष्ठापूर्वक बनाई गई स्वतंत्र सेवा है।',
  },
  {
    id: 'faq-3',
    question: 'क्या मैं daily target सेट कर सकता हूँ?',
    answer: 'हाँ, आप 108, 1008 या अपनी पसंद अनुसार कोई भी कस्टम दैनिक लक्ष्य (daily target) सेट कर सकते हैं। ऐप आपको बताएगा कि आज आपका लक्ष्य कितना प्रतिशत पूरा हुआ है।',
  },
  {
    id: 'faq-4',
    question: 'क्या मैं अपने पुराने counts देख सकता हूँ?',
    answer: 'हाँ, History स्क्रीन में आप Day, Week और Month के अनुसार अपने पुराने दिनों के सभी Naam Jap रिकॉर्ड, कुल मालाएं और अपनी निरंतरता (streak) देख सकते हैं।',
  },
  {
    id: 'faq-5',
    question: 'क्या यह ऐप offline काम करता है?',
    answer: 'हाँ, Naam Jap Counter पूर्णतः offline काम करता है। Jap गिनने, माला ट्रैक करने और हिस्ट्री देखने के लिए इंटरनेट कनेक्शन की कोई आवश्यकता नहीं है। आपका सारा डेटा आपके फोन में ही सुरक्षित रहता है।',
  },
  {
    id: 'faq-6',
    question: 'Latest version कैसे डाउनलोड करें?',
    answer: 'आप इसी official website के Download सेक्शन से हमेशा सबसे नया और प्रामाणिक Android APK सीधे डाउनलोड कर सकते हैं। जब भी नया अपडेट जारी होता है, यह पेज स्वतः अपडेट हो जाता है।',
  },
  {
    id: 'faq-7',
    question: 'अगर कोई bug मिले या नया feature चाहिए तो क्या करें?',
    answer: 'आप हमारे Contact पेज पर जाकर सीधे संदेश भेज सकते हैं। डेवलपर शेखर कुमार हर सकारात्मक सुझाव और प्रतिक्रिया का स्वागत करते हैं।',
  },
];
