import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: true,
    items:[
      {
        text:'Home',
        to: '/home', 
        icon:'mdi-home',
      },
      {
        text:'Events',
        to: '/events', 
        icon:'mdi-assistant',
      }
    ]
  },
  getters:{
    links: (state) => {
      return state.items
    },
  },  
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer),
  },
  actions: {
  },
  modules: {
  }
});
