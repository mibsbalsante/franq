<script setup>
import { useFinanceStore } from "@str/finance"

const { stats } = useFinanceStore()

const formatCurrency = (val, format = "BRL") => {
  const formats = {
    BRL: () => `R$ ${val.toFixed(2).replace(/\./, ",")}`,
    USD: () => `$${val.toFixed(2)}`,
  }
  return val ? formats[format]() : ""
}
</script>

<template>
  <main>
    <div>
      <h2>Currencies</h2>

      <div v-for="currency in stats?.currencies" :key="currency.name">
        <template v-if="currency.name">
          <h3>{{ currency.name }}</h3>
          <p>{{ formatCurrency(currency.buy) }}</p>
          <p class="variation">{{ currency.variation }}%</p>
        </template>
      </div>
    </div>

    <div>
      <h2>Stocks</h2>

      <div v-for="stock in stats?.stocks" :key="stock.name">
        <template v-if="stock.name">
          <h3>{{ stock.name }}</h3>
          <p>{{ stock.location }}</p>
          <p class="variation">{{ stock.variation }}%</p>
        </template>
      </div>
    </div>

    <div>
      <h2>Bitcoin</h2>

      <div v-for="crypto in stats?.bitcoin" :key="crypto.name">
        <template v-if="crypto.name">
          <h3>{{ crypto.name }}</h3>
          <p>
            {{ formatCurrency(crypto.last, crypto.format?.[0]) }}
          </p>
          <p class="variation">{{ crypto.variation }}%</p>
        </template>
      </div>
    </div>
  </main>
</template>
