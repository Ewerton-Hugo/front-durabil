// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/",
    redirect: { path: "/login" }, // redirect property
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {path:"/login",
      name:"Login",
      component: () => import('@/views/Login.vue')},
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        props: (route) => ({ searchQuery: route.query.searchQuery || '' }), // Passe o valor da query como uma prop
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import( '@/views/Register.vue'),
      },
      {
        path: 'update',
        name: 'Update',
        component: () => import( '@/views/Update.vue'),
      },
      {
        path: 'view',
        name: 'View',
        component: () => import( '@/views/View.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
