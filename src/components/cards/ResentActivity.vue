<script setup>
import IconStar from '@/assets/icons/star.svg'
const props = defineProps({
  activityName: {
    type: String,
    required: true,
  },
  bookAuthor: {
    type: String,
    required: true,
  },
  activityRate: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div :class="$style.activity">
    <div :class="$style.activity__main">
      <span :class="$style.activity__name">{{ props.activityName }}</span>
      <span :class="$style.activity__author">{{ props.bookAuthor }}</span>
    </div>
    <div :class="$style.activity__rate">
      <IconStar :class="$style['activity__rate-icon']" />
      <span>{{ props.activityRate }}</span>
    </div>
  </div>
</template>

<style lang="scss" module>
.activity {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.6);
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px -1px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);

  &::before {
    content: '';
    width: 8px;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: var(--green2);
    flex-shrink: 0;
  }

  &__main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  &__name {
    font-size: 16px;
    line-height: 1.54;
    font-weight: 500;
    color: var(--black);
  }

  &__author {
    font-size: 14px;
    line-height: 1.46;
  }

  &__rate {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    line-height: 1.43;
  }

  &__rate-icon {
    width: 12px;
    aspect-ratio: 1;
    stroke: var(--yellow);
    fill: var(--yellow);
  }
}
</style>
