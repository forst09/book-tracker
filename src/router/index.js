import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/pages/authentication/LoginPage.vue'
import RegistrationPage from '@/pages/authentication/RegistrationPage.vue'
import IndexPage from '@/pages/index/IndexPage.vue'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: LoginPage,
      name: 'login',
      meta: {
        layout: 'authLayout'
      }
    },
    {
      path: '/registration',
      component: RegistrationPage,
      name: 'registration',
      meta: {
        layout: 'authLayout'
      }
    },
    {
      path: '/library',
      component: RegistrationPage,
      name: 'library',
      meta: {
        layout: 'defaultLayout'
      }
    },
    {
      path: '/add-book',
      component: RegistrationPage,
      name: 'add-book',
      meta: {
        layout: 'defaultLayout'
      }
    },
    {
      path: '/',
      component: IndexPage,
      name: 'index',
      meta: {
        layout: 'defaultLayout',
        title: 'Главная'
      }
    }
  ],
});

router.beforeEach(async (to, from) => {

  const authStore = useAuthStore();

  console.log(authStore.isUserAuth)

  if (!authStore.isUserAuth && to.name !== 'login' && to.name !== 'registration') {
    return {
      name: 'login'
    }
  }
  if (authStore.isUserAuth && (to.name === 'login' || to.name === 'registration') && to.name !== 'index') {
    return {
      name: 'index'
    }
  }
})

export default router
