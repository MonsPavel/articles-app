import { createRouter, createWebHistory } from 'vue-router';

import AuthorsPage from '../views/AuthorsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/authors',
      name: 'authors',
      component: AuthorsPage
    },
  ],
});

export default router;
