import { $http } from '~/services/baseHttp'

export const getUserBalance = async (params: Record<string, string | number>) => {
  return await $http.get('/balances', { params })
}
export const getPersonalUserCard = async (params: Record<string, string | number>) => {
  return await $http.get('/card-list', { params })
}
export const getOperationList = async (params: Record<string, string | number>) => {
  return await $http.get('/operations-search', { params })
}

export const createPersonalUserCard = async (data: Record<string, string | number>) => {
  return await $http.post('/cards', data)
}
export const updatePersonalUserCard = async (id: string, data: Record<string, string | number>) => {
  return await $http.put(`/cards/${id}`, data)
}
export const createClaim = async (data: Record<string, string | number>) => {
  return await $http.post('/operations', data)
}

export const createPayment = async (data: Record<string, string | number>) => {
  return await $http.post('/operations', data)
}

export const deletePersonalUserCard = async (id: string) => {
  return await $http.delete(`/cards/${id}`)
}
