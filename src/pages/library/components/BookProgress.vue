<script setup>
import ButtonSmall from '@/components/ui/buttons/ButtonSmall.vue'
import BookCommonCard from './BookCommonCard.vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/lib/supabaseClient'
import LoaderDefault from '@/components/common/loaders/LoaderDefault.vue'
import ProgressbarDefault from '@/components/ui/progressbar/ProgressbarDefault.vue'
import FormInput from '@/components/form/FormInput.vue'
import { useAuthStore } from '@/stores/authStore'

const props = defineProps({
  initialProgress: {
    type: Number,
    required: true,
  },
})

const emits = defineEmits(['setProgress'])

const authStore = useAuthStore()

const route = useRoute()
const id = +route.params.id

const progressMode = ref('read')

const changeProgressMode = (value) => {
  progressMode.value = value
}

const isProgressLoading = ref(false)
const progressError = ref(null)
const progressInput = ref(props.initialProgress || 0)

const updateProgress = async () => {
  try {
    isProgressLoading.value = true
    progressError.value = null

    const { data, error } = await supabase
      .from('books')
      .update({ bookProgress: progressInput.value })
      .eq('id', id)
      .select()

    progressError.value = error

    if (!error) {
      emits('setProgress', progressInput.value)
      changeProgressMode('read')

      await authStore.getCurrentBooks()

      await authStore.getBooksCount()
    }
  } catch (error) {
    progressError.value = error
  } finally {
    isProgressLoading.value = false
  }
}
</script>

<template>
  <BookCommonCard
    :is-edit-btn-include="true"
    :title-text="'Прогресс по чтению'"
    :class="$style.progress"
    @edit-click="changeProgressMode('edit')"
  >
    <Transition name="opacity" mode="out-in">
      <div v-if="progressMode === 'read'" :class="$style.progress__default">
        <div :class="$style.progress__descr">
          <span>Прогресс</span>
          <span>{{ props.initialProgress }}%</span>
        </div>
        <ProgressbarDefault
          :progress-total="100"
          :progress-value="props.initialProgress"
          :class="$style.progress__progressbar"
        />
      </div>
      <div v-else>
        <form @submit.prevent="updateProgress">
          <FormInput
            v-model="progressInput"
            :input-placeholder="'Введите прогресс'"
            :error-text="progressError"
            :input-id="'progress'"
            :input-range="[0, 100]"
            :input-type="'number'"
            :is-input-required="true"
          />
          <div :class="$style.progress__actions">
            <ButtonSmall :btn-text="'Сохранить'" type="submit" />
            <ButtonSmall
              :btn-text="'Отмена'"
              :btn-color="'white'"
              type="button"
              @click="changeProgressMode('read')"
            />
          </div>
        </form>
      </div>
    </Transition>
    <Transition name="opacity">
      <LoaderDefault v-if="isProgressLoading" />
    </Transition>
  </BookCommonCard>
</template>

<style lang="scss" module>
.progress {
  overflow: hidden;

  &__descr {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    font-size: 14px;
    line-height: 1.46;
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

  &__default {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__progressbar {
    --progress-height: 12px;
  }
}
</style>
