// https://hgbrasil.com/status/finance/

import { ref } from "vue"
import { defineStore, storeToRefs } from "pinia"

import { saveToStorage, getFromStorage } from "@utl/storage"

const apiURL = import.meta.env.VITE_API_URL

const financeStore = defineStore("finance", () => {
  const transactions = ref(getFromStorage())
  const isLoading = ref(false)

  function getResults() {
    const cachedData = getFromStorage("finance")

    if (cachedData?.date) {
      transactions.value = cachedData.results
      return
    }

    isLoading.value = true

    fetch(apiURL, { method: "GET", mode: "cors" })
      .then(data => {
        if (data.status < 400) return data.json()

        return data.text().then(text => {
          throw new Error(text)
        })
      })
      .then(data => {
        transactions.value = data.results
        saveToStorage("finance", { ...data, date: new Date() })
      })
      .catch(({ message }) => console.error(message))
      .finally(() => (isLoading.value = false))
  }

  return { transactions, isLoading, getResults }
})

export const useFinanceStore = () => storeToRefs(financeStore())
export const useFinanceActions = () => financeStore()
