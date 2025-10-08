<script setup>
import AddBook from './components/AddBookForm.vue'
import AddGoal from './components/AddGoal.vue'
</script>

<template>
  <div :class="$style.library">
    <div :class="['container', $style.library__container]">
      <AddBook :class="$style.library__item" />
      <hr :class="$style.library__divider" />
      <AddGoal :class="$style.library__item" />
    </div>
  </div>
</template>

<style lang="scss" module>
.library {
  &__container {
    --container-max-width: 672px;

    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  &__divider {
    color: black;
    opacity: 0.1;
  }
}

@include tablet-s {
  .library {
    &__container {
      gap: 16px;
    }
  }
}
</style>
