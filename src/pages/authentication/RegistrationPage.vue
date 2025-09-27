<script setup lang="ts">
import { computed, ref } from 'vue'

import UserIcon from '@/assets/icons/user.svg'
import ArrowIcon from '@/assets/icons/arrow.svg'

import FormInput from '@/components/form/FormInput.vue'
import BaseAuth from './BaseAuth.vue'
import AuthForm from './components/AuthForm.vue'
import AuthInfo from './components/AuthInfo.vue'
import ButtonIcon from '@/components/ui/buttons/ButtonIcon.vue'

// auth info
const logoDescr = 'Начните свой читательский путь'
const titleText = 'Присоединяйтесь к сообществу читателей'
const descrText =
  'Создайте свой персональный трекер книг и начните организовывать свою библиотеку уже сегодня. Ставьте цели и достигайте их!'
const listArr = [
  'Отслеживание прогресса чтения',
  'Организация личной библиотеки',
  'Постановка и достижение целей',
]

// form info
const formTitle = 'Создать аккаунт'
const formDescr = 'Заполните данные для создания вашего аккаунта'
const formOtherAction = 'Уже есть аккаунт?'

// form values
const nameValue = ref('')

const emailValue = ref('')

const passwordValue = ref('')

const repeatPassword = ref('')

const formValues = computed(() => {
  return {
    name: nameValue.value,
    email: emailValue.value,
    password: passwordValue.value,
  }
})
</script>

<template>
  <BaseAuth :class="$style.registration">
    <template #info>
      <AuthInfo
        :logo-descr="logoDescr"
        :title-text="titleText"
        :descr-text="descrText"
        :list-arr="listArr"
        :main-color="'violet'"
      />
    </template>
    <template #form>
      <AuthForm
        :title-text="formTitle"
        :descr-text="formDescr"
        :is-policy-include="true"
        :other-action-text="formOtherAction"
      >
        <template #form>
          <FormInput
            v-model="nameValue"
            :input-id="'name'"
            :input-label="'Имя'"
            :input-placeholder="'Ваше имя'"
            :is-input-required="true"
          />
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
            :input-placeholder="'Минимум 6 символов'"
            :is-input-required="true"
            :input-type="'password'"
          />
          <FormInput
            v-model="repeatPassword"
            :input-id="'password-repeat'"
            :input-label="'Подтвердите пароль'"
            :input-placeholder="'Повторите пароль'"
            :is-input-required="true"
            :input-type="'password'"
          />
          <ButtonIcon
            :btn-text="'Создать аккаунт'"
            :btn-color="'violet'"
            :btn-icon="UserIcon"
            type="submit"
          />
        </template>
        <template #btn>
          <ButtonIcon
            :btn-size="'l'"
            :btn-color="'transparent'"
            :btn-tag="'RouterLink'"
            :btn-text="'Войти в аккаунт'"
            :btn-icon="ArrowIcon"
            :to="{ name: 'login' }"
          />
        </template>
        <template #policy>
          <p>
            Создавая аккаунт, вы соглашаетесь с нашими
            <a href="" :class="$style['registration__policy-link']">Условиями использования</a> и
            <a href="" :class="$style['registration__policy-link']">Политикой конфиденциальности</a>
          </p>
        </template>
      </AuthForm>
    </template>
  </BaseAuth>
</template>

<style lang="scss" module>
.registration {
  --auth-img-gradient: linear-gradient(
    0,
    var(--color-violet-3220, rgba(89, 22, 139, 0.2)) 0%,
    var(--color-violet-320, rgba(89, 22, 139, 0)) 100%
  );
  --auth-img-ar: 560 / 320;

  &__policy-link {
    font-size: 16px;
    line-height: normal;
    color: var(--color-violet-52);
    text-decoration-color: transparent;
    text-underline-offset: 2px;
    text-decoration-skip-ink: none;
    transition: text-decoration 0.3s ease;

    @include hover {
      text-decoration-color: var(--color-violet-52);
    }
  }
}
</style>
