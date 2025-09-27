<script setup></script>

<template>
  <div :class="$style['base-auth']">
    <div :class="[$style['base-auth__item'], $style['base-auth__info']]">
      <slot name="info"></slot>
    </div>
    <div :class="[$style['base-auth__item'], $style['base-auth__form']]">
      <slot name="form"></slot>
    </div>
  </div>
</template>

<style lang="scss" module>
.base-auth {
  margin: auto;
  display: flex;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
  max-width: 1202px;
  width: 100%;
  padding: 16px;
  height: 100%;

  &__item {
    flex-basis: calc(50% - 16px);
  }
}
</style>
