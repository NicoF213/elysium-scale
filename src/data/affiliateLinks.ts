export interface AffiliateLink {
  id: string;
  program: string;
  baseUrl: string;
  trackingParams: Record<string, string>;
  label: string;
  category: string;
}

export const affiliateLinks: Record<string, AffiliateLink> = {
  whoscale: {
    id: 'whoscale',
    program: 'WhoScale',
    baseUrl: 'https://www.whoscale.io/fr',
    trackingParams: { ref: 'scale20' },
    label: 'Essayer WhoScale (-20%)',
    category: 'veille-concurrentielle',
  },
};
