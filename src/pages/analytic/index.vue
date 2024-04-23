<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { getAnalytics } from '~/services/analytics'
import type { AnalyticsDto } from '~/services/dto/analytics.dto'

const emit = defineEmits(['handleClick'])
const selectedDetailDocument = ref([])
const { t } = useI18n()
const typeTemplate = ref(null)
const spinning = ref(false)
const analyticsList = ref<AnalyticsDto>({})
const params = ref({
  documentType: typeTemplate.value,
  startDate: null,
  endDate: null,
})
const selectedFilter = ref('isWeek')
const selectedPlaceDocument = ref([])

// const filterByTime = (value: string) => {
//   selectedFilter.value = value
//   if (value === 'isWeek') {
//     const startDate = dayjs().subtract(1, 'week').toISOString()
//     const endDate = dayjs().format('YYYY-MM-DD')
//     const formattedDate = dayjs(startDate).format('YYYY-MM-DD')
//     fetchData(endDate, formattedDate)
//   }
//   else if (value === 'isMonth') {
//     const startDate = dayjs().subtract(1, 'month').toISOString()
//     const endDate = dayjs().format('YYYY-MM-DD')
//     const formattedDate = dayjs(startDate).format('YYYY-MM-DD')
//     fetchData(endDate, formattedDate)
//   }
//   else if (value === 'isYear') {
//     const startDate = dayjs().subtract(1, 'year').toISOString()
//     const endDate = dayjs().format('YYYY-MM-DD')
//     const formattedDate = dayjs(startDate).format('YYYY-MM-DD')
//     fetchData(endDate, formattedDate)
//   }
//   else {
//     fetchData()
//   }
// }
// onMounted(() => {
//   filterByTime(selectedFilter.value)
// })
const fetchData = async (endDate?: string, startDate?: string) => {
  spinning.value = true
  try {
    const {
      data,
    } = await getAnalytics({ documentType: typeTemplate.value, startDate, endDate })
    analyticsList.value = data
  }
  catch (err) {
    console.error(err)
  }
  finally {
    spinning.value = false
  }
}
// watch(() => typeTemplate.value, () => {
//   fetchData()
// })
const selectedData = (value: [], details: []) => {
  selectedDetailDocument.value = value || []
  selectedPlaceDocument.value = details || []
}
fetchData()
</script>

<template>
  <div class="h-100vh">
    <VText weight="600" size="18" class="mb-4">
      {{ t("analytics") }}
    </VText>
    <a-card>
      <div class="flex justify-between">
        <div class="flex gap-2">
          <a-button
            class="bg-[#E8EEF7] border-none text-[#849AA9] analytic"
            :style="{
              background: selectedFilter === 'isDay' ? '#0096B2' : '#E8EEF7',
              color: selectedFilter === 'isDay' ? '#fff' : '#849AA9',
            }"
            @click="filterByTime('isDay')"
          >
            {{ $t('today') }}
          </a-button>
          <a-button
            class="bg-[#E8EEF7] border-none text-[#849AA9] analytic"
            :style="{
              background: selectedFilter === 'isWeek' ? '#0096B2' : '#E8EEF7',
              color: selectedFilter === 'isWeek' ? '#fff' : '#849AA9',
            }"
            @click="filterByTime('isWeek')"
          >
            {{ $t('week') }}
          </a-button>
          <a-button
            class="bg-[#E8EEF7] border-none text-[#849AA9] analytic"
            :style="{
              background: selectedFilter === 'isMonth' ? '#0096B2' : '#E8EEF7',
              color: selectedFilter === 'isMonth' ? '#fff' : '#849AA9',
            }"
            @click="filterByTime('isMonth')"
          >
            {{ $t('month') }}
          </a-button>
          <a-button
            class="bg-[#E8EEF7] border-none text-[#849AA9] analytic"
            :style="{
              background: selectedFilter === 'isYear' ? '#0096B2' : '#E8EEF7',
              color: selectedFilter === 'isYear' ? '#fff' : '#849AA9',
            }"
            @click="filterByTime('isYear')"
          >
            {{ $t('year') }}
          </a-button>
        </div>
      </div>
    </a-card>
    <CardAnalytic :analytics-list="analyticsList" @handle-click="selectedData" />
    <a-divider />
    <div class="mt-5 analytic-status-upper">
      <div class="analytic-status-upper__block">
        <a-card>
          <AnalyticChart />
        </a-card>
      </div>
    </div>
    <div class="mt-5 analytic-status">
      <div class="analytic-status__block">
        <a-card>
          <!--          <PieChart :analytics-list="selectedDetailDocument" /> -->
        </a-card>
      </div>
      <div class="analytic-status__block">
        <a-card>
          <!--          <ColumnChart :analytics-list="selectedDetailDocument" /> -->
        </a-card>
      </div>
      <div class="analytic-status__block">
        <a-card>
          <!--          <VueDonutChart :analytics-list="selectedDetailDocument" /> -->
        </a-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#app .category-list-item .ant-select-selector {
  @apply rounded-tl-none rounded-bl-none  border-l-0 bg-white;
}

.document-type {
  @apply h-[40px] bg-white min-w-[142px] border-y border-l border-[#d9d9d9] text-[#9EABBE] text-[12px] rounded-l-md flex items-center px-2
}

.document-type-analytic {
  span {
    @apply text-[#9EABBE] text-[14px] font-medium
  }
}

.analytic-card {
  @apply bg-[#fff] rounded-md p-4
}

.analytic-card {
  box-shadow: 0px 5px 20px 0px #0000000D;
  border: 2px solid transparent;
}

.analytic-status {
  display: grid;
  grid-gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  margin: 0 -12px;
  padding: 12px;

}
.analytic-status-upper{
  display: grid;
  grid-gap: 12px;
  margin: 0 -12px;
  grid-template-columns: repeat(auto-fit, 1fr);
  padding: 12px;
  &__block:first-child{
    grid-column: 1 / 3;
  }
  &__block:last-child{
    grid-column: 3 / 3;
  }
}
@media (max-width: 989px) {
  .analytic-status {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  .analytic-status-upper{
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    &__block:first-child{
      grid-column: 3 / 3;
    }
    &__block:last-child{
      grid-column: 3 / 3;
    }
  }
}
</style>
