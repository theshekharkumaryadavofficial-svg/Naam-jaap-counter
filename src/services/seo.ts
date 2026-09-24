import { useEffect } from 'react';

interface SeoMetadata {
  title: string;
  description: string;
  canonicalPath: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
}

const PRODUCTION_DOMAIN = 'https://naamjap-omega.vercel.app';

export const PAGE_SEO_MAP: Record<string, SeoMetadata> = {
  home: {
    title: 'Naam Jap Counter – Digital Naam Jap Counter for Android',
    description:
      'Naam Jap Counter एक सरल और उपयोगी Android ऐप है जिससे आप अपना Naam Jap गिन सकते हैं, daily target सेट कर सकते हैं और अपनी progress, streak तथा history देख सकते हैं।',
    canonicalPath: '/',
    ogTitle: 'Naam Jap Counter – Digital Naam Jap Counter for Android',
    ogDescription:
      'अपने Naam Jap को आसानी से गिनें, daily target बनाएं और अपनी progress तथा history देखें।',
    twitterTitle: 'Naam Jap Counter – Digital Naam Jap Counter for Android',
    twitterDescription:
      'अपने Naam Jap को आसानी से गिनें, daily target बनाएं और अपनी progress देखें।',
  },
  features: {
    title: 'Naam Jap Counter Features – Daily Target, Mala, Streak & History',
    description:
      'Explore all Naam Jap Counter features: 108 Mala counter, custom daily target, streak tracking, history analytics, reminders, and 100% offline support.',
    canonicalPath: '/features',
    ogTitle: 'Naam Jap Counter Features – Daily Target, Mala, Streak & History',
    ogDescription:
      'Naam Jap Counter के प्रमुख फीचर्स: माला काउंटर, दैनिक लक्ष्य, स्ट्रीक, इतिहास और ऑफलाइन सपोर्ट।',
    twitterTitle: 'Naam Jap Counter Features – Daily Target, Mala, Streak & History',
    twitterDescription:
      'Naam Jap Counter के प्रमुख फीचर्स: माला काउंटर, दैनिक लक्ष्य, स्ट्रीक, इतिहास और ऑफलाइन सपोर्ट।',
  },
  screenshots: {
    title: 'Naam Jap Counter Screenshots – App Interface & Features',
    description:
      'View real screenshots and interface design of Naam Jap Counter Android app: Counter screen, Target setting, History record, and Analytics.',
    canonicalPath: '/screenshots',
    ogTitle: 'Naam Jap Counter Screenshots – App Interface & Features',
    ogDescription:
      'Naam Jap Counter Android app के इंटरफेस, काउंटर स्क्रीन और सेटिंग्स के स्क्रीनशॉट्स देखें।',
    twitterTitle: 'Naam Jap Counter Screenshots – App Interface & Features',
    twitterDescription:
      'Naam Jap Counter Android app के इंटरफेस, काउंटर स्क्रीन और सेटिंग्स के स्क्रीनशॉट्स देखें।',
  },
  download: {
    title: 'Download Naam Jap Counter for Android',
    description:
      'Download official Naam Jap Counter APK for Android. Count daily Naam Jap, track 108 malas, set daily goals, and view streak history securely.',
    canonicalPath: '/download',
    ogTitle: 'Download Naam Jap Counter for Android',
    ogDescription:
      'Naam Jap Counter का आधिकारिक Android APK डाउनलोड करें। 100% मुफ्त, ऑफलाइन और सुरक्षित।',
    twitterTitle: 'Download Naam Jap Counter for Android',
    twitterDescription:
      'Naam Jap Counter का आधिकारिक Android APK डाउनलोड करें। 100% मुफ्त, ऑफलाइन और सुरक्षित।',
  },
  updates: {
    title: 'Naam Jap Counter Updates & Changelog',
    description:
      'Official changelog and version updates for Naam Jap Counter Android app. See new features, performance improvements, and release history.',
    canonicalPath: '/updates',
    ogTitle: 'Naam Jap Counter Updates & Changelog',
    ogDescription:
      'Naam Jap Counter ऐप के नवीनतम वर्ज़न और अपडेट्स का आधिकारिक इतिहास।',
    twitterTitle: 'Naam Jap Counter Updates & Changelog',
    twitterDescription:
      'Naam Jap Counter ऐप के नवीनतम वर्ज़न और अपडेट्स का आधिकारिक इतिहास।',
  },
  faq: {
    title: 'Naam Jap Counter FAQ – Frequently Asked Questions',
    description:
      'Frequently asked questions about Naam Jap Counter: how the digital counter works, daily targets, offline usage, data privacy, and APK download.',
    canonicalPath: '/faq',
    ogTitle: 'Naam Jap Counter FAQ – Frequently Asked Questions',
    ogDescription:
      'Naam Jap Counter ऐप से जुड़े सामान्य सवाल और उनके स्पष्ट उत्तर।',
    twitterTitle: 'Naam Jap Counter FAQ – Frequently Asked Questions',
    twitterDescription:
      'Naam Jap Counter ऐप से जुड़े सामान्य सवाल और उनके स्पष्ट उत्तर।',
  },
  privacy: {
    title: 'Naam Jap Counter Privacy Policy',
    description:
      'Privacy Policy for Naam Jap Counter by Shekhar Kumar. All Naam Jap data is stored 100% locally on device with zero tracking and no data selling.',
    canonicalPath: '/privacy',
    ogTitle: 'Naam Jap Counter Privacy Policy',
    ogDescription:
      'Naam Jap Counter गोपनीयता नीति: 100% ऑन-डिवाइस डेटा सुरक्षा और शून्य ट्रैकिंग।',
    twitterTitle: 'Naam Jap Counter Privacy Policy',
    twitterDescription:
      'Naam Jap Counter गोपनीयता नीति: 100% ऑन-डिवाइस डेटा सुरक्षा और शून्य ट्रैकिंग।',
  },
  contact: {
    title: 'Contact – Naam Jap Counter',
    description:
      'Contact developer Shekhar Kumar for feedback, feature requests, or support regarding the Naam Jap Counter Android app.',
    canonicalPath: '/contact',
    ogTitle: 'Contact – Naam Jap Counter',
    ogDescription:
      'Naam Jap Counter डेवलपर शेखर कुमार से संपर्क करें और अपना सुझाव या प्रश्न भेजें।',
    twitterTitle: 'Contact – Naam Jap Counter',
    twitterDescription:
      'Naam Jap Counter डेवलपर शेखर कुमार से संपर्क करें और अपना सुझाव या प्रश्न भेजें।',
  },
  notFound: {
    title: 'Page Not Found (404) – Naam Jap Counter',
    description: 'The requested page could not be found on Naam Jap Counter website.',
    canonicalPath: '/',
  },
};

