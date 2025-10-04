<script setup>
const props = defineProps({
  btnText: {
    type: String,
    required: false,
    default: 'Очистить ✕',
  },
})
</script>

<template>
  <button :class="$style.btn">{{ props.btnText }}</button>
</template>

<style lang="scss" module>
.btn {
  font-family: var(--font-family-Font-1);
  font-size: 14px;
  padding: 8px 12px;
  border: 1px solid var(--stroke);
  background-color: transparent;
  cursor: pointer;
  border-radius: 10px;
  width: fit-content;
  transition: border-color 0.3s ease;

  @include hover {
    border-color: var(--black);
  }
}
</style>
