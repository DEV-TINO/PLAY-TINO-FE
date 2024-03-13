import { createApp } from 'vue'
import App from './App.vue'

import router from './router.js'
import './assets/css/index.css'
import store from './store'

createApp(App).use(router).use(store).mount('#app')