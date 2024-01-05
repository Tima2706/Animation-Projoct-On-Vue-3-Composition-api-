import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
// import Previewer from 'virtual:vue-component-preview'
import App from './App.vue'
import type { UserModule } from './types/types'
import generatedRoutes from '~pages'

import './styles/main.scss'
import { useMiddleware } from '~/router'
import { $http } from '~/services/baseHttp'
import { useOrganizationStore } from '~/stores/organization'
import { useToken } from '~/composables/useToken'
import {IS_DEV} from "~/utils/config";

const routes = setupLayouts(generatedRoutes)
const {  getToken, removeToken, handleLogout } = useToken()


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
  }
)
export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  async (ctx) => {
    useMiddleware(ctx.router)

    // install all modules under `modules/`
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach((i) => {
        i.install?.(ctx)
      })
    const { getOrganization } = useOrganizationStore()
    const token = getToken()
    if (token) {
      await getOrganization().catch(() => {
        if (!IS_DEV) {
          setTimeout(() => {
            handleLogout()
            removeToken()
          })
        }
        // setTimeout(() => {
        //   ctx.router.replace({ name: 'auth-login' })
        //   removeToken()
        // })
      })
    }

    // ctx.app.use(Previewer)
  },
)
