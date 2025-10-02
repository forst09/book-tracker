<script setup>
const props = defineProps({
  iconComponent: {
    type: Object,
    required: true,
  },
  btnText: {
    type: String,
    required: true,
  },
  btnUrl: {
    type: String,
    required: true,
  },
  btnType: {
    type: String,
    required: false,
    default: 'default',
    validator: (value) => ['default', 'fill'].includes(value),
  },
})
</script>

<template>
  <RouterLink :to="props.btnUrl" :class="[$style.btn, $style[`btn--${props.btnType}`]]">
    <component :is="props.iconComponent" :class="$style.btn__icon" />
    <span>{{ props.btnText }}</span>
  </RouterLink>
</template>

<style lang="scss" module>
.btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 22px;
  text-decoration: unset;
  font-size: 17px;
  line-height: 1.63;
  font-weight: 500;
  color: var(--button-big-color);
  background: var(--button-big-bg);
  opacity: 1;
  box-shadow: var(--button-bg-shadow);
  border-radius: 8px;
  transition: opacity 0.3s ease;

  @include hover {
    opacity: 0.8;
  }

  &--fill {
    --button-big-color: var(--white);
    --button-big-stroke: var(--white);
    --button-big-bg: linear-gradient(
      90deg,
      var(--color-cyan-37, #00bba7) 0%,
      var(--color-cyan-29, #009689) 100%
    );
    --button-bg-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  }

  &--default {
    --button-big-color: var(--gray);
    --button-big-stroke: var(--gray);
    --button-big-bg: rgba(255, 255, 255, 0.8);
    --button-bg-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);

    border: 1px solid var(--stroke);
  }

  &__icon {
    width: 16px;
    aspect-ratio: 1;
    stroke: var(--button-big-stroke);
    stroke-width: 1.7;
  }
}
</style>
