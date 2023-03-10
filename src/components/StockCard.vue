<script setup>
import { computed } from "vue"
import { RouterLink } from "vue-router"

import IconAngleUp from "@fa/angle-up.svg"
import IconAngleDown from "@fa/angle-down.svg"

const props = defineProps({
  id: String,
  type: String,
  name: String,
  location: String,
  variation: Number,
})

const Icon = props.variation > 0 ? IconAngleUp : IconAngleDown

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
    <p class="card__location">{{ props.location }}</p>
    <p class="card__variation"><Icon /> {{ props.variation }}%</p>
  </RouterLink>
</template>

<style lang="scss" scoped>
.card {
  --local-border-color: var(--color-background-2);

  position: relative;
  display: inline-grid;
  grid-template-areas:
    "variation"
    "title"
    "location";
  grid-gap: 12px;
  max-width: 200px;
  width: 100%;
  text-align: center;
  text-decoration: none;
  padding: 24px 18px;
  background-color: var(--color-background-2);
  border-radius: 12px;
  border: 3px solid var(--local-border-color);
  box-shadow: var(--shadow);

  &:focus-visible {
    --local-border-color: var(--color-primary);
    outline: 0;
  }

  &--positive {
    --local-color-status: var(--color-positive);
  }

  &--negative {
    --local-color-status: var(--color-negative);
  }

  @media (max-width: 768px) {
    max-width: 46%;
  }

  @media (max-width: 480px) {
    max-width: 100%;
  }

  h3,
  p {
    margin: 0;
  }

  &__title {
    grid-area: title;
    font-size: 1rem;
  }

  &__location {
    grid-area: location;
    font-weight: var(--font-small);
  }

  &__variation {
    grid-area: variation;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    font-size: 2rem;
    font-weight: 600;
    color: var(--local-color-status);

    svg {
      margin-top: 6px;
      fill: var(--local-color-status);
    }
  }
}
</style>
