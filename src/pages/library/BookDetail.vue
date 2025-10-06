<script setup>
import { useRoute } from 'vue-router'
import { reactive, ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import LoaderDefault from '@/components/common/loaders/LoaderDefault.vue'
import BookIntro from './components/BookIntro.vue'
import BookRating from './components/BookRating.vue'
import BookNotes from './components/BookNotes.vue'
import BookProgress from './components/BookProgress.vue'

const route = useRoute()
const isBooksLoading = ref(true)
const book = reactive({})

const getBook = async () => {
  try {
    isBooksLoading.value = true

    const { data, error } = await supabase.from('books').select('*').eq('id', route.params.id)

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
</script>

<template>
  <section :class="$style.book">
    <div :class="['container', $style.book__container]">
      <Transition name="opacity">
        <LoaderDefault v-if="isBooksLoading" />
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
            <BookProgress :initial-progress="book.bookProgress" />
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
