import { createApp } from 'vue'
import App from './App.vue'
// import '~/assets/scss/style.scss'

import './styles/main.scss'
import DatePicker from './modules/datepicker'
import I18n from './modules/i18n'
import Pinia from './modules/pinia'
import PWA from './modules/pwa'
import VeeValidate from './modules/vee-validate'
import router from '~/router'
import { $http } from '~/services/baseHttp'
import { useOrganizationStore } from '~/stores/organization'
import { useToken } from '~/composables/useToken'
// import { notification } from 'ant-design-vue'
// import { notificationPlacement } from '~/utils/constants'
import { IS_DEV } from '~/utils/config'

import 'vue-select/dist/vue-select.css'
// import vSelect from 'vue-select'
const { removeToken, getToken, handleLogout } = useToken()

const app = createApp(App)
const token = getToken()
if (!token)
  router.push('auth-login')

// app.component('VSelect', vSelect)
//
// notification.config({
//   placement: notificationPlacement,
//   duration: 3,
// })

$http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      removeToken()
      handleLogout()
    }

    return Promise.reject(error)
  },
)

app.use(DatePicker).use(Pinia).use(PWA).use(VeeValidate).use(I18n)
const { getOrganization } = useOrganizationStore()

if (token) {
  getOrganization()
    .catch(() => {
      if (!IS_DEV) {
        setTimeout(() => {
          handleLogout()
          removeToken()
        })
      }
    })
    .finally(() => {
      app.use(router)
      app.mount('#app')
    })
}
else {
  app.use(router)
  app.mount('#app')
}
