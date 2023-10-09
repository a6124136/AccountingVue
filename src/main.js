// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp({
data() {
    return {
    count: 0
    }
}
})
createApp(App).mount('#app')
