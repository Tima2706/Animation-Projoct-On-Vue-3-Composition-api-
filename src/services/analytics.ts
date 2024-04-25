import { $individual } from '~/services/baseHttp'
import { createAnalyticsIncomeDto } from '~/services/dto/analytics.dto'

export const getAnalytics = async () => {
  return await $individual.get('/statistic')
}

export const getAnalyticsIncome = async (params: createAnalyticsIncomeDto) => {
  return await $individual.get('/statistic-income', { params })
}

