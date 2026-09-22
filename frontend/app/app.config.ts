export default defineAppConfig({
  ui: {
    // Nuxt UI's component color system points at our own `brand` token
    // (defined in assets/css/tokens.css), not a raw Tailwind color name or
    // Nuxt's own default green. `brand` is currently aliased to a neutral
    // slate scale as a placeholder — redefining it in tokens.css is the
    // only change needed once real brand colors are approved.
    colors: {
      primary: 'brand',
      neutral: 'slate'
    }
  }
})
