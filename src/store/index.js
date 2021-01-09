import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
  },
  mutations: {
  },
  actions: {
    //payload 載荷
    updateLoading(context, status){

    },
  },
  modules: {
  }
})
