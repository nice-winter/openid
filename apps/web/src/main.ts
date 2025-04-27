import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue/client'

import ui from '@nuxt/ui/vue-plugin'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(
  createHead({
    init: [
      {
        titleTemplate: '%s | Vue App'
      }
    ]
  })
)
app.use(ui)

app.mount('#app')
