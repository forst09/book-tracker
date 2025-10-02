<script setup>
import AppAside from '@/components/common/AppAside.vue'
import AppHeader from '@/components/common/AppHeader.vue'

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
    <main :class="$style.main">
      <AppHeader :title-text="props.pageTitle" />
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

.main {
  flex-grow: 1;
}
</style>
