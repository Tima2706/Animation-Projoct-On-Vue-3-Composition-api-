<template>
  <div id="chart">
    <div>
    <p class="text-[#4A5C71] text-[16px] font-bold">{{$t('rate_payment')}}</p>
    <p class="py-2 text-[16px] font-medium text-gray-300"><span class="text-[#FF826E] ">{{formatMoney(analyticsList?.rate_payment)}} {{$t('sum')}}</span>  {{$t('duringAllThisTime')}}</p>
    </div>
    <apexchart ref="chartRef"  type="bar" :options="options" :series="options.series"></apexchart>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { AnalyticsDto } from '~/services/dto/analytics.dto'
import { formatMoney } from '../../../utils/pureFunction'

const {t} = useI18n()
const props = defineProps<{ analyticsList?: AnalyticsDto }>()
const chartRef = ref();
const options = {
  chart: {
    type: 'bar',
    width: '100%',
    height: 322,
  },
  colors: ['#FF826E'],
  plotOptions: {
    bar: {
      columnWidth: '15%',
      borderRadius: 7,
    }
  },
  series: [{
    data: [{
      x: 'category A',
      y: 10
    }, {
      x: 'category B',
      y: 18
    }, {
      x: 'category C',
      y: 13
    }]
  }]
}
watch(() => props.analyticsList, () => {
  updateChart();
});

const chartData = computed(() => {
  return props?.analyticsList?.tenant_rate_info?.reduce((acc: any, item: any) => {
    const dateFormatted = dayjs(item.registration_date).format('ddd');
    const existingItem = acc.find((dataItem: any) => dataItem.x === dateFormatted);

    if (existingItem) {
      existingItem.y += item.rate_bcv;
    } else {
      acc.push({ x: dateFormatted, y: item.rate_bcv });
    }

    return acc;
  }, []).reverse()
});

const updateChart = () => {
  const options = chartRef.value.options;
  options.series = [
    {
      name: t('bcv'),
      data: chartData.value.map((item: any) => {
        return {
          x: t(item.x),
          y: item.y
        }
      })
    }
  ];



  chartRef.value.updateOptions(options, true);
  chartRef.value.updateSeries(options.series, false, true);

};
onMounted(() => {
  setTimeout(() => {
    updateChart();
  }, 100);
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
