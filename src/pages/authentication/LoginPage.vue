<script setup lang="ts">
import { computed, ref } from 'vue'

import LoginIcon from '@/assets/icons/login.svg'
import ArrowIcon from '@/assets/icons/arrow.svg'

import FormInput from '@/components/form/FormInput.vue'
import BaseAuth from './BaseAuth.vue'
import AuthForm from './components/AuthForm.vue'
import AuthInfo from './components/AuthInfo.vue'
import ButtonIcon from '@/components/ui/buttons/ButtonIcon.vue'

// auth info
const logoDescr = 'Ваш персональный трекер чтения'
const titleText = 'Отслеживайте свои книги'
const descrText =
  'Организуйте свою библиотеку, ставьте цели чтения и следите за прогрессом. Создайте идеальную систему для управления вашими книгами.'

// form info
const formTitle = 'Добро пожаловать!'
const formDescr = 'Войдите в свой аккаунт, чтобы продолжить чтение'
const formOtherAction = 'Нет аккаунта?'

// form values
const emailValue = ref('')

const passwordValue = ref('')

const formValues = computed(() => {
  return {
    email: emailValue.value,
    password: passwordValue.value,
  }
})
</script>

<template>
  <BaseAuth :class="$style.login">
    <template #info>
      <AuthInfo
        :logo-descr="logoDescr"
        :title-text="titleText"
        :descr-text="descrText"
        :main-color="'cyan'"
      />
    </template>
    <template #form>
      <AuthForm
        :title-text="formTitle"
        :descr-text="formDescr"
        :other-action-text="formOtherAction"
      >
        <template #form>
          <FormInput
            v-model="emailValue"
            :input-id="'email'"
            :input-label="'Электронная почта'"
            :input-placeholder="'example@email.com'"
            :is-input-required="true"
            :input-type="'email'"
          />
          <FormInput
            v-model="passwordValue"
            :input-id="'password'"
            :input-label="'Пароль'"
            :input-placeholder="'Введите пароль'"
            :is-input-required="true"
            :input-type="'password'"
          />
          <ButtonIcon :btn-text="'Войти'" :btn-color="'cyan'" :btn-icon="LoginIcon" type="submit" />
        </template>
        <template #btn>
          <ButtonIcon
            :btn-size="'l'"
            :btn-color="'transparent'"
            :btn-tag="'RouterLink'"
            :btn-text="'Создать аккаунт'"
            :btn-icon="ArrowIcon"
            :to="{ name: 'registration' }"
            :isContentReverse="true"
            :icon-class="$style['login__create-btn-icon']"
          />
        </template>
      </AuthForm>
    </template>
  </BaseAuth>
</template>

<style lang="scss" module>
.login {
  --auth-img-gradient: linear-gradient(
    0deg,
    var(--color-cyan-1820, rgba(11, 79, 74, 0.2)) 0%,
    var(--color-cyan-180, rgba(11, 79, 74, 0)) 100%
  );
  --auth-img-ar: 560 / 384;

  &__create-btn-icon {
    transform: rotate(180deg);
  }
}
</style>
