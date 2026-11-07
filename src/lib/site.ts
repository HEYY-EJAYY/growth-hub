export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/savings-calculator', label: 'Savings Calculator' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const;

export const BOOK_CTA = 'Book a free consultation';

export const CONTACT_EMAIL = 'support@mygrowthhub.io';
export const CONTACT_PHONE = '+1 480-738-0576';

/** Map path -> nav label for current-page indicator. */
export function currentLabel(path: string): string | undefined {
  const match = NAV_LINKS.find((l) => l.to === path);
  return match?.label;
}
