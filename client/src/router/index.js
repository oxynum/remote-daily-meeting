import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import Dashboard from '../views/Dashboard.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Sign Up',
    component: SignUp,
    meta: {
      hiddenForAuth: true
    }
  },
  {
    path: '/login',
    name: 'Log In',
    component: LogIn,
    meta: {
      hiddenForAuth: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  var unsub
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log(to.path + ': requires auth')
    unsub = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        next({
          path: '/login'
        })
      } else {
        next()
      }
    })
    unsub()
  } else if (to.matched.some(record => record.meta.hiddenForAuth)) {
    unsub = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        next(false)
      } else {
        next()
      }
    })

    unsub()
  } else {
    next()
  }
})

export default router
