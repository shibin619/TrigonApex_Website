const TOKEN_STORAGE_KEY = 'trigonapex_admin_token'

interface LoginResponse {
  data: {
    token: string
    user: { id: number; name: string; email: string }
  }
}

/**
 * Single-admin session state for the testimonials admin portal. The token
 * lives only in localStorage (no cookie/SSR-shared state) — /admin/** is
 * rendered client-only (see nuxt.config.ts), so that's the only place it's
 * ever read or written.
 */
export function useAdminAuth() {
  const token = useState<string | null>('admin-token', () => null)
  const isAuthenticated = computed(() => !!token.value)

  function restoreToken() {
    if (import.meta.client && token.value === null) {
      token.value = localStorage.getItem(TOKEN_STORAGE_KEY)
    }
  }

  function authHeaders(): Record<string, string> {
    return token.value ? { Authorization: `Bearer ${token.value}` } : {}
  }

  async function login(email: string, password: string) {
    const response = await useApi<LoginResponse>('/api/v1/admin/login', {
      method: 'POST',
      body: { email, password }
    })

    token.value = response.data.token
    if (import.meta.client) {
      localStorage.setItem(TOKEN_STORAGE_KEY, response.data.token)
    }
  }

  async function logout() {
    if (token.value) {
      try {
        await useApi('/api/v1/admin/logout', { method: 'POST', headers: authHeaders() })
      } catch {
        // Token may already be invalid/expired server-side — clearing
        // local state below is what actually matters here.
      }
    }

    token.value = null
    if (import.meta.client) {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
    }
  }

  return { token, isAuthenticated, restoreToken, authHeaders, login, logout }
}
