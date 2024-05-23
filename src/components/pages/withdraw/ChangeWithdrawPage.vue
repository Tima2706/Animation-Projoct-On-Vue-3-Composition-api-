<template>
  <div class="change-withdraw--page">
    <a-table
      :pagination="false"
      :data-source="data ? data : []"
      :columns="columns"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'organization_account.bank.mfo'">
          {{ record?.organization_account?.bank.mfo }}
        </template>
        <template v-if="column.key === 'organization_account.account'">
          {{ record?.organization_account?.account }}
        </template>
        <template v-if="column.key === 'date'">
          {{ dayjs(record.date).format(DATE_TIME_FORMAT) }}
        </template>
        <template v-if="column.key === 'summa'">
          {{ record?.summa }}
        </template>
        <template v-if="column.key === 'status'">
              <span>
                <a-tag v-show="record.status === 1" color="green" class="green">
                  {{ t("operationStatus.1") }}
                </a-tag>
                <a-tag v-show="record.status === 2" color="green" class="green">
                  {{ t("operationStatus.2") }}
                </a-tag>
                <a-tag v-show="record.status === 3" color="green" class="green">
                  {{ t("operationStatus.3") }}
                </a-tag>
                <a-tag v-show="record.status === 33" color="red" class="red">
                  {{ t("operationStatus.33") }}
                </a-tag>
                <a-tag
                  v-show="record.status === 22"
                  color="red"
                  class="red"
                >
                  {{ t("operationStatus.22") }}
                </a-tag>
                <a-tag v-show="record.status === 7" color="green" class="green">
                  {{ t("operationStatus.7") }}
                </a-tag>
              </span>
        </template>
      </template>
    </a-table>
<!--    <a-pagination-->
<!--      v-model:current="params.page"-->
<!--      :show-size-changer="false"-->
<!--      :total="10 * lastPage"-->
<!--      show-less-items-->
<!--      hide-on-single-page-->
<!--      @change="onChangePage"-->
<!--    />-->
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { DATE_TIME_FORMAT } from '~/utils/constants'
import { getTransactions } from '~/services/transactionBalance'
const loading = ref(false)
const {t} = useI18n()
const columns = [
  {
    title: t('mfo'),
    dataIndex: 'organization_account.bank.mfo',
    key: 'organization_account.bank.mfo',
  },
  {
    title: t('account'),
    dataIndex: 'organization_account.account',
    key: 'organization_account.account',
  },
  {
    title: t('date'),
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: t('summa'),
    dataIndex: 'summa',
    key: 'summa',
  },
  {
    title: t('status'),
    dataIndex: 'status',
    key: 'status',
  },
]
const transactionList = ref([])

const fetchData = async () => {
  loading.value = true
  try {
  const {data} = await getTransactions()
    transactionList.value = data
  }catch (e) {
    console.log(e)
  }finally {
    loading.value = false
  }
}

fetchData()
</script>

<style lang="scss" >

.change-withdraw--page{
  .ant-table-thead > tr > th{
    background: #ffffff !important;
  }
  table{
    background: #ffffff !important;
  }
  .ant-table-wrapper .ant-table {
    border-radius: 0 !important;
    border: 1px solid #DFE2E9 !important;
  }
}
</style>
