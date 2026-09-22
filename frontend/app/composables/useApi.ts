/**
 * Reusable fetch wrapper for calling the Laravel API without duplicating
 * the base URL/config in every page or component.
 *
 * Usage: const health = await useApi('/api/v1/health')
 */
export function useApi<T = unknown>(path: string, options: Parameters<typeof $fetch>[1] = {}) {
  const config = useRuntimeConfig()

  return $fetch<T>(path, {
    baseURL: config.public.apiBaseUrl,
    ...options
  })
}
