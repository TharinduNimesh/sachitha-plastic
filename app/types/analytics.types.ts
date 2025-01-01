// types/analytics.types.ts
export interface ProductStatistics {
  date: string
  product_id: number
  views: number
}

export interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
    tension: number
  }[]
}