<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { useHttp } from '@/utils/http'

const counterStore = useCounterStore()
const http = useHttp()

const mode = useColorMode()
const msg = ref('')

onMounted(async () => {
  try {
    msg.value = (await http.get('/msg')).data.msg as string
  } catch {
    msg.value = 'Oops! Something went wrong!'
  }
})
</script>

<template>
  <p>{{ msg }}</p>

  <UButton :title="`Count: ${counterStore.count}`" @click="counterStore.increment()">
    Count: {{ counterStore.count }}
  </UButton>

  <UButton
    :icon="mode === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'"
    color="neutral"
    variant="ghost"
    @click="mode = mode === 'dark' ? 'light' : 'dark'"
  />
</template>
