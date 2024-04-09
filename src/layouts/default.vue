<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router'

import { useI18n } from 'vue-i18n'
import BankLogo from '~/assets/icons/sidebar/bank.svg'
import AngleLeftIcon from '~/assets/icons/angle-left.svg'
import AcceptBasket from '~/assets/icons/sidebar/accept-basket.svg'
import Balance from '~/assets/icons/balance.svg'
import Withdraw from '~/assets/icons/sidebar/withdraw.svg'
import Blocked from '~/assets/icons/sidebar/blocked.svg'
import ErrorTransaction from '~/assets/icons/sidebar/error-transaction.svg'
import Expenses from '~/assets/icons/sidebar/expenses.svg'
import { useAccess } from '~/composables/useAccess'
import { useOrganizationStore } from '~/stores/organization'
const organization = useOrganizationStore()
const { t } = useI18n({ useScope: 'local' })

const collapsed = ref(false)

const { hasAccess } = useAccess()

const navigations = computed<{
  title: string
  icon: string
  to: RouteLocationRaw
}[]>(() => {
  return [
    {
      title: t('balance'),
      icon: Balance,
      access: true,
      to: { name: 'balance' },
    },
    {
      title: t('banking'),
      icon: AcceptBasket,
      access: true,
      to: { name: 'banking' },
    },
    {
      title: t('withdraw'),
      icon: Withdraw,
      access: true,
      to: { name: 'withdraw' },
    },
    {
      title: t('blockedDeposit'),
      icon: Blocked,
      access: true,
      to: { name: 'blockedDeposit' },
    },
    {
      title: t('erroneousTransactions'),
      icon: ErrorTransaction,
      access: true,
      to: { name: 'erroneousTransactions' },
    },
    {
      title: t('expenses'),
      icon: Expenses,
      access: true,
      to: { name: 'expenses' },
    },
    // {
    //   title: t('tariffProfit'),
    //   icon: Tariff,
    //   access: true,
    //   to: { name: 'tariffProfit' },
    // },
  ]
})
const navigationForUser = computed<{
  title: string
  icon: string
  to: RouteLocationRaw
}[]>(() => {
  return [
    {
      title: t('balance'),
      icon: Balance,
      access: true,
      to: { name: 'user-balance' },
    },
    {
      title: t('banking'),
      icon: AcceptBasket,
      access: true,
      to: { name: 'user-banking' },
    },
    {
      title: t('withdraw'),
      icon: Withdraw,
      access: true,
      to: { name: 'user-withdraw' },
    },
    {
      title: t('blockedDeposit'),
      icon: Blocked,
      access: true,
      to: { name: 'user-blockedDeposit' },
    },
    {
      title: t('erroneousTransactions'),
      icon: ErrorTransaction,
      access: true,
      to: { name: 'user-erroneousTransactions' },
    },
    {
      title: t('expenses'),
      icon: Expenses,
      access: true,
      to: { name: 'user-expenses' },
    },
    // {
    //   title: t('tariffProfit'),
    //   icon: Tariff,
    //   access: true,
    //   to: { name: 'user-tariffProfit' },
    // },
  ]
})
</script>

<template>
  <div v-if="organization.organization">
    <button
      class="sidebar__collapse-btn"
      :class="[{ 'sidebar__collapse-btn-collapsed': collapsed }]"
      @click="collapsed = !collapsed"
    >
      <AngleLeftIcon width="10" />
    </button>
    <a-layout>
      <a-layout-sider :collapsed-width="0" :collapsed="collapsed" width="268px">
        <div class="sidebar">
          <div class="sidebar__header">
            <BankLogo />
            <p class="sidebar__title">
              {{ t("RKP") }}
            </p>
          </div>
          <AppNavigation v-if="!organization.organization.organization_id" :items="navigationForUser" />
          <AppNavigation v-else :items="navigations" />
        </div>
      </a-layout-sider>
      <a-layout-content class="overflow-y-auto ">
        <RouterView />
      </a-layout-content>
    </a-layout>
  </div>
  <div v-else style="display: flex; gap: 20px; justify-content: center; height: 100vh; align-items: center;">
    <a-spin />
    <strong> loading...</strong>
  </div>
</template>

<style lang="scss">
@import "../styles/layouts/defaultLayout.scss";

.transition-effect {
  &-enter-active,
  &-leave-active {
    transition: all 0.2s;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
}
</style>
