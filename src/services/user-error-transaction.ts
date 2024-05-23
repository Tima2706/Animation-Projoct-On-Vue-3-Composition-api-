import { $http } from '~/services/baseHttp'

export const UserErrorTransaction = (params: Record<string, number>, id: string) => {
  return $http.get('operations-search?type[]=4&type[]=5&status=5', {
    params,
  })
}
