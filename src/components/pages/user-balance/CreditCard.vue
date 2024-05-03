<script setup lang="ts">
import { notification } from 'ant-design-vue'
import { isAxiosError } from 'axios'
import IconMoreVert from '../../../assets/icons/more_vert.svg'
import Subtract from '../../../assets/icons/Subtract.svg'
import type { CardModel } from '~/types'
import { deletePersonalUserCard } from '~/services/individual/user-balance'

defineProps<{
  card: CardModel
  noSitting: boolean
}>()
const emit = defineEmits(['openCardSettings, updatedCard, updatedCard'])

const openCardSettings = (card: any) => {
  emit('openCardSettings', card)
}
const handleDelete = async (card: CardModel) => {
  try {
    await deletePersonalUserCard(card)
    emit('updatedCard')
    notification.success({
      message: t('CardDeletedSuccessfully'),
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

function formatCardNumber(cardNumber: string) {
  if (typeof cardNumber !== 'string')
    return cardNumber
  return `${cardNumber.slice(0, 4)} **** **** ${cardNumber.slice(12)}`
}
</script>

<template>
  <div class="card cursor-pointer" :style="{ background: card.color }">
    <div class="name_cardHolder">
      <p>{{ card.name }}</p>
      <a-dropdown :trigger="['click']">
        <a class="ant-dropdown-link" @click.prevent>
          <span class="openCardSettings cursor-pointer">
            <IconMoreVert class="text-[#C7D2E2]" />
          </span>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item v-if="!noSitting" key="0" @click="openCardSettings(card)">
              <span >{{ $t('edit') }}</span>
            </a-menu-item>
            <a-menu-item key="1" @click="handleDelete(card.id)">
              <span>{{ $t('delete') }}</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <div class="card_number">
      <p>{{ formatCardNumber(card.card_number.toString()) }}</p>
    </div>
    <div class="flex justify-between items-center">
      <p>{{ card.data_expired.slice(0, 2) }}/{{ card.data_expired.slice(2, 4) }}</p>
      <Subtract />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  padding: 17px 16px;
  border-radius: 8px;
  background-color: #3a4b5f;
  color: #fff;
  min-width: 257px;
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
</style>
