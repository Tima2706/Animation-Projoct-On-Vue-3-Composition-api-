import router from '~/router'

export default {
  install: () => {
    router
      .isReady()
      .then(async () => {
        const { registerSW } = await import('virtual:pwa-register')
        registerSW({ immediate: true })
      })
      .catch(() => {})
  },
}
