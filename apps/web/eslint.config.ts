import { eslintConfigVue } from '@template-turborepo-vue/eslint-config/vue'

export default eslintConfigVue(
  {
    name: 'app/unplugin-vue-router',
    files: ['src/pages/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  },

  // Add your custom rules here:
  {
    name: 'app/custom-rules',
    files: ['**/*.{ts,mts,tsx,vue}'],
    rules: {}
  }
)
