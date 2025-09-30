<script setup>
import LogoIcon from '@/assets/icons/logo.svg'

const props = defineProps({
  appName: {
    type: String,
    required: false,
    default: 'Book Tracker',
  },
  descrText: {
    type: String,
    required: false,
    default: 'Ваш читательский журнал',
  },
  logoColor: {
    type: String,
    required: false,
    default: 'gradient',
    validator: (value) => ['gradient', 'violet', 'cyan'].includes(value),
  },
  logoSize: {
    type: String,
    required: false,
    default: 'regular',
    validator: (value) => ['regular', 'l'].includes(value),
  },
})
</script>

<template>
  <RouterLink
    to="/"
    :class="[
      $style.logo,
      $style[`logo--color-${props.logoColor}`],
      $style[`logo--size-${props.logoSize}`],
    ]"
  >
    <div :class="$style.logo__icon">
      <LogoIcon :class="$style['logo__icon-icon']" />
    </div>
    <div :class="$style.logo__text">
      <span :class="$style['logo__text-top']">{{ props.appName }}</span>
      <span :class="$style['logo__text-bottom']">{{ props.descrText }}</span>
    </div>
  </RouterLink>
</template>

<style lang="scss" module>
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: unset;

  &--color-violet {
    --logo-bg: var(--pink);
    --logo-stroke: var(--color-violet-52);
  }

  &--color-cyan {
    --logo-bg: var(--cyan-light);
    --logo-stroke: var(--color-cyan-29);
  }

  &--color-gradient {
    --logo-bg: linear-gradient(
      90deg,
      var(--color-cyan-37, #00bba7) 0%,
      var(--color-azure-58, #2b7fff) 100%
    );
    --logo-stroke: var(--white);
  }

  &--size-regular {
    --logo-top-fs: 19px;
    --logo-top-lh: 1.49;
    --logo-bottom-fs: 14px;
    --logo-bottom-lh: 1.46;
    --logo-icon-width: 40px;
    --logo-icon-br: 14px;
    --logo-icon-stroke-width: 2px;
    --logo-icon-svg-size: 24px;
  }

  &--size-l {
    --logo-top-fs: 28px;
    --logo-top-lh: 1.3;
    --logo-bottom-fs: 17px;
    --logo-bottom-lh: 1.65;
    --logo-icon-width: 56px;
    --logo-icon-br: 16px;
    --logo-icon-stroke-width: 2.6px;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--logo-icon-width);
    aspect-ratio: 1;
    border-radius: var(--logo-icon-br);
    background: var(--logo-bg);
  }

  &__icon-icon {
    width: var(--logo-icon-svg-size);
    height: var(--logo-icon-svg-size);
    stroke: var(--logo-stroke);
    stroke-width: var(--logo-icon-stroke-width);
  }

  &__text {
    display: flex;
    flex-direction: column;
  }

  &__text-top {
    font-size: var(--logo-top-fs);
    font-weight: 600;
    line-height: var(--logo-top-lh);
    color: var(--black);
  }

  &__text-bottom {
    font-size: var(--logo-bottom-fs);
    line-height: var(--logo-bottom-lh);
    color: var(--gray);
  }
}
</style>