/**
 * Hook to dynamically synchronize page title, meta tags, and canonical links
 * to ensure crawlability, SEO compliance, and rich snippet indexing.
 */
export function useSeo(pageKey: string) {
  useEffect(() => {
    const meta = PAGE_SEO_MAP[pageKey] || PAGE_SEO_MAP.home;

    // 1. Update Title
    document.title = meta.title;

    // 2. Update Meta Description
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', meta.description);

    // 3. Update Canonical Link
    const fullCanonicalUrl = `${PRODUCTION_DOMAIN}${meta.canonicalPath === '/' ? '' : meta.canonicalPath}`;
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', fullCanonicalUrl);

    // 4. Update OpenGraph Tags
    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) ogTitleTag.setAttribute('content', meta.ogTitle || meta.title);

    const ogDescTag = document.querySelector('meta[property="og:description"]');
    if (ogDescTag) ogDescTag.setAttribute('content', meta.ogDescription || meta.description);

    const ogUrlTag = document.querySelector('meta[property="og:url"]');
    if (ogUrlTag) ogUrlTag.setAttribute('content', fullCanonicalUrl);

    // 5. Update Twitter Tags
    const twTitleTag = document.querySelector('meta[name="twitter:title"]');
    if (twTitleTag) twTitleTag.setAttribute('content', meta.twitterTitle || meta.title);

    const twDescTag = document.querySelector('meta[name="twitter:description"]');
    if (twDescTag) twDescTag.setAttribute('content', meta.twitterDescription || meta.description);
  }, [pageKey]);
}
