<script lang="ts" setup>
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { notification } from 'ant-design-vue'
import { Form } from 'vee-validate'
import { ref } from 'vue'
import { isAxiosError } from 'axios'
import { formatMoney } from '~/utils/pureFunction'
import IconWallet from '~/assets/icons/empty-wallet-add.svg'
import EyeIcon from '~/assets/icons/eye-line.svg'
import EyeOffIcon from '~/assets/icons/visibility_off.svg'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import {
  createClaim,
  createPayment,
  createPersonalUserCard,
  getPersonalUserCard,
} from '~/services/individual/user-balance'
import { DEFAULT_ERROR_MESSAGE } from '~/utils/constants'
import type { CardDto } from '~/services/dto'
import MaskInput from '~/components/base/MaskInput.vue'
import VText from '~/components/base/VText.vue'

defineProps<Props>()
const emits = defineEmits(['balanced'])
const { t } = useI18n()
const confirmation = ref(false)
const modules = ref([Navigation, Pagination, Scrollbar, A11y])
const isAddCard = ref(false)

interface Props {
  balance: any
  loading: boolean
}
const secretNumber = ref(0)
interface TransactionBalance2 {
  balance: boolean
  available: boolean
  blocked: boolean
  outlay: boolean

  // Add an index signature to allow string indexing
  [key: string]: boolean
}
const balanceCardModal = ref(false)
const cardsModalActiveIndex = ref(0)
const selectedCard = ref(0)
const cards = ref<any[]>([])
const isConfimationData = ref(null)

const balanceModalVisible = ref(false)
const form = ref<CardDto>({
  name: '',
  card_number: '',
  data_expired: '',
})
const cardInfo = ref<any>({
  type: 4,
  card_number: '',
  amount: '',
  date_expire: '',
})
const rePayIt = async () => {
  try {
    await createPayment({
      order_id: isConfimationData.value.order_id,
      type: 14,
      confirm_code: Number(secretNumber.value),
    })
    notification.success({
      message: t('PaymentSuccessful'),
    })
    balanceCardModal.value = false
    emits('balanced')
  }
  catch (e: any) {
    if (isAxiosError(e)) {
      notification.error({
        message: t('AnErrorOccurred'),
      })
      return
    }
    notification.error({
      message: e?.response?.data?.message || DEFAULT_ERROR_MESSAGE,
    })
  }
}

const paySubmit = async (value) => {
  const floatAmount = parseFloat(cardInfo.value.amount).toFixed(2)
  try {
    const data = await createClaim({
      ...cardInfo.value,
      amount: Number(floatAmount),
      date_expire: value.data_expired,
      card_number: value.card_number,
    })
    isConfimationData.value = data.data
  }
  catch (e: any) {
    if (isAxiosError(e)) {
      notification.error({
        message: t('AnErrorOccurred'),
      })
      return
    }
    notification.error({
      message: e?.response?.data?.message || DEFAULT_ERROR_MESSAGE,
    })
  }
}

const showTransactionBalance: TransactionBalance2 = reactive({
  balance: getBalanceShowCase('balance'),
  available: getBalanceShowCase('available'),
  blocked: getBalanceShowCase('blocked'),
  outlay: getBalanceShowCase('outlay'),
})
const getCards = async () => {
  try {
    const { data } = await getPersonalUserCard()
    cards.value = data
  }
  catch (e: any) {
    if (isAxiosError(e)) {
      notification.error({
        message: t('AnErrorOccurred'),
      })
    }
  }
}
getCards()

const submit = async () => {
  try {
    const { data } = await createPersonalUserCard(form.value)

    getCards()
    notification.success({
      message: t('CardAddedSuccessfully'),
    })
  }
  catch (e: any) {
    if (isAxiosError(e)) {
      notification.error({
        message: t('AnErrorOccurred'),
      })
    }
  }
}

watch(showTransactionBalance, () => {
  for (const key in showTransactionBalance) {
    if (showTransactionBalance[key])
      localStorage.removeItem(key)
    else localStorage.setItem(key, showTransactionBalance[key].toString())
  }
})

