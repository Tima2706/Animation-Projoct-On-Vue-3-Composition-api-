<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { defineEmits, defineProps, ref } from 'vue'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { getOrganizationPartner } from '~/services/transactionBalance'

const props = defineProps({
  isFilterOpened: {
    type: Boolean,
    default: false,
  },
  filter: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['changed'])

const { t } = useI18n()

const organizations = ref<any>([])
const filterOption = (input: string, option: any) => {
  return option?.name.toLowerCase().includes(input.toLowerCase())
}
const disabledDate = (current: Dayjs) => {
  return current && current > dayjs().endOf('day')
}
const DEFAULT_FILTER_DATA = {
  note: '',
  partner_organization_id: '',
  from_summa: null,
  to_summa: null,
  from_date: '',
  to_date: '',
  doc_number: '',
  product_name: '',
}
const reset = () => {
  filterData.value = { ...DEFAULT_FILTER_DATA }
  emit('changed', {
    ...filterData.value,
  })
}

const filterData = ref<any>({ ...DEFAULT_FILTER_DATA })
const getOrganizationForSearch = async () => {
  const { data } = await getOrganizationPartner()
  organizations.value = data
}

const onSearch = (input: string) => {
  organizations.value = input
}

const submit = () => {
  // filterData.value.from_date = dayjs(filterData.value.from_date).format('YYYY-MM-DD')
  // filterData.value.to_date = dayjs(filterData.value.from_date).format('YYYY-MM-DD')

  emit('changed', {
    ...filterData.value,
  })
}
getOrganizationForSearch()
</script>

<template>
  <div v-if="isFilterOpened === true">
    <hr style="color: #DFE2E9" class="my-4">
    <div class="filter-options flex gap-2">
      <div class="mb-3 ">
        <VText weight="500" size="12" class="mb-1">
          {{ $t('contractNumber') }}
        </VText>
        <a-input v-model:value="filterData.doc_number" style="width: 122px;" type="number" />
      </div>
      <div class="mb-3">
        <VText weight="500" size="12" class="mb-1">
          {{ $t('partner') }}
        </VText>
        <a-select
          v-model:value="filterData.partner_organization_id"
          show-search
          allow-clear
          style="width: 470px"
          class="filter-options_select"
          :field-names="{ label: 'name', value: 'id' }"
          :options="organizations"
          :filter-option="filterOption"
        />
      </div>
      <div class="mb-3">
        <VText weight="500" size="12" class="mb-1">
          {{ $t('nameOfProduct') }}
        </VText>

        <a-input v-model:value="filterData.product_name" style="width: 435px" class="filter-options_select" type="text" />
      </div>
    </div>
    <div class="flex justify-between filter-options mt-3">
      <div class="filter-options flex gap-2 items-center">
        <div class="mb-3">
          <VText weight="500" size="14" class="mb-1">
            {{ $t('date') }}
          </VText>
          <a-space>
            <a-date-picker v-model:value="filterData.from_date" :placeholder="$t('from')" />
            <a-date-picker v-model:value="filterData.to_date" :placeholder="$t('before')" />
          </a-space>
        </div>
        <div class="mb-3">
          <VText weight="500" size="14" class="mb-1">
            {{ $t('price') }}
          </VText>
          <a-space>
            <a-input v-model:value="filterData.from_summa" style="width: 122px;" :placeholder="t('from')" filter-data type="number" />
            <a-input v-model:value="filterData.to_summa" style="width: 122px;" :placeholder="t('before')" type="number" />
          </a-space>
        </div>
        <div class="mb-2">
          <VText weight="500" size="12" class="mb-1">
            {{ $t('note') }}
          </VText>
          <AInput v-model:value="filterData.note" style="width: 289px" />
        </div>
      </div>
      <div class="flex items-center gap-2">
        <AButton class="search_btn search_btn-apply mt-2" @click="submit">
          {{ $t('apply') }}
        </AButton>
        <AButton class="search_btn search_btn-reset mt-2" @click="reset">
          {{ $t('reset') }}
        </AButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../../styles/pages/balance/index.scss';

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

.search_btn-reset{
  background: #D65E81;
  color: #FFFFFF;
  border: 1px solid #FFFFFF;
  font-weight: 500;
  transition: .8s;
  &:hover{
    border: 1px solid #D65E81;
    background: #FFFFFF;
    color: #D65E81;
  }
}
.search_btn-apply{
  background: #FFFFFF;
  color: #0096B2;
  transition: .8s;
  font-weight: 500;
  &:hover{
    border: 1px solid #0096B2;
    background: #0096B2;
    color: #FFFFFF;
  }
}
</style>
