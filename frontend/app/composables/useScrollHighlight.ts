/**
 * Scrolls to a target element by id and applies a brief visual highlight
 * once there — used by the Business Problem Selector to point at the
 * future Solutions section (Stage 8F) without depending on it existing
 * yet.
 *
 * Deliberately a safe no-op when the target isn't in the DOM: no thrown
 * error, no console warning, no broken navigation. Stage 8F only needs to
 * give its Solution elements a matching `id` — no other integration.
 */
export function useScrollHighlight() {
  function scrollToAndHighlight(targetId: string, options: { highlightDuration?: number } = {}) {
    const target = document.getElementById(targetId)
    if (!target) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' })

    target.classList.add('solution-target-highlight')
    const duration = options.highlightDuration ?? 1600
    window.setTimeout(() => {
      target.classList.remove('solution-target-highlight')
    }, duration)
  }

  return { scrollToAndHighlight }
}
