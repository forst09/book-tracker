import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/pages/authentication/LoginPage.vue'
import RegistrationPage from '@/pages/authentication/RegistrationPage.vue'
import IndexPage from '@/pages/index/IndexPage.vue'
import { useAuthStore } from '@/stores/authStore'
import LibraryPage from '@/pages/library/LibraryPage.vue'
import AddBook from '@/pages/addBook/AddBook.vue'
import BookDetail from '@/pages/library/BookDetail.vue'

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
      component: LibraryPage,
      name: 'library',
      meta: {
        layout: 'defaultLayout',
        title: 'Моя библиотека'
      }
    },
    {
      path: '/library/:id',
      component: BookDetail,
      name: 'book-detail',
      meta: {
        layout: 'defaultLayout',
        title: 'Детали книги'
      }
    },
    {
      path: '/add-book',
      component: AddBook,
      name: 'add-book',
      meta: {
        layout: 'defaultLayout',
        title: 'Добавить книгу'
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

  console.log('is auth', authStore.isUserAuth)

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
