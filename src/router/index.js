import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/pages/authentication/LoginPage.vue'
import RegistrationPage from '@/pages/authentication/RegistrationPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/',
      component: RegistrationPage
    },
  ],
})

export default router
