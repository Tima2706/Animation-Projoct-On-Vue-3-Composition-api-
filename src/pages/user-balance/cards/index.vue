<script setup lang="ts">
import { ref } from 'vue'
import { ErrorMessage } from 'vee-validate'
import { notification } from 'ant-design-vue'
import { isAxiosError } from 'axios'
import type { CardDto } from '~/services/dto'
import type { CardModel } from '~/types'
import {
  createPersonalUserCard,
  getPersonalUserCard,
  updatePersonalUserCard,
} from '~/services/individual/user-balance'
import Subtract from '~/assets/icons/Subtract.svg'
const { t } = useI18n()

const currentCardId = ref('')
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
const addCardModalVisible = ref(false)
const FormRef = ref()
const cards = ref<CardModel[]>([])
const form = ref<CardDto>({
  name: '',
  card_number: '',
  data_expired: '',
  color: '',
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
    if (currentCardId.value)
      await updatePersonalUserCard(currentCardId.value, { ...form.value })
    else
      await createPersonalUserCard(form.value)
    getCards()
    notification.success({
      message: t('CardAddedSuccessfully'),
    })
    addCardModalVisible.value = false
    form.value = {
      name: '',
      card_number: '',
      data_expired: '',
      color: '',
    }
  }
  catch (e: any) {
    if (isAxiosError(e)) {
      notification.error({
        message: t('AnErrorOccurred'),
      })
    }
  }
}
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

const selectColor = (color: string) => {
  form.value.color = color
}
const selectedScale = (item) => {
  return form.value.color === item.color ? { transform: 'scale(1.3)' } : {}
}
const openCardSettings = (card?: any) => {
  addCardModalVisible.value = true
  currentCardId.value = card.id
  form.value = {
    name: card.name,
    card_number: String(card.card_number),
    data_expired: card.data_expired,
    color: card.color,
  }
}
</script>

<template>
  <div>
    <a-breadcrumb>
      <a-breadcrumb-item type="primary">
        <router-link to="/user-balance">
          <span class="router-link text-primary underline font-medium">
            {{ t('balance') }}
          </span>
        </router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        <span class="text-gray-300">
          {{ t('myCards') }}
        </span>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <div class="flex items-center gap-2 mt-4 mb-6">
      <AButton style="min-height: 30px;padding: 9px; border: none; box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;: " class="bg-[#fff] text-center" @click.prevent="$router.go(-1)">
        <svg
          width="16"
          height="16"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 15L10.0575 13.9425L5.8725 9.75L15 9.75L15 8.25L5.8725 8.25L10.0575 4.0575L9 3L3 9L9 15Z"
            fill="#868EAA"
          />
        </svg>
      </AButton>
      <p class="font-bold text-xl">
        {{ t('myCards') }}
      </p>
    </div>
    <a-card>
      <a-button type="default" @click="addCardModalVisible = true">
        <p class="text-primary font-medium">
          {{ t('addCard') }}
        </p>
      </a-button>
      <div class="mt-6 flex flex-wrap justify-start gap-4">
        <CreditCard v-for="card in cards" :key="card.card_number" :card="card" @updatedCard="getCards" @openCardSettings="openCardSettings" />
      </div>
    </a-card>
    <a-modal v-model:open="addCardModalVisible" centered destroy-on-close style="width: 414px">
      <Form ref="FormRef" @submit="submit">
        <div class="flex flex-col">
          <h2 class="addCardTitle">
            {{ t('addCard') }}
          </h2>
        </div>
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
              rules="required|length:4"
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
      <template #footer>
        <span />
      </template>
    </a-modal>
  </div>
</template>

<style lang="scss" scoped>
//@import 'cards';

.addCardTitle {
  font-size: 24px;
  font-weight: 500;
  line-height: 28.44px;
  color: #48545d;
  text-align: center;
}

.formLabel {
  font-size: 12px;
  font-weight: 400;
  line-height: 14.22px;
  color: #48545d;
  margin-bottom: 8px;
}

.submit.disabled {
  background-color: #9eabbe;
  color: #fff;
  cursor: not-allowed;
  outline: none;
  border: none;
}

input[type='text']::placeholder {
  text-align: center;
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
