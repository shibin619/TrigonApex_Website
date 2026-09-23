<script setup lang="ts">
// Shared create/edit form for the admin testimonials portal. Emits a
// FormData payload (not a plain object) since a photo file may be
// attached — the parent page owns the actual API call and its own
// success/error handling.
interface TestimonialFormValues {
  clientName: string
  company: string
  designation: string
  industry: string
  testimonial: string
  relatedCaseStudy: string
  permissionStatus: 'pending' | 'approved' | 'expired'
  photoUrl: string | null
}

const props = withDefaults(defineProps<{
  mode: 'create' | 'edit'
  initial?: Partial<TestimonialFormValues>
  submitting?: boolean
  errors?: Record<string, string[]>
}>(), {
  initial: () => ({}),
  submitting: false,
  errors: () => ({})
})

const emit = defineEmits<{ submit: [FormData] }>()

const clientName = ref(props.initial.clientName ?? '')
const company = ref(props.initial.company ?? '')
const designation = ref(props.initial.designation ?? '')
const industry = ref(props.initial.industry ?? '')
const testimonial = ref(props.initial.testimonial ?? '')
const relatedCaseStudy = ref(props.initial.relatedCaseStudy ?? '')
const permissionStatus = ref(props.initial.permissionStatus ?? 'approved')
const photoFile = ref<File | null>(null)
const existingPhotoUrl = props.initial.photoUrl ?? null

const statusOptions = [
  { label: 'Approved (visible on the site)', value: 'approved' },
  { label: 'Pending', value: 'pending' },
  { label: 'Expired (hidden)', value: 'expired' }
]

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  photoFile.value = target.files?.[0] ?? null
}

function handleSubmit() {
  const formData = new FormData()
  formData.append('client_name', clientName.value)
  formData.append('company', company.value)
  formData.append('designation', designation.value)
  formData.append('industry', industry.value)
  formData.append('testimonial', testimonial.value)
  formData.append('related_case_study', relatedCaseStudy.value)
  if (props.mode === 'edit') {
    formData.append('permission_status', permissionStatus.value)
  }
  if (photoFile.value) {
    formData.append('photo', photoFile.value)
  }
  emit('submit', formData)
}

function fieldError(field: string): string | undefined {
  return props.errors?.[field]?.[0]
}
</script>

<template>
  <form class="flex flex-col gap-5" @submit.prevent="handleSubmit">
    <UFormField name="client_name" :error="fieldError('client_name')">
      <template #label>
        Client name <span class="text-error" aria-hidden="true">*</span>
      </template>
      <UInput v-model="clientName" class="w-full" />
    </UFormField>

    <UFormField name="company" :error="fieldError('company')">
      <template #label>
        Company / Business <span class="text-error" aria-hidden="true">*</span>
      </template>
      <UInput v-model="company" class="w-full" />
    </UFormField>

    <div class="grid gap-5 sm:grid-cols-2">
      <UFormField label="Designation" name="designation" hint="Optional">
        <UInput v-model="designation" class="w-full" />
      </UFormField>

      <UFormField label="Industry" name="industry" hint="Optional">
        <UInput v-model="industry" class="w-full" />
      </UFormField>
    </div>

    <UFormField name="testimonial" :error="fieldError('testimonial')">
      <template #label>
        Feedback <span class="text-error" aria-hidden="true">*</span>
      </template>
      <UTextarea v-model="testimonial" :rows="4" class="w-full" />
    </UFormField>

    <UFormField label="Related case study slug" name="related_case_study" hint="Optional — leave blank if none">
      <UInput v-model="relatedCaseStudy" class="w-full" />
    </UFormField>

    <UFormField v-if="mode === 'edit'" label="Visibility" name="permission_status">
      <USelect v-model="permissionStatus" :items="statusOptions" class="w-full" />
    </UFormField>

    <UFormField label="Photo" name="photo" :error="fieldError('photo')" :hint="mode === 'edit' ? 'Leave blank to keep the current photo' : 'JPG, PNG or WebP, up to 2MB'">
      <img
        v-if="existingPhotoUrl"
        :src="existingPhotoUrl"
        alt=""
        class="mb-3 h-16 w-16 rounded-full object-cover"
      >
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp"
        class="block w-full text-body-sm text-default file:mr-4 file:rounded-(--radius-md) file:border-0 file:bg-elevated file:px-4 file:py-2 file:text-body-sm file:font-medium file:text-highlighted hover:file:bg-accented"
        @change="onFileChange"
      >
    </UFormField>

    <AppButton type="submit" variant="primary" :loading="submitting" class="self-start">
      {{ mode === 'create' ? 'Publish Testimonial' : 'Save Changes' }}
    </AppButton>
  </form>
</template>
