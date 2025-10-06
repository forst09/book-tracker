<script setup>
import EditIcon from '@/assets/icons/edit.svg'

const props = defineProps({
  titleText: {
    type: String,
    required: true,
  },
  isEditBtnInclude: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const emits = defineEmits(['editClick'])
</script>

<template>
  <div :class="$style.card">
    <div :class="$style.card__head">
      <h3 :class="$style.card__title">{{ props.titleText }}</h3>
      <button
        v-if="props.isEditBtnInclude"
        type="button"
        aria-label="Редактировать"
        :class="$style.card__btn"
      >
        <EditIcon :class="$style['card__btn-svg']" @click="emits('editClick')" />
      </button>
    </div>
    <slot />
  </div>
</template>

<style lang="scss" module>
.card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  font-size: 14px;
  line-height: 1.47;

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  &__title {
    font-size: 19px;
    line-height: 1.48;
    color: var(--black);
    font-weight: 500;
  }

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 32px;
    background-color: transparent;
    border: unset;
    cursor: pointer;
    transition: opacity 0.3s ease;

    @include hover {
      opacity: 0.7;
    }
  }

  &__btn-svg {
    width: 16px;
    aspect-ratio: 1;
    stroke: var(--black2);
    stroke-width: 1.3;
  }
}
</style>
