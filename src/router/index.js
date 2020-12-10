import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../views/pages/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Products from '../views/pages/Products.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'*',
    redirect:'login',
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  //   meta: { requiresAuth: true },
  // },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/admin',
    name: 'Home',
    component: Dashboard,
    children: [
      {
        path: 'products',
        name: 'Products',
        component: Products,
        meta: { requiresAuth: true },
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
