<script setup>
import { RouterView } from "vue-router"

import { useFinanceStore, useFinanceActions } from "@str/finance"

// const { finance } = useFinanceStore()
const { getResults } = useFinanceActions()

getResults()
</script>

<template>
  <header>header</header>

  <RouterView />
</template>

<style scoped lang="scss"></style>
