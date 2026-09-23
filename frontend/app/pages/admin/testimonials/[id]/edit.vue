<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

// Plain useSeoMeta, not useSeo() — see app/pages/admin/login.vue.
useSeoMeta({ title: 'Edit Testimonial | Trigon Apex Admin', robots: 'noindex, nofollow' })

const route = useRoute()
const id = route.params.id as string

interface AdminTestimonial {
  id: string
  clientName: string
  photo: { src: string; alt: string } | null
  company: string
  designation: string | null
  industry: string | null
  testimonial: string
  relatedCaseStudy: string | null
  permissionStatus: 'pending' | 'approved' | 'expired'
}

const testimonial = ref<AdminTestimonial | null>(null)
const loading = ref(true)
const loadError = ref('')
const submitting = ref(false)
const errors = ref<Record<string, string[]>>({})
const generalError = ref('')

async function load() {
  loading.value = true
  loadError.value = ''
  try {
    const response = await useAdminApi<{ data: AdminTestimonial }>(`/api/v1/admin/testimonials/${id}`)
    testimonial.value = response.data
  } catch {
    loadError.value = 'Could not load this testimonial.'
  } finally {
    loading.value = false
  }
}

onMounted(load)

const initialValues = computed(() => testimonial.value ? {
  clientName: testimonial.value.clientName,
  company: testimonial.value.company,
  designation: testimonial.value.designation ?? '',
  industry: testimonial.value.industry ?? '',
  testimonial: testimonial.value.testimonial,
  relatedCaseStudy: testimonial.value.relatedCaseStudy ?? '',
  permissionStatus: testimonial.value.permissionStatus,
  photoUrl: testimonial.value.photo?.src ?? null
} : undefined)

async function handleSubmit(formData: FormData) {
  submitting.value = true
  errors.value = {}
  generalError.value = ''
  try {
    await useAdminApi(`/api/v1/admin/testimonials/${id}`, { method: 'POST', body: formData })
    await navigateTo('/admin/testimonials')
  } catch (error) {
    const response = (error as { data?: { errors?: Record<string, string[]> } }).data
    if (response?.errors) {
      errors.value = response.errors
    } else {
      generalError.value = 'Could not save changes. Try again.'
    }
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="max-w-2xl">
    <h1 class="text-h3 font-semibold tracking-tight text-highlighted">
      Edit Testimonial
    </h1>

    <p v-if="loading" class="mt-8 text-body-sm text-muted">
      Loading…
    </p>

    <FormStatusMessage v-else-if="loadError" status="error" :message="loadError" class="mt-8" />

    <template v-else>
      <FormStatusMessage v-if="generalError" status="error" :message="generalError" class="mt-6" />

      <TestimonialForm
        mode="edit"
        :initial="initialValues"
        :submitting="submitting"
        :errors="errors"
        class="mt-8"
        @submit="handleSubmit"
      />
    </template>
  </div>
</template>
