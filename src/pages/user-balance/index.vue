<script lang="ts" setup>
import { isAxiosError } from 'axios'
import { notification } from 'ant-design-vue'
import dayjs from 'dayjs'
import CardsContainer from '~/components/pages/user-balance/CardsContainer.vue'
import { getOperationList, getUserBalance } from '~/services/individual/user-balance'
import { DATE_TIME_FORMAT } from '~/utils/constants'
import FilterIcon from '~/assets/icons/filter.svg'

const operationsLoading = ref(false)
const { t, locale } = useI18n()
const CardContainerRef = ref(null)
const balance = ref()
const operation = ref()
const isFilterOpened = ref<boolean>(false)
const params = reactive({
  page: 1,
  per_page: 15,
})
const lastPage = ref(1)
const bankFilter = ref<any>({
  note: '',
  partner_organization_id: '',
  from_summa: null,
  to_summa: null,
  from_date: '',
  to_date: '',
  doc_number: '',
  product_name: '',
})
const getOperation = async () => {
  try {
    const { data } = await getOperationList({ ...params, ...bankFilter.value })
    lastPage.value = data.last_page
    operation.value = data.data
  }
  catch (e: any) {
    if (isAxiosError(e)) {
      notification.error({
        message: t('AnErrorOccurred'),
      })
      return
    }
    console.log(e?.message)
  }
}

getOperation()
const getBalance = async () => {
  try {
    const { data } = await getUserBalance()
    balance.value = data
  }
  catch (e: any) {
    if (isAxiosError(e)) {
      notification.error({
        message: t('AnErrorOccurred'),
      })
      return
    }
    console.log(e?.message)
  }
}

getBalance()

const columns = computed(() => [
  {
    title: t('id'),
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: t('DATA'),
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: t('documentNumber'),
    dataIndex: 'doc_number',
    key: 'doc_number',
  },
  {
    title: t('status'),
    dataIndex: 'status_list',
    key: 'status_list',
  },
  {
    title: t('NOTES'),
    dataIndex: 'note',
    key: 'note',
  },

  {
    title: t('total'),
    dataIndex: 'summa',
    key: 'summa',
  },
])

const openModal = () => {
  CardContainerRef.value.openBalanceModal()
}
const isUpdated = () => {
  getBalance()
  getOperation()
}
// const { data: any, fetch } = useFetchData<any[]>(async () => {
//   const { data: { data, last_page, loading: operationsLoading } } = await getOperationList({ ...params, ...bankFilter.value })
//   lastPage.value = last_page
// }, { immediately: true })
const onChangeFilter = (filter: any) => {
  bankFilter.value = { ...filter }
  getOperation()
}
const onChangePage = () => {
  getOperation()
}
</script>

<template>
  <p class="title-page">
    {{ t('balance') }}
  </p>
  <div class="balance-page">
    <a-card>
      <div class="customCardStyle flex items-center gap-6 mb-3">
        <router-link to="user-balance/cards">
          <AButton type="default">
            <p class="myCards font-extrabold">
              {{ t('myCards') }}
            </p>
          </AButton>
        </router-link>
        <div class="flex items-center gap-3">
          <p class="personal-account">
            {{ t('personalAccount') }}:
          </p>
          <p class="personal-account-number cursor-pointer" @click="openModal">
            {{ balance?.account }}
          </p>
        </div>
      </div>
    </a-card>
    <CardsContainer ref="CardContainerRef" :loading="false" :balance="balance" @balanced="isUpdated" />
    <ACard>
      <div class="flex items-center justify-between">
        <VText weight="600" size="18">
          {{ t("operations") }}
        </VText>
        <div class="flex gap-2 items-cente">
          <AButton size="large" class="flex items-center gap-2  border-primary text-primary" @click="isFilterOpened = !isFilterOpened">
            <FilterIcon />
            {{ t('filter') }}
          </AButton>
        </div>
      </div>
      <transition name="transition-effect" mode="out-in">
        <BalanceFilterList :filter="bankFilter" :is-close="true" :is-filter-opened="isFilterOpened" @changed="onChangeFilter" />
      </transition>
    </ACard>
  </div>
  <a-spin :spinning="operationsLoading">
    <a-table :pagination="false" :data-source="operation ? operation : []" :columns="columns">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'status'">
          {{ t(`operationStatus.${record.status}`) }}
        </template>
        <template v-if="column.key === 'date'">
          {{ dayjs(record.date).format(DATE_TIME_FORMAT) }}
        </template>
        <template v-if="column.key === 'summa'">
          {{ record?.summa }} {{ $t('sum') }}
        </template>
        <template v-if="column.key === 'status_list'">
          <!--          {{ record?.status_list.name }} -->
          {{ record?.status_list[`name_${locale}`] }}
        </template>
      </template>
    </a-table>
    <a-pagination v-model:current="params.page" :show-size-changer="false" :total="10 * lastPage" show-less-items hide-on-single-page @change="onChangePage" />
  </a-spin>
</template>

<style lang="scss">
.balance-page {
  font-family: 'Rubik', sans-serif;
}

.title-page {
  font-family: 'Rubik', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 21.33px;
  margin-bottom: 24px;
  color: #303d4d;
}

.myCards {
  font-size: 12px;
  font-weight: 500;
  line-height: 14px;
  color: #0096b2 !important;
}

.personal-account {
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  color: #a2a5b9;
}

.personal-account-number {
  font-family: Rubik;
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
  color: #303d4d;
}

.ant-table .ant-table-container .ant-table-content table {
  border-collapse: separate;
  border-spacing: 0 10px;
  background-color: #f0f4f9;

  tbody {
    tr {
      background-color: #ffffff;
    }
  }
}

#app .ant-table-tbody > tr > td {
  line-height: 0.2rem;
}

.operation-filter-menu {
  margin: 24px 0 8px 0;
  background-color: #fff;
  border: 1px solid #dfe2e9;
  border-radius: 6px;
  justify-content: space-between;
  align-items: center;
  .title-page {
    margin-bottom: 0px;
  }
}
</style>
