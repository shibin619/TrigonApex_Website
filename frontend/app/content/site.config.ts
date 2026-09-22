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
    footer?: Array<{ label: string; to: string }>
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
    ]
  }
}
