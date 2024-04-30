<script setup lang="ts">
import CardDocument from '~/assets/icons/post.svg'
import type { AnalyticsDto } from '~/services/dto/analytics.dto'
import { formatMoney } from '~/utils/pureFunction'
const props = defineProps<{ analyticsList?: AnalyticsDto }>()
const { t } = useI18n()
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
        <span style="font-size: 21px" class="text-[#4A5C71] font-bold">{{ formatMoney(analyticsList?.income?.summa) }}</span>
        <span
          :style="`color: ${analyticsList?.income?.percent > 0 ? '#0096B2' : '#FF4D4F'}`"
          class="text-[#4A5C71] font-bold"
        >{{
          analyticsList?.income?.percent !== 0 ? analyticsList?.income?.percent?.toFixed(2) : ''
        }}{{ analyticsList?.income?.percent ? '%' : '' }}</span>
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
        <span style="font-size: 21px" class="text-[#4A5C71] font-bold">{{ formatMoney(analyticsList?.outgo?.summa) }}</span>
        <span
          class="text-[#4A5C71] font-bold"
        >{{
          analyticsList?.outgo?.percent !== 0 ? analyticsList?.outgo?.percent?.toFixed(2) : ''
        }}{{ analyticsList?.outgo?.percent ? '%' : '' }}</span>
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
        <span style="font-size: 21px" class="text-[#4A5C71] font-bold">{{ formatMoney(analyticsList?.rate_payment) }}</span>

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
