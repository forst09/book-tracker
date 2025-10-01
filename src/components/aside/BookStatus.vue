<script setup>
const props = defineProps({
  readCounter: {
    type: Number,
    required: true,
  },
  readingCounter: {
    type: Number,
    required: true,
  },
  plannedCounter: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div :class="$style.counter">
    <div :class="[$style.counter__item, $style[`counter__item--read`]]">
      <span :class="$style.counter__value">{{ props.readCounter }}</span>
      <span :class="$style.counter__descr">Прочитано</span>
    </div>
    <div :class="[$style.counter__item, $style[`counter__item--reading`]]">
      <span :class="$style.counter__value">{{ props.readingCounter }}</span>
      <span :class="$style.counter__descr">Читаю</span>
    </div>
    <div :class="[$style.counter__item, $style[`counter__item--planned`]]">
      <span :class="$style.counter__value">{{ props.plannedCounter }}</span>
      <span :class="$style.counter__descr">К чтению</span>
    </div>
  </div>
</template>

<style lang="scss" module>
.counter {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
  padding: 17px 16px 16px;
  border-top: 1px solid var(--stroke);

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    &--read {
      --counter-value-color: var(--green);
    }

    &--reading {
      --counter-value-color: var(--color-azure-54);
    }

    &--planned {
      --counter-value-color: var(--orange);
    }
  }

  &__value {
    font-size: 18px;
    line-height: 1.56;
    font-weight: 600;
    color: var(--counter-value-color);
  }

  &__descr {
    font-size: 12px;
    line-height: 1.33;
  }
}
</style>
