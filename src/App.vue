<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { RouterView, useRouter } from "vue-router"

import GlobalHeader from "@cmp/GlobalHeader.vue"
import { useAuthActions } from "@/stores/auth"
import { INTERVAL_AS_MILISECONDS } from "@utl/time"

const router = useRouter()
const { checkIfLoggedIn, logout } = useAuthActions()

const validationIntervalId = ref(null)

onMounted(() => {
  validationIntervalId.value = setInterval(() => {
    if (!checkIfLoggedIn()) {
      logout()
      setTimeout(() => router.push({ name: "login" }), 100)
    }
  }, INTERVAL_AS_MILISECONDS)
})
onUnmounted(() => {
  clearInterval(validationIntervalId.value)
  validationIntervalId.value = null
})
</script>

<template>
  <GlobalHeader />

  <RouterView />
</template>
