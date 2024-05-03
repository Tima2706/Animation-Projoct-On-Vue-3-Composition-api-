import { $httpUser } from '~/services/baseHttp'

export const getUserInfo = async () => {
  return await $httpUser.get('/user/profile')
}

export const getUserInfoById = async (id: string) => {
  return await $httpUser.get(`/user/${id}`)
}

export const updateUserInfo = async (data: any) => {
  return await $httpUser.put('/user', data)
}
