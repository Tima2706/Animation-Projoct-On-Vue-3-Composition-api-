<script setup lang="ts">
import dayjs from 'dayjs'
import { AnalyticsIncomeDto } from '~/services/dto/analytics.dto'

const spinning = ref(false)
const emit = defineEmits(['filteredStatusOutgoing'])
const props = defineProps<{
  analyticsList: AnalyticsIncomeDto
}>()
const { t } = useI18n()
const selectedStatus = ref(null)
watch(() => selectedStatus.value, () => {
  emit('filteredStatusOutgoing', selectedStatus.value)
})

const statusList = ref([
  {
    label: t('all'),
    value: null
  },
  {
    label: t('payment'),
    value: '1'
  },
  {
    label: t('revert_minus'),
    value: '13'
  },
  {
    label: t('pay_penalty'),
    value: '6'
  },
  {
    label: t('contract-price-pay'),
    value: '8'
  }

])


const chartRef = ref()
const options = {
  chart: {
    type: 'area',
    width: '100%',
    height: 350
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    colors: ['#FF826E']
  },
  fill: {
    type: 'gradient',
    colors: [ '#FF826E']
  },
  series: [
    {
      name: 'Series 1',
      data: [30, 40, 35, 50, 49, 60, 70, 91]
    }
  ],

  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
  }
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
      name: t('summa'),
      data: list.reduce((accumulator, item) => {
        const summa = +item.summa
        const xDate = dayjs(item.date).format('YYYY-MM-DD')
        const existingItem = accumulator.find(accItem => accItem.xDate === xDate)
        if (existingItem)
          existingItem.summa += summa
        else
          accumulator.push({ xDate, summa })

        return accumulator
      }, []).map(item => item.summa)
    }
  ]
  options.xaxis.categories = thatValue
  chartRef.value.updateOptions(options, true)
  chartRef.value.updateSeries(options.series, options.xaxis.categories, false, true)
}
watch(() => props.analyticsList, () => {
  updateChart(props.analyticsList)
})


</script>

<template>
  <div id="chart">

    <div class="flex justify-between items-top">
      <p class="text-[#4A5C71] mb-5 text-[16px] font-bold">{{ t('outgo') }}</p>
      <a-select v-model:value="selectedStatus" class="w-[200px]">
        <template #placeholder>
        <span class="text-[#000] font-bold">
        {{ t('all') }}
          </span>
        </template>
        <a-select-option v-for="item in statusList" :key="item.value" :value="item.value">
          {{ item.label }}
        </a-select-option>
      </a-select>
    </div>
    <apexchart ref="chartRef" type="area" :options="options" :series="options.series" />
  </div>
</template>

<style scoped>
#chart {
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
