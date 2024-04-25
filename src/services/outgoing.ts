import { $individual } from '~/services/baseHttp'

export const getAnalyticsOutgoing = async (params: any) => {
  return await $individual.get('/statistic-outgo', { params })
}
