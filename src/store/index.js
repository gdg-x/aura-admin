import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: true,
    isLoggedin: false,
    role: "demo",
    generalConfig:{
      email:'',
      name:''
    },
    keysandsecurity:{
      meetup:''
    },
    items: [{
        text: 'Home',
        to: '/home',
        icon: 'mdi-home',
      },
      {
        text: 'Events',
        to: '/events',
        icon: 'mdi-assistant',
      },
      {
        text: 'Team',
        to: '/team',
        icon: 'mdi-nature-people',
      },
      {
        text: 'Speakers',
        to: '/speakers',
        icon: 'mdi-account-multiple',
      },
      {
        text: 'Partners',
        to: '/partners',
        icon: 'mdi-toaster-oven',
      },
      {
        text: 'Notification',
        to: '/notification',
        icon: 'mdi-bell',
      },
      {
        text: 'Config',
        to: '/config',
        icon: 'mdi-widgets',
      }
      
    ]
  },
  getters: {
    links: (state) => {
      return state.items;
    },
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer),
    roleSet: (state, payload) => (state.role = payload),
    setGeneral:(state, payload)=>(state.generalConfig = payload),
    setKeysAndSecutity:(state, payload)=>(state.keysandsecurity= payload),
  },
  actions: {},
  modules: {}
});