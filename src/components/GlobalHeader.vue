<script setup>
import { useRouter } from "vue-router"

import { useAuthStore, useAuthActions } from "@/stores/auth"

const router = useRouter()
const { username } = useAuthStore()
const { logout } = useAuthActions()

const handleLogout = () => {
  logout()
  setTimeout(() => router.push({ name: "login" }), 100)
}
</script>

<template>
  <header>
    <template v-if="username">
      <p>
        <span>{{ username }}</span>
      </p>
      <button @click="handleLogout">Logout</button>
    </template>
  </header>
</template>

<style scoped lang="scss"></style>
