import { $http } from '~/services/baseHttp'


export const getUserBankingType = (params: Record<string, number>, id: string) => {
  return $http.get('operations-search?type[]=4&type[]=5', {
    params,
  })
}
