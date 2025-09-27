<script setup>
const props = defineProps({
  listArr: {
    type: Array,
    required: true,
  },
  dotColor: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <ul :class="[$style.list, $style[`list--color-${props.dotColor}`]]">
    <li v-for="(item, index) in props.listArr" :key="index" :class="$style.list__item">
      <p>{{ item }}</p>
    </li>
  </ul>
</template>

<style lang="scss" module>
.list {
  display: flex;
  flex-direction: column;
  gap: var(--item-spacing-s);
  padding: 0;

  &--color-violet {
    --list-dot-color: var(--violet);
  }

  &__item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 8px 16px;
    font-size: 15px;
    line-height: 1.57;
    color: var(--gray2);

    &::before {
      content: '';
      margin-top: 8px;
      width: 8px;
      aspect-ratio: 1;
      border-radius: 50%;
      background-color: var(--list-dot-color);
    }
  }
}
</style>
