<script setup>
import AppAside from '@/components/common/AppAside.vue'
import AppHeader from '@/components/common/AppHeader.vue'
import { ref } from 'vue'

const props = defineProps({
  pageTitle: {
    type: String,
    required: true,
  },
})

const isAsideActive = ref(null)

const toggleAside = (value) => {
  isAsideActive.value = value
  if (!value) {
    document.body.style.overflow = ''
  } else {
    document.body.style.overflow = 'hidden'
  }
}
</script>
<template>
  <div :class="$style.layout">
    <AppAside :class="[$style.aside, isAsideActive && $style.active]" @close-click="toggleAside" />
    <main :class="$style.main">
      <AppHeader :title-text="props.pageTitle" @burger-click="toggleAside" />
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

@include tablet {
  .aside {
    &.active {
      transform: translateX(0);
      opacity: 1;
    }
  }

  .layout {
    padding-top: 74px;
  }
}
</style>
