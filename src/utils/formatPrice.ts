export function formatPrice(price: string | number, currency = '€'): string {
  if (typeof price === 'number') {
    return `${price.toFixed(2).replace('.', ',')} ${currency}`;
  }
  return price;
}

export function formatDate(date: Date, locale = 'fr-FR'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatDateShort(date: Date, locale = 'fr-FR'): string {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}
