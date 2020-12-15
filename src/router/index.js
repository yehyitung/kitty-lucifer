import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../views/pages/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Products from '../views/pages/Products.vue'
import CustomerOrder from '../views/pages/CustomerOrder.vue'

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
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: 'products',
        name: 'Products',
        component: Products,
        meta: { requiresAuth: true },
      },
    ]
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: 'customer-order',
        name: 'CustomerOrder',
        component: CustomerOrder,
      },
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
