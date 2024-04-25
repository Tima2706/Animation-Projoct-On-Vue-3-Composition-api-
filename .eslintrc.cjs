/* eslint-.env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  ignorePatterns: ['public/*', '*.cjs', '*.d.ts', 'scripts/*'],
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    "vue/no-v-text-v-html-on-component": "off",
    'vue/no-mutating-props': 'off',
    'linebreak-style': ['error', 'unix'],
  },
  overrides: [
    {
      files: ['src/pages/**/**.vue', 'src/layouts/**.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
      }
    }
  ]
}
