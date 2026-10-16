import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '../views/InicioView.vue'
import ApuestasView from '../views/ApuestasView.vue'
import AccountView from '../views/AccountView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AdminView from '../views/AdminView.vue'

const routes = [
  {
    path: '/',
    name: 'inicio',
    component: InicioView
  },
  {
    path: '/apuestas',
    name: 'apuestas',
    component: ApuestasView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/account',
    name: 'account',
    component: AccountView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Guardia de navegación para proteger la ruta de Administrador
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    // Obtenemos los datos del usuario logueado almacenados en localStorage (o tu estado de sesión)
    const user = JSON.parse(localStorage.getItem('user'))

    if (user && user.isAdmin) {
      // Si el usuario existe y es admin, se le permite el acceso
      next()
    } else {
      // Si no es admin o no está logueado, se redirige al inicio o al login
      alert('Acceso denegado: Se requieren permisos de administrador.')
      next('/login')
    }
  } else {
    next() // Si la ruta no requiere rol de admin, permite el paso normalmente
  }
})

export default router