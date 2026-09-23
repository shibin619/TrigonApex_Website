<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

// Plain useSeoMeta, not useSeo() — see app/pages/admin/login.vue.
useSeoMeta({ title: 'New Testimonial | Trigon Apex Admin', robots: 'noindex, nofollow' })

const submitting = ref(false)
const errors = ref<Record<string, string[]>>({})
const generalError = ref('')

async function handleSubmit(formData: FormData) {
  submitting.value = true
  errors.value = {}
  generalError.value = ''
  try {
    await useAdminApi('/api/v1/admin/testimonials', { method: 'POST', body: formData })
    await navigateTo('/admin/testimonials')
  } catch (error) {
    const response = (error as { data?: { errors?: Record<string, string[]> } }).data
    if (response?.errors) {
      errors.value = response.errors
    } else {
      generalError.value = 'Could not publish this testimonial. Try again.'
    }
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="max-w-2xl">
    <h1 class="text-h3 font-semibold tracking-tight text-highlighted">
      New Testimonial
    </h1>
    <p class="mt-2 text-body-sm text-muted">
      This publishes to the live site immediately — there is no separate approval step.
    </p>

    <FormStatusMessage v-if="generalError" status="error" :message="generalError" class="mt-6" />

    <TestimonialForm mode="create" :submitting="submitting" :errors="errors" class="mt-8" @submit="handleSubmit" />
  </div>
</template>
