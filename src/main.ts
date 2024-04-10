import { createApp } from 'vue'
import App from './App.vue'

import './styles/main.scss'
import DatePicker from './modules/datepicker'
import I18n from './modules/i18n'
import Pinia from './modules/pinia'
// import PWA from './modules/pwa'
import VeeValidate from './modules/vee-validate'
import router from '~/router'
import { useOrganizationStore } from '~/stores/organization'
import { useToken } from '~/composables/useToken'
import { IDENTITY_SERVICE, IS_DEV } from '~/utils/config'

const app = createApp(App)

app.use(VeeValidate)
app.use(Pinia)
app.use(I18n)
app.use(router)
// app.use(PWA)
app.use(DatePicker)

const { getOrganization } = useOrganizationStore()
const { removeToken, getToken } = useToken()

const token = getToken()

function checkToken() {
  if (!token && !IS_DEV)
    window.location.href = IDENTITY_SERVICE
}

checkToken();

(async function fetchDate() {
  try {
    await getOrganization()
  }
  catch (err: any) {
    if (!IS_DEV)
      removeToken()
    window.location.href = IDENTITY_SERVICE
  }
  finally {
    app.mount('#app')
  }
})()

// const app = createApp(App)
// const token = getToken()
// if (!token) { handleLogout() }
// else {
//   $http.interceptors.response.use(
//     (response) => {
//       return response
//     },
//     (error) => {
//       if (error.response.status === 401) {
//         removeToken()
//         handleLogout()
//       }
//
//       return Promise.reject(error)
//     },
//   )
//
//   app.use(DatePicker).use(Pinia).use(PWA).use(VeeValidate).use(I18n)
//   const { getOrganization } = useOrganizationStore()
//
//   if (token) {
//     getOrganization()
//       .catch(() => {
//         if (!IS_DEV) {
//           setTimeout(() => {
//             handleLogout()
//             removeToken()
//           })
//         }
//       })
//       .finally(() => {
//         app.use(router)
//         app.mount('#app')
//       })
//   }
//   else {
//     app.use(router)
//     app.mount('#app')
//   }
// }
