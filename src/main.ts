/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router/router';

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

// Components
import App from './App.vue'

// Composables


const app = Vue.createApp(App)
app.use(VueAxios, axios)
app.use(VueSweetalert2)
app.use(router)

registerPlugins(app)

app.mount('#app')
