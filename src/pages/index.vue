<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useOrganizationStore } from '../stores/organization'
const organization = useOrganizationStore()

const router = useRouter()
onMounted(() => {
  if (!organization.organization.organization.id)
    router.replace({ name: 'user-balance' })
  else
    router.replace({ name: 'balance' })
})
</script>

<template>
  <h3>Welcome to cabinet</h3>
</template>
