import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap'
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules';

import App from './App.vue' 
import router from './router'
import store from './store'
import './bus'
import currencyFilter from './filters/currency'

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);


Vue.component('Loading', Loading);
Vue.filter('currency',currencyFilter)

axios.defaults.withCredentials = true;

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

localize('zh_TW', TW);

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
})
.$mount('#app')

router.beforeEach((to, from, next) => {
  // console.log('to', to, 'from', from, 'next', next);
  if(to.meta.requiresAuth){
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      console.log(response.data);
      if(response.data.success){
        next();
      }else{
        next({
          path: '/login',
        })
      }
    })
  }else{
    next();
  }
})


