<script setup>
import { ref, onMounted, computed } from 'vue'
import { supabase } from './lib/supabaseClient'
import router from './router'
import { useAuthStore } from './stores/authStore'
import LoaderDefault from './components/common/loaders/LoaderDefault.vue'
import { useRoute } from 'vue-router'
import defaultLayout from './layouts/default.vue'
import authLayout from './layouts/authLayout.vue'

const route = useRoute()

const layoutMap = {
  defaultLayout: defaultLayout,
  authLayout: authLayout,
}

const layoutComponent = computed(() => {
  return layoutMap[route.meta.layout] || defaultLayout
})

// async function signOut() {
//   const { error } = await supabase.auth.signOut()
// }

// signOut()

// const authStore = useAuthStore()
</script>

<template>
  <component :is="layoutComponent" :page-title="route.meta.title" :class="$style.main">
    <RouterView />
  </component>
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
.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
