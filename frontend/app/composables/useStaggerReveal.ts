import { gsap } from 'gsap'
import type { Ref } from 'vue'

/**
 * Same convention as useFadeIn (subtle fade + rise, IntersectionObserver-
 * triggered, respects prefers-reduced-motion, plays once) but for a group
 * of children — for grids/lists where each item entering reads as more
 * considered than the whole block appearing at once.
 *
 * `each: true` (default false) gives every child its OWN observer instead
 * of one observer for the whole container with a stagger — correct for a
 * tall stack (e.g. four full-width product rows) where the 2nd/3rd/4th
 * item is nowhere near the viewport when the container's top edge first
 * appears; a single grouped stagger would fire them all at once, off-
 * screen. Compact grids (e.g. a 2-column icon grid where every item is
 * visible together) should use the default grouped stagger instead.
 */
export function useStaggerReveal(container: Ref<HTMLElement | null>, childSelector: string, options: { stagger?: number; each?: boolean } = {}) {
  onMounted(() => {
    const el = container.value
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const children = el.querySelectorAll<HTMLElement>(childSelector)
    if (!children.length) return

    if (!('IntersectionObserver' in window)) {
      gsap.from(children, { opacity: 0, y: 14, duration: 0.5, stagger: options.stagger ?? 0.08, ease: 'power2.out' })
      return
    }

    if (options.each) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              gsap.from(entry.target, { opacity: 0, y: 16, duration: 0.5, ease: 'power2.out' })
              obs.unobserve(entry.target)
            }
          }
        },
        { threshold: 0.15 }
      )
      children.forEach((child) => observer.observe(child))
      onBeforeUnmount(() => observer.disconnect())
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          gsap.from(children, { opacity: 0, y: 14, duration: 0.5, stagger: options.stagger ?? 0.08, ease: 'power2.out' })
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    onBeforeUnmount(() => observer.disconnect())
  })
}
