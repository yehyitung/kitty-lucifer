import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

//前台頁面
import CustomerOrder from '../views/pages/CustomerOrder.vue'
import Login from '../views/pages/Login.vue'
import CustomerCheckout from '../views/pages/CustomerCheckout.vue'

//後台頁面
import Dashboard from '../views/Dashboard.vue'
import Products from '../views/pages/Products.vue'
import Orders from '../views/pages/Orders.vue'
import Coupons from '../views/pages/Coupons.vue'


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
        path: 'coupons',
        name: 'Coupons',
        component: Coupons,
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
      {
        path: 'customer-checkout/:orderId',
        name: 'CustomerCheckout',
        component: CustomerCheckout,
      },
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
