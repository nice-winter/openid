<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    to: '/',
    active: route.path === '/'
  },
  {
    label: 'About',
    to: '/about',
    active: route.path.startsWith('/about')
  },
  {
    label: 'Releases',
    to: 'https://github.com/nuxt/ui/releases',
    target: '_blank'
  }
])
</script>

<template>
  <UApp>
    <UHeader class="z-auto">
      <template #title>
        <VLogo class="h-6 w-auto" />
      </template>

      <UNavigationMenu class="gap-3" :items="items" />

      <template #right>
        <UColorModeButton />

        <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
          <UButton
            color="neutral"
            variant="ghost"
            to="https://github.com/nuxt/ui"
            target="_blank"
            icon="i-lucide-github"
            aria-label="GitHub"
          />
        </UTooltip>
      </template>
    </UHeader>

    <UMain>
      <RouterView />
    </UMain>

    <UFooter />
  </UApp>
</template>

<style scoped></style>
