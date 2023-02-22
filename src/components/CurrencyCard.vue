<script setup>
import { computed } from "vue"
import { RouterLink } from "vue-router"

const props = defineProps({
  id: String,
  type: String,
  name: String,
  value: Number,
  variation: Number,
})

const uri = computed(() => `/${props.type}/${props.id}`)
</script>

<template>
  <RouterLink
    :to="uri"
    :class="{
      card: true,
      'card--positive': props.variation > 0,
      'card--negative': props.variation <= 0,
    }"
  >
    <h3 class="card__title">{{ props.name }}</h3>
    <p class="card__value">{{ props.value }}</p>
    <p class="card__variation">{{ props.variation }}%</p>
  </RouterLink>
</template>

<style lang="scss" scoped>
.card {
  position: relative;
  display: inline-flex;
  flex-direction: column-reverse;
  max-width: 280px;
  width: 100%;
  text-align: center;
  text-decoration: none;
  padding: 32px 18px 24px;
  background-color: var(--color-background-2);
  border-radius: 12px;
  border: 3px solid var(--local-color-status);

  &--positive {
    --local-color-status: var(--color-positive);
  }

  &--negative {
    --local-color-status: var(--color-negative);
  }

  h3,
  p {
    margin: 0;
  }

  &__title {
    font-weight: 400;
    font-size: 1rem;
  }

  &__value {
    font-size: 2rem;
    font-weight: 600;
    padding-bottom: 12px;
  }

  &__variation {
    position: absolute;
    top: -1rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 8px 12px;
    font-size: var(--font-small);
    font-weight: 600;
    border-radius: 100px;
    background-color: var(--local-color-status);
    color: var(--color-black);
  }
}
</style>
