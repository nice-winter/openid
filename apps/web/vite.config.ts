import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import { unheadVueComposablesImports } from '@unhead/vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import ui from '@nuxt/ui/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    strictPort: true,
    proxy: {
      '/api/v1': {
        target: 'http://localhost:5183',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1/, '')
      }
    }
  },
  plugins: [
    vueRouter({
      dts: 'src/types/typed-router.d.ts'
    }),
    vue(),
    ui({
      autoImport: {
        dts: 'src/types/auto-imports.d.ts',
        imports: ['vue', VueRouterAutoImports, 'pinia', '@vueuse/core', unheadVueComposablesImports]
      },
      components: {
        dts: 'src/types/components.d.ts',
        resolvers: []
      }
    }),
    vueDevTools()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
})
