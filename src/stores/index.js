import Vue from 'vue';
import Vuex from 'vuex';
import Axios from "axios";
let VUE_APP_API="https://api.nbadigital.tech/v1/nba-hotel/"
// let VUE_APP_API="https://api.nbadigital.tech/v1/nba-hotel/"

Vue.use(Vuex,Vue,Axios,VUE_APP_API);

const store = new Vuex.Store({
  state () {
    return {
      user: null
    }
  },
  mutations: {
    setUser (state,user) {
      state.user=user;
    }
  },

  actions: {

  },

  getters: {
    
  },
});

export default store;