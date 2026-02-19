import { createRouter, createWebHistory } from 'vue-router'
// import Connexion from '/src/views/Connexion.vue'
import Connexion from '@/views/connexion.vue'
import Inscription from '@/views/Inscription.vue'
import Calendar from '@/views/Calendar.vue'
import Notfound from '@/views/Notfound.vue'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'connexion',
    component: Connexion,
    meta: { hideNavbar: true }
  },
  {
    path: '/home',
    name: 'home',
    component: Calendar,
    meta: { requiresAuth: true },
  },
  {
    path: '/homeCalendar',
    name: 'homeCalendar',
    component: Home,
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: Inscription,
    meta: { hideNavbar: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: Notfound,
  },
]



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
