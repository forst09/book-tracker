<script setup>
const props = defineProps({
  labelText: {
    type: String,
    required: true,
  },
  counterValue: {
    type: Number,
    required: true,
  },
  inputId: {
    type: String,
    required: true,
  },
  inputName: {
    type: String,
    required: true,
  },
  inputValue: {
    type: String,
    required: true,
  },
  isChecked: {
    type: Boolean,
    required: true,
  },
})

const emits = defineEmits(['handleChange', 'update:modelValue'])
</script>

<template>
  <div :class="$style.radio">
    <input
      type="radio"
      :name="props.inputName"
      :id="props.inputId"
      :value="props.inputValue"
      :class="['sr-only', $style.radio__input]"
      :checked="props.isChecked"
      @change="emits('update:modelValue', $event.target.value)"
    />
    <label :for="props.inputId" :class="$style.radio__label">
      <span>{{ props.labelText }}</span>
      <span :class="$style.radio__counter">{{ props.counterValue }}</span>
    </label>
  </div>
</template>

<style lang="scss" module>
.radio {
  &__label {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    font-size: 14px;
    line-height: 1.45;
    font-weight: 500;
    color: var(--black2);
    padding: 5px 13px;
    border-radius: 8px;
    border: 1px solid var(--white2);
    background: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    transition:
      border-color 0.3s ease,
      color 0.3s ease,
      background-color 0.3s ease;

    @include hover {
      border-color: var(--color-cyan-37);
    }
  }

  &__counter {
    padding: 3px 9px;
    background-color: var(--gray6);
    border-radius: 8px;
    color: var(--black3);
    font-size: 12px;
    line-height: 1.33;
    font-weight: 500;
    transition:
      background-color 0.3s ease,
      color 0.3s ease;
  }

  &__input:checked + .radio__label {
    background-color: var(--color-cyan-37);
    color: var(--white);
    border-color: var(--color-cyan-37);
  }
}
</style>
