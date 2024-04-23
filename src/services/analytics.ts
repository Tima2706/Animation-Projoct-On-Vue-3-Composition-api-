import { $individual } from '~/services/baseHttp'

export const getAnalytics = async (params: any) => {
  return await $individual.get('/statistic', { params })
}
export const getAnalyticsOutgoing = async () => {
  return await $individual.get('/statistic-outgo')
}
export const getAnalyticsIncome = async (params: any) => {
  return await $individual.get('/statistic-income', { params })
}
