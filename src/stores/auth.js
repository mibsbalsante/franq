import { ref } from "vue"
import { defineStore, storeToRefs } from "pinia"

import { saveToStorage, getFromStorage, deleteFromStorage } from "@utl/storage"

const authStore = defineStore("auth", () => {
  const cachedData = getFromStorage("auth", true)

  const username = ref(cachedData?.user || null)
  const expirationDate = ref(
    cachedData?.expirationDate ? new Date(cachedData?.expirationDate) : null
  )

  function _setExpirationDate() {
    // two hours in the future
    const date = new Date()
    date.setHours(date.getHours() + 2)
    return date
  }

  function _checkIfValidExpirationDate() {
    if (!expirationDate.value) return false

    const now = new Date()
    return now.getTime() < expirationDate.value.getTime()
  }

  function login({ username: user, password }) {
    if (user && password) username.value = user
    saveToStorage("auth", { user, expirationDate: _setExpirationDate() }, true)
  }

  function logout() {
    username.value = null
    deleteFromStorage("finance")
    deleteFromStorage("auth", true)
  }

  function checkIfLoggedIn() {
    return !!username.value || _checkIfValidExpirationDate()
  }

  return { username, login, logout, checkIfLoggedIn }
})

export const useAuthStore = () => storeToRefs(authStore())
export const useUserActions = () => authStore()
