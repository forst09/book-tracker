<script setup>
import SearchIcon from '@/assets/icons/search.svg'

const props = defineProps({
  isIconInclude: {
    type: Boolean,
    required: false,
    default: true,
  },
  btnText: {
    type: String,
    required: false,
    default: 'Найти',
  },
})
</script>

<template>
  <button :class="$style.btn">
    <SearchIcon v-if="props.isIconInclude" :class="$style.btn__icon" />
    <span>{{ props.btnText }}</span>
  </button>
</template>

<style lang="scss" module>
.btn {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 13px 9px;
  font-family: var(--font-family-Font-1);
  font-size: 14px;
  line-height: 1.43;
  color: var(--black2);
  opacity: 0.5;
  background-color: var(--white);
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:disabled {
    cursor: not-allowed;
  }

  @include hover {
    &:not(:disabled) {
      opacity: 1;
    }
  }

  &__icon {
    width: 16px;
    aspect-ratio: 1;
    stroke: var(--black2);
    stroke-width: 1.3;
  }
}
</style>
