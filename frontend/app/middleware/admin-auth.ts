// Guards every /admin/** page except the login page itself. Runs
// client-only (see the /admin/** route rule in nuxt.config.ts) since the
// token only ever exists in localStorage.
export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/admin/login') {
    return
  }

  const { isAuthenticated, restoreToken } = useAdminAuth()
  restoreToken()

  if (!isAuthenticated.value) {
    return navigateTo('/admin/login')
  }
})
