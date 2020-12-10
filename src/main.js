import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import 'bootstrap'
import App from './App.vue' 
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueAxios, axios);

new Vue({
  created(){
    const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products`;
    console.log(process.env.VUE_APP_APIPATH, process.env.VUE_APP_CUSTOMPATH);
    this.$http.get(api).then((response) => {
      console.log(response.data)
    })
  },
  router,
  store,
  render: h => h(App)
})
.$mount('#app')