function getBalanceShowCase(str: string) {
  const balanceShowCase = localStorage.getItem(str)
  return !balanceShowCase
}

function handleHideAmount(str: string) {
  if (typeof showTransactionBalance[str] !== 'undefined')
    showTransactionBalance[str] = !showTransactionBalance[str]
}

function cancelBalanceModal() {
  cardsModalActiveIndex.value = 0
}

const swiperChange = (swiper: any) => {
  selectedCard.value = cards.value[swiper.activeIndex]
}
watch(cards, () => {
  if (cards.value.length !== 0) {
    cardsModalActiveIndex.value = 0
    selectedCard.value = cards.value[0]
  }
})

function handleOk() {
  if (selectedCard.value)
    paySubmit(selectedCard.value)
}

const openBalanceModal = async () => {
  balanceModalVisible.value = true
}

const inputPhoneMaskOption = {
  mask: Number,
  thousandsSeparator: ' ',
}
const isOpenCard = () => {
  isAddCard.value = true
}
defineExpose({
  openBalanceModal,
})
</script>

<template>
  <div class="status">
    <div class="status__block">
      <div class="status__item abs_bg_grey flex">
        <div>
          <h1>{{ t('balance') }}</h1>
          <p class="mb-1 color_grey">
            {{ showTransactionBalance.balance ? formatMoney(balance?.balance) : '*** ***' }}
            <span>{{ t('sum') }}</span>
          </p>
        </div>
        <span class="self-end" style="border-color: #b2d2b7" @click="handleHideAmount('balance')">
          <EyeOffIcon
            v-if="showTransactionBalance.balance"
            class="color_grey cursor-pointer select-none"
          />
          <EyeIcon v-else class="color_grey cursor-pointer select-none" />
        </span>
      </div>
      <div class="status__item abs_bg_yellow flex">
        <div>
          <h1>{{ t('remainBalance') }}</h1>
          <p class="mb-1 color_yellow">
            {{
              showTransactionBalance.available ? formatMoney(balance?.available) : '*** ***'
            }}<span>{{ t('sum') }}</span>
          </p>
        </div>
        <span class="self-end" style="border-color: #81c7a6" @click="handleHideAmount('available')">
          <EyeOffIcon
            v-if="showTransactionBalance.available"
            class="color_yellow cursor-pointer select-none"
          />
          <EyeIcon v-else class="color_yellow cursor-pointer select-none" />
        </span>
      </div>
      <div class="status__item abs_bg_red flex">
        <div>
          <h1>{{ t('blockedBalance') }}</h1>
          <p class="mb-1 color_red">
            {{
              showTransactionBalance.blocked ? formatMoney(balance?.blocked) : '*** ***'
            }}<span>{{ t('sum') }}</span>
          </p>
        </div>
        <span class="self-end" style="border-color: #e9cbcb" @click="handleHideAmount('blocked')">
          <EyeOffIcon
            v-if="showTransactionBalance.blocked"
            class="color_red cursor-pointer select-none"
          />
          <EyeIcon v-else class="color_red cursor-pointer select-none" />
        </span>
      </div>
      <div class="status__item abs_bg_black flex">
        <div>
          <h1>{{ t('expense') }}</h1>
          <p class="mb-1 color_black">
            {{
              showTransactionBalance.outlay ? formatMoney(balance?.outlay) : '*** ***'
            }}<span>{{ t('sum') }}</span>
          </p>
        </div>
        <span class="self-end" style="border-color: #d2c7e3" @click="handleHideAmount('outlay')">
          <EyeOffIcon
            v-if="showTransactionBalance.outlay"
            class="color_black cursor-pointer select-none"
          />
          <EyeIcon v-else class="color_black cursor-pointer select-none" />
        </span>
      </div>
      <div class="p-0 h-[79px] w-[100px]">
        <AButton
          type="primary"
          class="h-full flex items-center flex-col gap-2 justify-center"
          @click="balanceCardModal = true"
        >
          <IconWallet />
          <p>{{ t('replenishmentBalance') }}</p>
        </AButton>
      </div>
    </div>
    <a-modal
      v-model:open="balanceCardModal"
      centered
      class="swiperModal"
      :style="{ overflow: 'hidden' }"
      @cancel="cancelBalanceModal"
    >
      <Form v-slot="{ meta }">
        <div v-if="cards.length !== 0 && isConfimationData === null">
          <h2 class="modal-title">
            {{ t('topUpYourAccount') }}
          </h2>
          <div class="swiperWrapper">
            <Swiper
              ref="swiperRef"
              class="swiperContainer swiper"
              :modules="modules"
              space-between="20"
              effect="coverflow"
              :grab-cursor="true"
              :coverflow-effect="
                {
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: false,
                } as undefined
              "
              :slides-per-view="1"
              :initial-slide="0"
              :pagination="{ clickable: true } as undefined"
              @slideChange="swiperChange"
            >
              <SwiperSlide
                v-for="card in cards"
                :key="card.card_number"
                class="swiperSlide swiper-slide"
              >
                <CreditCard :key="card.card_number" :card="card" />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div v-else-if="cards.length === 0 && isConfimationData === null && isAddCard === false">
          <h2 class="modal-title">
            {{ t('topUpYourAccount') }}
          </h2>
          <a-result>
            <template #extra>
              <a-button key="console" class="border-primary text-primary font-bold" @click="isOpenCard">
                {{ t('addCard') }}
              </a-button>
            </template>
            <template #title>
              <p style="color: rgba(72, 84, 93, 1); font-size: 14px" class="font-bold">
                {{ t('linkCard') }}
              </p>
            </template>
            <template #icon>
              <span style="font-size: 72px" class="flex justify-center">
                <svg
                  focusable="false" data-icon="exclamation-circle" width="1em" height="1em" fill="#A2A5B9"
                  aria-hidden="true" viewBox="64 64 896 896"
                >
                  <path
                    d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"
                  />
                </svg>
              </span>
            </template>
          </a-result>
          <div class="flex justify-end">
            <a-button class="w-[100px]" :disabled="cards.length === 0">
              {{ t('next') }}
            </a-button>
          </div>
        </div>
        <div v-else-if="cards.length === 0 && isConfimationData === null && isAddCard === true">
          <h2 class="modal-title">
            {{ t('addCard') }}
          </h2>
          <Form ref="FormRef" @submit="submit">
            <div class="flex flex-col">
              <h2 class="addCardTitle">
                {{ t('addCard') }}
              </h2>
            </div>
            <div>
              <p class="formLabel">
                {{ t('cardNumber') }}
              </p>
              <Field
                v-slot="{ errors }"
                :model-value="form.card_number"
                name="card_number"
                rules="required"
              >
                <MaskInput
                  v-model="form.card_number"
                  placeholder="0000 0000 0000 0000"
                  :options="{ mask: '0000 0000 0000 0000', lazy: true }"
                  :class="{ 'has-error': errors.length }"
                  class="text-center"
                />
                <div class="helper-message">
                  <ErrorMessage name="card_number" />
                </div>
              </Field>
              <div class="grid grid-cols-2">
                <p class="formLabel">
                  {{ t('cardExpiredDate') }}
                </p>
                <p class="formLabel">
                  {{ t('cardName') }}
                </p>
                <div>
                  <div class="flex items-center justify-start gap-3">
                    <Field
                      v-slot="{ errors }"
                      name="card_expired_month"
                      :model-value="form.data_expired"
                      rules="required|length:4"
                    >
                      <MaskInput
                        v-model="form.data_expired"
                        placeholder="MM|YY"
                        :options="{ mask: '00/00', lazy: true }"
                        :class="{ 'has-error': errors.length }"
                        style="width: 80px; text-align: center"
                        @input="validateExpriedDate"
                      />
                    </Field>
                    <div class="helper-message">
                      <ErrorMessage name="card_expired_month" />
                    </div>
                  </div>
                </div>
                <div>
                  <Field
                    v-slot="{ errors }"
                    name="cardHolderName"
                    rules="required"
                    :model-value="form.name"
                  >
                    <AInput
                      v-model:value="form.name"
                      type="text"
                      :class="{ 'has-error': errors.length }"
                      style="text-transform: uppercase"
                    />
                    <div class="helper-message">
                      <ErrorMessage name="cardHolderName" />
                    </div>
                  </Field>
                </div>
              </div>

              <div class="flex justify-between gap-14">
                <AButton class="text-gray-300" @click="() => { isAddCard = false }">
                  {{ t('back') }}
                </AButton>
                <AButton html-type="submit" type="primary" block>
                  {{ t('save') }}
                </AButton>
              </div>
            </div>
          </Form>
        </div>
        <div v-else ref="confirmation">
          <p class="text-center text-2xl py-5 text-[#48545D] font-bold">
            {{ $t('enterConfirmationCode') }}
          </p>
          <p class="text-[#A2A5B9] py-5">
            {{ t('aVerificationCodeHasBeenSent') }}:
            <VText>{{ isConfimationData?.phone_masked }}</VText>
          </p>
          <p class="text-[#48545D] font-medium">
            {{ t('enterCode') }}
          </p>
          <Field
            v-slot="{ errors }"
            name="card_expired_month"
            :model-value="secretNumber"
            rules="required|length:6"
          >
            <MaskInput
              v-model="secretNumber"
              placeholder="_ _ _ _ _ _"
              :options="{ mask: '000000', lazy: true }"
              :class="{ 'has-error': errors.length }"
              style=" text-align: center"
              @input="validateExpriedDate"
            />
          </Field>
          <div class="helper-message">
            <ErrorMessage name="card_expired_month" />
          </div>
          <a-button class="w-full" type="primary" @click="rePayIt">
            {{ $t('сonfirm') }}
          </a-button>
        </div>
      </Form>
      <template #footer>
        <Form v-if="cards.length !== 0 && isConfimationData === null">
          <div class="flex flex-col gap-3 items-center mt-8 mb-10">
            <p class="topBalance">
              {{ t('writeAmount') }}
            </p>
            <Field v-model="cardInfo.amount" name="topBalance" rules="required">
              <MaskInput
                v-model="cardInfo.amount"
                :options="inputPhoneMaskOption"
                class="text-center"
              />
              <ErrorMessage name="topBalance" />
            </Field>
          </div>
          <a-button
            v-if="isAddCard === false && isConfimationData === null "
            key="submit"
            class="py-5 buttonNext"
            type="primary"
            block
            :disabled="cards.length === 0"
            :loading="loading"
            @click="handleOk"
          >
            {{ t('next') }}
          </a-button>
        </Form>
      </template>
    </a-modal>
  </div>
</template>

<style lang="scss" scoped>
@import './CardsContainer';

.swiperContainer {
  display: flex;
  flex-direction: column;
  gap: 50px;

  .swiperSlide {
    background-color: #3a4b5f;
    border-radius: 10px;
  }
}

.swiperWrapper {
  position: relative;
  height: 180px;
  display: flex;
}

.swiper {
  max-width: 70%;
  overflow: visible;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.swiper-slide > div {
  //pointer-events: none;
  opacity: 0.3;
}

.swiper-slide .card {
  width: 100% !important;
  min-width: auto !important;
}

.swiper-slide-active div {
  display: block;
  opacity: 1;
  pointer-events: auto;
}

.modal-title {
  font-family: 'Rubik', sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 17px;
  text-align: center;
  color: #48545d;
  margin-bottom: 30px;
}

.buttonNext {
  display: flex;
  align-items: center;
  justify-content: center;
}

.topBalance {
  font-family: 'Rubik';
  font-size: 14px;
  font-weight: 400;
  line-height: 16.59px;
  text-align: left;
  color: #48545d;
}
</style>
