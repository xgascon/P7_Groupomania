import Vue from 'vue'
import VueRouter from 'vue-router'
import Groupomania from '../views/Groupomania.vue'
import Register from '../views/Register.vue'
import Connexion from '../views/Connexion.vue'
import Profile from '../views/Profile.vue'
import ProfileConsulting from '../views/ProfileConsulting.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Connexion',
    component: Connexion,
    meta : {
      requiresAuth: false
    }
  },
  {
    path: '/groupomania',
    name: 'Groupomania',
    component: Groupomania,
    meta : {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta : {
      requiresAuth: false
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta : {
      requiresAuth: true
    }
  },
  {
    path: '/profileConsulting',
    name: 'ProfileConsulting',
    component: ProfileConsulting,
    meta : { 
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({name: 'Connexion'})
    }
  } else if (localStorage.getItem('token')) {
    next({name: 'Groupomania'})
  } else {
    next()
  }
})


export default router
