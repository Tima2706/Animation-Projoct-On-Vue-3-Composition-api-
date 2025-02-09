<script lang="ts" setup>
import dayjs from 'dayjs'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DATE_TIME_FORMAT } from '~/utils/constants'
import BalanceStatusForm from '~/components/pages/balance/BalanceStatusForm.vue'
import { useFetchData } from '~/composables/useFetch'
import type { TransactionBalance } from '~/services/dto/transcationBalance'
import { getOperations, getTransactionBalance } from '~/services/transactionBalance'
import FilterIcon from '~/assets/icons/filter.svg'

const { t } = useI18n()
const isFilterOpened = ref<boolean>(false)
const columns = [
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
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: t('NOTES'),
    dataIndex: 'note',
    key: 'note',
  },

  {
    title: t('summa'),
    dataIndex: 'summa',
    key: 'summa',
  },

]
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
const params = reactive({
  page: 1,
})

const { data: transactionBalance, loading: transactionBalanceLoading } = useFetchData<TransactionBalance>(async () => {
  const { data } = await getTransactionBalance()
  return { data: data.data }
}, { immediately: true })

const { data: operations, loading: operationsLoading, fetch } = useFetchData<any[]>(async () => {
  const { data: { data, last_page } } = await getOperations({ ...params, ...bankFilter.value })
  lastPage.value = last_page
  return { data }
}, { immediately: true })

const onChangeFilter = (filter: any) => {
  bankFilter.value = { ...filter }
  fetch()
}

const onChangePage = () => {
  fetch()
}
</script>

<template>
  <div>
    <VText weight="600" size="18">
      {{ t("balance") }}
    </VText>
    <BalanceStatusForm v-if="transactionBalance" :loading="transactionBalanceLoading" :info="transactionBalance" />
    <ACard>
      <div class="flex items-center justify-between">
        <VText weight="600" size="18">
          {{ t("operations") }}
        </VText>
        <div class="flex gap-2 items-cente">
          <AButton size="large" class="filter_btn" @click="isFilterOpened = !isFilterOpened">
            <FilterIcon />
            {{ t('filter') }}
          </AButton>
          <!--              <AButton  size="large" class="filter_btn ml-4" > -->
          <!--                  <HashtagIcon style="fill: none;" /> -->
          <!--                  {{ $t('exportToExel') }} -->
          <!--              </AButton> -->
        </div>
      </div>
      <transition name="transition-effect" mode="out-in">
        <BalanceFilterList :filter="bankFilter" :is-filter-opened="isFilterOpened" @changed="onChangeFilter" />
      </transition>
    </ACard>
    <div>
      <a-spin :spinning="operationsLoading">
        <a-table :pagination="false" :data-source="operations ? operations : []" :columns="columns">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'status'">
              {{ t(`balanceStatus.${record.status}`) }}
            </template>
            <template v-if="column.key === 'date'">
              {{ dayjs(record.date).format(DATE_TIME_FORMAT) }}
            </template>
            <template v-if="column.key === 'summa'">
              {{ record?.summa }}
            </template>
          </template>
        </a-table>
        <a-pagination v-model:current="params.page" :show-size-changer="false" :total="10 * lastPage" show-less-items hide-on-single-page @change="onChangePage" />
      </a-spin>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../styles/pages/contract/index.scss';

.transition-effect {
  &-enter-active,
  &-leave-active {
    transition: all 0.4s;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
}
</style>
