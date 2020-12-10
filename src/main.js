import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import 'bootstrap'
import App from './App.vue' 
import router from './router'
import store from './store'

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

axios.defaults.withCredentials = true;


new Vue({
  router,
  store,
  render: h => h(App)
})
.$mount('#app')


router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next);
  if(to.meta.requiresAuth){
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    const vm = this;
    axios.post(api).then((response) => {
      console.log(response.data);
      if(response.data.success){
        next();
      }
    })
  }else{
    next({
      path: '/login',
    });
  }
})