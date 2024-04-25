<template>
  <div id="chart">
    <p class="text-[#4A5C71] mb-5 text-[16px] font-bold">{{ t('efficiency') }}</p>
    <apexchart ref="chartRef" type="donut" :options="options" :series="options.series"></apexchart>
  </div>
</template>

<script setup lang="ts">
import { AnalyticsIncomeDto } from '~/services/dto/analytics.dto'
import { formatMoney } from '~/utils/pureFunction'

const { t } = useI18n()
const chartRef = ref<any>(null) // Initialize with null

const props = defineProps<{
  analyticsList?: AnalyticsIncomeDto;
  filteredListOutgo?: AnalyticsIncomeDto;
}>() // Ensure props are arrays

const options = ref({
  chart: {
    type: 'donut',
    width: '100%',
    height: 392
  },
  dataLabels: {
    enabled: true,
    formatter: function(val: any) {
      return `${val.toFixed(2)}%`
    }
  },
  labels: ['Created', 'The supplier signed the contract', 'The customer signed the contract', 'Canceled', 'Both confirmed'],
  series: [44, 55, 13, 33]
})

const x = ref(0)
const y = ref(0)

onMounted(() => {
  if (Array.isArray(props.filteredListOutgo)) {
    x.value = props.filteredListOutgo.map((item: any) => Number(item.summa)).reduce((sum, item) => sum + item, 0)
  }
  if (Array.isArray(props.analyticsList)) {
    y.value = props.analyticsList.map((item: any) => Number(item.summa)).reduce((sum, item) => sum + item, 0)
  }
})

watch(() => props.analyticsList, () => {
  updateChart()
})
watch(() => props.filteredListOutgo, () => {
  updateChart()
})
const updateChart = () => {
  let income = Array.isArray(props.analyticsList) ? props.analyticsList.map((item: any) => Number(item.summa)).reduce((sum, item) => sum + item, 0) : 0
  let outgo = Array.isArray(props.filteredListOutgo) ? props.filteredListOutgo.map((item: any) => Number(item.summa)).reduce((sum, item) => sum + item, 0) : 0
  const updatedSeries = [
    income,
    outgo
  ]

  options.value.series = updatedSeries

  options.value.labels = [
    `${t('income')} ${formatMoney(income)}`,
    `${t('outgo')} ${formatMoney(outgo)}`
  ]

  const backgroundColors = ['#FF826E', '#0096B2' ]
  const markerColors = [ '#FF826E', '#0096B2']

  options.value.legend = {
    position: 'bottom'
  }

  options.value.legend.markers = {
    fillColors: markerColors
  }

  options.value.fill = {
    colors: backgroundColors
  }

  chartRef.value.updateOptions(options.value, true)
  chartRef.value.updateSeries(options.value.series, false, true)
}

onMounted(() => {
  setTimeout(() => {
    updateChart()
  }, 100)
})
</script>


<style scoped>
#chart {
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
