import { $http } from '~/services/baseHttp'
import { createAnalyticsIncomeDto } from '~/services/dto/analytics.dto'

export const getAnalyticsUser = async ( params: createAnalyticsIncomeDto ) => {
  return await $http.get('/statistic', { params })
}

export const getAnalyticsOutgoingUser = async (params: any) => {
  return await $http.get('/statistic-outgo', { params })
}


export const getAnalyticsIncomeUser = async (params: createAnalyticsIncomeDto) => {
  return await $http.get('/statistic-income', { params })
}

