<script setup lang="ts">
import { siteConfig } from '~/content/site.config'

// Contact — the single highest-impact gap in the site: "Talk to Us" /
// "Request Consultation" / "Request Product Demo" (ctas.ts) are the
// primary CTA on nearly every section sitewide, and all three point here.
// docs/CONTENT_ARCHITECTURE.md §14 calls /contact "a future integration
// point for submitting to the existing inquiries table via the Laravel
// API — not built in this stage", but with the rest of the nav now built,
// a primary CTA that 404s everywhere is a bigger gap than the page being
// unbuilt. Wired to the real inquiries table (migration already existed,
// unused) via a new public POST /api/v1/inquiries endpoint.
//
// No Contact Info panel: site.config.ts's contact.email/phone/address are
// all still null (no confirmed real values), so there is nothing honest
// to show there — this renders only once those are filled in.
useSeo({
  title: `Contact | ${siteConfig.companyName}`,
  description: 'Tell us about your business, and we\'ll help you figure out the right next step.',
  canonical: 'https://trigonapex.in/contact',
  og: {
    title: `Contact | ${siteConfig.companyName}`,
    description: 'Tell us about your business, and we\'ll help you figure out the right next step.',
    image: null
  },
  twitter: {
    title: `Contact | ${siteConfig.companyName}`,
    description: 'Tell us about your business, and we\'ll help you figure out the right next step.',
    image: null
  },
  robots: 'index, follow',
  schemaType: 'ContactPage'
})

const typeOptions = [
  { label: 'General Inquiry', value: 'contact' },
  { label: 'Request a Consultation', value: 'consultation' },
  { label: 'Request a Product Demo', value: 'demo_request' }
]

const type = ref<'contact' | 'consultation' | 'demo_request'>('contact')
const name = ref('')
const email = ref('')
const phone = ref('')
const company = ref('')
const message = ref('')

const submitting = ref(false)
const submitted = ref(false)
const errors = ref<Record<string, string[]>>({})
const generalError = ref('')

function fieldError(field: string): string | undefined {
  return errors.value[field]?.[0]
}

async function handleSubmit() {
  submitting.value = true
  errors.value = {}
  generalError.value = ''
  try {
    await useApi('/api/v1/inquiries', {
      method: 'POST',
      body: {
        type: type.value,
        name: name.value,
        email: email.value,
        phone: phone.value || null,
        company: company.value || null,
        message: message.value || null
      }
    })
    submitted.value = true
  } catch (error) {
    const response = (error as { data?: { errors?: Record<string, string[]> } }).data
    if (response?.errors) {
      errors.value = response.errors
    } else {
      generalError.value = 'Something went wrong sending this — please try again.'
    }
  } finally {
    submitting.value = false
  }
}

const contentRef = useTemplateRef<HTMLDivElement>('contentRef')
useFadeIn(contentRef)
</script>

<template>
  <SectionContainer as="section" aria-labelledby="contact-heading">
    <PageContainer as="div">
      <div ref="contentRef" class="mx-auto max-w-xl">
        <div class="text-center">
          <span class="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-caption font-semibold tracking-widest text-brand-500 uppercase">
            <span class="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
            Talk to Us
          </span>
          <h1 id="contact-heading" class="mt-4 text-h1 font-semibold tracking-tight text-highlighted">
            Let&rsquo;s talk about your business.
          </h1>
          <p class="mx-auto mt-3 max-w-lg text-body-lg text-muted">
            Tell us a bit about what you&rsquo;re working with, and
            we&rsquo;ll help you figure out the right next step.
          </p>
        </div>

        <div v-if="submitted" class="mt-10">
          <FormStatusMessage status="success" message="Thanks — your message has been sent. We'll be in touch." />
        </div>

        <form v-else class="mt-10 flex flex-col gap-5" novalidate @submit.prevent="handleSubmit">
          <FormStatusMessage v-if="generalError" status="error" :message="generalError" />

          <UFormField label="What can we help with?" name="type">
            <USelect v-model="type" :items="typeOptions" class="w-full" />
          </UFormField>

          <div class="grid gap-5 sm:grid-cols-2">
            <UFormField name="name" :error="fieldError('name')">
              <template #label>
                Name <span class="text-error" aria-hidden="true">*</span>
              </template>
              <UInput v-model="name" autocomplete="name" class="w-full" />
            </UFormField>

            <UFormField name="email" :error="fieldError('email')">
              <template #label>
                Email <span class="text-error" aria-hidden="true">*</span>
              </template>
              <UInput v-model="email" type="email" autocomplete="email" class="w-full" />
            </UFormField>
          </div>

          <div class="grid gap-5 sm:grid-cols-2">
            <UFormField label="Phone" name="phone" hint="Optional" :error="fieldError('phone')">
              <UInput v-model="phone" type="tel" autocomplete="tel" class="w-full" />
            </UFormField>

            <UFormField label="Company / Business" name="company" hint="Optional" :error="fieldError('company')">
              <UInput v-model="company" autocomplete="organization" class="w-full" />
            </UFormField>
          </div>

          <UFormField label="Message" name="message" hint="Optional" :error="fieldError('message')">
            <UTextarea v-model="message" :rows="5" class="w-full" />
          </UFormField>

          <AppButton type="submit" variant="primary" size="lg" :loading="submitting" class="mt-2 self-start">
            Send Message
          </AppButton>
        </form>
      </div>
    </PageContainer>
  </SectionContainer>
</template>
