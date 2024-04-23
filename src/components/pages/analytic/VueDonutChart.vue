<template>
  <div>
    <p class="text-[#4A5C71] mb-5 text-[16px] font-medium">{{ $t('statusOfContracts') }}</p>
    <apexchart ref="chartRef" width="500" type="donut" :options="options" :series="options.series"></apexchart>
  </div>
</template>

<script setup lang="ts">
const {t} = useI18n()
const chartRef = ref();

const props = defineProps<{ analyticsList?: [] }>()
const options = ref({
  chart: {
    type: 'donut',
    width: '100%',
    height: 422,
  },
  labels: ['Created', 'The supplier signed the contract', 'The customer signed the contract', 'Canceled', 'Both confirmed'],
  series: [44, 55, 13, 33],

})

watch(() => props.analyticsList, () => {
  updateChart();
});

const updateChart = () => {
  const options = chartRef.value.options;

  options.series =  [
    props.analyticsList.filter((item: any) => item.status === 9 || item.status === 5 || item.status === 11 ).reduce((sum, item) => sum + item.count, 0),
    props.analyticsList.filter((item: any) => item.status === 10 || item.status === 6 ).reduce((sum, item) => sum + item.count, 0),
    props.analyticsList.filter((item: any) => item.status === 1).reduce((sum, item) => sum + item.count, 0),
  ]

  options.labels = [
    `${t('signed')} (${props.analyticsList.filter((item: any) => item.status === 9 || item.status === 5 || item.status === 11).reduce((sum, item) => sum + item.count, 0)})`,
    `${t('canceled')} (${props.analyticsList.filter((item: any) => item.status === 10 || item.status === 6).reduce((sum, item) => sum + item.count, 0)})`,
    `${t('notSigned')} (${props.analyticsList.filter((item: any) => item.status === 1).reduce((sum, item) => sum + item.count, 0)})`,
  ]


  const backgroundColors = [
    '#0096B2',
    '#FF826E',
    '#DDCB2C',
  ]
  const markerColors = [
    '#0096B2',
    '#FF826E',
    '#DDCB2C',
  ]
  options.legend = {
    position: 'bottom',

  }
  options.legend.markers = {
    fillColors: markerColors,

  }


  options.fill = {
    colors: backgroundColors,
  };

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
