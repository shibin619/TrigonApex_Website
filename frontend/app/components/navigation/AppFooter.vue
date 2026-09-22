<script setup lang="ts">
import { siteConfig } from '~/content/site.config'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-default">
    <PageContainer as="div" class="flex flex-col items-center gap-4 py-8 text-body-sm text-muted sm:flex-row sm:justify-between">
      <p>{{ siteConfig.companyName }} &copy; {{ year }}</p>

      <nav v-if="siteConfig.navigation.footer?.length" aria-label="Footer">
        <ul class="flex flex-wrap items-center gap-4">
          <li v-for="item in siteConfig.navigation.footer" :key="item.to">
            <NuxtLink :to="item.to" class="hover:text-default">{{ item.label }}</NuxtLink>
          </li>
        </ul>
      </nav>
    </PageContainer>
  </footer>
</template>
