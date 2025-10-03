<script setup lang="ts">
import AddBook from './components/AddBook.vue'
</script>

<template>
  <div :class="$style.library">
    <div :class="['container', $style.library__container]">
      <AddBook />
    </div>
  </div>
</template>

<style lang="scss" module>
.library {
  &__container {
    --container-max-width: 672px;
  }
}
</style>
