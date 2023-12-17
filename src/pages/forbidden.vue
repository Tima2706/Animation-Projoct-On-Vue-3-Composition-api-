<script setup lang="ts">
import {
  HEADER_CABINET,
} from '~/utils/config'



const menus = { url: HEADER_CABINET, text: 'Kabinet' }

</script>

<template>
  <DTHeader/>
  <div class="error_file">
<!--    <VText size="100" color="#48545D" weight="600">-->
<!--      403-->
<!--    </VText>-->
    <VText size="22" color="#A2A5B9" class="mb-6">
     У вас нет доступа !
    </VText>
    <AButton   :href="menus.url" type="primary" class="btn">
      На главную
    </AButton>
  </div>
</template>

<style >
.py-10{
  padding-top: 0 !important;
}
.error_file {
  width: 100%;
  height: 100vh;
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
