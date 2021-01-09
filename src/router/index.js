import Vue from 'vue'
import VueRouter from 'vue-router'

//前台頁面
import Index from '../views/Index.vue'
import Home from '../views/forestage/Home.vue'
import About from '../views/forestage/About.vue'
import AllProducts from '../views/forestage/AllProducts.vue'
import ProductContent from '../views/forestage/ProductContent.vue'
import Cart from '../views/forestage/Cart.vue'
import Contact from '../views/forestage/Contact.vue'

import CustomerOrder from '../views/backstage/CustomerOrder.vue'
import CustomerCheckout from '../views/backstage/CustomerCheckout.vue'

//後台頁面
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Products from '../views/backstage/Products.vue'
import Orders from '../views/backstage/Orders.vue'
import Coupons from '../views/backstage/Coupons.vue'


Vue.use(VueRouter)

const routes = [
  {
    path:'*',
    redirect:'/',
  },
  //前台
  {
    path: '/',
    name: 'Index',
    component: Index,
    children:[
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: 'about',
        name: 'About',
        component: About,
      },
      {
        path: 'all-products',
        name: 'AllProducts',
        component: AllProducts,
      },
      {
        path: 'all-products/:productId',
        name: 'ProductContent',
        component: ProductContent,
      },
      {
        path: 'contact',
        name: 'Contact',
        component: Contact,
      },
    ]
  },
  //後台登入頁
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  //後台
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
    name: 'Dashboard',
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
