export interface AnalyticsDto {
  income: IncomeDto
  outgo: OutgoDto
  rate_payment: number
}
export interface OutgoDto {
  percent: number
  summa: number
}
export interface IncomeDto {
  percent: number
  summa: number
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
