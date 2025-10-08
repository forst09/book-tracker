<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import LoaderDefault from '@/components/common/loaders/LoaderDefault.vue'
import BookIntro from './components/BookIntro.vue'
import BookRating from './components/BookRating.vue'
import BookNotes from './components/BookNotes.vue'
import BookProgress from './components/BookProgress.vue'
import ButtonIcon from '@/components/ui/buttons/ButtonIcon.vue'
import DoneIcon from '@/assets/icons/done.svg'
import { useAuthStore } from '@/stores/authStore'
import router from '@/router'

const authStore = useAuthStore()
const route = useRoute()
const bookId = route.params.id
const isBooksLoading = ref(true)
const book = ref(null)

const getBook = async () => {
  try {
    isBooksLoading.value = true

    const { data, error } = await supabase.from('books').select('*').eq('id', bookId)

    if (data && data.length > 0) {
      book.value = data[0]
    }

    if (error) {
      book.value = null
    }
  } catch (error) {
    console.log(error)
  } finally {
    isBooksLoading.value = false
  }
}

getBook()

const setProgress = (value) => {
  book.value.bookProgress = +value
}

const isProgressLoading = ref(false)
const progressError = ref(null)

const updateProgress = async (progressValue) => {
  try {
    isProgressLoading.value = true
    progressError.value = null

    const { error } = await supabase
      .from('books')
      .update({ bookProgress: progressValue })
      .eq('id', bookId)
      .select()

    progressError.value = error

    if (!error) {
      book.value.bookProgress = progressValue

      await authStore.getCurrentBooks()
      await authStore.getBooksCount()
    }
  } catch (error) {
    progressError.value = error
  } finally {
    isProgressLoading.value = false
  }
}

const deleteError = ref(null)
const deleteBook = async () => {
  isBooksLoading.value = true
  try {
    const { error } = await supabase.from('books').delete().eq('id', bookId)

    if (!error) {
      await authStore.getBooksCount()

      router.push({ name: 'library' })
    }

    deleteError.value = error
  } catch (error) {
    deleteError.value = error
  } finally {
    isBooksLoading.value = false
  }
}
</script>

<template>
  <section :class="$style.book">
    <div :class="['container', $style.book__container]">
      <Transition name="opacity">
        <LoaderDefault v-if="isBooksLoading || isProgressLoading" />
      </Transition>
      <div v-if="!isBooksLoading && book">
        <BookIntro
          :book-author="book.bookAuthor"
          :book-cover="book.bookCover"
          :book-genre="book.bookGenre"
          :book-name="book.bookName"
          :book-progress="book.bookProgress"
        />

        <div :class="$style.book__actions">
          <div :class="$style['book__actions-left']">
            <BookRating :book-rating="book.bookRating" />
            <BookProgress :initial-progress="book.bookProgress" @set-progress="setProgress" />
            <ButtonIcon
              v-if="book.bookProgress < 100"
              :btn-icon="DoneIcon"
              :btn-color="'green'"
              :btn-text="'Прочитано'"
              :class="$style.book__done"
              @click="updateProgress(100)"
            />
            <span v-if="progressError" :class="$style.book__error">{{ progressError }}</span>

            <ButtonIcon btn-color="red" :btn-text="'Удалить'" @click="deleteBook" />
            <span v-if="deleteError" :class="$style.book__error">{{ deleteError }}</span>
          </div>

          <BookNotes :initial-note="book.bookNotes" />
        </div>
      </div>
      <h2 v-if="!isBooksLoading && !book">Книга не найдена</h2>
    </div>
  </section>
</template>

<style lang="scss" module>
.book {
  &__container {
    --container-max-width: 896px;

    position: relative;
    min-height: 300px;
  }

  &__actions {
    margin-top: 32px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
    align-items: flex-start;
  }

  &__actions-left {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  &__error {
    font-size: 12px;
    color: red;
  }
}

@include tablet-s {
  .book {
    &__actions {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    &__actions-left {
      flex-direction: column-reverse;
      gap: 16px;
    }

    &__done {
      order: 1;
    }
  }
}
</style>
