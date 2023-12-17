<script setup lang="ts">
import {
  HEADER_CABINET,
} from '~/utils/config'
import TheFooter from "~/components/layout/TheFooter.vue";



const menus = { url: HEADER_CABINET, text: 'Kabinet' }

</script>

<template>
  <div class="forbidden-background">
  <DTHeader/>
  <div class="error_file">
<!--    <VText size="100" color="#48545D" weight="600">-->
<!--      403-->
<!--    </VText>-->
    <VText size="22" color="#A2A5B9" class="mb-6">
      <VText size="22" color="#fff" class="mb-6">{{ $t('forbiddenMessage') }}</VText>
    </VText>
    <AButton   :href="menus.url" type="primary" class="btn">
      {{ $t('toHome') }}
    </AButton>
  </div>
    <TheFooter/>
  </div>
</template>

<style >
.py-10{
  padding: 0 !important;
  margin: 0 !important;
}
.forbidden-background{
  background: url("../assets/images/background.png") no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.error_file {
  overflow-y: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.btn {
  display: flex;
  align-items: center;
}
</style>

<route lang="yaml">
meta:
  layout: empty
</route>
