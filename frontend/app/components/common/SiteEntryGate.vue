<script setup lang="ts">
// Site-wide lead-capture gate. Mounted once in layouts/default.vue (so
// it never renders on /admin, which uses layouts/admin.vue), it opens on
// first client-side mount of the layout and asks for name/email/company
// before the visitor continues browsing. Dismissible by design — "Skip"
// (or Escape / clicking outside) lets them through without submitting,
// so the gate never blocks indexing (the page's real content is already
// server-rendered underneath it) or turns away a visitor who isn't ready
// to share info yet.
//
// Shown once per browser session (sessionStorage, not localStorage): it
// won't reappear on every page navigation or hard reload within the same
// tab, but a new tab/window — a new visit — sees it again, as intended.
//
// Posts to the same /api/v1/inquiries endpoint the /contact page uses,
// with type "site_entry" and source "site_gate" so admin triage can tell
// the two apart; no message field, since nothing was asked for here.
const STORAGE_KEY = 'trigonapex-site-gate-seen'

const open = ref(false)

const name = ref('')
const email = ref('')
const company = ref('')

const submitting = ref(false)
const errors = ref<Record<string, string[]>>({})
const generalError = ref('')

function fieldError(field: string): string | undefined {
  return errors.value[field]?.[0]
}

function markSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // Private browsing / blocked storage — fall back to just not
    // re-showing within this component's lifetime; not worth failing
    // the gate interaction over.
  }
}

function handleSkip() {
  markSeen()
  open.value = false
}

async function handleSubmit() {
  submitting.value = true
  errors.value = {}
  generalError.value = ''
  try {
    await useApi('/api/v1/inquiries', {
      method: 'POST',
      body: {
        type: 'site_entry',
        source: 'site_gate',
        name: name.value,
        email: email.value,
        phone: null,
        company: company.value || null,
        message: null
      }
    })
    markSeen()
    open.value = false
  } catch (error) {
    const response = (error as { data?: { errors?: Record<string, string[]> } }).data
    if (response?.errors) {
      errors.value = response.errors
    } else {
      generalError.value = 'Something went wrong — please try again, or skip for now.'
    }
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  let alreadySeen = false
  try {
    alreadySeen = sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    alreadySeen = false
  }
  if (!alreadySeen) {
    open.value = true
  }
})

// Escape / outside click / the modal's own close button all route through
// this — any way the gate closes without an explicit submit counts as a
// skip, so it stays dismissed for the rest of the session either way.
function onOpenChange(value: boolean) {
  if (!value && open.value) {
    markSeen()
  }
  open.value = value
}
</script>

<template>
  <UModal :open="open" :dismissible="true" @update:open="onOpenChange">
    <template #header>
      <div>
        <span class="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-caption font-semibold tracking-widest text-brand-500 uppercase">
          <span class="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
          Welcome
        </span>
        <h2 class="mt-3 text-h4 font-semibold tracking-tight text-highlighted">
          Tell us a bit about yourself
        </h2>
        <p class="mt-1.5 text-body-sm text-muted">
          So we know who to follow up with &mdash; takes a few seconds, and you can skip it.
        </p>
      </div>
    </template>

    <template #body>
      <form class="flex flex-col gap-4" novalidate @submit.prevent="handleSubmit">
        <FormStatusMessage v-if="generalError" status="error" :message="generalError" />

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

        <UFormField label="Company / Business" name="company" hint="Optional" :error="fieldError('company')">
          <UInput v-model="company" autocomplete="organization" class="w-full" />
        </UFormField>

        <div class="mt-2 flex items-center gap-4">
          <AppButton type="submit" variant="primary" :loading="submitting" class="flex-1">
            Continue
          </AppButton>
          <AppButton variant="text" type="button" :disabled="submitting" @click="handleSkip">
            Skip for now
          </AppButton>
        </div>
      </form>
    </template>
  </UModal>
</template>
