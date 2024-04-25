<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useOrganizationStore } from '../stores/organization'
const organization = useOrganizationStore()

const router = useRouter()
onMounted(() => {
  if (!organization.organization.organization)
    router.replace({ name: 'user-analytic' })
  else
    router.replace({ name: 'analytic' })
})
</script>

<template>
</template>
