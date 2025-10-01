<script setup>
const props = defineProps({
  linkIcon: {
    type: Object,
    required: true,
  },
  linkText: {
    type: String,
    required: true,
  },
  linkUrl: {
    type: String,
    required: true,
  },
  linkCounter: {
    type: Number,
    required: false,
    default: null,
  },
})
</script>

<template>
  <RouterLink :to="props.linkUrl" :class="$style.link" :active-class="$style.active">
    <component :is="props.linkIcon" :class="$style.link__icon" />
    <span :class="$style.link__text">{{ props.linkText }}</span>
    <span v-if="props.linkCounter" :class="$style.link__counter">{{ props.linkCounter }}</span>
  </RouterLink>
</template>

<style lang="scss" module>
.link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 14px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &.active {
    background-color: var(--color-grey-97);
    box-shadow:
      0 1px 3px 0 rgba(0, 0, 0, 0.1),
      0 1px 2px -1px rgba(0, 0, 0, 0.1);

    .link__counter,
    .link__text {
      color: var(--color-cyan-29);
    }

    .link__icon {
      stroke: var(--color-cyan-29);
    }
  }

  @include hover {
    .link__icon {
      stroke: var(--color-cyan-29);
    }

    .link__text {
      color: var(--color-cyan-29);
    }
  }

  &__icon,
  &__counter {
    flex-shrink: 0;
  }

  &__icon {
    width: 20px;
    aspect-ratio: 1;
    stroke: var(--gray);
    stroke-width: 1.6;
    transition: stroke 0.3s ease;
  }

  &__text {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.55;
    color: var(--gray);
    transition: color 0.3s ease;
  }

  &__counter {
    margin-left: auto;
    display: inline-block;
    padding: 3px 9px;
    background-color: var(--gray6);
    font-size: 12px;
    line-height: 1.33;
    color: var(--black3);
    font-weight: 500;
    border-radius: 8px;
    transition: color 0.3s ease;
  }
}
</style>
