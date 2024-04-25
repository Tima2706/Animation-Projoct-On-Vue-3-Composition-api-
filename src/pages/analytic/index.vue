<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import { AnalyticsDto, AnalyticsIncomeDto } from '~/services/dto/analytics.dto'
import AnalyticChartOutgo from '~/components/pages/analytic/AnalyticChartOutgo.vue'
import { getAnalyticsIncomeUser, getAnalyticsOutgoingUser, getAnalyticsUser } from '~/services/user-analytics'

const { t } = useI18n()
const typeStatus = ref(null)
const typeStatusOutgo = ref(null)
const spinning = ref(false)
const startDate = ref()
const endDate = ref()
const analyticsList = ref<AnalyticsDto>({})
const filteredList = ref<AnalyticsIncomeDto>({})
const filteredListOutgo = ref<AnalyticsIncomeDto>({})
const selectedFilter = ref('isYear')
const loading = ref(false)
const filterByTime = (value: string) => {
  selectedFilter.value = value
  if (value === 'isWeek') {
    const startDate = dayjs().subtract(1, 'week').toISOString()
    const endDate = dayjs().format('ddd, DD MMM YYYY HH:mm:ss [GMT]')
    const formattedDate = dayjs(startDate).format('ddd, DD MMM YYYY HH:mm:ss [GMT]')
    loadOutgoData(formattedDate, endDate, null)
    loadData(formattedDate, endDate, null)
    fetchData(formattedDate, endDate, null)

  } else if (value === 'isDay') {
    const startDate = dayjs().toISOString()
    const endDate = dayjs().format('ddd, DD MMM YYYY 23:59:59 [GMT]')
    const formattedDate = dayjs(startDate).format('ddd, DD MMM YYYY 00:00:00 [GMT]')
    loadData(formattedDate, endDate, null)
    loadOutgoData(formattedDate, endDate, null)
    fetchData(formattedDate, endDate, null)
  }
  else if (value === 'isMonth') {
    const startDate = dayjs().subtract(1, 'month').toISOString()
    const endDate = dayjs().format('ddd, DD MMM YYYY HH:mm:ss [GMT]')
    const formattedDate = dayjs(startDate).format('ddd, DD MMM YYYY HH:mm:ss [GMT]')
    loadData(formattedDate, endDate, null)
    loadOutgoData(formattedDate, endDate, null)
    fetchData(formattedDate, endDate, null)
  } else if (value === 'isYear') {
    const startDate = dayjs().subtract(1, 'year').toISOString()
    const endDate = dayjs().format('ddd, DD MMM YYYY HH:mm:ss [GMT]')
    const formattedDate = dayjs(startDate).format('ddd, DD MMM YYYY HH:mm:ss [GMT]')
    loadData(formattedDate, endDate, null)
    loadOutgoData(formattedDate, endDate, null)
    fetchData(formattedDate, endDate, null)
  } else {
    loadData(null, null, null)
    loadOutgoData(null, null, null)
    fetchData(null, null, null)
  }
}
onMounted(() => {
  filterByTime(selectedFilter.value)
})
const fetchData = async (endDate?: string, startDate?: string, status?: number) => {
  spinning.value = true
  try {
    const {
      data
    } = await getAnalyticsUser({ from_date: endDate, to_date: startDate, type: status !== 0 ? [status] : null})
    analyticsList.value = data
  } catch (err) {
    console.error(err)
  } finally {
    spinning.value = false
  }
}

const loadData = async (endDate?: string, startDate?: string, status?: number) => {
  spinning.value = true
  try {
    const {
      data
    } = await getAnalyticsIncomeUser({ from_date: endDate, to_date: startDate, type: status !== 0 ? [status] : null})
    filteredList.value = data
  } catch (err) {
    console.error(err)
  } finally {
    spinning.value = false
  }
}
const loadOutgoData = async (endDate?: string, startDate?: string, status?: number) => {
  loading.value = true
  try {
    const {
      data
    } = await getAnalyticsOutgoingUser({ from_date: endDate, to_date: startDate, type: status !== 0 ? [status] : null})
    filteredListOutgo.value = data
  }catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}


const filterByType = (value: string) => {
  typeStatus.value = value
  loadData(null, null, typeStatus.value as number)
}
const filterByTypeOutgo = (value: string) => {
  typeStatusOutgo.value = value
  loadOutgoData(null, null,typeStatusOutgo.value as number)
}

const filterByTimePicker = () => {
  loadData(startDate.value, endDate.value, null)
  loadOutgoData(startDate.value, endDate.value, null)
  fetchData(startDate.value, endDate.value, null)
}
</script>

<template>
  <div class="h-100vh">
    <VText weight="600" size="18" class="mb-4">
      {{ t('analytics') }}
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
            {{ t('today') }}
          </a-button>
          <a-button
            class="bg-[#E8EEF7] border-none text-[#849AA9] analytic"
            :style="{
              background: selectedFilter === 'isWeek' ? '#0096B2' : '#E8EEF7',
              color: selectedFilter === 'isWeek' ? '#fff' : '#849AA9',
            }"
            @click="filterByTime('isWeek')"
          >
            {{ t('week') }}
          </a-button>
          <a-button
            class="bg-[#E8EEF7] border-none text-[#849AA9] analytic"
            :style="{
              background: selectedFilter === 'isMonth' ? '#0096B2' : '#E8EEF7',
              color: selectedFilter === 'isMonth' ? '#fff' : '#849AA9',
            }"
            @click="filterByTime('isMonth')"
          >
            {{ t('month') }}
          </a-button>
          <a-button
            class="bg-[#E8EEF7] border-none text-[#849AA9] analytic"
            :style="{
              background: selectedFilter === 'isYear' ? '#0096B2' : '#E8EEF7',
              color: selectedFilter === 'isYear' ? '#fff' : '#849AA9',
            }"
            @click="filterByTime('isYear')"
          >
            {{ t('year') }}
          </a-button>
        </div>
        <div class="flex gap-2">
          <a-date-picker v-model:value="startDate" />
          <a-date-picker v-model:value="endDate" />
          <a-button :disabled="!startDate || !endDate" class="bg-[#0096B2] text-[#fff]" @click="filterByTimePicker">{{t('search')}}</a-button>
        </div>
      </div>
    </a-card>
    <CardAnalytic  :analytics-list="analyticsList" />
    <a-divider />
    <div class="mt-5 analytic-status-upper">
      <a-row :gutter="16">
        <a-col :span="12">
          <AnalyticChart @filteredStatus="filterByType" :analyticsList="filteredList" />
        </a-col>
        <a-col :span="12">
          <AnalyticChartOutgo @filteredStatusOutgoing="filterByTypeOutgo" :analytics-list="filteredListOutgo" />
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <ColumnChart :analytics-list="analyticsList"  />
        </a-col>
        <a-col :span="12">
          <VueDonutChart :analyticsList="filteredList" :filteredListOutgo="filteredListOutgo"  />
        </a-col>
      </a-row>
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

.analytic-status-upper {
  display: grid;
  grid-gap: 12px;
  margin: 0 -12px;
  grid-template-columns: repeat(auto-fit, 1fr);
  padding: 12px;

  &__block:first-child {
    grid-column: 1 / 3;
  }

  &__block:last-child {
    grid-column: 3 / 3;
  }
}

@media (max-width: 989px) {
  .analytic-status {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  .analytic-status-upper {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

    &__block:first-child {
      grid-column: 3 / 3;
    }

    &__block:last-child {
      grid-column: 3 / 3;
    }
  }
}
</style>
