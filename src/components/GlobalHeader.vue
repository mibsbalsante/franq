<script setup>
import { useRouter, RouterLink } from "vue-router"

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
  <header class="header">
    <nav class="header__container">
      <RouterLink to="/" class="header__link-home">
        <h1>Stock Market Stats</h1>
      </RouterLink>

      <template v-if="username">
        <p class="header__username">
          <span>{{ username }}</span>
        </p>
        <button class="header__logout" @click="handleLogout">Logout</button>
      </template>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: var(--color-primary);
  color: var(--color-white);
  box-shadow: var(--shadow);
  z-index: 1;

  &__container {
    @include container;

    min-height: var(--size-header);
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px 16px;

    @media (max-width: 480px) {
      padding-top: 8px;
      padding-bottom: 8px;
    }
  }

  &__link-home {
    margin-right: auto;
    text-decoration: none;
    color: var(--color-white);
    border-radius: var(--border-rounded);

    &:focus-visible {
      outline: 2px solid var(--color-background);
      outline-offset: 8px;
    }

    h1 {
      margin: 0;
      font-size: 1.5rem;
    }

    @media (max-width: 480px) {
      width: 100%;
      text-align: center;

      h1 {
        font-size: 1.2rem;
      }
    }
  }

  &__username {
    margin: 0;
    font-weight: 600;
  }

  &__logout {
    background-color: var(--color-text);
    color: var(--color-background);
    border: 0 none;
    border-radius: var(--border-rounded);
    padding: var(--spacing-form-elements);
    font-weight: 600;
    min-width: 120px;
    transition: all 0.3s ease-in-out;

    &:focus-visible {
      outline: 2px solid var(--color-background);
      outline-offset: 4px;
    }

    &:hover {
      background-color: var(--color-background);
      color: var(--color-text);
    }
  }

  &__username,
  &__logout {
    @media (max-width: 480px) {
      font-size: var(--font-small);
    }
  }
}
</style>
