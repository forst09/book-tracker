<script setup>
const props = defineProps({
  inputType: {
    type: String,
    required: false,
    default: 'text',
  },
  inputId: {
    type: String,
    required: true,
  },
  inputPlaceholder: {
    type: String,
    required: true,
  },
  isInputRequired: {
    type: Boolean,
    required: false,
    default: false,
  },
  errorText: {
    type: String,
    required: false,
    default: null,
  },
  modelValue: {
    type: [String, Number],
    required: true,
  },
  inputLabel: {
    type: String,
    required: true,
  },
  inputRange: {
    type: Array,
    required: false,
    default: () => [],
  },
})

const emits = defineEmits(['update:modelValue'])

const inputEvent = (e) => {
  emits('update:modelValue', e.target.value)
}
</script>

<template>
  <div :class="[$style.input]">
    <label :for="props.inputId" :class="$style.input__label">
      {{ props.inputLabel }}
    </label>
    <div :class="$style.input__wrap">
      <input
        :id="props.inputId"
        :type="props.inputType"
        :placeholder="props.inputPlaceholder"
        :required="props.isInputRequired"
        :value="props.modelValue"
        :name="props.inputName"
        :aria-describedby="`${props.inputId}-error`"
        :class="[$style.input__input, props.errorText && $style[`input__input--error`]]"
        :min="props.inputRange?.[0]"
        @input="inputEvent"
      />
      <div :class="$style.input__btn">
        <slot name="btn" />
      </div>
    </div>
    <span
      v-if="props.errorText"
      role="alert"
      :id="`${props.inputId}-error`"
      :class="$style.input__error"
    >
      {{ props.errorText }}
    </span>
  </div>
</template>

<style lang="scss" module>
.input {
  &__label {
    display: inline-block;
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 1;
    font-weight: 500;
    color: var(--black2);
  }

  &__input {
    display: block;
    width: 100%;
    padding: 10px 13px;
    font-family: var(--font-family-Font-1);
    border: 1px solid transparent;
    border-radius: 8px;
    color: var(--black);
    font-size: 14px;
    line-height: normal;
    flex-grow: 1;
    transition: border-color 0.3s ease;

    &--error {
      border-color: red;
    }

    @include hover {
      border-color: var(--black);
    }

    &:focus {
      outline: none;
      border-color: var(--black);
    }

    &::placeholder {
      font-family: var(--font-family-Font-1);
      color: var(--gray4);
      font-size: 14px;
      line-height: normal;
    }
  }

  &__error {
    margin-top: 4px;
    font-size: 12px;
    color: red;
  }

  &__wrap {
    display: flex;
    gap: 8px;
  }

  &__btn {
    flex-shrink: 0;

    &:empty {
      display: none;
    }
  }
}
</style>
