<script setup>
import { nextTick, onMounted, ref } from 'vue'
import FormInput from './FormInput.vue'
import { supabase } from '@/lib/supabaseClient'
import SearchButton from '../ui/buttons/SearchButton.vue'
import UploadIcon from '@/assets/icons/upload.svg'
import ButtonReset from '../ui/buttons/ButtonReset.vue'

const props = defineProps({
  isFileExist: {
    type: Boolean,
    required: true,
  },
})

const emits = defineEmits(['fileChange', 'updateFileError'])

const dropZone = ref(null)
const fileInput = ref(null)
const preview = ref(null)
const btnReset = ref(null)
const filePreview = ref(null)

const resetFile = () => {
  preview.value.textContent = ''
  filePreview.value = null
  emits('fileChange', null)
}

const createPreview = async (file) => {
  await nextTick()
  console.log('file', file)
  filePreview.value = typeof file === 'string' ? file : URL.createObjectURL(file)
}

const displayImages = (type, file) => {
  if (type === 'file') {
    console.log('hehe', file)
    if (file.type.startsWith('image/')) {
      emits('fileChange', file)
      createPreview(file)
    } else {
      emits('updateFileError', 'Загружать можно только картинки')
    }
  } else {
    emits('fileChange', file)
    createPreview(file)
  }
}

const dropHandler = (ev) => {
  console.log('drop handler', ev)
  ev.preventDefault()
  const files = [...ev.dataTransfer.items].map((item) => item.getAsFile()).filter((file) => file)
  console.log('file', files)
  console.log([...ev.dataTransfer.items])
  console.log(files[0])
  console.log('drop handler', ev)
  emits('fileChange', files[0])
  createPreview(files[0])
}

const handleFileDrop = (e) => {
  // console.log('dragover', e)
  const fileItems = [...e.dataTransfer.items].filter((item) => item.kind === 'file')
  if (fileItems.length > 0) {
    e.preventDefault()
    if (fileItems.some((item) => item.type.startsWith('image/'))) {
      e.dataTransfer.dropEffect = 'copy'
    } else {
      e.dataTransfer.dropEffect = 'none'
    }
  }
}

onMounted(() => {
  window.addEventListener('drop', (e) => {
    // console.log('drop', e)
    if ([...e.dataTransfer.items].some((item) => item.kind === 'file')) {
      e.preventDefault()
    }
  })

  window.addEventListener('dragover', (e) => {
    // console.log('window dragover', e)
    const fileItems = [...e.dataTransfer.items].filter((item) => item.kind === 'file')
    if (fileItems.length > 0) {
      e.preventDefault()
      if (!dropZone.value?.contains(e.target)) {
        e.dataTransfer.dropEffect = 'none'
      }
    }
  })
})

// text input upload
const fileLink = ref('')
const fileLinkError = ref(null)

const checkUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const getImgFromUrl = async () => {
  // check is url valid
  const isUrlValid = checkUrl(fileLink.value)

  if (isUrlValid) {
    fileLinkError.value = null
    emits('fileChange', fileLink.value)
    createPreview(fileLink.value)
  } else {
    fileLinkError.value = 'Некорректный url'
  }
}
</script>

<template>
  <div :class="$style.upload">
    <div v-if="!props.isFileExist" :class="$style.upload__actions">
      <FormInput
        v-model="fileLink"
        :error-text="fileLinkError"
        :input-id="'search-img'"
        :input-label="'Обложка книги'"
        :input-placeholder="'Вставьте ссылку на изображение'"
        :input-type="'search'"
      >
        <template #btn>
          <SearchButton type="button" @click="getImgFromUrl" />
        </template>
      </FormInput>
      <label
        ref="dropZone"
        :class="$style.upload__zone"
        @drop="dropHandler"
        @dragover="handleFileDrop"
      >
        <span :class="$style.upload__icon">
          <UploadIcon :class="$style.upload__svg" />
        </span>
        <span :class="$style.upload__title">Загрузить обложку книги</span>
        <span>Перетащите файл или нажмите для выбора • Макс. 5МБ</span>

        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="sr-only"
          @change="displayImages('file', $event.target.files[0])"
        />
      </label>
      <span :class="$style.upload__hint"
        >Загрузите файл изображения, вставьте ссылку или используйте кнопку "Найти"
      </span>
    </div>
    <div v-else :class="$style.upload__result">
      <span>Обложка книги</span>
      <div ref="preview" :class="['img', 'img--cover', $style.upload__preview]">
        <img :src="filePreview" :alt="'Обложка книги'" class="img__img" />
      </div>
      <ButtonReset ref="btnReset" @click="resetFile" :btn-text="'Удалить обложку'" />
    </div>
  </div>
</template>

<style lang="scss" module>
.upload {
  &__actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 26px;
    border: 2px dashed var(--stroke2);
    color: var(--gray3);
    font-size: 12px;
    line-height: 1.35;
    border-radius: 10px;
    cursor: pointer;
  }

  &__icon {
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: var(--cyan-light);
  }

  &__svg {
    width: 24px;
    aspect-ratio: 1;
    stroke: var(--color-cyan-29);
    stroke-width: 2;
  }

  &__title {
    font-size: 14px;
    line-height: 1.45;
    color: var(--gray2);
    font-weight: 500;
  }

  &__hint {
    font-size: 12px;
    line-height: 1.33;
    color: var(--gray3);
  }

  &__result {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__preview {
    width: 96px;
    aspect-ratio: 96 / 144;
    border-radius: 10px;
    overflow: hidden;
  }
}
</style>
