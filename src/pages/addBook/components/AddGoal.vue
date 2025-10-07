<script setup>
import CardHead from '@/components/cards/CardHead.vue'
import IconGoal from '@/assets/icons/goal.svg'
import FormInput from '@/components/form/FormInput.vue'
import ButtonDefault from '@/components/ui/buttons/ButtonDefault.vue'
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import LoaderDefault from '@/components/common/loaders/LoaderDefault.vue'
import ProgressbarDefault from '@/components/ui/progressbar/ProgressbarDefault.vue'

const authStore = useAuthStore()

const inputGoal = ref(authStore.currentUser.booksGoal)
const goalError = ref(null)

const finishedBooks = computed(() => {
  return authStore.currentUser.finishedBooks
})

const goal = computed(() => {
  return authStore.currentUser.booksGoal
})

const isGoalLoading = ref(false)

const setNewGoal = async () => {
  isGoalLoading.value = true
  goalError.value = null

  const { error } = await authStore.updateUserGoal(+inputGoal.value)
  goalError.value = error

  isGoalLoading.value = false
}

const remainingBooks = computed(() => {
  const remainder = goal.value - finishedBooks.value
  return remainder < 0 ? 0 : remainder
})
</script>

<template>
  <div :class="$style.goal">
    <CardHead
      :card-color="'violet'"
      :card-descr="'Установите годовую цель по количеству книг'"
      :card-title="'Цель чтения'"
      :icon-component="IconGoal"
    />
    <form @submit.prevent="setNewGoal">
      <FormInput
        :input-id="'update-goal'"
        :input-label="`Книг к прочтению в ${new Date().getFullYear()} году`"
        :error-text="goalError"
        :input-placeholder="'Количество книг'"
        :input-type="'number'"
        :input-range="[1, undefined]"
        v-model="inputGoal"
      >
        <template #btn>
          <ButtonDefault
            :is-icon-include="false"
            :btn-text="'Обновить'"
            type="submit"
            :disabled="inputGoal === goal"
          />
        </template>
      </FormInput>
    </form>
    <div :class="$style.goal__progress">
      <span :class="$style.goal__count">{{ finishedBooks }} / {{ goal }}</span>
      <span>Книг прочитано за год</span>
      <ProgressbarDefault
        :progress-value="finishedBooks"
        :progress-total="goal"
        :progress-color="'violet'"
        :class="$style.goal__progressbar"
      />
      <span :class="$style.goal__hint">Осталось прочитать {{ remainingBooks }} книг!</span>
    </div>
    <Transition name="opacity">
      <LoaderDefault v-if="isGoalLoading" />
    </Transition>
  </div>
</template>

<style lang="scss" module>
.goal {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 32px 32px;
  border-radius: 14px;
  background: linear-gradient(
    90deg,
    var(--color-grey-98, #f8fafc) 0%,
    var(--color-grey-97, #eff6ff) 100%
  );
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  &__progress {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    text-align: center;
    padding: 16px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.6);
    font-size: 14px;
    line-height: 1.44;
  }

  &__count {
    font-size: 23px;
    line-height: 1.42;
    font-weight: 600;
    color: var(--color-violet-52);
  }

  &__hint {
    font-size: 12px;
    line-height: 1.33;
    color: var(--gray3);
  }

  &__progressbar {
    --progress-height: 8px;
  }
}

@include tablet-s {
  .goal {
    padding: 16px;
  }
}
</style>
