<script setup>
import BookProgress from '@/components/labels/BookProgress.vue'
import { computed } from 'vue'

const props = defineProps({
  bookCover: {
    type: String,
    required: true,
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
    default: null,
  },
  bookProgress: {
    type: Number,
    required: true,
  },
})

const bookCover = computed(() => {
  return props.bookCover || '/images/book-plug.png'
})
</script>

<template>
  <div :class="$style.intro">
    <div :class="['img', 'img--cover', $style.intro__cover]">
      <img :src="bookCover" alt="Обложка книги" class="img__img" />
    </div>
    <div :class="$style.intro__info">
      <h2 :class="$style.intro__title">{{ props.bookName }}</h2>
      <span :class="$style.intro__author">{{ props.bookAuthor }}</span>
      <span v-if="props.bookGenre" :class="$style.intro__genre">{{ props.bookGenre }}</span>
      <BookProgress
        v-if="props.bookProgress"
        :progress-count="props.bookProgress"
        :class="$style.intro__progress"
      />
    </div>
  </div>
</template>

<style lang="scss" module>
.intro {
  display: flex;
  align-items: flex-start;
  gap: 32px;
  padding: 32px;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    var(--color-white-solid, #fff) 0%,
    var(--color-grey-98, #f8fafc) 100%
  );
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);

  &__cover {
    aspect-ratio: 224 / 320;
    border-radius: 14px;
    overflow: hidden;
    max-width: 224px;
    width: 100%;
    background-color: var(--gray6);
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  &__title {
    font-size: 34px;
    line-height: 1.16;
    font-weight: 600;
    color: var(--black);
  }

  &__author {
    font-size: 19px;
    line-height: 1.51;
  }

  &__genre {
    display: inline-block;
    padding: 3px 9px;
    font-size: 14px;
    line-height: 1.45;
    font-weight: 500;
    color: var(--black3);
    background-color: var(--gray7);
    border-radius: 8px;
  }
}

@include tablet-s {
  .intro {
    padding: 16px;
    gap: 16px;

    &__cover {
      max-width: 100px;
    }

    &__title {
      font-size: 20px;
    }

    &__author {
      font-size: 16px;
    }
  }
}
</style>
