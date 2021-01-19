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
    // redirect: { name: 'Connexion'}
  },
  // {
    // path: '/about',
    // name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
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
  } else {
    next()
  }
})

export default router
