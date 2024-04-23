<template>
  <div id="chart">
    <p class="text-[#4A5C71] text-[16px] font-medium">{{$t('newDocuments')}}</p>
    <apexchart ref="chartRef" width="500" type="bar" :options="options" :series="options.series"></apexchart>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

const {t} = useI18n()
const props = defineProps<{ analyticsList?: [] }>()
const chartRef = ref();
const options = {
  chart: {
    type: 'bar',
    width: '100%',
    height: '117%'
  },
  colors: ['#59A7FF'],
  plotOptions: {
    bar: {
      columnWidth: '30%',
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
  // Transform `props.analyticsList` into the required chart data format
  return props.analyticsList.map((item: any) => ({
    x: t(dayjs(item.date).format('ddd')), // Format the date and translate the day
    y: item.count // Use `item.count` as the `y` value
  }));
});

const updateChart = () => {
  const options = chartRef.value.options;
  options.series = [
    {
      name: t('newDocument'),
      data: chartData.value
    }
  ];
  // options.series = [
  //   {
  //     name: t('newDocument'),
  //     data: props.analyticsList.map((item: any) => ({
  //       x: t(dayjs(item.date).format('ddd')),
  //       y: item.count
  //     }))
  //   }
  // ];


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

</style>
