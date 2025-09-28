<script setup>
import LoaderDefault from '@/components/common/loaders/LoaderDefault.vue'

const props = defineProps({
  titleText: {
    type: String,
    required: true,
  },
  descrText: {
    type: String,
    required: true,
  },
  otherActionText: {
    type: String,
    required: true,
  },
  isPolicyInclude: {
    type: Boolean,
    required: false,
    default: false,
  },
  formError: {
    type: [String, null],
    required: true,
  },
  isLoading: {
    type: Boolean,
    required: true,
  },
  loaderComponent: {
    type: Object,
    required: false,
    default: LoaderDefault,
  },
})

const emits = defineEmits(['submitForm'])
</script>

<template>
  <div :class="$style['auth-form']">
    <div :class="$style['auth-form__top']">
      <h2 :class="$style['auth-form__title']">{{ props.titleText }}</h2>
      <div :class="$style['auth-form__descr']">
        <p>{{ props.descrText }}</p>
      </div>
    </div>
    <form :class="$style['auth-form__form']" @submit.prevent="emits('submitForm')">
      <div :class="$style['auth-form__form-wrap']">
        <slot name="form" />
        <span v-if="props.formError" :class="$style['auth-form__error']">
          {{ props.formError }}
        </span>
      </div>
    </form>
    <div :class="$style['auth-form__other']">
      <div :class="$style['auth-form__other-divider']">
        <span>или</span>
      </div>
      <p :class="$style['auth-form__other-question']">{{ props.otherActionText }}</p>
      <slot name="btn" />
    </div>
    <div v-if="props.isPolicyInclude" :class="$style['auth-form__policy']">
      <slot name="policy" />
    </div>
    <Transition name="opacity">
      <component v-if="props.isLoading" :is="props.loaderComponent" />
    </Transition>
  </div>
</template>

<style lang="scss" module>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: var(--item-spacing-s-plus);
  padding: 32px;
  border-radius: 14px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  overflow: hidden;

  &__title {
    margin-bottom: 8px;
    font-size: 23px;
    font-weight: 600;
    line-height: 1.4;
    color: var(--black);
  }

  &__descr {
    font-size: 15px;
    line-height: 1.56;
  }

  &__other-divider {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    line-height: 1.44;
    color: var(--gray3);

    &::before,
    &::after {
      content: '';
      height: 1px;
      flex-grow: 1;
      background-color: var(--stroke);
    }
  }

  &__other-question {
    margin: var(--item-spacing-s) 0 8px;
    font-size: 14px;
    line-height: 1.47;
    text-align: center;
  }

  &__other {
    display: flex;
    flex-direction: column;
  }

  &__form-wrap {
    display: flex;
    flex-direction: column;
    gap: var(--item-spacing-s);
  }

  &__policy {
    font-size: 12px;
    line-height: 1.33;
    color: var(--gray3);
    text-align: center;
  }

  &__error {
    font-size: 12px;
    color: red;
  }
}
</style>
