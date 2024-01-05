import { createI18n } from 'vue-i18n'
import type { App } from 'vue'
import en from '../../locales/en.yml'
import ru from '../../locales/ru.yml'
import uz from '../../locales/uz.yml'
import { useLanguage } from '~/composables/useLanguage'

const messages = {
  en,
  ru,
  uz,
}

type MessageSchema = typeof en

export default {
  install: (app: App) => {
    const { getLang } = useLanguage()
    const i18n = createI18n<[MessageSchema], 'en'>({
      legacy: false,
      locale: getLang(),
      fallbackLocale: ['uz', 'en'],
      missingWarn: false,
      fallbackWarn: false,
      messages,
    })

    app.use(i18n)
  },
}
