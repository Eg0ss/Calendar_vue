import { createRouter, createWebHistory } from 'vue-router'
import Connexion from '/src/views/Connexion.vue'
import Inscription from '@/views/Inscription.vue'
import Calendar from '@/views/Calendar.vue'
import Notfound from '@/views/Notfound.vue'

const routes = [
  {
    path: '/',
    name: 'connexion',
    component: Connexion,
  },
  {
    path: '/home',
    name: 'home',
    component: Calendar,
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: Inscription,
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
