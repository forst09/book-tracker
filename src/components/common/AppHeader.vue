<script setup>
const props = defineProps({
  titleText: {
    type: String,
    required: true,
  },
})

const emits = defineEmits(['burgerClick'])
</script>

<template>
  <header :class="$style.header">
    <h1 :class="$style.header__title">{{ props.titleText }}</h1>
    <button
      :class="$style.header__burger"
      type="button"
      aria-label="Открыть меню"
      @click="emits('burgerClick', true)"
    >
      ☰
    </button>
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

  &__burger {
    display: none;
  }
}

@include tablet {
  .header {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1;

    &__burger {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      aspect-ratio: 1;
      background-color: var(--white);
      border: 1px solid var(--stroke);
      border-radius: 50%;
      flex-shrink: 0;
      color: var(--black);
      padding: 0;
    }
  }
}
</style>
