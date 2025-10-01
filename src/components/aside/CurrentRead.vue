<script setup>
import ProgressbarDefault from '../ui/progressbar/ProgressbarDefault.vue'

const props = defineProps({
  bookName: {
    type: String,
    required: true,
  },
  bookAuthor: {
    type: String,
    required: true,
  },
  progressValue: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div :class="$style.current">
    <span :class="$style.current__title">Сейчас читаю</span>
    <div :class="$style.current__item">
      <span :class="$style.current__name">{{ props.bookName }}</span>
      <span :class="$style.current__author">{{ props.bookAuthor }}</span>
      <div :class="$style.current__progress">
        <span>Прогресс</span>
        <span>{{ props.progressValue }}%</span>
      </div>
      <ProgressbarDefault
        :progress-value="props.progressValue"
        :progress-total="100"
        :class="$style.current__progressbar"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
.current {
  &__title {
    margin-bottom: 12px;
    display: inline-block;
    font-size: 16px;
    line-height: 1.54;
    font-weight: 500;
    color: var(--black);
  }

  &__item {
    padding: 12px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow:
      0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px -1px rgba(0, 0, 0, 0.1);
    border-radius: 14px;
  }

  &__progress {
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    font-size: 12px;
    line-height: 1.33;
  }

  &__progressbar {
    margin-top: 8px;
  }

  &__name,
  &__author {
    display: block;
  }

  &__author {
    font-size: 12px;
    line-height: 1.33;
  }

  &__name {
    font-size: 14px;
    line-height: 1.44;
    font-weight: 500;
    color: var(--black);
  }
}
</style>
