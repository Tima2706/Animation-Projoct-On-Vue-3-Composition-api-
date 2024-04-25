export interface AnalyticsDto {
  income: number
  outgo: number
  rate_payment: number
}

export interface AnalyticsIncomeDto {
  date: string
  status: number
  summa: string
}

export interface createAnalyticsIncomeDto {
  from_date: string
  type: number
  to_date: string
}
