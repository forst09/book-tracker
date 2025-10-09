import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)

const authStore = useAuthStore();

// try {
//     authStore.setUserError(null)
await authStore.getCurrentUser()
// } catch (error) {
//     authStore.setUserError(error)
// }

app.use(router)

app.mount('#app')
