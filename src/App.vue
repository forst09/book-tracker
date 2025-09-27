<script setup>
// alert('not hhe')
</script>

<template>
  <main :class="$style.main">
    <RouterView />
  </main>
</template>

<style module lang="scss">
@use './assets/styles/index.scss';

.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
