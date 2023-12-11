import { createI18n } from 'vue-i18n'
import { type UserModule } from '~/types/types'
import {useLanguage} from "~/composables/useLanguage";

const {getLang} = useLanguage()

// Import i18n resources
// https://vitejs.dev/guide/features.html#glob-import

//
// Don't need this? Try vitesse-lite: https://github.com/antfu/vitesse-lite
const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: any }>('../../locales/*.y(a)?ml', { eager: true }))
    .map(([key, value]) => {
      const yaml = key.endsWith('.yaml')
      return [key.slice(14, yaml ? -5 : -4), value.default]
    }),
)

console.log(getLang(), messages)

export const install: UserModule = ({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: getLang() || 'ru',
    fallbackLocale: ['uz', 'en'],
    missingWarn: false,
    fallbackWarn: false,
    messages,
  })

  app.use(i18n)
}
