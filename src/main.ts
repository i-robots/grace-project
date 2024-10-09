import { createApp } from 'vue'
import { createWebHistory, createRouter } from "vue-router";
import Home from './views/Home.vue'
import { createI18n } from 'vue-i18n'
// import "@fortawesome/fontawesome-free/css/all.min.css";

import './style.css'
import App from './App.vue'
import './assets/styles.css';
import { languages } from './locales';

const i18n = createI18n({
  legacy: false,
  locale: 'am',
  fallbackLocale: 'en',
  messages: languages,
})

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

createApp(App).use(i18n).use(router).mount('#app')
