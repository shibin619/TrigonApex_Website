<script setup lang="ts">
// Minimal internal-tool layout — no marketing AppHeader/AppFooter, no
// public nav. Shows the logout action only once a session exists (the
// login page itself renders with no session).
const { isAuthenticated, logout } = useAdminAuth()
const route = useRoute()

async function handleLogout() {
  await logout()
  await navigateTo('/admin/login')
}
</script>

<template>
  <div class="flex min-h-dvh flex-col bg-elevated">
    <header class="border-b border-default bg-default">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <NuxtLink to="/admin/testimonials" class="text-body-sm font-semibold tracking-tight text-highlighted">
          Trigon Apex — Admin
        </NuxtLink>
        <UButton
          v-if="isAuthenticated && route.path !== '/admin/login'"
          color="neutral"
          variant="ghost"
          size="sm"
          @click="handleLogout"
        >
          Log out
        </UButton>
      </div>
    </header>

    <main class="flex-1">
      <div class="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <slot />
      </div>
    </main>
  </div>
</template>
