import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import type { App } from 'vue'

export default {
  install: (app: App) => {
    app.component('VueDatePicker', VueDatePicker)
  },
}
