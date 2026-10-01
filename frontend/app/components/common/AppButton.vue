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
  size?: 'md' | 'lg' | 'xl'
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

// A flat color swap on hover reads as a default-library button. A soft
// shadow that deepens and a 1px lift on hover is a small, standard touch
// that makes a solid CTA feel considered rather than unstyled — applied
// only to the filled variants; outline/text stay flat by design.
const liftClass = 'motion-safe:transition-[transform,box-shadow] motion-safe:duration-(--duration-fast) shadow-sm hover:-translate-y-px hover:shadow-md'
</script>

<template>
  <UButton
    :color="resolved.color"
    :variant="resolved.variant"
    :to="to"
    :disabled="disabled"
    :loading="loading"
    :type="type"
    :size="size"
    :class="(variant === 'primary' || variant === 'cta' || variant === 'secondary') && !disabled ? liftClass : undefined"
  >
    <slot />
  </UButton>
</template>
