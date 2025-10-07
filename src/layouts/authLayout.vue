<template>
  <main :class="$style.main">
    <slot />
  </main>
</template>

<style lang="scss" module>
.main {
  display: flex;
  min-height: 100vh;
}
</style>
