// https://hgbrasil.com/status/finance/

import { ref, computed } from "vue"
import { useRoute } from "vue-router"
import { defineStore, storeToRefs } from "pinia"

import { formatFullDate } from "@utl/format"
import { saveToStorage, getFromStorage } from "@utl/storage"
import { INTERVAL_AS_MILISECONDS } from "@utl/time"

const apiURL = import.meta.env.VITE_API_URL

const financeStore = defineStore("finance", () => {
  const _route = useRoute()

  const isLoading = ref(false)

  const history = ref(getFromStorage() || [])
  const stats = computed(() => history.value?.[0]?.results)

  const selected = computed(() => _route.params)
  const selectedChart = computed(() => {
    if (!selected.value?.keyName) return null

    let chart = history.value.map(requests => ({
      ...requests.results[selected.value.type][selected.value.keyName],
      date: new Date(requests.date),
      fullDate: formatFullDate(requests.date),
    }))

    chart = [...chart].sort(
      ({ date }, { date: date2 }) => date.getTime() - date2.getTime()
    )

    return chart
  })

  function fetchResults() {
    isLoading.value = true

    fetch(apiURL, { method: "GET", mode: "cors" })
      .then(data => {
        if (data.status < 400) return data.json()

        return data.text().then(text => {
          throw new Error(text)
        })
      })
      .then(data => {
        const date = new Date()
        history.value = [{ results: data.results, date }, ...history.value]
        saveToStorage("finance", history.value)
      })
      .catch(({ message }) => console.error(message))
      .finally(() => (isLoading.value = false))
  }

  function _isBetweenInterval(lastRequest) {
    if (!lastRequest) return false

    const now = new Date()
    const lastRequestDate = new Date(lastRequest.date)

    return now - lastRequestDate <= INTERVAL_AS_MILISECONDS
  }

  function _getResults() {
    const cachedData = getFromStorage("finance")

    if (cachedData) history.value = cachedData
    if (_isBetweenInterval(cachedData?.[0])) return
    fetchResults()
  }

  _getResults()

  return { isLoading, history, stats, selected, selectedChart, fetchResults }
})

export const useFinanceStore = () => storeToRefs(financeStore())
export const useFinanceActions = () => financeStore()
