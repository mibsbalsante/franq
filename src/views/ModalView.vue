<script setup>
import { computed } from "vue"
import { useRouter } from "vue-router"

import VariationChart from "@cmp/VariationChart.vue"
import { useFinanceStore } from "@str/finance"

const router = useRouter()
const { selected, selectedChart } = useFinanceStore()

const selectedName = computed(() => selectedChart.value?.[0]?.name)
const isLastVariationPositive = computed(
  () => selectedChart.value?.[selectedChart.value.length - 1]?.variation >= 0
)

const handleClose = () => {
  setTimeout(() => router.push({ name: "dashboard" }), 100)
}
</script>

<template>
  <div class="overflow" @click.self="handleClose">
    <div class="modal">
      <h2 class="modal__title">
        History - {{ selectedName }}
        <span>{{ isLastVariationPositive }}</span>
      </h2>
      <VariationChart :history="selectedChart" :type="selected.type" />
      <button @click="handleClose" title="Close">x</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.overflow {
  position: fixed;
  padding-top: var(--size-header);
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
  display: flex;
  flex-direction: column;
  gap: 32px;
  background-color: var(--color-background-2);
  max-width: 1440px;
  width: calc(100% - 56px);
  padding: 40px 32px;
  overflow-y: auto;
  max-height: calc(100vh - var(--size-header) - 12px);
  box-shadow: var(--shadow);

  &__title {
    margin: 0;
    font-size: 2rem;
    text-transform: capitalize;
  }
}
</style>
