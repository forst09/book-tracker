<script setup>
import IconGoal from '@/assets/icons/arrow-goal.svg'
import ProgressbarDefault from '../ui/progressbar/ProgressbarDefault.vue'
import { computed } from 'vue'

const props = defineProps({
  finishedBooks: {
    type: Number,
    required: true,
  },
  booksTotal: {
    type: Number,
    required: true,
  },
})

const progressPercent = computed(() => {
  return `${(props.finishedBooks / props.booksTotal) * 100}% выполнено`
})
</script>

<template>
  <div :class="$style.goal">
    <div :class="$style.goal__head">
      <IconGoal :class="$style.goal__icon" />
      <span :class="$style.goal__title">Цель {{ new Date().getFullYear() }}</span>
    </div>
    <div :class="$style.goal__content">
      <div :class="$style.goal__progress">
        <span>Прогресс</span>
        <span :class="$style.goal__counter">{{ props.finishedBooks }}/{{ props.booksTotal }}</span>
      </div>
      <ProgressbarDefault
        :progress-total="props.booksTotal"
        :progress-value="props.finishedBooks"
        :progress-color="'cyan'"
        :class="$style.goal__progressbar"
      />
      <span :class="$style.goal__percent"> {{ progressPercent }} </span>
    </div>
  </div>
</template>

<style lang="scss" module>
.goal {
  padding: 16px;
  background-color: var(--color-grey-97);
  border-radius: 14px;

  &__head {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__icon {
    width: 16px;
    aspect-ratio: 1;
    stroke: var(--color-cyan-29);
    stroke-width: 1.3;
  }

  &__title {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.55;
    color: var(--black);
  }

  &__progress {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    font-size: 14px;
    line-height: 1.43;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__counter {
    font-size: 13px;
    line-height: 1.49;
    font-weight: 500;
    color: var(--black);
  }

  &__progressbar {
    --progress-height: 8px;
  }

  &__percent {
    font-size: 12px;
    line-height: 1.33;
  }
}
</style>
