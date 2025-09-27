<script setup>
const props = defineProps({
  btnTag: {
    type: String,
    required: false,
    default: 'button',
  },
  btnText: {
    type: String,
    required: true,
  },
  btnColor: {
    type: String,
    required: true,
    validator: (value) => ['violet', 'cyan', 'white', 'cyan-light'].includes(value),
  },
  btnSize: {
    type: String,
    required: false,
    default: 'm',
    validator: (value) => ['m', 'l'].includes(value),
  },
  btnIcon: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <component
    :is="props.btnTag"
    :class="[
      $style['btn-icon'],
      $style[`btn-icon--size-${props.btnSize}`],
      $style[`btn-icon--color-${props.btnColor}`],
    ]"
  >
    <component :is="props.btnIcon" :class="$style['btn-icon__icon']" />
    <span>{{ props.btnText }}</span>
  </component>
</template>

<style lang="scss" module>
.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--btn-icon-padding);
  font-family: var(--font-family-Font-1);
  font-size: var(--btn-icon-fs);
  line-height: var(--btn-icon-lh);
  background: var(--btn-icon-bg);
  color: var(--btn-icon-color);
  border-radius: var(--btn-icon-br);
  border: var(--btn-icon-border);
  gap: var(--btn-icon-gap);
  text-decoration: unset;
  cursor: pointer;
  transition: opacity 0.3s ease;

  @include hover {
    opacity: 0.8;
  }

  &--size-m {
    --btn-icon-padding: 8px 12px 9px;
    --btn-icon-fs: 14px;
    --btn-icon-lh: 1.44;
    --btn-icon-br: 8px;
    --btn-icon-gap: 16px;

    box-shadow:
      0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -4px rgba(0, 0, 0, 0.1);
  }

  &--size-l {
    --btn-icon-padding: 13px;
    --btn-icon-fs: 16px;
    --btn-icon-lh: 1.55;
    --btn-icon-br: 10px;
    --btn-icon-gap: 8px;
  }

  &--color-violet {
    --btn-icon-color: var(--white);
    --btn-icon-bg: linear-gradient(
      90deg,
      var(--color-violet-64, #ad46ff) 0%,
      var(--color-violet-52, #9810fa) 100%
    );
    --btn-icon-border: unset;
  }

  &--color-white {
    --btn-icon-color: var(--gray2);
    --btn-icon-bg: var(--white2);
    --btn-icon-border: 1px solid var(--stroke);
    --btn-icon-stroke: var(--gray2);
  }

  &__icon {
    stroke: var(--btn-icon-stroke, var(--white));
    stroke-width: 1.3px;
  }
}
</style>
