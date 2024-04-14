import { $individual } from '~/services/baseHttp'

export const getUserExpenses = (params: Record<string, number>, id: string) => {
  return $individual.get('operation-list?type[]=1&type[]=4&type[]=6&type[]=8', {
    params,
  })
}
