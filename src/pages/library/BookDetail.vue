<script setup>
import { useRoute } from 'vue-router'
import { reactive, ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import LoaderDefault from '@/components/common/loaders/LoaderDefault.vue'
import BookIntro from './components/BookIntro.vue'
import BookRating from './components/BookRating.vue'
import BookNotes from './components/BookNotes.vue'
import BookProgress from './components/BookProgress.vue'
import ButtonIcon from '@/components/ui/buttons/ButtonIcon.vue'
import DoneIcon from '@/assets/icons/done.svg'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const route = useRoute()
const bookId = route.params.id
const isBooksLoading = ref(true)
const book = reactive({})

const getBook = async () => {
  try {
    isBooksLoading.value = true

    const { data, error } = await supabase.from('books').select('*').eq('id', bookId)

    Object.assign(book, data[0])
    console.log(book)
    console.log(error)
  } catch (error) {
    console.log(error)
  } finally {
    isBooksLoading.value = false
  }
}

getBook()

const setProgress = (value) => {
  book.bookProgress = +value
}

const isProgressLoading = ref(false)
const progressError = ref(null)

const updateProgress = async (progressValue) => {
  try {
    isProgressLoading.value = true
    progressError.value = null

    const { data, error } = await supabase
      .from('books')
      .update({ bookProgress: progressValue })
      .eq('id', bookId)
      .select()

    progressError.value = error

    if (!error) {
      book.bookProgress = progressValue

      await authStore.getCurrentBooks()
      await authStore.getBooksCount()
    }

    console.log(data)
    console.log(error)
  } catch (error) {
    progressError.value = error
    console.error(error)
  } finally {
    isProgressLoading.value = false
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
              @click="updateProgress(100)"
            />
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
}
</style>
