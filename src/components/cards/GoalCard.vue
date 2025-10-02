<script setup>
import IconStar from '@/assets/icons/star.svg'
import ProgressbarDefault from '../ui/progressbar/ProgressbarDefault.vue'
import { computed } from 'vue'
import { useDeclension } from '@/composables/useDeclension'

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

const progressPercent = (props.finishedBooks / props.booksTotal) * 100

const remainingBooks = props.booksTotal - props.finishedBooks

const readWordForms = ['прочитана', 'прочитаны', 'прочитано']
const bookWordForms = ['книга', 'книги', 'книг']

const remainingBooksFormat = `${remainingBooks}  ${useDeclension(props.finishedBooks, bookWordForms)}`

const finishedBooksFormat = `${props.finishedBooks} ${useDeclension(props.finishedBooks, bookWordForms)} ${useDeclension(props.finishedBooks, readWordForms)}`
</script>

<template>
  <div :class="$style.goal">
    <div :class="$style.goal__head">
      <span :class="$style.goal__title">Цель на {{ new Date().getFullYear() }} год</span>
      <div :class="$style.goal__counter">
        <IconStar :class="$style['goal__counter-icon']" />
        <span>{{ props.finishedBooks }}/{{ props.booksTotal }}</span>
      </div>
    </div>
    <div :class="$style.goal__progress">
      <ProgressbarDefault
        :progress-total="props.booksTotal"
        :progress-value="props.finishedBooks"
        :progress-color="'cyan'"
        :class="$style.goal__progressbar"
      />
      <div :class="$style['goal__progress-descr']">
        <span>{{ finishedBooksFormat }}</span>
        <span>{{ progressPercent }}% от цели</span>
      </div>
    </div>
    <span :class="$style.goal__remainig">Для достижения цели еще {{ remainingBooksFormat }}!</span>
  </div>
</template>

<style lang="scss" module>
.goal {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
  background-color: var(--color-grey-97);
  border-radius: 14px;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  line-height: 1.47;

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }

  &__counter {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    line-height: 1.49;
    color: var(--yellow);
  }

  &__counter-icon {
    width: 16px;
    aspect-ratio: 1;
    stroke: var(--yellow);
    fill: var(--yellow);
    stroke-width: 1.3;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    line-height: 1.54;
    color: var(--black);
  }

  &__progressbar {
    --progress-height: 12px;
  }

  &__progress-descr {
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }
}
</style>
