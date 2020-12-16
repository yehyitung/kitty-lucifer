import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

//前台頁面
import CustomerOrder from '../views/pages/CustomerOrder.vue'
import Login from '../views/pages/Login.vue'

//後台頁面
import Dashboard from '../views/Dashboard.vue'
import Products from '../views/pages/Products.vue'
import Orders from '../views/pages/Orders.vue'
import Cupons from '../views/pages/Cupons.vue'


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
      {
        path: 'orders',
        name: 'Orders',
        component: Orders,
        meta: { requiresAuth: true },
      },
      {
        path: 'cupons',
        name: 'Cupons',
        component: Cupons,
        meta: { requiresAuth: true },
      },
    ]
  },
  {
    path: '/',
    name: 'Home',
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
