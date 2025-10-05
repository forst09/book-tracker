<script setup>
import BookProgress from '../labels/BookProgress.vue'
import StarIcon from '@/assets/icons/star.svg'
import ProgressbarDefault from '../ui/progressbar/ProgressbarDefault.vue'
import { computed } from 'vue'

const props = defineProps({
  imgUrl: {
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
  bookGenre: {
    type: String,
    required: false,
    default: '',
  },
  bookProgress: {
    type: Number,
    required: true,
  },
  bookRating: {
    type: Number,
    required: true,
  },
  bookUrl: {
    type: String,
    required: true,
  },
})

const bookCover = computed(() => {
  return props.imgUrl || '/images/book-plug.png'
})
</script>

<template>
  <article :class="$style.book">
    <div :class="['img', 'img--cover', $style.book__img]">
      <img :src="bookCover" alt="Обложка книги" class="img__img" />
    </div>
    <div :class="$style.book__content">
      <div :class="$style.book__main">
        <h3 :class="$style.book__title">{{ props.bookName }}</h3>
        <span :class="$style.book__author">{{ props.bookAuthor }}</span>
        <span v-if="props.bookGenre" :class="$style.book__genre">{{ props.bookGenre }}</span>
      </div>
      <div :class="$style.book__stat">
        <BookProgress :progress-count="props.bookProgress" />
        <div v-if="props.bookRating" :class="$style.book__rating">
          <StarIcon :class="$style['book__rating-icon']" />
          <span>{{ props.bookRating }}</span>
        </div>
      </div>
      <div v-if="props.bookProgress > 0 && props.bookProgress < 100" :class="$style.book__progress">
        <div :class="$style['book__progress-descr']">
          <span>Прогресс</span>
          <span>{{ props.bookProgress }}%</span>
        </div>
        <ProgressbarDefault
          :progress-color="'azure'"
          :progress-total="100"
          :progress-value="props.bookProgress"
          :class="$style.book__progressbar"
        />
      </div>
    </div>
  </article>
</template>

<style lang="scss" module>
.book {
  padding: 24px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  border-radius: 14px;

  &__img {
    margin-bottom: 16px;
    background-color: var(--gray6);
    border-radius: 10px;
    aspect-ratio: 238 / 224;
    overflow: hidden;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__title {
    font-size: 17px;
    line-height: 1.62;
    color: var(--black);
    font-weight: 500;
  }

  &__main {
    display: flex;
    flex-direction: column;
  }

  &__author {
    font-size: 15px;
    line-height: 1.56;
  }

  &__genre {
    margin-top: 4px;
    font-size: 14px;
    line-height: 1.46;
    color: var(--gray3);
  }
}
</style>
