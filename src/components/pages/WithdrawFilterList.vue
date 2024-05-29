<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { defineProps, defineEmits, ref } from 'vue'
import { organizationWuthdrawal, postOrganizationWithdrawal } from '~/services/transactionBalance'
import { notification } from 'ant-design-vue'
import { useServerError } from '~/services/useServerError'
import { SAVED_SUCCESSFULLY } from '~/utils/constants'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { formatMoney } from '~/utils/pureFunction'
import StateHuman from '~/assets/icons/empty-state-concept.svg'


const visible = ref(false)
const { t } = useI18n()
const loading = ref(false)
const organizations = ref<any>([])
const formRef = ref()
const submitLoading = ref(false)
const { getFieldErrors } = useServerError()
const errorModal = ref(false)
const filterOption = (input: string, option: any) => {
  return option?.account.toLowerCase().includes(input.toLowerCase())
}
const errorData = ref({})
const disabled = ref(false)
const props = defineProps({
  isFilterOpened: {
    type: Boolean,
    default: false
  },
  filter: {
    type: Object,
    default: () => ({})
  }
})
const emit = defineEmits(['changed'])


const DEFAULT_FILTER_DATA = {
  type: 5,
  summa: '',
  account: '',
  note: ''
}


const form = ref<any>({ ...DEFAULT_FILTER_DATA })

const getOrganizationForSearch = async () => {
  const { data } = await organizationWuthdrawal()
  organizations.value = { data }

}

const checkSumma = (value) => {

  if (value < 10000
  ) {
    return t('summaMustBeGreater')
  } else if (value > organizations.value.data?.available_balance) {
    return t('notEnoughMoney')
  } else {
    return true
  }

}


const submit = async () => {
  const validate = await formRef.value.validate()
  if (validate && validate.valid) {
    submitLoading.value = true
    try {
      await postOrganizationWithdrawal({ ...form.value })
      emit('changed')
      notification.success({
        message: SAVED_SUCCESSFULLY
      })

      form.value = { ...DEFAULT_FILTER_DATA }
      setTimeout(() => {
        formRef.value.resetForm()
      })
    } catch (err: any) {
      errorModal.value = true
      errorData.value = err.response.data.error_message
      formRef.value.setErrors(getFieldErrors(err))
    } finally {
      submitLoading.value = false
    }
  }
}


getOrganizationForSearch()
</script>
<template>
  <a-card v-if="organizations?.data?.role === 'admin'">
    <div class="withdraw-filter">
      <Form
        ref="formRef"
      >
        <a-row :gutter="24">
          <a-col :span="24">
            <div class="withdraw-filter__lside flex gap-5 justify-between">
              <div style="width: 50%">
                <p style="padding-bottom: 8px">{{ $t('tin') }}</p>
                <div class="mb-5 withdraw-filter__lside__item"
                     style=" padding: 10px; border-radius: 12px; background: #F0F4F9; ">
                  <VText class="text-dark"> {{ organizations?.data?.tin }}</VText>
                </div>
              </div>
              <div style="width: 50%">
                <p style="padding-bottom: 8px">{{ $t('name') }}</p>
                <div class="mb-5 withdraw-filter__lside__item"
                     style=" padding: 10px; border-radius: 12px; background: #F0F4F9;">
                  <VText class="text-dark"> {{ organizations?.data?.name }}</VText>
                </div>
              </div>
            </div>
          </a-col>
          <a-col :span="24">
            <div class="withdraw-filter__lside flex justify-between gap-5 items-start">
              <div style="width: 50%">
                <VText size="12" weight="400" class="mb-2">
                  {{ $t('checkingAccount') }}
                </VText>
                <Field :model-value="form.account" name="account">
                  <a-select
                    v-model:value="form.account"
                    show-search
                    allow-clear
                    class="withdraw-filter__select"
                    style="width: 100%"
                    :field-names="{ label: 'account', value: 'account' }"
                    :options="organizations?.data?.items"
                    :filter-option="filterOption"
                  />
                  <div class="helper-message">
                    <ErrorMessage name="account" />
                  </div>
                </Field>
              </div>
              <div style="width: 50%">
                <VText size="12" weight="400" class="mb-2">
                  {{ $t('transactionAmount') }}
                </VText>
                <Field
                  v-slot="{ errors }"
                  :model-value="form.summa"
                  name="summa"
                  :rules="checkSumma"
                >
                  <a-input-number
                    type="number"
                    style="width: 100%"
                    class="withdraw-filter__select"
                    :placeholder="$t('summa')"
                    v-model:value="form.summa"
                    :class="{ 'has-error': errors.length }"
                  />
                  <v-text class="pt-2 can-be-withdrawn"><span style="font-weight: 500">{{ $t('canBeWithdrawn') }}</span>:
                    <span style="font-weight: 600">{{
                        organizations?.data?.available_balance ? formatMoney(organizations.data.available_balance.replace(/\s/g, ' ')) : '0'
                      }}
              {{ $t('sum') }} </span>
                  </v-text>
                  <div class="helper-message">
                    <ErrorMessage name="summa" />
                  </div>
                </Field>
              </div>
            </div>

            <VText size="12" weight="400" class="mb-2">
              {{ $t('purposeOfPayment') }}
            </VText>
            <Field :model-value="form.note" :name="$t('note')" rules="required">
              <a-textarea
                v-model:value="form.note"
                :autoSize="false"
                :rows="4"
              />
              <div class="helper-message">
                <ErrorMessage :name="$t('note')" />
              </div>
            </Field>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" style="text-align: right">
            <a-button @click="submit" type="primary">
              {{ $t('withdraw') }} !
            </a-button>
          </a-col>
        </a-row>
      </Form>
    </div>
  </a-card>
  <a-modal
    v-model:visible="errorModal"
    :footer="null"
  >
    <div class="flex mt-8 items-center justify-center">
      <StateHuman />
    </div>
    <p style="font-size: 24px" class="text-center font-[600] text-[#48545D] my-4" v-html="errorData?.title"></p>
    <p style="font-size: 18px" class="text-[#90A5BE] text-center" v-html="errorData?.description"></p>
    <a-divider />
    <div class="flex items-center justify-center gap-3 ">
      <a-button class="text-[#fff] bg-[#9EABBE]" @click="errorModal = false">{{ $t('close') }}</a-button>
      <a target="_blank" :href="errorData?.redirect_url">
        <a-button @click="errorModal = false" type="primary">
          {{ errorData.button }}
        </a-button>
      </a>
    </div>
  </a-modal>
</template>


<style lang="scss" scoped>
.search_btn-reset {
  background: #D65E81;
  color: #FFFFFF;
  border: 1px solid #FFFFFF;
  font-weight: 500;
  transition: .8s;

  &:hover {
    border: 1px solid #D65E81;
    background: #FFFFFF;
    color: #D65E81;
  }
}

.search_btn-apply {
  background: #FFFFFF;
  color: #0096B2;
  transition: .8s;
  font-weight: 500;

  &:hover {
    border: 1px solid #0096B2;
    background: #0096B2;
    color: #FFFFFF;
  }
}

@media (max-width: 1000px) {
  .withdraw-filter__select {
    width: 200% !important;
  }
  .withdraw-filter__lside {
    flex-wrap: wrap;

    &__item {
      width: 200%;
    }
  }
  .can-be-withdrawn {
    width: 200%;
  }
}
</style>
