<script setup>
import ButtonBig from '@/components/ui/buttons/ButtonBig.vue'
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import IconPlus from '@/assets/icons/plus.svg'
import LoaderDefault from '@/components/common/loaders/LoaderDefault.vue'
import BookCard from '@/components/cards/BookCard.vue'

const router = useRouter()

const books = ref([])
const isBooksLoading = ref(true)
const booksError = ref(null)

const getBooks = async () => {
  try {
    isBooksLoading.value = true
    booksError.value = null

    const { data, error } = await supabase.from('books').select('*')
    books.value.push(...data)
    console.log('books', data)

    booksError.value = error
  } catch (error) {
    console.error(error)
  } finally {
    isBooksLoading.value = false
  }
}

getBooks()
</script>

<template>
  <section :class="$style.library">
    <div :class="['container', $style.library__container]">
      <div :class="$style.library__content">
        <ul v-if="books.length > 0" :class="$style.library__result">
          <li v-for="book in books" :key="book.id">
            <BookCard
              :book-author="book.bookAuthor"
              :book-genre="book.bookGenre"
              :book-name="book.bookName"
              :book-progress="book.bookProgress"
              :book-rating="book.bookRating"
              :book-url="'/hehe'"
              :img-url="book.bookCover"
              :class="$style.library__card"
            />
          </li>
        </ul>
        <div v-else-if="books.length === 0 && !isBooksLoading" :class="$style.library__empty">
          <h3 :class="$style['library__empty-title']">Книги не найдены</h3>
          <ButtonBig
            :btn-text="'Добавить книгу'"
            :btn-type="'fill'"
            :btn-url="router.resolve({ name: 'add-book' }).href"
            :icon-component="IconPlus"
          />
        </div>
        <Transition name="opacity">
          <LoaderDefault v-if="isBooksLoading" />
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
}
</style>
