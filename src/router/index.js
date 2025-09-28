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
      name: 'login'
    },
    {
      path: '/registration',
      component: RegistrationPage,
      name: 'registration'
    },
    {
      path: '/',
      component: IndexPage,
      name: 'index'
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
})

export default router
