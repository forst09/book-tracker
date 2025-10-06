<script setup>
import ButtonSmall from '@/components/ui/buttons/ButtonSmall.vue'
import BookCommonCard from './BookCommonCard.vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'
import LoaderDefault from '@/components/common/loaders/LoaderDefault.vue'

const props = defineProps({
  initialNote: {
    type: String,
    required: false,
    default: null,
  },
})

const route = useRoute()
const id = +route.params.id

const note = ref(props.initialNote || 'Вы еще не оставляли заметок')
const noteMode = ref('read')

const changeNoteMode = (value) => {
  noteMode.value = value
}

const isNoteLoading = ref(false)
const noteError = ref(null)
const noteTextarea = ref(props.initialNote || '')

const updateNote = async () => {
  try {
    isNoteLoading.value = true
    noteError.value = null

    const { data, error } = await supabase
      .from('books')
      .update({ bookNotes: noteTextarea.value })
      .eq('id', id)
      .select()

    noteError.value = error

    if (!error) {
      note.value = noteTextarea.value ? noteTextarea.value : 'Вы еще не оставляли заметок'
    }

    console.log(data)
    console.log(error)
  } catch (error) {
    noteError.value = error
    console.error(error)
  } finally {
    isNoteLoading.value = false
  }
}
</script>

<template>
  <BookCommonCard
    :is-edit-btn-include="true"
    :title-text="'Заметки'"
    :class="$style.note"
    @edit-click="changeNoteMode('edit')"
  >
    <Transition name="opacity" mode="out-in">
      <div v-if="noteMode === 'read'" :class="$style.note__text">
        <p>{{ note }}</p>
      </div>
      <div v-else>
        <textarea
          v-model="noteTextarea"
          placeholder="Введите заметку"
          :class="$style.note__textarea"
          @change="console.log('hehe')"
        ></textarea>
        <span v-if="noteError" :class="$style.note__error">{{ noteError }}</span>
        <div :class="$style.note__actions">
          <ButtonSmall :btn-text="'Сохранить'" type="button" @click="updateNote" />
          <ButtonSmall
            :btn-text="'Отмена'"
            :btn-color="'white'"
            type="button"
            @click="changeNoteMode('read')"
          />
        </div>
      </div>
    </Transition>
    <Transition name="opacity">
      <LoaderDefault v-if="isNoteLoading" />
    </Transition>
  </BookCommonCard>
</template>

<style lang="scss" module>
.note {
  overflow: hidden;

  &__text {
    font-size: 16px;
    line-height: 1.68;
    color: var(--gray2);
  }

  &__textarea {
    padding: 9px 13px;
    border-radius: 8px;
    resize: vertical;
    max-width: 100%;
    width: 100%;
    border: unset;
    background-color: var(--azure-light);
    min-height: 100px;
    font-family: var(--font-family-Font-1);
    font-size: 14px;
    line-height: 1.44;
    color: var(--black2);
  }

  &__actions {
    margin-top: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__error {
    font-size: 12px;
    color: red;
  }
}
</style>
