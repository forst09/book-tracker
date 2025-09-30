<script setup>
import NavigationLink from './NavigationLink.vue'

const props = defineProps({
  navigationArr: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <nav :class="$style.navigation">
    <ul :class="$style.navigation__list">
      <li v-for="item in props.navigationArr" :key="item.name" :class="$style.navigation__item">
        <NavigationLink
          :link-icon="item.icon"
          :link-text="item.title"
          :link-counter="item.counter"
          :link-url="item.url"
        />
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" module>
.navigation {
  &__list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    list-style-type: none;
    padding: 0;
  }
}
</style>
