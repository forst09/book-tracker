<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'
import router from './router'
import { useAuthStore } from './stores/authStore'
import LoaderDefault from './components/common/loaders/LoaderDefault.vue'

// async function signOut() {
//   const { error } = await supabase.auth.signOut()
// }

// signOut()

// const authStore = useAuthStore()
</script>

<template>
  <main :class="$style.main">
    <RouterView />
  </main>
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
