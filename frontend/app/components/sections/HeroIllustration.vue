<script setup lang="ts">
// A custom flat-illustration in our own brand palette, built from the
// same simple-geometric-mark language as SolutionIcon/IndustryIcon/
// PrincipleIcon — bigger and more detailed here since it's the hero's one
// large visual, but deliberately not an attempt at the detailed character-
// illustration style of the reference (that's a specific professional
// illustration skill; this keeps the site's own simpler geometric voice).
// Two abstract, identically-toned figures (so neither reads as a specific
// ethnicity) presenting a data panel, with three floating badges that
// reuse motifs already used elsewhere on the site (the business-growth
// arrow, a target/goal mark, a progress ring) rather than inventing new
// iconography. No numbers or claims are attached to the badges — they're
// decoration, not data.
</script>

<template>
  <svg viewBox="0 0 560 480" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration of two people presenting a business data panel" class="h-full w-full">
    <!-- Data panel -->
    <rect x="112" y="46" width="372" height="246" rx="20" fill="var(--color-brand-900)" opacity="0.12" />
    <rect x="104" y="36" width="372" height="246" rx="20" fill="var(--color-brand-500)" />

    <!-- Line chart -->
    <polyline points="140,230 182,206 224,218 266,176 308,194 350,150 392,166" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0.9" />
    <circle v-for="(pt, i) in [[140,230],[182,206],[224,218],[266,176],[308,194],[350,150],[392,166]]" :key="i" :cx="pt[0]" :cy="pt[1]" r="5" fill="white" />

    <!-- Bar chart -->
    <rect x="398" y="240" width="14" height="26" rx="3" fill="var(--color-accent-ice-400)" opacity="0.9" />
    <rect x="418" y="222" width="14" height="44" rx="3" fill="var(--color-accent-ice-400)" />
    <rect x="438" y="200" width="14" height="66" rx="3" fill="var(--color-accent-ice-400)" opacity="0.9" />
    <rect x="458" y="182" width="14" height="84" rx="3" fill="var(--color-accent-ice-400)" />

    <!-- Figure A: torso, then hair (drawn before head so the head circle
         covers its lower half, leaving a clean hair "cap"), then head,
         then the raised arm + hand on top. -->
    <g>
      <path d="M145,480 V370 Q145,325 195,325 Q245,325 245,370 V480 Z" fill="var(--color-brand-300)" />
      <ellipse cx="195" cy="287" rx="33" ry="24" fill="var(--color-navy-950)" />
      <circle cx="195" cy="308" r="30" fill="#e8bd94" />
      <line x1="238" y1="368" x2="280" y2="225" stroke="var(--color-brand-300)" stroke-width="22" stroke-linecap="round" />
      <circle cx="280" cy="225" r="13" fill="#e8bd94" />
    </g>

    <!-- Figure B -->
    <g>
      <path d="M315,480 V370 Q315,325 365,325 Q415,325 415,370 V480 Z" fill="var(--color-navy-950)" />
      <rect x="357" y="330" width="16" height="100" rx="4" fill="var(--color-accent-green-500)" />
      <ellipse cx="365" cy="287" rx="32" ry="23" fill="var(--color-navy-950)" />
      <circle cx="365" cy="308" r="30" fill="#e8bd94" />
      <line x1="322" y1="368" x2="335" y2="195" stroke="var(--color-navy-950)" stroke-width="22" stroke-linecap="round" />
      <circle cx="335" cy="195" r="13" fill="#e8bd94" />
    </g>

    <!-- Floating badge: growth arrow (reuses the Business Growth icon motif) -->
    <circle cx="96" cy="150" r="30" fill="var(--color-navy-950)" opacity="0.12" />
    <circle cx="92" cy="144" r="30" fill="white" />
    <path d="M78 156l10-10 7 7 14-14" stroke="var(--color-brand-500)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M100 136h9v9" stroke="var(--color-brand-500)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />

    <!-- Floating badge: target -->
    <circle cx="94" cy="346" r="34" fill="var(--color-navy-950)" opacity="0.12" />
    <circle cx="90" cy="340" r="34" fill="white" />
    <circle cx="90" cy="340" r="19" fill="none" stroke="var(--color-brand-200)" stroke-width="6" />
    <circle cx="90" cy="340" r="9" fill="var(--color-brand-500)" />
    <path d="M110 320l11-11M121 309v9h-9" stroke="var(--color-accent-green-500)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />

    <!-- Floating badge: progress ring -->
    <circle cx="470" cy="104" r="30" fill="var(--color-navy-950)" opacity="0.12" />
    <circle cx="466" cy="98" r="30" fill="white" />
    <circle cx="466" cy="98" r="19" fill="none" stroke="var(--color-brand-100)" stroke-width="6" />
    <circle cx="466" cy="98" r="19" fill="none" stroke="var(--color-accent-green-500)" stroke-width="6" stroke-linecap="round" stroke-dasharray="90 120" transform="rotate(-90 466 98)" />

    <!-- Floating badge: progress bar pill -->
    <rect x="222" y="446" width="128" height="40" rx="20" fill="var(--color-navy-950)" opacity="0.14" />
    <rect x="216" y="438" width="128" height="40" rx="20" fill="var(--color-accent-ice-400)" />
    <rect x="234" y="454" width="92" height="6" rx="3" fill="white" opacity="0.85" />
    <circle cx="300" cy="457" r="6" fill="var(--color-brand-700)" />

    <!-- Leaf accent -->
    <ellipse cx="48" cy="454" rx="24" ry="12" fill="var(--color-accent-green-500)" transform="rotate(-35 48 454)" />
    <ellipse cx="34" cy="466" rx="19" ry="9" fill="var(--color-accent-green-700)" transform="rotate(-15 34 466)" />
  </svg>
</template>
