<script setup>
import { computed } from "vue"
import { Line } from "vue-chartjs"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js"

import { formatCurrency } from "@utl/format"

ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
)

const props = defineProps({
  history: Array,
  type: String,
})

const field = computed(() => {
  const fieldByType = {
    stocks: "points",
    currencies: "buy",
    bitcoin: "last",
  }
  return fieldByType[props.type]
})

const chartData = computed(() => ({
  labels: props.history?.map(({ fullDate }) => fullDate),
  datasets: [
    {
      type: "line",
      label: "Variants",
      borderColor: "#687bea",
      tension: 0.2,
      data: props.history?.map(({ variation }) => variation),
    },
  ],
}))

const chartOptions = {
  elements: {
    point: {
      backgroundColor: tooltipItem => {
        return tooltipItem.raw <= 0 ? "#fd5d5d" : "#6bcb77"
      },
      radius: 5,
      hoverRadius: 6,
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: tooltipItem => {
          const selected = props.history?.[tooltipItem.dataIndex]
          const fieldData = ` - ${
            field.value === "points"
              ? selected?.[field.value]
              : formatCurrency(selected?.[field.value], selected?.format?.[0])
          }`

          return `${tooltipItem.formattedValue}%${fieldData}`
        },
        labelColor: tooltipItem => {
          return {
            backgroundColor: tooltipItem.raw <= 0 ? "#fd5d5d" : "#6bcb77",
          }
        },
      },
    },
  },
}
</script>

<template>
  <Line :data="chartData" :options="chartOptions" />
</template>
