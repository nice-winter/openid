<script setup lang="ts">
useHead({
  title: 'Hello World!'
})
</script>

<template>
  <UPage>
    <template #left> </template>

    <TheWelcome />

    <template #right> </template>
  </UPage>
</template>
