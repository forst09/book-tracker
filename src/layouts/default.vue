<script setup>
import AppLogo from '@/components/common/AppLogo.vue'

const props = defineProps({
  pageTitle: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <div :class="$style.layout">
    <aside :class="$style.aside">
      <AppLogo />
    </aside>
    <main>
      <header :class="$style.header">
        <h1>{{ props.pageTitle }}</h1>
      </header>
      <slot />
    </main>
  </div>
</template>

<style lang="scss" module>
.layout {
}
</style>
