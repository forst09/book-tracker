<script setup>
import ProgressbarDefault from '../ui/progressbar/ProgressbarDefault.vue'
import { useAuthStore } from '@/stores/authStore'
import router from '@/router'

const authStore = useAuthStore()
</script>

<template>
  <div :class="$style.current">
    <span :class="$style.current__title">Сейчас читаю</span>
    <ul v-if="authStore.currentBooks.length > 0" :class="$style.current__list">
      <li v-for="item in authStore.currentBooks" :key="item.id">
        <div :class="$style.current__item">
          <span :class="$style.current__name">
            <RouterLink
              :to="`${router.resolve({ name: 'library' }).path}/${item.id}`"
              :class="$style.current__link"
              >{{ item.bookName }}
            </RouterLink>
          </span>
          <span :class="$style.current__author">{{ item.bookAuthor }}</span>
          <div :class="$style.current__progress">
            <span>Прогресс</span>
            <span>{{ item.bookProgress }}%</span>
          </div>
          <ProgressbarDefault
            :progress-value="item.bookProgress"
            :progress-total="100"
            :class="$style.current__progressbar"
          />
        </div>
      </li>
    </ul>
    <span v-else>У вас еще нет книг, которые Вы сейчас читаете</span>
  </div>
</template>

<style lang="scss" module>
.current {
  display: flex;
  flex-direction: column;
  font-size: 14px;

  &__title {
    margin-bottom: 12px;
    display: inline-block;
    font-size: 16px;
    line-height: 1.54;
    font-weight: 500;
    color: var(--black);
  }

  &__item {
    position: relative;
    padding: 12px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow:
      0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px -1px rgba(0, 0, 0, 0.1);
    border-radius: 14px;
    overflow: hidden;
  }

  &__link {
    color: inherit;
    text-decoration: none;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }
  }

  &__progress {
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    font-size: 12px;
    line-height: 1.33;
  }

  &__progressbar {
    margin-top: 8px;
  }

  &__name,
  &__author {
    display: block;
  }

  &__author {
    font-size: 12px;
    line-height: 1.33;
  }

  &__name {
    font-size: 14px;
    line-height: 1.44;
    font-weight: 500;
    color: var(--black);
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0;
    list-style-type: none;
  }
}
</style>
