<script setup lang="ts">
import { computed, ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'

import UserIcon from '@/assets/icons/user.svg'
import ArrowIcon from '@/assets/icons/arrow.svg'

import FormInput from '@/components/form/FormInput.vue'
import BaseAuth from './BaseAuth.vue'
import AuthForm from './components/AuthForm.vue'
import AuthInfo from './components/AuthInfo.vue'
import ButtonIcon from '@/components/ui/buttons/ButtonIcon.vue'
import LoaderDefault from '@/components/common/loaders/LoaderDefault.vue'

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
const nameError = ref(null)

const emailValue = ref('')
const emailError = ref(null)

const passwordValue = ref('')
const passwordError = ref(null)

const repeatPassword = ref('')
const repeatPasswordError = ref(null)

const supabaseError = ref(null)

const formErrors = computed(() => {
  return {
    ...(nameError.value ? { nameError: nameError.value } : {}),
    ...(passwordError.value ? { passwordError: passwordError.value } : {}),
    ...(emailError.value ? { emailError: emailError.value } : {}),
    ...(repeatPasswordError.value ? { repeatPasswordError: repeatPasswordError.value } : {}),
  }
})

const validateFormValues = () => {
  if (nameValue.value.length < 3) {
    nameError.value = 'Имя должно иметь минимум 3 символа'
  } else {
    nameError.value = null
  }

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue.value)) {
    emailError.value = 'Некорректный email'
  } else {
    emailError.value = null
  }

  if (passwordValue.value.length < 6) {
    passwordError.value = 'Пароль должен иметь минимум 6 символов'
  } else {
    passwordError.value = null
  }

  if (passwordValue.value !== repeatPassword.value) {
    repeatPasswordError.value = 'Пароли не совпадают'
  } else {
    repeatPasswordError.value = null
  }
}

// sign up new user
const isLoading = ref(false)

const signUpNewUser = async (email, password) => {
  isLoading.value = true
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    console.log(data)
    console.log(error)
    if (error) {
      supabaseError.value = error.message
    } else {
      supabaseError.value = null
    }
  } catch (error) {
    supabaseError.value = error
  } finally {
    isLoading.value = false
  }
}

// submit sign in form
const submitForm = () => {
  validateFormValues()

  if (Object.keys(formErrors.value).length === 0) {
    signUpNewUser(emailValue.value, passwordValue.value)
  }
}
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
        :form-error="supabaseError"
        :is-loading="isLoading"
        :class="$style.registration__form"
        @submit-form="submitForm"
      >
        <template #form>
          <FormInput
            v-model="nameValue"
            :input-id="'name'"
            :input-label="'Имя'"
            :input-placeholder="'Ваше имя'"
            :is-input-required="true"
            :error-text="nameError"
          />
          <FormInput
            v-model="emailValue"
            :input-id="'email'"
            :input-label="'Электронная почта'"
            :input-placeholder="'example@email.com'"
            :is-input-required="true"
            :input-type="'email'"
            :error-text="emailError"
          />
          <FormInput
            v-model="passwordValue"
            :input-id="'password'"
            :input-label="'Пароль'"
            :input-placeholder="'Минимум 6 символов'"
            :is-input-required="true"
            :input-type="'password'"
            :error-text="passwordError"
          />
          <FormInput
            v-model="repeatPassword"
            :input-id="'password-repeat'"
            :input-label="'Подтвердите пароль'"
            :input-placeholder="'Повторите пароль'"
            :is-input-required="true"
            :input-type="'password'"
            :error-text="repeatPasswordError"
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

  &__form {
    position: relative;
  }

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
