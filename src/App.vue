<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { RouterView, useRouter } from "vue-router"

import { useUserActions } from "@/stores/auth"

// 5 min interval
const VALIDATION_INTERVAL = 1000 * 60 * 5

const router = useRouter()
const { checkIfLoggedIn, logout } = useUserActions()

const validationIntervalId = ref(null)

onMounted(() => {
  validationIntervalId.value = setInterval(() => {
    if (!checkIfLoggedIn()) {
      logout()
      router.push({ name: "login" })
    }
  }, VALIDATION_INTERVAL)
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
