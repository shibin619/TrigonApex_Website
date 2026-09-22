export default defineAppConfig({
  ui: {
    // Nuxt UI's component color system points at our own `brand` token
    // (defined in assets/css/tokens.css), not a raw Tailwind color name.
    // As of Stage 8B, `brand` is the real, WCAG-validated #4959B3 ramp —
    // every Nuxt UI component using `color="primary"` (buttons, focus
    // rings, etc.) now reflects the actual brand color automatically,
    // with no change needed here.
    //
    // `success`/`info`/etc. are deliberately left at Nuxt UI's own
    // defaults, not redirected to the brand palette — see tokens.css's
    // "subtle accent colors" note for why UI feedback states and brand
    // decoration are kept separate.
    colors: {
      primary: 'brand',
      neutral: 'slate'
    }
  }
})
