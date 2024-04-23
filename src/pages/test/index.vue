<script setup lang="ts">
const options = 'layout=hidden&balance=hidden'
</script>

<template>
  <iframe :src="`http://localhost:5173/document-templates/standard-form/preview?${options}`" width="100%" height="100%" />
</template>

<style scoped>

</style>
