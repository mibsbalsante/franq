<script setup>
import { useFinanceStore } from "@str/finance"

const { selectedChart } = useFinanceStore()
</script>

<template>
  <div class="overflow">
    <div class="modal">
      <h2>History</h2>

      <ul>
        <li v-for="moment in selectedChart" :key="moment.name">
          {{ moment.variation }} - {{ moment.date }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.overflow {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  display: flex;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: "";
    background-color: var(--color-grey-2);
    opacity: 0.5;
  }
}

.modal {
  position: relative;
  margin: auto;
  background-color: var(--color-background-2);
  max-width: 1200px;
  width: calc(100% - 56px);
}
</style>
