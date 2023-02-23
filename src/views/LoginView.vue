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

<style lang="scss" scoped>
.login {
  @include container;

  margin: auto;
  max-width: 600px;

  &__form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    background-color: var(--color-background-2);
    padding: 32px 24px;
    box-shadow: var(--shadow);
  }

  &__label {
    font-weight: 600;
    font-size: var(--font-small);
    margin-bottom: -16px;
  }

  &__input,
  &__submit {
    padding: var(--spacing-form-elements);
  }

  &__input {
    border: 0 none;
    border-bottom: 1px solid var(--color-text);
  }

  &__submit {
    margin: 16px auto 0;
    background-color: var(--color-primary);
    color: var(--color-background);
    border: 0 none;
    font-weight: 600;
    border-radius: var(--border-rounded);
    min-width: 120px;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;

    &[disabled] {
      opacity: 0.6;
    }
  }
}
</style>
