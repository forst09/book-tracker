<script setup>
// alert('not hhe')
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabaseClient'

const instruments = ref([])
async function getInstruments() {
  const { data } = await supabase.from('users').select()
  instruments.value = data
}
onMounted(() => {
  getInstruments()
})
</script>

<template>
  <main :class="$style.main">
    <RouterView />

    <!-- <ul>
      <li v-for="instrument in instruments" :key="instrument.id">{{ instrument.name }}</li>
    </ul> -->
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
