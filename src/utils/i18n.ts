export type Lang = 'fr' | 'en';

export const defaultLang: Lang = 'fr';
export const supportedLangs: Lang[] = ['fr', 'en'];

// ─── UI translations ────────────────────────────────────────────────────────

const ui = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.blog': 'Blog',
    'nav.products': 'Produits',
    'nav.about': 'À propos',
    'nav.see_products': 'Voir les produits',
    'nav.open_menu': 'Ouvrir le menu',
    'nav.close_menu': 'Fermer le menu',
    // Blog
    'blog.published_on': 'Publié le',
    'blog.updated_on': 'Mis à jour le',
    'blog.by': 'Par',
    'blog.tags': 'Tags :',
    'blog.back': 'Retour au blog',
    'blog.empty': "Aucun article publié pour l'instant. Revenez bientôt !",
    'blog.all_articles': 'Voir tous les articles',
    'blog.heading': 'Guides & Comparatifs',
    'blog.subtitle': 'Des articles approfondis pour vous aider à faire les meilleurs choix.',
    'blog.badge': 'Blog',
    'blog.similar': 'Articles similaires',
    'blog.similar_subtitle': "D'autres articles qui pourraient vous intéresser",
    'blog.categories': 'Catégories :',
    // Breadcrumb
    'bc.home': 'Accueil',
    'bc.blog': 'Blog',
    'bc.products': 'Produits',
    // Affiliate disclosure
    'disclosure.label': "Information d'affiliation",
    'disclosure.text':
      "Cet article contient des liens affiliés. Si vous effectuez un achat via ces liens, Elysium Scale peut percevoir une commission, sans coût supplémentaire pour vous. Nos recommandations restent indépendantes de ces partenariats.",
    'disclosure.compact':
      "Certains liens de cet article sont des liens affiliés. Nous percevons une commission en cas d'achat, sans coût supplémentaire pour vous.",
    'disclosure.link': 'En savoir plus',
    'disclosure.legal_href': '/mentions-legales',
    // Products
    'products.pros': 'Points forts',
    'products.cons': 'Points faibles',
    'products.cta_ready': 'Prêt à essayer',
    'products.cta_via': "Accédez à l'offre via notre lien partenaire.",
    'products.see_review': "Voir l'avis",
    'products.all': 'Voir tous les produits',
    'products.badge': 'Produits',
    'products.heading': 'Nos recommandations',
    'products.subtitle': 'Des produits sélectionnés après tests rigoureux. Que le meilleur gagne.',
    'products.top_choice': '⭐ Top choix',
    'products.empty': "Aucun produit disponible pour l'instant. Revenez bientôt !",
    'products.categories': 'Catégories :',
    // Language switcher
    'lang.switch_label': 'EN',
    'lang.switch_aria': 'Switch to English',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.products': 'Products',
    'nav.about': 'About',
    'nav.see_products': 'See products',
    'nav.open_menu': 'Open menu',
    'nav.close_menu': 'Close menu',
    // Blog
    'blog.published_on': 'Published on',
    'blog.updated_on': 'Updated on',
    'blog.by': 'By',
    'blog.tags': 'Tags:',
    'blog.back': 'Back to blog',
    'blog.empty': 'No articles published yet. Check back soon!',
    'blog.all_articles': 'View all articles',
    'blog.heading': 'Guides & Reviews',
    'blog.subtitle': 'In-depth articles to help you make the best choices.',
    'blog.badge': 'Blog',
    'blog.similar': 'Similar articles',
    'blog.similar_subtitle': 'Other articles you might find useful',
    'blog.categories': 'Categories:',
    // Breadcrumb
    'bc.home': 'Home',
    'bc.blog': 'Blog',
    'bc.products': 'Products',
    // Affiliate disclosure
    'disclosure.label': 'Affiliate disclosure',
    'disclosure.text':
      'This article contains affiliate links. If you make a purchase through these links, Elysium Scale may earn a commission at no extra cost to you. Our recommendations remain independent of these partnerships.',
    'disclosure.compact':
      'Some links in this article are affiliate links. We earn a commission on purchases at no extra cost to you.',
    'disclosure.link': 'Learn more',
    'disclosure.legal_href': '/en/legal',
    // Products
    'products.pros': 'Pros',
    'products.cons': 'Cons',
    'products.cta_ready': 'Ready to try',
    'products.cta_via': 'Access the offer via our partner link.',
    'products.see_review': 'See review',
    'products.all': 'View all products',
    'products.badge': 'Products',
    'products.heading': 'Our recommendations',
    'products.subtitle': 'Products selected after rigorous testing. May the best win.',
    'products.top_choice': '⭐ Top pick',
    'products.empty': 'No products available yet. Check back soon!',
    'products.categories': 'Categories:',
    // Language switcher
    'lang.switch_label': 'FR',
    'lang.switch_aria': 'Passer en français',
  },
} as const;

type UIKey = keyof typeof ui.fr;

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    const langMap = ui[lang] as Record<string, string>;
    return langMap[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  };
}

// ─── URL helpers ─────────────────────────────────────────────────────────────

/** Detect the current language from a URL object. */
export function getLangFromUrl(url: URL): Lang {
  const firstSegment = url.pathname.split('/').filter(Boolean)[0];
  return firstSegment === 'en' ? 'en' : 'fr';
}

/**
 * Compute the alternate-language URL for hreflang / language switcher.
 * Pass `siteUrl` (e.g. "https://elysiumscale.com") for absolute URLs,
 * or omit it (defaults to "") for relative paths.
 */
export function getAlternateUrl(pathname: string, currentLang: Lang, siteUrl = ''): string {
  if (currentLang === 'fr') {
    // FR → EN: add /en prefix, translate /produits → /products
    if (pathname === '/') return `${siteUrl}/en`;
    if (pathname === '/blog') return `${siteUrl}/en/blog`;
    if (pathname.startsWith('/blog/')) return `${siteUrl}/en/blog/${pathname.slice(6)}`;
    if (pathname === '/produits') return `${siteUrl}/en/products`;
    if (pathname.startsWith('/produits/')) return `${siteUrl}/en/products/${pathname.slice(10)}`;
    return `${siteUrl}/en`;
  } else {
    // EN → FR: remove /en prefix, translate /products → /produits
    const withoutEn = pathname.replace(/^\/en/, '') || '/';
    if (withoutEn === '/') return siteUrl || '/';
    if (withoutEn === '/blog') return `${siteUrl}/blog`;
    if (withoutEn.startsWith('/blog/')) return `${siteUrl}/blog/${withoutEn.slice(6)}`;
    if (withoutEn === '/products') return `${siteUrl}/produits`;
    if (withoutEn.startsWith('/products/')) return `${siteUrl}/produits/${withoutEn.slice(10)}`;
    return siteUrl || '/';
  }
}

/** Get locale-aware paths for navigation links. */
export function getNavPaths(lang: Lang) {
  if (lang === 'en') {
    return { home: '/en', blog: '/en/blog', products: '/en/products', about: '/en/about' };
  }
  return { home: '/', blog: '/blog', products: '/produits', about: '/a-propos' };
}
