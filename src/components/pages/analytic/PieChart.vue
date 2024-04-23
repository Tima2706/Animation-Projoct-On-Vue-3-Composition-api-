<template>
  <div>
    <p class="text-[#4A5C71] mb-5 text-[16px] font-medium">{{ $t('stateOfDocuments') }} ({{ total }})</p>
    <apexchart ref="chartRef" width="500" type="pie" :options="options" :series="options.series"></apexchart>
  </div>
</template>

<script setup lang="ts">
const {t} = useI18n()
const chartRef = ref();

const props = defineProps<{ analyticsList?: [] }>()
const options = ref({
  chart: {
    type: 'pie',
    width: '100%',
    height: '100%'
  },
  labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
  series: [44, 55, 13, 33],
})

watch(() => props.analyticsList, () => {
  updateChart();
});
const total = computed(() => {
  return props.analyticsList.reduce((sum, item) => sum + item.count, 0);
});
const updateChart = () => {
  const options = chartRef.value.options;
  let notEndedList = [];
  let endedList = [];

  props.analyticsList.forEach((item: any) => {
    if (item.status === 11 || item.status === 10 || item.status === 6) {
      endedList.push(item);
    } else {
      notEndedList.push(item);
    }
  });
  options.series = [
    notEndedList.reduce((sum, item) => sum + item.count, 0),
    endedList.reduce((sum, item) => sum + item.count, 0)
  ];
  options.labels = [
    `${t('basketStatuses.InProgress')} (${notEndedList.reduce((sum, item) => sum + item.count, 0)})`,
    `${t('completed')} (${endedList.reduce((sum, item) => sum + item.count, 0)})`
  ];

  options.legend = {
    position: 'bottom',
  }

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
