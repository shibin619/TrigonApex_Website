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

    <!-- Figure A: tapered torso (not a plain trapezoid) with a collar
         seam, hair (drawn before head so the head circle covers its
         lower half, leaving a clean hair "cap"), then a two-segment
         bent arm — upper arm + forearm meeting at a rounded elbow,
         instead of one rigid straight rod — ending in a hand that
         actually terminates the limb instead of floating near it. -->
    <g>
      <path d="M150,100 Q150,82 195,82 Q240,82 240,100 L228,175 Q226,230 230,310 L238,480 L152,480 L160,310 Q164,230 162,175 Z" fill="var(--color-brand-300)" />
      <path d="M175,88 Q195,102 215,88" stroke="var(--color-navy-950)" stroke-opacity="0.15" stroke-width="2" fill="none" stroke-linecap="round" />
      <ellipse cx="195" cy="68" rx="34" ry="25" fill="var(--color-navy-950)" />
      <circle cx="195" cy="100" r="29" fill="#e8bd94" />
      <line x1="230" y1="120" x2="258" y2="165" stroke="var(--color-brand-300)" stroke-width="19" stroke-linecap="round" />
      <circle cx="258" cy="165" r="9.5" fill="var(--color-brand-300)" />
      <line x1="258" y1="165" x2="282" y2="85" stroke="var(--color-brand-300)" stroke-width="19" stroke-linecap="round" />
      <circle cx="282" cy="85" r="12" fill="#e8bd94" />
    </g>

    <!-- Figure B -->
    <g>
      <path d="M320,100 Q320,82 365,82 Q410,82 410,100 L398,175 Q396,230 400,310 L408,480 L322,480 L330,310 Q334,230 332,175 Z" fill="var(--color-navy-950)" />
      <path d="M345,88 Q365,102 385,88" stroke="white" stroke-opacity="0.12" stroke-width="2" fill="none" stroke-linecap="round" />
      <rect x="357" y="92" width="16" height="110" rx="4" fill="var(--color-accent-green-500)" />
      <ellipse cx="365" cy="68" rx="33" ry="24" fill="var(--color-navy-950)" />
      <circle cx="365" cy="100" r="28" fill="#e8bd94" />
      <line x1="398" y1="120" x2="415" y2="160" stroke="var(--color-navy-950)" stroke-width="19" stroke-linecap="round" />
      <circle cx="415" cy="160" r="9.5" fill="var(--color-navy-950)" />
      <line x1="415" y1="160" x2="420" y2="95" stroke="var(--color-navy-950)" stroke-width="19" stroke-linecap="round" />
      <circle cx="420" cy="95" r="12" fill="#e8bd94" />
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
