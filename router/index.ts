import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/index.vue'),
    },
    {
      path: '/film/:id',
      name: 'film',
      component: () => import('@/pages/film/[id].vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/pages/profile.vue'),
    },
  ],
});

export default router;
