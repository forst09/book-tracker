<script setup>
import ButtonBig from '@/components/ui/buttons/ButtonBig.vue'
import { supabase } from '@/lib/supabaseClient'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import IconPlus from '@/assets/icons/plus.svg'
import LoaderDefault from '@/components/common/loaders/LoaderDefault.vue'
import BookCard from '@/components/cards/BookCard.vue'
import BookStatus from '@/components/aside/BookStatus.vue'
import { useAuthStore } from '@/stores/authStore'
import FilterInput from '@/components/form/FilterInput.vue'

const router = useRouter()

const authStore = useAuthStore()

const books = ref([])
const isBooksLoading = ref(true)
const booksError = ref(null)
const booksInitialCount = ref(0)

const getBooks = async () => {
  try {
    isBooksLoading.value = true
    booksError.value = null

    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('userId', authStore.currentUser.id)
    books.value.push(...data)
    booksInitialCount.value = books.value.length

    booksError.value = error
  } catch (error) {
    console.error(error)
  } finally {
    isBooksLoading.value = false
  }
}

getBooks()

// filter books
const searchValue = ref('')
const filterBooks = async () => {}

const filterRadios = computed(() => {
  return [
    {
      id: 'progress-all',
      value: 'all',
      text: 'Все',
      counter: authStore.currentUser.libraryCount,
    },
    {
      id: 'progress-reading',
      value: 'reading',
      text: 'Читаю',
      counter: authStore.currentUser.readingBooks,
    },
    {
      id: 'progress-finished',
      value: 'finished',
      text: 'Прочитано',
      counter: authStore.currentUser.finishedBooks,
    },
    {
      id: 'progress-planned',
      value: 'planned',
      text: 'Запланировано',
      counter: authStore.currentUser.plannedBooks,
    },
  ]
})

const selectedProgress = ref(filterRadios.value[0].value)

const filterParams = computed(() => {
  return {
    search: searchValue.value,
    progress: selectedProgress.value,
  }
})

const isFiltersEmpty = computed(() => {
  return searchValue.value === '' && selectedProgress.value === 'all'
})

const isFilterLoad = ref(false)
const filterError = ref(null)

const applyFilter = async () => {
  isFilterLoad.value = true
  try {
    let query = supabase
      .from('books')
      .select('*')
      .or(`bookName.ilike.%${searchValue.value}%,bookAuthor.ilike.%${searchValue.value}%`)
      .eq('userId', authStore.currentUser.id)

    if (selectedProgress.value === 'reading') {
      query = query.gt('bookProgress', 0).lt('bookProgress', 100)
    } else if (selectedProgress.value === 'finished') {
      query = query.eq('bookProgress', 100)
    } else if (selectedProgress.value === 'planned') {
      query = query.eq('bookProgress', 0)
    }

    const { data, error } = await query

    if (!error) {
      books.value = data
    }
    filterError.value = error
  } catch (error) {
    filterError.value = error
  } finally {
    isFilterLoad.value = false
  }
}

watch(filterParams, () => {
  applyFilter()
})
</script>

<template>
  <section :class="$style.library">
    <div :class="['container', $style.library__container]">
      <div :class="$style.library__content">
        <form
          v-if="booksInitialCount > 0"
          :class="$style.library__filters"
          @submit.prevent="filterBooks"
        >
          <input
            v-model="searchValue"
            type="search"
            :class="$style.library__search"
            placeholder="Поиск книги или автора"
          />
          <div :class="$style.library__radio">
            <FilterInput
              v-for="radio in filterRadios"
              v-model="selectedProgress"
              :key="radio.value"
              :counter-value="radio.counter"
              :input-id="radio.id"
              :input-name="'progress'"
              :input-value="radio.value"
              :label-text="radio.text"
              :is-checked="selectedProgress === radio.value"
            />
          </div>
        </form>
        <div v-if="books.length > 0" :class="$style.library__wrap">
          <ul :class="$style.library__result">
            <li v-for="book in books" :key="book.id">
              <BookCard
                :book-author="book.bookAuthor"
                :book-genre="book.bookGenre"
                :book-name="book.bookName"
                :book-progress="book.bookProgress"
                :book-rating="book.bookRating"
                :book-url="`${$router.resolve({ name: 'library' }).path}/${book.id}`"
                :img-url="book.bookCover"
                :class="$style.library__card"
              />
            </li>
          </ul>
        </div>
        <div
          v-else-if="books.length === 0 && !isBooksLoading && !isFilterLoad"
          :class="$style.library__empty"
        >
          <h3 :class="$style['library__empty-title']">Книги не найдены</h3>
          <ButtonBig
            v-if="isFiltersEmpty"
            :btn-text="'Добавить книгу'"
            :btn-type="'fill'"
            :btn-url="router.resolve({ name: 'add-book' }).href"
            :icon-component="IconPlus"
          />
          <span v-else>Попробуйте выбрать другие параметры фильтра</span>
        </div>

        <BookStatus
          :planned-counter="authStore.currentUser.plannedBooks"
          :read-counter="authStore.currentUser.finishedBooks"
          :reading-counter="authStore.currentUser.readingBooks"
          :class="$style.library__counter"
        />
        <Transition name="opacity">
          <LoaderDefault v-if="isBooksLoading || isFilterLoad" />
        </Transition>
      </div>
    </div>
  </section>
</template>

<style lang="scss" module>
.library {
  &__empty {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 40px;
    padding: 32px 0;
    max-width: 700px;
  }

  &__empty-title {
    font-size: 32px;
    color: var(--black);
  }

  &__content {
    position: relative;
    min-height: 464px;
  }

  &__result {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    padding: 0;
    list-style-type: none;
  }

  &__card {
    height: 100%;
  }

  &__counter {
    margin-top: 32px;
    padding: 16px;
    border-radius: 14px;
    background: linear-gradient(
      90deg,
      var(--color-grey-98, #f8fafc) 0%,
      var(--color-grey-96, #f1f5f9) 100%
    );
    border-top: unset;
  }

  &__search {
    padding: 16px 41px;
    width: 100%;
    font-family: var(--font-family-Font-1);
    font-size: 14px;
    line-height: normal;
    color: var(--black);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(4px);
    border: 1px solid var(--white2);
    outline: none;
    transition: border-color 0.3s ease;

    @include hover {
      border-color: var(--black);
    }

    &:focus {
      border-color: var(--black);
    }
  }

  &__filters {
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  &__radio {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }
}

@include laptop {
  .library {
    &__result {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

@include tablet-s {
  .library {
    &__result {
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
    }

    &__radio {
      gap: 4px 8px;
    }

    &__filters {
      gap: 16px;
    }
  }
}

@include mobile-s {
  .library {
    &__result {
      grid-template-columns: 1fr;
    }
  }
}
</style>
