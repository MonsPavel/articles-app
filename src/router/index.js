import { createRouter, createWebHistory } from 'vue-router';

import AuthorsPage from '../views/AuthorsPage.vue';
import AuthorDetailsPage from '../views/AuthorDetailsPage.vue';

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
  ],
});

export default router;
