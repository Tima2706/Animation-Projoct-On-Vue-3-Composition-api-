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
    } = await getAnalyticsIncome({ from_date: 'Thu, 11 Apr 2024 14:34:15 GMT', to_date: 'Sat, 13 Apr 2024 15:34:04 GMT' })
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
  const thatValue = list
    .reduce((accumulator, item) => {
      const xDate = dayjs(item.date).format('YYYY-MM-DD')

      if (!accumulator.includes(xDate))
        accumulator.push(xDate)
      return accumulator
    }, []).map(item => dayjs(item).format('DD-MMMM'))

  options.series = [
    {
      name: t('document'),
      data: list.reduce((accumulator, item) => {
        const summa = +item.summa
        const xDate = dayjs(item.date).format('YYYY-MM-DD')
        const existingItem = accumulator.find(accItem => accItem.xDate === xDate)
        if (existingItem)
          existingItem.summa += summa
        else
          accumulator.push({ xDate, summa })

        return accumulator
      }, []).map(item => +item.summa),
    },
  ]
  options.xaxis.categories = thatValue
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
