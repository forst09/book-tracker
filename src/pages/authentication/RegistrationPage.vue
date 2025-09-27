<script setup lang="ts">
import BaseAuth from './BaseAuth.vue'
import AuthInfo from './components/AuthInfo.vue'

const logoDescr = 'Начните свой читательский путь'
const titleText = 'Присоединяйтесь к сообществу читателей'
const descrText =
  'Создайте свой персональный трекер книг и начните организовывать свою библиотеку уже сегодня. Ставьте цели и достигайте их!'
const listArr = [
  'Отслеживание прогресса чтения',
  'Организация личной библиотеки',
  'Постановка и достижение целей',
]
</script>

<template>
  <BaseAuth :class="$style.registration">
    <template #info>
      <AuthInfo
        :logo-descr="logoDescr"
        :title-text="titleText"
        :descr-text="descrText"
        :list-arr="listArr"
        :main-color="'violet'"
      />
    </template>
  </BaseAuth>
</template>

<style lang="scss" module>
.registration {
  // --logo-stroke: var(--color-violet-52);
}
</style>
