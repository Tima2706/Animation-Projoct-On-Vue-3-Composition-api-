<script lang="ts" setup>
import { formatMoney } from "~/utils/pureFunction";
import type { TransactionBalance } from "~/services/dto/transcationBalance";
import EmptyWallet from '~/assets/icons/empty-wallet-add.svg'
import Info from '~/assets/icons/info.svg'
import BalancleWallet from "~/components/pages/balance/BalancleWallet.vue";
interface Props {
  info: TransactionBalance;
  loading: boolean;
}
defineProps<Props>();
const showTransactionBalance = reactive({
  balance: getBalanceShowCase("balance"),
  available: getBalanceShowCase("available"),
  blocked: getBalanceShowCase("blocked"),
  outlay: getBalanceShowCase("outlay"),
});

watch(showTransactionBalance, () => {
  for (const key in showTransactionBalance) {
    if (showTransactionBalance[key]) localStorage.removeItem(key);
    else localStorage.setItem(key, showTransactionBalance[key]);
  }
});

const { t } = useI18n();

function getBalanceShowCase(str: string) {
  const balanceShowCase = localStorage.getItem(str);
  if (balanceShowCase) return false;
  else return true;
}

function handleHideAmount(str) {
  if (typeof showTransactionBalance[str] !== "undefined")
    showTransactionBalance[str] = !showTransactionBalance[str];
}

const open = ref<boolean>(false);

const showModal = () => {
  open.value = true;
};
const close = () => {
  open.value = false
}


</script>

<template>
  <div class="status">
    <div v-if="info" class="status__block">
      <div class="status__item">
        <div class="abs_befor abs_bg_greey" />
        <h1>{{ t("balance") }}</h1>
        <p class="mb-1 color_greey">
          {{
            showTransactionBalance.balance
              ? formatMoney(info.balance)
              : "*** ***"
          }}
          <span>{{ t("sum") }}</span>
        </p>
        <a href="#" @click="handleHideAmount('balance')">{{
          t("hideAmount")
        }}</a>
      </div>
      <div class="status__item">
        <div class="abs_befor abs_bg_yellow" />
        <h1>{{ t("remainBalance") }}</h1>
        <p class="mb-1 color_yellow">
          {{
            showTransactionBalance.available
              ? formatMoney(info.available)
              : "*** ***"
          }}<span>{{ t("sum") }}</span>
        </p>
        <a href="#" @click="handleHideAmount('available')">{{
          t("hideAmount")
        }}</a>
      </div>
      <div class="status__item">
        <div class="abs_befor abs_bg_red" />
        <h1>{{ t("blockedBalance") }}</h1>
        <p class="mb-1 color_red">
          {{
            showTransactionBalance.blocked
              ? formatMoney(info.blocked)
              : "*** ***"
          }}<span>{{ t("sum") }}</span>
        </p>
        <a href="#" @click="handleHideAmount('blocked')">{{
          t("hideAmount")
        }}</a>
      </div>
      <div class="status__item">
        <div class="abs_befor abs_bg_black" />
        <h1>{{ t("cost") }}</h1>
        <p class="mb-1 color_black">
          {{
            showTransactionBalance.outlay
              ? formatMoney(info.outlay)
              : "*** ***"
          }}<span>{{ t("sum") }}</span>
        </p>
        <a href="#" @click="handleHideAmount('outlay')">{{
          t("hideAmount")
        }}</a>
      </div>
        <a-button
          type="primary"
          class="flex justify-center flex-col items-center gap-2"
          style="height: 100%"
          @click="showModal"
        >
          <EmptyWallet />
          {{ t("replenishmentBalance") }}
        </a-button>
    </div>
  </div>
  <a-modal v-model:visible="open"  >
    <template #footer>
      <a-button style="background: #9EABBE; color: #FFFFFF" @click="close">Cancel</a-button>
    </template>
    <div class="mt-8 mb-3 flex justify-center">
        <Info/>
    </div>
    <VText style="color: #48545D;font-size: 24px; font-weight: 500" class="text-center mb-4">{{$t("OperatorRequisitesFor")}}</VText>
    <ACard style="background: #F9FBFE; border: 1px solid #DFE2E9">
        <div class="flex gap-2">
            <div class="flex items-end flex-col">
              <v-text style="font-size: 18px">Operator: </v-text>
              <v-text style="font-size: 18px">INN:</v-text>
              <v-text style="font-size: 18px">MFO:</v-text>
              <v-text style="font-size: 18px">Bank:</v-text>
              <v-text style="font-size: 18px">H/r: </v-text>
            </div>
            <div>
              <v-text style="color: #48545D; font-weight: 500;font-size: 18px">"DT ECOSYSTEM" MCHJ</v-text>
              <v-text style="color: #48545D; font-weight: 500;font-size: 18px">302922171</v-text>
              <v-text style="color: #48545D; font-weight: 500;font-size: 18px">00440</v-text>
              <v-text style="color: #48545D; font-weight: 500;font-size: 18px">“O’zsanoatqurilishbank"</v-text>
              <v-text style="color: #48545D; font-weight: 500;font-size: 18px">20208000300302392002</v-text>
            </div>
        </div>

    </ACard>
  </a-modal>
</template>

<style lang="scss" scoped>
@import "./BalanceStatusForm";
</style>
