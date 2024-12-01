import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/pay',
      name:'pay',
      component:() => import('../views/PayView.vue'),
    },    
    {
      path: '/excel',
      name:'excel',
      component:() => import('../views/ExcelView.vue'),
    }, 
    {
      path: '/error',
      name:'error',
      component:() => import('../views/ErrorView.vue'),
    },
  ],
})

export default router
