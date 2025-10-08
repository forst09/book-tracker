<script setup>
import { computed } from 'vue'
import { useAuthStore } from './stores/authStore'
import { useRoute } from 'vue-router'
import defaultLayout from './layouts/defaultLayout.vue'
import authLayout from './layouts/authLayout.vue'

const route = useRoute()

const layoutMap = {
  defaultLayout: defaultLayout,
  authLayout: authLayout,
}

const layoutComponent = computed(() => {
  return layoutMap[route.meta.layout] || defaultLayout
})

const authStore = useAuthStore()
</script>

<template>
  <component
    v-if="!authStore.userError"
    :is="layoutComponent"
    :page-title="route.meta.title"
    :class="$style.main"
  >
    <RouterView :key="route.fullPath" />
  </component>
  <h1 v-else>Что-то пошло не так. Перезагрузите страницу или попробуйте позже</h1>
</template>

<style lang="scss">
@use './assets/styles/index.scss';

.opacity-enter-active,
.opacity-leave-active {
  transition: opacity 0.5s;
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}
</style>

<style module lang="scss">
// .main {
//   display: flex;
//   flex-direction: column;
//   min-height: 100vh;
// }
</style>
