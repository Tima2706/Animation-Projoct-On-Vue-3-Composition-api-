import { $httpUser } from '~/services/baseHttp'

export const getUserInfo = async () => {
  return await $httpUser.get('/user/profile')
}
