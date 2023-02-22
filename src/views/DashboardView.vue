<script setup>
import { useFinanceStore } from "@str/finance"
import CurrencyCard from "@cmp/CurrencyCard.vue"

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
  <main class="page">
    <div class="category">
      <h2 class="category__title">Currencies</h2>

      <template
        v-for="(currency, id) in stats?.currencies"
        :key="currency.name"
      >
        <CurrencyCard
          v-if="currency.name"
          v-bind="currency"
          :id="id"
          type="currencies"
          :value="formatCurrency(currency.buy)"
        />
      </template>
    </div>

    <div class="category">
      <h2 class="category__title">Stocks</h2>

      <div v-for="stock in stats?.stocks" :key="stock.name">
        <template v-if="stock.name">
          <h3>{{ stock.name }}</h3>
          <p>{{ stock.location }}</p>
          <p class="variation">{{ stock.variation }}%</p>
        </template>
      </div>
    </div>

    <div class="category">
      <h2 class="category__title">Bitcoin</h2>

      <template v-for="(crypto, id) in stats?.bitcoin" :key="crypto.name">
        <CurrencyCard
          v-if="crypto.name"
          v-bind="crypto"
          :id="id"
          type="bitcoin"
          :value="formatCurrency(crypto.last, crypto.format?.[0])"
        />
      </template>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.category {
  display: flex;
  flex-wrap: wrap;
  gap: 32px 24px;

  @include container;

  &__title {
    margin: 0;
    width: 100%;
  }
}
</style>
