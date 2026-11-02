// src/data/nav.ts

export interface NavItem {
  label: string;
  href: string;
  enabled: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", enabled: true },
  { label: "About", href: "/about", enabled: true },
  { label: "Event Parties", href: "/event-parties", enabled: false },
  { label: "Desert Safari Tours", href: "/desert-safari-tours", enabled: false },
  { label: "Blog", href: "/blog", enabled: false },
  { label: "FAQ's", href: "/faqs", enabled: true },
  { label: "Contact", href: "/contact", enabled: true },
  { label: "Book Now", href: "/book", enabled: true },
];

export const FOOTER_LINKS: NavItem[] = [
  { label: "Terms & Conditions", href: "/terms-and-conditions", enabled: true },
  { label: "Privacy Policy", href: "/privacy-policy", enabled: true },
  { label: "Sitemap", href: "/sitemap", enabled: false },
];
