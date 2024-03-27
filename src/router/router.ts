import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../pages/index.vue';
import Hello from '../components/HelloWorld.vue'
import About from '../components/About.vue'
import Login from '../components/Login.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'hello',
    component: Hello
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;



/*
npm install vue-router@4
 crear archivo router.ts en la raiz src
 import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;


en el archivo main.ts agregar

import router from './router';

app.use(router)

*/
