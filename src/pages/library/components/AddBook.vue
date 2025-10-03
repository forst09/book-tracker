<script setup lang="ts">
import CardHead from '@/components/cards/CardHead.vue'
import BookIcon from '@/assets/icons/logo.svg'
import FormInput from '@/components/form/FormInput.vue'
import { ref, watch } from 'vue'
import FormSelect from '@/components/form/FormSelect.vue'
import { supabase } from '@/lib/supabaseClient'

const bookName = ref('')
const bookNameError = ref(null)

const author = ref('')
const authorError = ref(null)

const genres = ref([
  {
    id: 0,
    name: 'Выберите жанр',
  },
])

const bookGenre = ref('')

const getGenres = async () => {
  const { data: hehe, error } = await supabase.from('genres').select('*').order('name')

  console.log(hehe, error)
  genres.value.push(...hehe)
}

getGenres()
</script>

<template>
  <form :class="$style.form">
    <CardHead
      :card-title="'Добавить новую книгу'"
      :card-descr="'Пополните свою библиотеку'"
      :icon-component="BookIcon"
    />
    <FormInput
      v-model="bookName"
      :error-text="bookNameError"
      :input-label="'Название книги *'"
      :input-placeholder="'Введите название книги'"
      :input-id="'book-name'"
      :is-input-required="true"
    />
    <FormInput
      v-model="author"
      :error-text="authorError"
      :input-label="'Автор *'"
      :input-placeholder="'Введите имя автора'"
      :input-id="'author'"
      :is-input-required="true"
    />
    <FormSelect
      v-model="bookGenre"
      :label-text="'Жанр'"
      :select-id="'genre'"
      :select-options="genres"
    />
  </form>
</template>

<style lang="scss" module>
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
}
</style>
