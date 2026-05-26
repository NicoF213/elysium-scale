export interface AffiliateLink {
  id: string;
  program: string;
  baseUrl: string;
  trackingParams: Record<string, string>;
  label: string;
  category: string;
}

export const affiliateLinks: Record<string, AffiliateLink> = {
  // Exemple — remplacer par vos vrais liens d'affiliation
  'exemple-vpn': {
    id: 'exemple-vpn',
    program: 'ExempleVPN',
    baseUrl: 'https://exemple-vpn.com/offre',
    trackingParams: { ref: 'elysiumscale', utm_source: 'elysiumscale' },
    label: 'Essayer ExempleVPN',
    category: 'vpn',
  },
  'exemple-logiciel': {
    id: 'exemple-logiciel',
    program: 'ExempleLogiciel',
    baseUrl: 'https://exemple-logiciel.com/promo',
    trackingParams: { ref: 'elysiumscale' },
    label: 'Essayer gratuitement',
    category: 'logiciel',
  },
};
