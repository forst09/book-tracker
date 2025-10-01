<script setup>
import UserIcon from '@/assets/icons/user.svg'
import Logout from '@/assets/icons/logout.svg'

const props = defineProps({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
})

const emits = defineEmits(['handleLogoutClick'])
</script>

<template>
  <div :class="$style.user">
    <div :class="$style.user__icon">
      <UserIcon :class="$style['user__icon-icon']" />
    </div>
    <div :class="$style.user__info">
      <span :class="['ellipsis', $style.user__name]">{{ props.userName }}</span>
      <span :class="['ellipsis', $style.user__email]">{{ props.userEmail }}</span>
    </div>
    <button
      type="button"
      :class="$style['user__logout-btn']"
      aria-label="Выйти из аккаунта"
      @click="emits('handleLogoutClick')"
    >
      <Logout :class="$style['user__logout-icon']" />
    </button>
  </div>
</template>

<style lang="scss" module>
.user {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: var(--color-grey-97);
  border-radius: 14px;

  &__icon,
  &__logout-btn {
    flex-shrink: 0;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    aspect-ratio: 1;
    border-radius: 50%;
    background: linear-gradient(
      90deg,
      var(--color-violet-64, #ad46ff) 0%,
      var(--color-rose-58, #f6339a) 100%
    );
  }

  &__icon-icon {
    width: 20px;
    aspect-ratio: 1;
    stroke: var(--white);
    stroke-width: 1.7;
  }

  &__info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
  }

  &__name {
    font-size: 16px;
    line-height: 1.54;
    font-weight: 500;
    color: var(--black);
  }

  &__email {
    overflow: hidden;
    font-size: 12px;
    line-height: 1.33;
  }

  &__email,
  &__name {
    line-clamp: 1;
    -webkit-line-clamp: 1;
  }

  &__logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    aspect-ratio: 1;
    background-color: transparent;
    border-radius: 50%;
    border: unset;
    cursor: pointer;

    @include hover {
      .user__logout-icon {
        stroke: var(--black);
      }
    }
  }

  &__logout-icon {
    width: 16px;
    aspect-ratio: 1;
    stroke: var(--gray5);
    stroke-width: 1.3;
    transition: stroke 0.3s ease;
  }
}
</style>
