<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin-auth' })

// Plain useSeoMeta, not useSeo() — see app/pages/admin/login.vue.
useSeoMeta({ title: 'Testimonials | Trigon Apex Admin', robots: 'noindex, nofollow' })

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

const testimonials = ref<AdminTestimonial[]>([])
const loading = ref(true)
const loadError = ref('')
const deletingId = ref<string | null>(null)

async function loadTestimonials() {
  loading.value = true
  loadError.value = ''
  try {
    const response = await useAdminApi<{ data: AdminTestimonial[] }>('/api/v1/admin/testimonials')
    testimonials.value = response.data
  } catch {
    loadError.value = 'Could not load testimonials.'
  } finally {
    loading.value = false
  }
}

onMounted(loadTestimonials)

const statusColor: Record<AdminTestimonial['permissionStatus'], 'success' | 'warning' | 'neutral'> = {
  approved: 'success',
  pending: 'warning',
  expired: 'neutral'
}

async function handleDelete(id: string) {
  if (!confirm('Remove this testimonial? This cannot be undone.')) {
    return
  }
  deletingId.value = id
  try {
    await useAdminApi(`/api/v1/admin/testimonials/${id}`, { method: 'DELETE' })
    testimonials.value = testimonials.value.filter((t) => t.id !== id)
  } catch {
    alert('Could not remove this testimonial. Try again.')
  } finally {
    deletingId.value = null
  }
}
</script>

<template>
  <div>
    <div class="flex flex-wrap items-center justify-between gap-4">
      <h1 class="text-h3 font-semibold tracking-tight text-highlighted">
        Testimonials
      </h1>
      <AppButton variant="primary" to="/admin/testimonials/new">
        + New Testimonial
      </AppButton>
    </div>

    <p v-if="loading" class="mt-8 text-body-sm text-muted">
      Loading…
    </p>

    <FormStatusMessage v-else-if="loadError" status="error" :message="loadError" class="mt-8" />

    <p v-else-if="!testimonials.length" class="mt-8 text-body-sm text-muted">
      No testimonials yet. Add the first one.
    </p>

    <ul v-else class="mt-8 flex flex-col gap-4">
      <li v-for="item in testimonials" :key="item.id">
        <BaseCard variant="bordered">
          <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div class="flex gap-4">
              <img
                v-if="item.photo"
                :src="item.photo.src"
                :alt="item.photo.alt"
                class="h-14 w-14 shrink-0 rounded-full object-cover"
              >
              <div
                v-else
                class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-elevated text-body-sm font-semibold text-muted"
                aria-hidden="true"
              >
                {{ item.clientName.charAt(0) }}
              </div>

              <div>
                <div class="flex flex-wrap items-center gap-2">
                  <p class="text-body font-semibold text-highlighted">{{ item.clientName }}</p>
                  <UBadge :color="statusColor[item.permissionStatus]" variant="subtle" size="sm">
                    {{ item.permissionStatus }}
                  </UBadge>
                </div>
                <p class="text-body-sm text-muted">{{ item.designation ? `${item.designation}, ` : '' }}{{ item.company }}</p>
                <p class="mt-2 max-w-xl text-body-sm text-default">{{ item.testimonial }}</p>
              </div>
            </div>

            <div class="flex shrink-0 gap-2 sm:flex-col">
              <AppButton variant="outline" :to="`/admin/testimonials/${item.id}/edit`">
                Edit
              </AppButton>
              <UButton
                color="error"
                variant="ghost"
                :loading="deletingId === item.id"
                @click="handleDelete(item.id)"
              >
                Delete
              </UButton>
            </div>
          </div>
        </BaseCard>
      </li>
    </ul>
  </div>
</template>
