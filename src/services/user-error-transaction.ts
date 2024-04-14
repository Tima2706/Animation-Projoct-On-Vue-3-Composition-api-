import { $individual } from '~/services/baseHttp'

export const UserErrorTransaction = (params: Record<string, number>, id: string) => {
  return $individual.get('operation-list?type[]=4&type[]=5&status=5', {
    params,
  })
}
