import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'

import authMiddleware from './middleware/authMiddleware'
import organizationMiddleware from './middleware/organizationMiddleware'
import middlewarePipeline from './middlewarePipeline'
import type { TRouteMiddleware } from '~/types'
import { useUserStore } from '~/stores/user'
import { useOrganizationStore } from '~/stores/organization'
import permissionMiddleware from '~/router/middleware/permissionMiddleware'

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const middlewaresIndex: Record<TRouteMiddleware, any> = {
  authMiddleware,
  organizationMiddleware,
  permissionMiddleware,
}
router.beforeEach(async (to, from, next) => {
  const middlewareList = to.meta.middleware as TRouteMiddleware[]
  if (!middlewareList || !middlewareList.length)
    return next()

  const middlewares = middlewareList.map((item) => {
    return middlewaresIndex[item]
  })

  const context = {
    to,
    from,
    next,
    routeNext: next,
    store: {
      userStore: useUserStore(),
      organizationStore: useOrganizationStore(),
    },
  }
  return await middlewares[0]({
    ...context,
    next: middlewarePipeline(context, middlewares, 1),
  })
})

export default router
