import { gsap } from 'gsap'
import type { Ref } from 'vue'

/**
 * The one foundational GSAP animation primitive — a subtle, short fade +
 * slight rise, played once when the target scrolls into view. Establishes
 * the convention every future animation must follow (see
 * docs/FRONTEND_ARCHITECTURE.md):
 *
 * - Subtle only: short duration, small movement, no bounce/flourish.
 * - Progressive enhancement: `gsap.from()` on content that's already
 *   visible in markup — if this never runs, the page still works.
 * - Respects `prefers-reduced-motion`: skipped entirely, no fallback jump.
 * - Scroll-triggered via IntersectionObserver (not GSAP ScrollTrigger — no
 *   extra plugin needed for a simple "play once on enter"), so sections
 *   below the fold animate as the visitor scrolls to them instead of all
 *   firing invisibly at page load.
 */
export function useFadeIn(target: Ref<HTMLElement | null>, options: { delay?: number } = {}) {
  onMounted(() => {
    const el = target.value
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const play = () => {
      gsap.from(el, {
        opacity: 0,
        y: 12,
        duration: 0.5,
        delay: options.delay ?? 0,
        ease: 'power2.out'
      })
    }

    if (!('IntersectionObserver' in window)) {
      play()
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          play()
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    onBeforeUnmount(() => observer.disconnect())
  })
}
