import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// Import tailwind.css from the assets folder
import './assets/tailwind.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
