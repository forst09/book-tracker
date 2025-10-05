<script setup>
import ReadingIcon from '@/assets/icons/logo.svg'
import FinishedIcon from '@/assets/icons/done.svg'
import PlannedIcon from '@/assets/icons/planned.svg'
import { computed } from 'vue'

const props = defineProps({
  progressCount: {
    type: Number,
    required: true,
  },
})

const labelStatus = computed(() => {
  if (props.progressCount > 0 && props.progressCount < 100) {
    return {
      icon: ReadingIcon,
      text: 'Читаю',
      className: 'reading',
    }
  }
  if (props.progressCount === 100) {
    return {
      icon: FinishedIcon,
      text: 'Прочитано',
      className: 'finished',
    }
  }
  return {
    icon: PlannedIcon,
    text: 'Запланировано',
    className: 'planned',
  }
})
</script>

<template>
  <div :class="[$style.label, $style[`label--${labelStatus.className}`]]">
    <component :is="labelStatus.icon" :class="$style.label__icon" />
    <span :class="$style.label__text">{{ labelStatus.text }}</span>
  </div>
</template>

<style lang="scss" module>
.label {
  display: flex;
  align-items: center;
  gap: 8px;

  &--reading {
    --book-progress-stroke: var(--color-azure-58);
    --book-progress-bg: var(--azure-light);
    --book-progress-color: var(--color-azure);
  }

  &--finished {
    --book-progress-stroke: var(--green2);
    --book-progress-bg: var(--azure-light);
    --book-progress-color: var(--green-dark);
  }
  &--planned {
    --book-progress-stroke: var(--yellow);
    --book-progress-bg: var(--yellow2);
    --book-progress-color: var(--orange2);
  }

  &__icon {
    width: 16px;
    aspect-ratio: 1;
    stroke: var(--book-progress-stroke);
    stroke-width: 1.3;
  }

  &__text {
    padding: 3px 9px;
    background-color: var(--book-progress-bg);
    color: var(--book-progress-color);
    font-size: 12px;
    line-height: 1.33;
    font-weight: 500;
    border-radius: 8px;
  }
}
</style>
