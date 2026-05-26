import { affiliateLinks } from '../data/affiliateLinks';

export function buildAffiliateUrl(id: string): string {
  const link = affiliateLinks[id];
  if (!link) {
    console.warn(`[Elysium Scale] Lien affilié introuvable : "${id}"`);
    return '#';
  }

  const url = new URL(link.baseUrl);
  for (const [key, value] of Object.entries(link.trackingParams)) {
    url.searchParams.set(key, value);
  }

  return url.toString();
}

export function getAffiliateLabel(id: string): string {
  return affiliateLinks[id]?.label ?? 'Voir l\'offre';
}

export function getAffiliateProgram(id: string): string {
  return affiliateLinks[id]?.program ?? '';
}
