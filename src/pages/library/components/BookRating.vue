<script setup>
import { computed, ref, watch } from 'vue'
import BookCommonCard from './BookCommonCard.vue'
import StarIcon from '@/assets/icons/star.svg'
import { supabase } from '@/lib/supabaseClient'
import { useRoute } from 'vue-router'
import LoaderDefault from '@/components/common/loaders/LoaderDefault.vue'

const props = defineProps({
  bookRating: {
    type: Number,
    required: false,
    default: null,
  },
})

const route = useRoute()
const id = +route.params.id
console.log(id)

const rating = ref(props.bookRating || 0)

const descr = computed(() => {
  if (rating.value === 0) {
    return 'Вы еще не оценивали книгу'
  }
  return `Вы оценили книгу на ${rating.value} из 5`
})

const isRatingLoading = ref(false)
const ratingError = ref(null)

const setRating = async () => {
  try {
    isRatingLoading.value = true
    ratingError.value = null

    const { data, error } = await supabase
      .from('books')
      .update({ bookRating: rating.value })
      .eq('id', id)
      .select()

    ratingError.value = error

    console.log(data)
    console.log(error)
  } catch (error) {
    ratingError.value = error
    console.error(error)
  } finally {
    isRatingLoading.value = false
  }
}
</script>

<template>
  <BookCommonCard :title-text="'Рейтинг'" :class="$style.rating">
    <div :class="$style.rating__stars">
      <div v-for="(item, index) in 5" :key="index" :class="$style.rating__star">
        <input
          v-model="rating"
          type="radio"
          name="rating"
          :id="`rating-${index + 1}`"
          :value="item"
          class="sr-only"
          @change="setRating"
        />
        <label
          :for="`rating-${index + 1}`"
          :class="[$style['rating__star-label'], item <= rating && $style.active]"
        >
          <StarIcon :class="$style['rating__star-icon']" />
        </label>
        <span v-if="ratingError" :class="$style.rating__error">{{ ratingError }}</span>
      </div>
    </div>
    <span>{{ descr }}</span>

    <Transition name="opacity">
      <LoaderDefault v-if="isRatingLoading" />
    </Transition>
  </BookCommonCard>
</template>

<style lang="scss" module>
.rating {
  position: relative;
  overflow: hidden;

  &__stars {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__star-label {
    cursor: pointer;

    @include hover {
      .rating__star-icon {
        stroke: var(--yellow);
      }
    }

    &.active {
      .rating__star-icon {
        stroke: var(--yellow);
        fill: var(--yellow);
      }
    }
  }

  &__star-icon {
    width: 24px;
    aspect-ratio: 1;
    stroke: var(--stroke2);
    stroke-width: 2;
    fill: transparent;
    transition:
      stroke 0.3s ease,
      fill 0.3s ease;
  }

  &__error {
    font-size: 12px;
    color: red;
  }
}
</style>
