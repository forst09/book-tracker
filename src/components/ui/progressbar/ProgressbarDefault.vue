<script setup>
const props = defineProps({
  progressValue: {
    type: Number,
    required: true,
  },
  progressTotal: {
    type: Number,
    required: true,
  },
  progressColor: {
    type: String,
    required: false,
    default: 'azure',
    validator: (value) => ['azure', 'cyan', 'violet'].includes(value),
  },
})
</script>

<template>
  <progress
    :value="props.progressValue"
    :max="props.progressTotal"
    :class="[$style.progress, $style[`progress--color-${props.progressColor}`]]"
  ></progress>
</template>

<style lang="scss" module>
.progress {
  display: block;
  appearance: none;
  width: 100%;
  height: var(--progress-height, 6px);
  background-color: var(--progressbar-bg);
  border: none;

  &::-webkit-progress-value {
    transition: all 1s;
    background: var(--progressbar-fill);
    border-radius: 1000px;
  }

  &::-webkit-progress-bar {
    background: var(--progressbar-bg);
    border-radius: 1000px;
  }

  &::-moz-progress-bar {
    background: var(--progressbar-fill) !important;
    border-radius: 1000px;
    transition: all 1s;
  }

  &--color-cyan {
    --progressbar-bg: var(--cyan-light);
    --progressbar-fill: linear-gradient(
      90deg,
      var(--color-cyan-37, #00bba7) 0%,
      var(--color-cyan-29, #009689) 100%
    );
  }

  &--color-azure {
    --progressbar-bg: var(--white2);
    --progressbar-fill: linear-gradient(
      90deg,
      var(--color-azure-58, #2b7fff) 0%,
      var(--color-azure-54, #155dfc) 100%
    );
  }
}
</style>
