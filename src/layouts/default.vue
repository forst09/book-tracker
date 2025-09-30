<script setup>
import AppAside from '@/components/common/AppAside.vue'

const props = defineProps({
  pageTitle: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <div :class="$style.layout">
    <AppAside :class="$style.aside" />
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
  display: flex;
}

.aside {
  flex-shrink: 0;
}
</style>
