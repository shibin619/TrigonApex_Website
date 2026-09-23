<script setup lang="ts">
definePageMeta({ layout: 'admin' })

// A plain useHead/useSeoMeta call, not useSeo() — that composable enforces
// the full marketing SeoMeta contract (og/twitter/schema) from
// docs/CONTENT_ARCHITECTURE.md §11, which doesn't apply to an internal,
// noindexed admin tool.
useSeoMeta({ title: 'Admin Login | Trigon Apex', robots: 'noindex, nofollow' })

const { login, isAuthenticated, restoreToken } = useAdminAuth()

onMounted(() => {
  restoreToken()
  if (isAuthenticated.value) {
    navigateTo('/admin/testimonials')
  }
})

const email = ref('')
const password = ref('')
const status = ref<'idle' | 'loading' | 'error'>('idle')
const errorMessage = ref('')

async function handleSubmit() {
  status.value = 'loading'
  errorMessage.value = ''
  try {
    await login(email.value, password.value)
    await navigateTo('/admin/testimonials')
  } catch {
    status.value = 'error'
    errorMessage.value = 'Incorrect email or password.'
  }
}
</script>

<template>
  <div class="mx-auto max-w-sm">
    <h1 class="text-h3 font-semibold tracking-tight text-highlighted">
      Admin Login
    </h1>
    <p class="mt-2 text-body-sm text-muted">
      Manage published client testimonials.
    </p>

    <form class="mt-8 flex flex-col gap-4" @submit.prevent="handleSubmit">
      <UFormField name="email">
        <template #label>
          Email <span class="text-error" aria-hidden="true">*</span>
        </template>
        <UInput v-model="email" type="email" autocomplete="username" class="w-full" />
      </UFormField>

      <UFormField name="password">
        <template #label>
          Password <span class="text-error" aria-hidden="true">*</span>
        </template>
        <UInput v-model="password" type="password" autocomplete="current-password" class="w-full" />
      </UFormField>

      <FormStatusMessage v-if="status === 'error'" status="error" :message="errorMessage" />

      <AppButton type="submit" variant="primary" :loading="status === 'loading'">
        Log In
      </AppButton>
    </form>
  </div>
</template>
