<script setup lang="ts">
// Thin semantic wrapper over Nuxt UI's UButton. The rest of the app uses
// these five variant names; only this mapping needs to change when
// brand/style decisions are finalized — nothing else in the codebase
// references Nuxt UI's color/variant props directly.
//
// UButton already handles default/hover/focus/active/disabled/loading
// states and renders a semantic <button> or <a> (via `to`) — this wrapper
// adds no new behavior, only a stable naming layer.
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'cta'

const props = withDefaults(defineProps<{
  variant?: ButtonVariant
  to?: string
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}>(), {
  variant: 'primary',
  type: 'button'
})

const variantMap: Record<ButtonVariant, { color: 'primary' | 'neutral'; variant: 'solid' | 'outline' | 'link' }> = {
  primary: { color: 'primary', variant: 'solid' },
  secondary: { color: 'neutral', variant: 'solid' },
  outline: { color: 'primary', variant: 'outline' },
  text: { color: 'primary', variant: 'link' },
  cta: { color: 'primary', variant: 'solid' }
}

const resolved = computed(() => variantMap[props.variant])
</script>

<template>
  <UButton
    :color="resolved.color"
    :variant="resolved.variant"
    :to="to"
    :disabled="disabled"
    :loading="loading"
    :type="type"
  >
    <slot />
  </UButton>
</template>
