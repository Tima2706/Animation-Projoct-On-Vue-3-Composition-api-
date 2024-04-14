<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
import { formatMoney } from '../../utils/pureFunction'
const loading = ref(false)
const { t } = useI18n()

const columns = computed(() => {
  return [
    {
      title: t('№'),
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: t('date'),
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: t('contractNumber'),
      dataIndex: 'contractNumber',
      key: 'contractNumber',
    },
    {
      title: t('МФО'),
      dataIndex: 'organization_account',
      key: 'organization_account.bank.mfo',
    },
    {
      title: t('organization'),
      dataIndex: 'organization',
      key: 'organization',
    },
    {
      title: t('summa'),
      dataIndex: 'summa',
      key: 'summa',
    },
    // You can add more dynamic columns based on your logic here
  ]
})
</script>

<template>
  <div>
    <VText weight="600" size="18" class="mb-4">
      {{ t("tariffProfit") }}
    </VText>
    <a-card>
      <div class="text-center">
        <VText weight="500" size="16" class="mb-4">
          {{ t("balance") }}
        </VText>
        <v-text weight="700" size="56" class="mb-4">
          {{ formatMoney(10000000) }} <span class="text-[#A2A5B9] font-medium text-[18px]">{{ $t('sum') }}</span>
        </v-text>
        <a-button class="text-[#0096B2] border-[#0096B2]">
          {{ t("detailedReport") }}
        </a-button>
      </div>
    </a-card>
    <div class="mt-6">
      <a-spin :spinning="loading">
        <div style="border-top-left-radius: 8px; border-top-right-radius: 8px; border: 1px solid #DFE2E9; border-bottom: 0" class="bg-[#fff] p-4 ">
          asdasd
        </div>
        <div class="tariff-table">
          <a-table
            :pagination="false"
            :columns="columns"
          />
          <a-pagination
            show-less-items
            :show-size-changer="false"
            hide-on-single-page
          />
        </div>
      </a-spin>
    </div>
  </div>
</template>

<style lang="scss">
.tariff-table{
  .ant-table{
    border-radius: 0 !important;
  }
  table {
    border-radius: 0 !important;
    background-color: #FFFFFF !important;
    border: 1px solid #DFE2E9 !important;

  }
  th{
    background-color: #FFFFFF !important;
    padding-bottom: 15px !important;
    border-bottom: 1px solid #DFE2E9 !important;

  }
}
</style>
