<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { RouterView, useRouter } from "vue-router"

import { useAuthActions } from "@/stores/auth"
import { INTERVAL_AS_MILISECONDS } from "@utl/time"

const router = useRouter()
const { checkIfLoggedIn, logout } = useAuthActions()

const validationIntervalId = ref(null)

onMounted(() => {
  validationIntervalId.value = setInterval(() => {
    if (!checkIfLoggedIn()) {
      logout()
      router.push({ name: "login" })
    }
  }, INTERVAL_AS_MILISECONDS)
})
onUnmounted(() => {
  clearInterval(validationIntervalId.value)
  validationIntervalId.value = null
})
</script>

<template>
  <header>header</header>

  <RouterView />
</template>

<style scoped lang="scss"></style>
