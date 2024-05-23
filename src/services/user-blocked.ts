import { $http } from '~/services/baseHttp'

export const getUserBlockedBalance = (params: Record<string, number>, id: string) => {
  return $http.get('operations-search?type[]=2&type[]=10', {
    params,
  })
}
