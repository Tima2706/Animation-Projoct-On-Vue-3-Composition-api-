<script lang="ts" setup>
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { notification } from 'ant-design-vue'
import { ErrorMessage, Form } from 'vee-validate'
import { onMounted, ref } from 'vue'
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
import Subtract from '~/assets/icons/Subtract.svg'

defineProps<Props>()

const emits = defineEmits(['balanced'])
const { t } = useI18n()
const confirmation = ref(false)
const modules = ref([Navigation, Pagination, Scrollbar, A11y])
const isAddCard = ref(false)
const remainingTime = ref('01:00')
const timer = ref(null)
const startTimer = () => {
  clearInterval(timer.value)
  timer.value = setInterval(() => {
    const [minutes, seconds] = remainingTime.value.split(':').map(Number)
    const totalSeconds = minutes * 60 + seconds - 1
    if (totalSeconds < 0) {
      clearInterval(timer.value)
      return
    }
    const newMinutes = Math.floor(totalSeconds / 60)
    const newSeconds = totalSeconds % 60
    remainingTime.value = `${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`
  }, 1000) // Update every second
}

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
  color: '',
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
const colorList = [
  { color: '#3A4B5F' },
  { color: '#69AF72' },
  { color: '#0096B2' },
  { color: '#2198F4' },
  { color: '#FB922E' },
  { color: 'linear-gradient(100.91deg, #FFA52E 1.72%, #EB4E2C 99.3%)' },
  { color: 'linear-gradient(100.91deg, #34C1FD 1.72%, #14E5BB 99.3%)' },
  { color: 'linear-gradient(100.91deg, #FE6CAC 1.72%, #7A67FB 99.3%)' },
]
const selectColor = (color: string) => {
  form.value.color = color
}
const selectedScale = (item) => {
  return form.value.color === item.color ? { transform: 'scale(1.3)' } : {}
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

const validateExpriedDate = () => {
  const [month, year] = form.value.data_expired.split('/')
  const currentYear = new Date().getFullYear() % 100
  const currentMonth = new Date().getMonth() + 1
  if (year.length === 2 && parseInt(year) >= currentYear) {
    if (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      console.log('Invalid date')

    else
      console.log('Valid date')
  }
}
function formatCardNumber(cardNumber: string) {
  if (typeof cardNumber !== 'string')
    return cardNumber

  return `${cardNumber.slice(0, 4)} ${cardNumber.slice(4, 8)} ${cardNumber.slice(8, 12)} ${cardNumber.slice(12)}`
}
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
  form.value = {
    name: '',
    card_number: '',
    data_expired: '',
    color: '',
  }
  cardInfo.value = {
    type: 4,
    card_number: '',
    amount: '',
    date_expire: '',
  }
  isConfimationData.value = null
  secretNumber.value = 0
  remainingTime.value = '01:00'
  clearInterval(timer.value)
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
watch(isConfimationData, (newVal, oldVal) => {
  if (newVal !== null && oldVal === null)
    clearInterval(timer.value)
  startTimer()
})
onMounted(() => {
  isAddCard.value = false
})
const clearDateThenOpen = () => {
  isConfimationData.value = null
  balanceModalVisible.value = true
  clearInterval(timer.value)
  startTimer()
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
      <AButton
        type="primary"
        class="h-full flex items-center flex-col gap-2 justify-center"
        @click="balanceCardModal = true"
      >
        <IconWallet />
        <p>{{ t('replenishmentBalance') }}</p>
      </AButton>
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
                <CreditCard :key="card.card_number" :card="card" :no-sitting="true" @updatedCard="getCards" />
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
            <div class="flex flex-col" />
            <div :style="{ background: form.color }" class="card-custom mx-auto my-10">
              <div class="name_cardHolder">
                <p>{{ form.name ? form.name : 'example' }}</p>
              </div>
              <div class="card_number">
                <p>{{ form.card_number ? formatCardNumber(form.card_number.toString()) : '**** **** **** ****' }}</p>
              </div>
              <div class="flex justify-between items-center">
                <p>{{ form.data_expired ? `${form.data_expired.slice(0, 2)}/${form.data_expired.slice(2, 4)}` : '00/00' }}</p>
                <Subtract />
              </div>
            </div>
            <div class="py-5 flex justify-between">
              <div v-for="(item, index) in colorList" :key="index">
                <p class="roller cursor-pointer" :style="{ background: item.color, ...selectedScale(item) }" @click="selectColor(item.color, item)" />
              </div>
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
              <div>
                <p class="formLabel">
                  {{ t('cardExpiredDate') }}
                </p>
                <Field
                  v-slot="{ errors }"
                  name="card_expired_month"
                  :model-value="form.data_expired"
                >
                  <MaskInput
                    v-model="form.data_expired"
                    placeholder="MM/YY"
                    :options="{ mask: '00/00', lazy: true }"
                    :class="{ 'has-error': errors.length }"
                    style=" text-align: center"
                    @input="validateExpriedDate"
                  />
                </Field>
                <div class="helper-message">
                  <ErrorMessage name="card_expired_month" />
                </div>
              </div>
              <div>
                <p class="formLabel">
                  {{ t('cardName') }}
                </p>
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

              <div class="text-right">
                <AButton html-type="submit" type="primary" block>
                  {{ t('save') }}
                </AButton>
              </div>
            </div>
          </Form>
        </div>
        <div v-else>
          <p class="text-center text-2xl py-5 text-[#48545D] font-bold">
            {{ $t('enterConfirmationCode') }}
          </p>
          <p class="text-[#A2A5B9] py-5">
            {{ t('aVerificationCodeHasBeenSent') }}:
            <VText>{{ isConfimationData?.phone_masked }}</VText>
          </p>
          <p class="text-[#48545D] py-2 font-medium">
            {{ t('enterCode') }}
          </p>
          <Field
            v-slot="{ errors }"
            name="card_expired_month"
            :model-value="secretNumber"
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
          <p class="time pb-3">
            {{ t('timeLeft') }}: <span class="font-bold"> {{ remainingTime }} </span>
          </p>
          <p v-if="remainingTime === '00:00'" class="text-danger pt-1 pb-3">
            {{ t('resendCode') }}
          </p>
          <div class="flex justify-between gap-14">
            <a-button class="w-full bg-[#9eabbe] text-[#fff]" @click="clearDateThenOpen">
              {{ $t('back') }}
            </a-button>
            <a-button class="w-full" type="primary" @click="rePayIt">
              {{ $t('сonfirm') }}
            </a-button>
          </div>
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
            v-if=" isConfimationData === null "
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
.card-custom {
  padding: 17px 16px;
  border-radius: 12px;
  background-color: #3a4b5f;
  color: #fff;
  max-width: 257px;
  box-shadow: 0px 1px 2px 0px #0d1c2b1a;

  .name_cardHolder {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    p {
      font-size: 13px;
      font-weight: 400;
      line-height: 15px;
      letter-spacing: 0.02em;
      text-transform: uppercase;
    }
  }

  .card_number {
    margin-bottom: 26px;
    margin-top: 14px;
    p {
      font-size: 12px;
      font-weight: 300;
      line-height: 14px;
    }
  }
}
.roller{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #3A4B5F;
  box-shadow: 0px 1px 2px 0px #0D1C2B1A;
}
.active {
  border: 2px solid red;
}
</style>
