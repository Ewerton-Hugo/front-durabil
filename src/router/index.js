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
      },
      {
        path: 'tabletools',
        name: 'TableTools',
        component: () => import('@/views/PrediosEquipamentos/TableTools.vue'),
      },
      {
        path: 'registerbuildtools',
        name: 'RegisterBuildTools',
        component: () => import('@/views/PrediosEquipamentos/RegisterTools.vue'),
      },
      {
        path: 'updatebuildtools',
        name: 'UpdateBuildTools',
        component: () => import('@/views/PrediosEquipamentos/UpdateTableTools.vue'),
      },
      {
        path: 'viewbuildtools',
        name: 'ViewBuildTools',
        component: () => import('@/views/PrediosEquipamentos/ViewTableTools.vue'),
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
      {
        path: 'tabletest',
        name: 'TableTest',
        component: () => import( '@/views/PredioTeste/TableTeste.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
