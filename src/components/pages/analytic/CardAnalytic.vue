<script setup lang="ts">
import CardDocument from '~/assets/icons/post.svg'
import type { AnalyticsDto } from '~/services/dto/analytics.dto'
import { formatMoney } from '~/utils/pureFunction'
const props = defineProps<{ analyticsList?: AnalyticsDto }>()
const emit = defineEmits(['handleClick'])
const { t } = useI18n()
const selectedCard = ref('contractors')
const handleClick = (value: [], details: [], cardType: string) => {
  selectedCard.value = cardType
  emit('handleClick', value, details)
}
onMounted(() => {
  setTimeout(() => {
    handleClick(props.analyticsList.contracts_details, props.analyticsList.contracts_places, 'contractors')
  }, 0)
})
</script>

<template>
  <div class="flex  gap-6 my-6">
    <div
      :style="{ border: selectedCard === 'contractors' ? '2px solid #0096B2' : 'none' }"
      class="analytic-card cursor-pointer min-w-[194px] "
      @click="handleClick(analyticsList.contracts_details, props.analyticsList.contracts_places, 'contractors')"
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
      :style="{ border: selectedCard === 'invoices' ? '2px solid #0096B2' : 'none' }"
      class="analytic-card cursor-pointer min-w-[194px] "
      @click="handleClick(analyticsList.invoices_details, props.analyticsList.invoices_places, 'invoices')"
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
          :style="`color: ${analyticsList?.invoices_count_changes > 0 ? '#0096B2' : '#FF4D4F'}`"
          class="text-[#4A5C71] font-bold"
        >{{
          analyticsList?.invoices_count_changes !== 0 ? analyticsList?.invoices_count_changes?.toFixed(2) : ''
        }}{{ analyticsList?.invoices_count_changes ? '%' : '' }}</span>
      </div>
    </div>
    <div
      :style="{ border: selectedCard === 'acts' ? '2px solid #0096B2' : 'none' }"
      class="analytic-card cursor-pointer min-w-[194px] "
      @click="handleClick(analyticsList.acts_details, props.analyticsList.acts_details, 'acts')"
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
          :style="`color: ${analyticsList?.acts_count_changes > 0 ? '#0096B2' : '#FF4D4F'}`"
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
