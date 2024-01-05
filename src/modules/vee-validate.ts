import { localize, setLocale } from '@vee-validate/i18n'
import { email, length, max, max_value, min, min_value, required, url } from '@vee-validate/rules'
import { ErrorMessage, Field, Form, configure, defineRule } from 'vee-validate'
import type { App } from 'vue'
import VeeValidateMessages from '../../locales/vee-validate-messages'
import { useLanguage } from '~/composables/useLanguage'

const { getLang } = useLanguage()

defineRule('required', required)
defineRule('max', max)
defineRule('min', min)
defineRule('email', email)
defineRule('url', url)
defineRule('length', length)
defineRule('min_value', min_value)
defineRule('max_value', max_value)

defineRule('phone', (value: string) => {
  if (!value)
    return true

  return /^(\d{2})\d{3}\d{4}$/.test(value)
})
configure({
  generateMessage: localize(VeeValidateMessages),
})

setLocale(getLang())

export default {
  install: (app: App) => {
    app.component('Form', Form)

    app.component('Field', Field)
    app.component('ErrorMessage', ErrorMessage)
  },
}
