import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Form from '@/Form'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/form'
    // name: 'Home',
    // component: Home
  },
  {
    path: '/form',
    component: Form
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: About
  }
]

const router = new VueRouter({
  routes
})

export default router
