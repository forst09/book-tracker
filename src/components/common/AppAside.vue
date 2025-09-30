<script setup>
import AppLogo from '@/components/common/AppLogo.vue'
import UserPreview from '../auth/UserPreview.vue'
import { useAuthStore } from '@/stores/authStore'
import { supabase } from '@/lib/supabaseClient'
import { useRoute, useRouter } from 'vue-router'
import NavigationList from '../navigation/NavigationList.vue'
import HomeIcon from '@/assets/icons/home.svg'
import LibraryIcon from '@/assets/icons/library.svg'
import PlusIcon from '@/assets/icons/plus.svg'

// sign out user
const authStore = useAuthStore()
const router = useRouter()

const route = useRoute()

async function signOut() {
  const { error } = await supabase.auth.signOut()
  console.log('sign out error', error, !error)
  if (!error) {
    authStore.clearUser()

    router.push({ name: 'login' })
  }
  console.log(router)
}

// navigation links
const navigationLinks = [
  {
    name: 'index',
    url: router.resolve({ name: 'index' }).path,
    title: 'Главная',
    icon: HomeIcon,
  },
  {
    name: 'library',
    url: router.resolve({ name: 'library' }).path,
    title: 'Моя библиотека',
    icon: LibraryIcon,
    counter: 4,
  },
  {
    name: 'add-book',
    url: router.resolve({ name: 'add-book' }).path,
    title: 'Добавить книгу',
    icon: PlusIcon,
  },
]
</script>

<template>
  <aside :class="$style.aside">
    <AppLogo :class="$style.aside__logo" />
    <div :class="$style.aside__user">
      <UserPreview
        :user-name="authStore.currentUser.name"
        :user-email="authStore.currentUser.email"
        @handle-logout-click="signOut"
      />
    </div>
    <NavigationList :navigation-arr="navigationLinks" :class="$style.aside__item" />
  </aside>
</template>

<style lang="scss" module>
.aside {
  height: 100vh;
  overflow-y: auto;
  background-color: var(--white);
  width: 319px;

  &__logo {
    padding: 24px 24px 25px;
    border-bottom: 1px solid var(--stroke);
  }

  &__user {
    padding: 16px 16px 17px;
    border-bottom: 1px solid var(--stroke);
  }

  &__item {
    padding: 16px;
  }
}
</style>
