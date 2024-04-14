import { $individual } from '~/services/baseHttp'

export const getUserBlockedBalance = (params: Record<string, number>, id: string) => {
  return $individual.get('operation-list?type[]=2&type[]=10', {
    params,
  })
}
