<script setup>
// alert('not hhe')
</script>

<template>
  <main :class="$style.main">
    <RouterView />
  </main>
</template>

<style lang="scss">
@use './assets/styles/index.scss';
</style>

<style module lang="scss">
.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
