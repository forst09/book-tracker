<script setup>
import AppLogo from '@/components/common/AppLogo.vue'
import ListDefault from '@/components/list/ListDefault.vue'

const props = defineProps({
  appName: {
    type: String,
    required: false,
    default: 'Book Tracker',
  },
  logoDescr: {
    type: String,
    required: true,
  },
  titleText: {
    type: String,
    required: true,
  },
  descrText: {
    type: String,
    required: true,
  },
  listArr: {
    type: Array,
    required: false,
    default: () => [],
  },
  imgSrc: {
    type: String,
    required: false,
    default: '/images/auth/auth-img.jpg',
  },
  mainColor: {
    type: String,
    required: false,
    default: 'pink',
    validator: (value) => ['violet', 'cyan'].includes(value),
  },
})
</script>

<template>
  <div :class="$style['auth-info']">
    <AppLogo
      :app-name="props.appName"
      :descr-text="props.logoDescr"
      :logo-color="props.mainColor"
      :logo-size="'l'"
    />
    <div :class="$style['auth-info__main']">
      <h2 :class="$style['auth-info__title']">{{ props.titleText }}</h2>
      <div :class="$style['auth-info__descr']">
        <p>{{ props.descrText }}</p>
      </div>
    </div>
    <ListDefault
      v-if="props.listArr && props.listArr.length > 0"
      :list-arr="props.listArr"
      :dot-color="props.mainColor"
    />
    <div :class="['img', 'img--cover', $style['auth-info__img']]" aria-hidden="true">
      <img :src="props.imgSrc" :class="['img__img', $style['auth-info__img-img']]" />
    </div>
  </div>
</template>

<style lang="scss" module>
.auth-info {
  display: flex;
  flex-direction: column;
  gap: var(--item-spacing-s-plus);

  &__title {
    margin-bottom: var(--item-spacing-s);
    font-size: 22px;
    font-weight: 500;
    line-height: 1.43;
    color: var(--black);
  }

  &__descr {
    font-size: 17px;
    line-height: var(--line-height-29_25);
  }

  &__img {
    position: relative;
    aspect-ratio: var(--auth-img-ar);
    border-radius: 16px;
    background: #f1f5f9;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      background: var(--auth-img-gradient);
    }
  }
}
</style>
