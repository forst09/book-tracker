<script setup lang="ts">
import GoalCard from '@/components/cards/GoalCard.vue'
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
          <GoalCard :books-total="20" :finished-books="2" />
        </div>
        <div :class="$style.index__actions"></div>
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
  }
}
</style>
