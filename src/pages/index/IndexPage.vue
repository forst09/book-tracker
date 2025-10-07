<script setup lang="ts">
import CurrentBook from '@/components/cards/CurrentBook.vue'
import GoalCard from '@/components/cards/GoalCard.vue'
import ButtonBig from '@/components/ui/buttons/ButtonBig.vue'
import { useRouter } from 'vue-router'
import IconPlus from '@/assets/icons/plus.svg'
import IconLibrary from '@/assets/icons/library.svg'
import RecentActivity from '@/components/cards/RecentActivity.vue'
import { useAuthStore } from '@/stores/authStore'
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'

const router = useRouter()

const authStore = useAuthStore()

const isActivityLoading = ref(true)
const activityError = ref(null)
const activityCards = ref([])

const getRecentActivity = async () => {
  isActivityLoading.value = true
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('bookProgress', 100)
      .gt('bookRating', 0)
      .eq('userId', authStore.currentUser.id)
      .order('updated_at', { ascending: false })
      .limit(2)
    if (!error) {
      activityCards.value = data
    }
    activityError.value = error
  } catch (error) {
    activityError.value = error
  } finally {
    isActivityLoading.value = false
  }
}

getRecentActivity()
</script>

<template>
  <div :class="$style.index">
    <div class="container">
      <div :class="$style.index__head">
        <h2 :class="$style.index__title">Привет! 📚</h2>
        <div :class="$style.index__descr">
          <p>Сохрани свои любимые книги</p>
        </div>
      </div>
      <div :class="$style.index__wrap">
        <div :class="$style.index__info">
          <GoalCard
            :books-total="authStore.currentUser.booksGoal"
            :finished-books="authStore.currentUser.finishedBooks"
          />

          <div :class="$style.index__current">
            <h3 :class="$style.index__subtitle">Текущие книги</h3>
            <ul v-if="authStore.currentBooks.length > 0" :class="$style['index__current-list']">
              <li v-for="book in authStore.currentBooks" :key="book.id">
                <CurrentBook
                  :book-name="book.bookName"
                  :book-author="book.bookAuthor"
                  :progress-number="book.bookProgress"
                  :book-link="`${router.resolve({ name: 'library' }).path}/${book.id}`"
                />
              </li>
            </ul>
            <span v-else>У Вас еще нет начатых книг</span>
          </div>
        </div>
        <div :class="$style.index__actions">
          <div :class="$style.index__btns">
            <ButtonBig
              :btn-text="'Добавить книгу'"
              :btn-type="'fill'"
              :btn-url="router.resolve({ name: 'add-book' }).href"
              :icon-component="IconPlus"
            />
            <ButtonBig
              :btn-text="'Библиотека'"
              :btn-url="router.resolve({ name: 'library' }).href"
              :icon-component="IconLibrary"
            />
          </div>
          <div :class="$style.index__activities">
            <h3 :class="$style.index__subtitle">Последние активности</h3>
            <ul
              v-if="activityCards.length > 0 && !isActivityLoading"
              :class="$style['index__activities-list']"
            >
              <li v-for="book in activityCards" :key="book.id">
                <RecentActivity
                  :activity-name="`Закончена &quot;${book.bookName}&quot;`"
                  :activity-rate="book.bookRating"
                  :book-author="book.bookAuthor"
                />
              </li>
            </ul>
            <span v-if="isActivityLoading">Загрузка...</span>
            <span v-if="activityCards.length === 0 && !isActivityLoading"
              >У Вас еще нет активностей. Прочтите и оцените книгу</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" module>
.index {
  &__head {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 8px;
    padding: 32px 0;
  }

  &__title {
    font-size: 34px;
    line-height: 1.18;
    font-weight: 600;
    color: var(--black);
  }

  &__descr {
    font-size: 17px;
    line-height: 1.65;
  }

  &__wrap {
    display: grid;
    grid-template-columns: 1fr 384px;
    gap: 32px;
  }

  &__current {
    margin-top: 32px;
  }

  &__current-list,
  &__activities-list {
    padding: 0;
    list-style-type: none;
  }

  &__current-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__subtitle {
    margin-bottom: 16px;
    font-size: 19px;
    line-height: 1.48;
    font-weight: 600;
    color: var(--black);
  }

  &__btns {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  &__activities-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}

@include laptop {
  .index {
    &__wrap {
      display: flex;
      flex-direction: column-reverse;
    }
  }
}
</style>
