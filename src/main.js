import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)

const authStore = useAuthStore();
await authStore.getCurrentUser()

app.use(router)

app.mount('#app')
