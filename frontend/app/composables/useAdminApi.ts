/**
 * Authenticated fetch wrapper for /admin/** pages — attaches the bearer
 * token and, on a 401 (expired/invalid token), clears the session and
 * bounces to the login page rather than letting every call site handle it.
 */
export async function useAdminApi<T = unknown>(path: string, options: Parameters<typeof $fetch>[1] = {}) {
  const { authHeaders, logout } = useAdminAuth()

  try {
    return await useApi<T>(path, {
      ...options,
      headers: {
        ...authHeaders(),
        ...(options.headers as Record<string, string> | undefined)
      }
    })
  } catch (error) {
    if ((error as { response?: { status?: number } })?.response?.status === 401) {
      await logout()
      await navigateTo('/admin/login')
    }
    throw error
  }
}
