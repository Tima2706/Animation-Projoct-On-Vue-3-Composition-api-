import { $individual } from '~/services/baseHttp'

export const getUserBalance = async (params: Record<string, string | number>) => {
  return await $individual.get('/user-balance', { params })
}
export const getPersonalUserCard = async (params: Record<string, string | number>) => {
  return await $individual.get('/card-list', { params })
}
export const getOperationList = async (params: Record<string, string | number>) => {
  return await $individual.get('/operation-list', { params })
}

export const createPersonalUserCard = async (data: Record<string, string | number>) => {
  return await $individual.post('/cards', data)
}
export const updatePersonalUserCard = async (id: string, data: Record<string, string | number>) => {
  return await $individual.put(`/cards/${id}`, data)
}
export const createClaim = async (data: Record<string, string | number>) => {
  return await $individual.post('/operations', data)
}

export const createPayment = async (data: Record<string, string | number>) => {
  return await $individual.post('/operations', data)
}

export const deletePersonalUserCard = async (id: string) => {
  return await $individual.delete(`/cards/${id}`)
}
