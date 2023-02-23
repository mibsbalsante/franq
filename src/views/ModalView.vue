<script setup>
import { computed } from "vue"
import { useRouter } from "vue-router"

import VariationChart from "@cmp/VariationChart.vue"
import { useFinanceStore } from "@str/finance"

import IconAngleUp from "@fa/angle-up.svg"
import IconAngleDown from "@fa/angle-down.svg"

const router = useRouter()
const { selected, selectedChart } = useFinanceStore()

const selectedName = computed(() => selectedChart.value?.[0]?.name)

const lastVariation = computed(
  () => selectedChart.value?.[selectedChart.value.length - 1]?.variation
)

const Icon = computed(() =>
  lastVariation.value > 0 ? IconAngleUp : IconAngleDown
)

const handleClose = () => {
  setTimeout(() => router.push({ name: "dashboard" }), 100)
}
</script>

<template>
  <div class="overflow" @click.self="handleClose">
    <div class="modal">
      <h2 class="modal__title">
        <span class="modal__title-text">History - {{ selectedName }}</span>

        <span
          :class="{
            modal__icon: true,
            'modal__icon--positive': lastVariation > 0,
            'modal__icon--negative': lastVariation <= 0,
          }"
        >
          <Icon />
          {{ lastVariation }}%
        </span>
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
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 0;
    font-size: 2rem;
    text-transform: capitalize;

    &-text {
      margin-right: auto;
    }
  }

  &__icon {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background-color: var(--local-color-status);
    border-radius: var(--border-rounded);
    padding: 4px 16px;
    font-size: 1rem;
    font-weight: 600;

    &--positive {
      --local-color-status: var(--color-positive);
    }

    &--negative {
      --local-color-status: var(--color-negative);
    }
  }
}
</style>
