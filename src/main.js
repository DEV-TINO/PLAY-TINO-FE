import { createApp } from 'vue'
import App from './App.vue'

import router from './router.js'
import './assets/css/index.css'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const app = createApp(App)
library.add(fas)
library.add(far)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router).mount('#app')