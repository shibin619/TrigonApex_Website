/**
 * SEO composable — consumes the `SeoMeta` structure defined in
 * docs/CONTENT_ARCHITECTURE.md §11. Pages call this with real, page-specific
 * values; this composable invents no copy of its own — every field is
 * required from the caller.
 */

export interface SeoMeta {
  title: string
  description: string
  canonical: string
  og: {
    title: string
    description: string
    image: string | null
  }
  twitter: {
    title: string
    description: string
    image: string | null
  }
  robots: string
  schemaType: string
}

export function useSeo(meta: SeoMeta, structuredData?: Record<string, unknown>) {
  useSeoMeta({
    title: meta.title,
    description: meta.description,
    ogTitle: meta.og.title,
    ogDescription: meta.og.description,
    ogImage: meta.og.image ?? undefined,
    twitterCard: meta.twitter.image ? 'summary_large_image' : 'summary',
    twitterTitle: meta.twitter.title,
    twitterDescription: meta.twitter.description,
    twitterImage: meta.twitter.image ?? undefined,
    robots: meta.robots
  })

  useHead({
    link: [{ rel: 'canonical', href: meta.canonical }],
    script: structuredData
      ? [
          {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': meta.schemaType,
              ...structuredData
            })
          }
        ]
      : []
  })
}
