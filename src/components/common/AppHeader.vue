<script setup>
const props = defineProps({
  titleText: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <header :class="$style.header">
    <h1 :class="$style.header__title">{{ props.titleText }}</h1>
  </header>
</template>

<style lang="scss" module>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  padding: 16px 24px 17px;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  border-bottom: 1px solid var(--stroke);

  &__title {
    font-size: 23px;
    line-height: 1.42;
    font-weight: 600;
    color: var(--black);
  }
}
</style>
