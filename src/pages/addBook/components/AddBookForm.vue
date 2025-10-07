<script setup lang="ts">
import CardHead from '@/components/cards/CardHead.vue'
import BookIcon from '@/assets/icons/logo.svg'
import FormInput from '@/components/form/FormInput.vue'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import FormSelect from '@/components/form/FormSelect.vue'
import { supabase } from '@/lib/supabaseClient'
import FileUpload from '@/components/form/FileUpload.vue'
import ButtonIcon from '@/components/ui/buttons/ButtonIcon.vue'
import SaveIcon from '@/assets/icons/save.svg'
import { useAuthStore } from '@/stores/authStore'
import LoaderDefault from '@/components/common/loaders/LoaderDefault.vue'
import router from '@/router'

const bookName = ref('')
const bookNameError = ref(null)

const author = ref('')
const authorError = ref(null)

const genres = ref([
  {
    name: 'Выберите жанр',
  },
])

const bookGenre = ref('')

onMounted(async () => {
  await getGenres()
})

const getGenres = async () => {
  console.log('loading genres')
  const { data: hehe, error } = await supabase.from('genres').select('*').order('name')

  console.log(hehe, error)

  console.log('finish genres')
  genres.value.push(...hehe)
}

// cover load
const coverUrl = ref(null)
const coverFile = ref(null)

const isFileExist = computed(() => {
  return coverUrl.value !== null || coverFile.value !== null
})

const updateCover = (cover) => {
  if (cover) {
    if (typeof cover === 'string') {
      coverUrl.value = cover
      coverFile.value = null
    } else {
      coverFile.value = cover
      coverUrl.value = null
    }
  } else {
    // clear cover
    coverUrl.value = cover
    coverFile.value = cover
  }
}

const fileError = ref(null)
const updateFileError = (value) => {
  fileError.value = value
}

const authStore = useAuthStore()

const isLoading = ref(false)

const addBook = async () => {
  try {
    fileError.value = null
    isLoading.value = true
    console.log(coverUrl.value, coverFile.value)
    const cover = coverUrl.value || coverFile.value
    let coverPath = null

    // load cover
    if (cover) {
      const { data, error } = await supabase.storage
        .from('book-covers')
        .upload(`cover_${authStore.currentUser.id}_${Date.now()}`, cover)

      if (!error) {
        coverPath = coverFile.value
          ? `https://pqeoepwrzpljyfkgbpqc.supabase.co/storage/v1/object/public/${data.fullPath}`
          : coverUrl.value
      } else {
        fileError.value = error
      }

      console.log(data)
      console.log(error)
    }

    // load book

    const { data, error } = await supabase
      .from('books')
      .insert([
        {
          bookName: bookName.value,
          bookAuthor: author.value,
          bookGenre: bookGenre.value,
          userId: authStore.currentUser.id,
          bookCover: coverPath,
        },
      ])
      .select()
    if (!error) {
      await authStore.getBooksCount()
      router.push({ name: 'library' })
    }

    if (error) {
      fileError.value = error
    }

    console.log(data)
    console.log(error)
  } catch (error) {
    fileError.value = error
    console.error('error from add book', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form :class="$style.form" @submit.prevent="addBook">
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
    <FileUpload
      :is-file-exist="isFileExist"
      :file-error="fileError"
      @file-change="updateCover"
      @update-file-error="updateFileError"
    />
    <ButtonIcon
      :btn-text="'Добавить книгу'"
      :btn-icon="SaveIcon"
      :btn-color="'cyan'"
      type="submit"
      :class="$style.form__submit"
    />
    <Transition name="opacity">
      <LoaderDefault v-if="isLoading" />
    </Transition>
  </form>
</template>

<style lang="scss" module>
.form {
  position: relative;
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
  overflow: hidden;

  &__submit {
    opacity: 0.5;

    @include hover {
      opacity: 1;
    }
  }
}
</style>
