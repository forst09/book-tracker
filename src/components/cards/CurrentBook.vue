<script setup>
import ProgressbarDefault from '../ui/progressbar/ProgressbarDefault.vue'

const props = defineProps({
  imgSrc: {
    type: String,
    required: false,
    default: '/images/book-plug.png',
  },
  bookName: {
    type: String,
    required: true,
  },
  bookAuthor: {
    type: String,
    required: true,
  },
  progressNumber: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div :class="$style.book">
    <div :class="['img', 'img--contain', $style.book__img]">
      <img :src="props.imgSrc" alt="Обложка книги" />
    </div>
    <div :class="$style.book__content">
      <div :class="$style.book__head">
        <span :class="$style.book__name">{{ props.bookName }}</span>
        <span :class="$style.book__author">{{ props.bookAuthor }}</span>
      </div>
      <div :class="$style.book__progress">
        <div :class="$style['book__progress-descr']">
          <span>Прогресс</span>
          <span>{{ props.progressNumber }}%</span>
        </div>
        <ProgressbarDefault
          :progress-total="100"
          :progress-value="props.progressNumber"
          :class="$style.book__progressbar"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.book {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  padding: 24px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);

  &__img {
    width: 96px;
    aspect-ratio: 96 / 144;
    border-radius: 10px;
    overflow: hidden;
    flex-shrink: 0;
    background-color: var(--gray6);
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex-grow: 1;
  }

  &__head {
    display: flex;
    flex-direction: column;
  }

  &__name {
    font-size: 17px;
    line-height: 1.62;
    font-weight: 500;
    color: var(--black);
  }

  &__author {
    font-size: 15px;
    line-height: 1.56;
  }

  &__progress-descr {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    font-size: 12px;
    line-height: 1.33;
  }

  &__progressbar {
    --progress-height: 8px;

    margin-top: 4px;
  }
}
</style>
