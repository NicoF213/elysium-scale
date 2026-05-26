import { siteConfig } from '../config/site';

export interface SeoProps {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  canonical?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
  publishDate?: Date;
  updatedDate?: Date;
  author?: string;
}

export function buildPageTitle(title: string): string {
  if (title === siteConfig.name) return title;
  return `${title} | ${siteConfig.name}`;
}

export function buildCanonicalUrl(path: string): string {
  const base = siteConfig.url.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

export function buildOgImageUrl(imagePath?: string): string {
  if (!imagePath) return `${siteConfig.url}/og-default.jpg`;
  if (imagePath.startsWith('http')) return imagePath;
  return `${siteConfig.url}${imagePath}`;
}
