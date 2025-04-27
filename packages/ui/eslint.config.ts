import { eslintConfigVue } from '@template-turborepo-vue/eslint-config/vue'

export default eslintConfigVue(
  // Add your custom rules here:
  {
    name: 'app/custom-rules',
    files: ['**/*.{ts,mts,tsx,vue}'],
    rules: {}
  }
)
