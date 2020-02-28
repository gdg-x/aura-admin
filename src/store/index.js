import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: true,
    isLoggedin:false,
    role:"demo",
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
      },
      {
        text:'Team',
        to: '/team', 
        icon:'mdi-assistant',
      },
      {
        text:'Speakers',
        to: '/speakers', 
        icon:'mdi-assistant',
      },
      {
        text:'Notification',
        to: '/notification', 
        icon:'mdi-assistant',
      },
      {
        text:'Config',
        to: '/config', 
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
    roleSet:(state, payload)=>(state.role = payload),
  },
  actions: {
  },
  modules: {
  }
});
