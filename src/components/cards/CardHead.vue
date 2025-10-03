<script setup>
const props = defineProps({
  iconComponent: {
    type: Object,
    required: true,
  },
  cardTitle: {
    type: String,
    required: true,
  },
  cardDescr: {
    type: String,
    required: true,
  },
  cardColor: {
    type: String,
    required: false,
    default: 'cyan',
    validator: (value) => ['cyan', 'violet'].includes(value),
  },
})
</script>

<template>
  <div :class="[$style.head, $style[`head--${props.cardColor}`]]">
    <div :class="$style.head__icon">
      <component :is="props.iconComponent" :class="$style['head__icon-svg']" />
    </div>
    <div :class="$style.head__text">
      <h3 :class="$style.head__title">{{ props.cardTitle }}</h3>
      <span :class="$style.head__descr">{{ props.cardDescr }}</span>
    </div>
  </div>
</template>

<style lang="scss" module>
.head {
  display: flex;
  align-items: center;
  gap: 12px;

  &--cyan {
    --head-icon-stroke: var(--color-cyan-29);
    --head-icon-bg: var(--cyan-light);
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    aspect-ratio: 1;
    border-radius: 10px;
    background-color: var(--head-icon-bg);
  }

  &__icon-svg {
    width: 20px;
    aspect-ratio: 1;
    stroke: var(--head-icon-stroke);
    stroke-width: 2;
  }

  &__title {
    font-size: 19px;
    line-height: 1.46;
    font-weight: 600;
    color: var(--black);
  }

  &__descr {
    font-size: 16px;
    line-height: 1.55;
  }
}
</style>
