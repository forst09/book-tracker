<script setup>
const props = defineProps({
  btnText: {
    type: String,
    required: true,
  },
  btnColor: {
    type: String,
    required: false,
    default: 'black',
    validator: (value) => ['black', 'white'].includes(value),
  },
})
</script>

<template>
  <button :class="[$style.btn, $style[`btn--${props.btnColor}`]]">{{ props.btnText }}</button>
</template>

<style lang="scss" module>
.btn {
  padding: 6px 12px 7px;
  font-family: var(--font-family-Font-1);
  font-size: 14px;
  line-height: 1.45;
  color: var(--btn-small-color);
  background-color: var(--btn-small-bg);
  border-radius: 8px;
  border: unset;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &--black {
    --btn-small-bg: var(--black3);
    --btn-small-color: var(--white);
  }

  &--white {
    --btn-small-bg: var(--white);
    --btn-small-color: var(--black3);
  }

  @include hover {
    opacity: 0.7;
  }
}
</style>
