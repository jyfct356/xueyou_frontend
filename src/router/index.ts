import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/HomeView.vue'),
    },
    
    
    {
      path: '/:pathMatch(.*)*', // 捕获所有未匹配的路径
      component: () => import('@/components/404.vue'),
    }
  ],
})

export default router
