<script setup lang="ts">
import dayjs from 'dayjs'
import { getAnalyticsIncome } from '~/services/analytics'

const spinning = ref(false)
const analyticsList = ref([])
const { t } = useI18n()
const fetchData = async (endDate?: string, startDate?: string) => {
  spinning.value = true
  try {
    const {
      data,
    } = await getAnalyticsIncome({ from_date: 'Thu, 11 Apr 2024 14:34:15 GMT', to_date: 'Fri, 12 Apr 2024 14:34:20 GMT' })
    analyticsList.value = data
    updateChart(analyticsList.value)
  }
  catch (err) {
    console.error(err)
  }
  finally {
    spinning.value = false
  }
}
const chartRef = ref()
const options = {
  chart: {
    type: 'area',
    width: '100%',
    height: 300,
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 90, 100],
    },
  },
  series: [
    {
      name: 'Series 1',
      data: [30, 40, 35, 50, 49, 60, 70, 91],
    },
  ],

  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
  },
}

const updateChart = (list: []) => {
  const options = chartRef.value.options
  options.series = [
    {
      name: t('document'),
      data: list?.map((item: any) => item.summa),
    },
  ]
  options.xaxis.categories = list?.map((item: any) => dayjs(item.date).format('DD-MMMM'))

  chartRef.value.updateOptions(options, true)
  chartRef.value.updateSeries(options.series, options.xaxis.categories, false, true)
}
fetchData()
</script>

<template>
  <div id="chart">
    <apexchart ref="chartRef" type="area" :options="options" :series="options.series" />
  </div>
</template>

<style scoped>
#chart {
  max-width: 600px;
}
</style>
