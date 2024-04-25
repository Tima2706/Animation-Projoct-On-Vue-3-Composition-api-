<script setup lang="ts">
import CardDocument from '~/assets/icons/post.svg'
import type { AnalyticsDto } from '~/services/dto/analytics.dto'
import { formatMoney } from '~/utils/pureFunction'
const props = defineProps<{ analyticsList?: AnalyticsDto }>()
const { t } = useI18n()
const selectedCard = ref('contractors')
</script>

<template>
  <div class="flex  gap-6 my-6">
    <div
      class="analytic-card min-w-[194px] "
    >
      <div
        class="flex justify-between  items-center "
      >
        <div class="document-type-analytic">
          <span>{{ t('income') }}</span>
        </div>
        <CardDocument />
      </div>
      <div class="flex justify-between pt-5  items-center ">
        <span style="font-size: 21px" class="text-[#4A5C71] font-bold">{{ formatMoney(analyticsList?.income) }}</span>
        <span
          :style="`color: ${analyticsList?.contracts_count_changes > 0 ? '#0096B2' : '#FF4D4F'}`"
          class="text-[#4A5C71] font-bold"
        >{{
          analyticsList?.contracts_count_changes !== 0 ? analyticsList?.contracts_count_changes?.toFixed(2) : ''
        }}{{ analyticsList?.contracts_count_changes ? '%' : '' }}</span>
      </div>
    </div>
    <div
      class="analytic-card  min-w-[194px] "
    >
      <div
        class="flex justify-between  items-center "
      >
        <div class="document-type-analytic">
          <span>{{ t('outgo') }}</span>
        </div>
        <CardDocument />
      </div>
      <div class="flex justify-between pt-5  items-center ">
        <span style="font-size: 21px" class="text-[#4A5C71] font-bold">{{ analyticsList?.outgo }}</span>
        <span
          class="text-[#4A5C71] font-bold"
        >{{
          analyticsList?.invoices_count_changes !== 0 ? analyticsList?.invoices_count_changes?.toFixed(2) : ''
        }}{{ analyticsList?.invoices_count_changes ? '%' : '' }}</span>
      </div>
    </div>
    <div
      class="analytic-card  min-w-[194px] "
    >
      <div
        class="flex justify-between  items-center "
      >
        <div class="document-type-analytic">
          <span>{{ t('rate_payment') }}</span>
        </div>
        <CardDocument />
      </div>
      <div class="flex justify-between pt-5  items-center ">
        <span style="font-size: 21px" class="text-[#4A5C71] font-bold">{{ analyticsList?.rate_payment }}</span>
        <span
          class="text-[#4A5C71] font-bold"
        >{{
          analyticsList?.acts_count_changes !== 0 ? analyticsList?.acts_count_changes?.toFixed(2) : ''
        }}{{ analyticsList?.acts_count_changes ? '%' : '' }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
