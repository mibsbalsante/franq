<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

import { useAuthActions } from "@str/auth"

const router = useRouter()
const { login } = useAuthActions()
const username = ref(null)
const password = ref(null)

const handleSubmit = () => {
  login({ username: username.value, password: password.value })
  setTimeout(() => router.push({ name: "dashboard" }), 100)
}
</script>

<template>
  <div class="login">
    <form class="login__form" @submit.prevent="handleSubmit">
      <label class="login__label" for="login-input-user">Username</label>
      <input
        id="login-input-user"
        class="login__input"
        v-model="username"
        type="text"
        name="username"
        required
      />
      <label class="login__label" for="login-input-pass">Password</label>
      <input
        id="#login-input-pass"
        class="login__input"
        v-model="password"
        type="password"
        name="password"
        required
      />
      <button
        class="login__submit"
        type="submit"
        :disabled="!username || !password"
      >
        Log In
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
