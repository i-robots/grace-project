import { createApp } from 'vue'
import { createWebHistory, createRouter } from "vue-router";
import Home from './views/Home.vue';
//@ts-ignore
import Article from './views/article.vue';
import { createI18n } from 'vue-i18n';
// import "@fortawesome/fontawesome-free/css/all.min.css";

import './style.css'
import App from './App.vue'
import ArticleView from './views/article_view.vue';
import ArticleList from './views/article_list.vue';
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
  {
    path: '/post',
    component: Article
  },
  {
    path: '/article/:id',
    component: ArticleView
  },
  {
    path: '/articles',
    component: ArticleList
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(i18n).use(router).mount('#app')
