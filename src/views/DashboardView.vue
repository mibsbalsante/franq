<script setup>
import { RouterView } from "vue-router"

import { useFinanceStore } from "@str/finance"
import { formatCurrency } from "@utl/format"
import CurrencyCard from "@cmp/CurrencyCard.vue"
import StockCard from "@cmp/StockCard.vue"

const { stats } = useFinanceStore()
</script>

<template>
  <main class="page">
    <div class="category" v-if="stats?.stocks">
      <h2 class="category__title">Stocks</h2>

      <template v-for="(stock, id) in stats?.stocks" :key="stock.name">
        <StockCard v-if="stock.name" v-bind="stock" :id="id" type="stocks" />
      </template>
    </div>

    <div class="category" v-if="stats?.currencies">
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

    <div class="category" v-if="stats?.bitcoin">
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

  <RouterView />
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
  justify-content: space-evenly;
  gap: 36px 24px;

  @include container;

  &__title {
    font-size: 2.2rem;
    margin: 0;
    width: 100%;
  }
}
</style>
