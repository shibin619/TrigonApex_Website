import { gsap } from 'gsap'
import type { Ref } from 'vue'

/**
 * The one foundational GSAP animation primitive for this stage — a subtle,
 * short fade + slight rise on mount. Establishes the convention every
 * future animation must follow (see docs/FRONTEND_ARCHITECTURE.md):
 *
 * - Subtle only: short duration, small movement, no bounce/flourish.
 * - Progressive enhancement: `gsap.from()` on content that's already
 *   visible in markup — if this never runs, the page still works.
 * - Respects `prefers-reduced-motion`: skipped entirely, no fallback jump.
 * - No scroll-linked effects here — ScrollTrigger-based reveals are a
 *   deliberate future decision, not assumed by this foundation.
 */
export function useFadeIn(target: Ref<HTMLElement | null>, options: { delay?: number } = {}) {
  onMounted(() => {
    if (!target.value) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.from(target.value, {
      opacity: 0,
      y: 12,
      duration: 0.5,
      delay: options.delay ?? 0,
      ease: 'power2.out'
    })
  })
}
