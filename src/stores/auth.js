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

  function _updateLoginData() {
    expirationDate.value = _setExpirationDate()
    saveToStorage(
      "auth",
      { user: username.value, expirationDate: expirationDate.value },
      true
    )
  }

  function login({ username: user, password }) {
    if (user && password) username.value = user

    _updateLoginData()
  }

  function logout() {
    username.value = null
    deleteFromStorage("finance")
    deleteFromStorage("auth", true)
  }

  function checkIfLoggedIn() {
    const isLoginValid = !!username.value && _checkIfValidExpirationDate()

    if (isLoginValid) _updateLoginData()
    return isLoginValid
  }

  return { username, login, logout, checkIfLoggedIn }
})

export const useAuthStore = () => storeToRefs(authStore())
export const useAuthActions = () => authStore()
