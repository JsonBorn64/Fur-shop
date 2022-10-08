import { createApp } from 'vue'
import './style.css'
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.js'
import './leafletFullScreen/Control.FullScreen.css'
import './leafletFullScreen/Control.FullScreen.js'
import App from './App.vue'
import router from './router/router'
import store from './store'

createApp(App)
            .use(router)
            .use(store)
            .mount('#app')
