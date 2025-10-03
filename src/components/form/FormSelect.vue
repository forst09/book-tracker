<script setup>
import ArrowIcon from '@/assets/icons/arrow-down.svg'
import { ref } from 'vue'

const props = defineProps({
  selectId: {
    type: String,
    required: true,
  },
  labelText: {
    type: String,
    required: true,
  },
  selectOptions: {
    type: Array,
    required: true,
  },
})

const emits = defineEmits(['update:modelValue'])

const isValueSelected = ref(false)

const selectChange = (e) => {
  isValueSelected.value = e.target.value != 0
  emits('update:modelValue', e.target.value)
}
</script>

<template>
  <div :class="$style.wrap">
    <label :for="props.selectId" :class="$style.label">{{ props.labelText }}</label>
    <div :class="$style['select-wrap']">
      <select
        :id="props.selectId"
        :class="[$style.select, isValueSelected && $style.selected]"
        @change="selectChange"
      >
        <option
          v-for="item in props.selectOptions"
          :key="item.id"
          :value="item.id"
          :class="$style.select__option"
        >
          {{ item.name }}
        </option>
      </select>
      <ArrowIcon :class="$style['select-wrap__icon']" />
    </div>
  </div>
</template>

<style lang="scss" module>
.wrap {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.select-wrap {
  position: relative;

  &__icon {
    position: absolute;
    right: 13px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    aspect-ratio: 1;
    stroke: var(--gray4);
    pointer-events: none;
  }
}

.select {
  width: 100%;
  appearance: none;
  border: 1px solid transparent;
  font-family: var(--font-family-Font-1);
  padding: 9px 42px 9px 13px;
  color: var(--gray4);
  font-size: 14px;
  line-height: 1.45;
  font-weight: 400;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  transition: border-color 0.3s ease;

  &.selected {
    color: var(--black);
  }

  @include hover {
    border-color: var(--black);
  }

  &:focus {
    border-color: var(--black);
  }
}

.label {
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  color: var(--black2);
}
</style>
