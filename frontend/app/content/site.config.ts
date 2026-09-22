/**
 * Site configuration — implements the `SiteConfig` structure defined in
 * docs/CONTENT_ARCHITECTURE.md §1. Values here are limited to what's
 * already fixed by the project brief (company name, tagline, navigation,
 * primary CTA); contact details and social links stay `null`/empty until
 * real, confirmed values exist — never filled with placeholders that look
 * like real data.
 */

export interface SiteConfig {
  companyName: string
  brandName: string
  tagline: string
  positioningStatement: string
  primaryCta: string
  contact: {
    email: string | null
    phone: string | null
    address: string | null
  }
  socialLinks: Array<{ platform: string; url: string }>
  navigation: {
    primary: Array<{ label: string; to: string }>
    // Grouped columns for the footer (distinct from the flat primary nav)
    // — e.g. a "Company" column and a "Products" column.
    footerColumns?: Array<{ title: string; links: Array<{ label: string; to: string }> }>
  }
}

export const siteConfig: SiteConfig = {
  companyName: 'Trigon Apex Technologies',
  brandName: 'Trigon Apex',
  tagline: 'Software Solutions for Business Growth',
  // No separate positioning copy has been written yet — reuses the given
  // tagline verbatim rather than inventing expanded marketing prose.
  positioningStatement: 'Software Solutions for Business Growth',
  primaryCta: 'talk-to-us',

  contact: {
    email: null,
    phone: null,
    address: null
  },

  socialLinks: [],

  navigation: {
    primary: [
      { label: 'Home', to: '/' },
      { label: 'Solutions', to: '/solutions' },
      { label: 'Industries', to: '/industries' },
      { label: 'Products', to: '/products' },
      { label: 'Case Studies', to: '/case-studies' },
      { label: 'About', to: '/about' }
    ],
    // Footer columns. Product names/routes are the four confirmed Natro
    // products only — no descriptions, capabilities, or other content
    // attached (see docs/CONTENT_ARCHITECTURE.md §4 — that stays empty
    // until confirmed).
    footerColumns: [
      {
        title: 'Company',
        links: [
          { label: 'Solutions', to: '/solutions' },
          { label: 'Industries', to: '/industries' },
          { label: 'Products', to: '/products' },
          { label: 'Case Studies', to: '/case-studies' },
          { label: 'About', to: '/about' }
        ]
      },
      {
        title: 'Products',
        links: [
          { label: 'Natro Dental', to: '/products/natro-dental' },
          { label: 'Natro Manufacturing', to: '/products/natro-manufacturing' },
          { label: 'Natro Finance', to: '/products/natro-finance' },
          { label: 'Natro POS', to: '/products/natro-pos-retail' }
        ]
      }
    ]
  }
}
