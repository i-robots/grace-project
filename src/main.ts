import { createApp } from 'vue'
import { createWebHistory, createRouter } from "vue-router";
import Home from './views/Home.vue'
// import "@fortawesome/fontawesome-free/css/all.min.css";

import './style.css'
import App from './App.vue'
import './assets/styles.css';

const routes = [
  {
    path: "/",
    component: Home,
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app')
