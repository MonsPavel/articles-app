import { createRouter, createWebHistory } from 'vue-router';

import AuthorsPage from '../views/AuthorsPage.vue';
import AuthorDetailsPage from '../views/AuthorDetailsPage.vue';
import ArticlePage from '../views/ArticlePage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/authors',
      name: 'authors',
      component: AuthorsPage,
    },
    {
      path: '/authors/:id',
      name: 'author',
      component: AuthorDetailsPage,
    },
    {
      path: '/articles/:id',
      name: 'article',
      component: ArticlePage,
    },
  ],
});

export default router;
