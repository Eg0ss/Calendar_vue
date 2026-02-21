import { createRouter, createWebHistory } from 'vue-router'
// import Connexion from '/src/views/Connexion.vue'
import Connexion from '@/views/connexion.vue'
import Inscription from '@/views/Inscription.vue'
import Calendar from '@/views/Calendar.vue'
import Notfound from '@/views/Notfound.vue'
import Home from '@/views/Home.vue'
import { authservice } from '@/services/authservices'

const routes = [
  {
    path: '/',
    name: 'connexion',
    component: Connexion,
    meta: { hideNavbar: true },
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
    meta: { requiresAuth: true },
  },
  {
    path: '/inscription',
    name: 'inscription',
    component: Inscription,
    meta: { hideNavbar: true },
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

router.beforeEach((to, from, next) => {
  const isAuth = authservice.isAuthenticated()

  // route protégée
  if (to.matched.some(r => r.meta.requiresAuth) && !isAuth) {
    return next({ path: '/' })
  }

  // utilisateur connecté qui va sur login
  if (to.path === '/' && isAuth) {
    return next({ path: '/homeCalendar' })
  }

  next()
})


export default router
