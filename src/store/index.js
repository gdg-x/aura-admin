import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: true,
    isLoggedin: false,
    role: "",
    userDetails:{},
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
        access: {
          "Super Admin": true,
          "Admin": true,
          "Viewer":true
        }
      },
      {
        text: 'Events',
        to: '/events',
        icon: 'mdi-assistant',
        access: {
          "Super Admin": true,
          "Admin": true,
          "Viewer":true
        }
      },
      {
        text: 'Team',
        to: '/team',
        icon: 'mdi-nature-people',
        access: {
          "Super Admin": true,
          "Admin": true,
          "Viewer":true
        }
      },
      {
        text: 'Speakers',
        to: '/speakers',
        icon: 'mdi-account-multiple',
        access: {
          "Super Admin": true,
          "Admin": true,
          "Viewer":true
        }
      },
      {
        text: 'Partners',
        to: '/partners',
        icon: 'mdi-toaster-oven',
        access: {
          "Super Admin": true,
          "Admin": true,
          "Viewer":true
        }
      },
      // {
      //   text: 'Email',
      //   to: '/emails',
      //   icon: 'mdi-email-outline',
      //   access: {
      //     "Super Admin": true,
      //     "Admin": true,
      //     "Viewer":false
      //   }
      // },
      {
        text: 'User Manangment',
        to: '/roles',
        icon: 'mdi-account-group',
        access: {
          "Super Admin": true,
          "Admin": false,
          "Viewer":false
        }
      },
      {
        text: 'Push Notifications',
        to: '/notification',
        icon: 'mdi-bell',
        access: {
          "Super Admin": true,
          "Admin": true,
          "Viewer":false
        }
      },
      {
        text: 'Config',
        to: '/config',
        icon: 'mdi-widgets',
        access: {
          "Super Admin": true,
          "Admin": false,
          "Viewer":false
        }
      },
      {
        text: 'Profile',
        to: '/profile',
        icon: 'mdi-account-circle',
        access: {
          "Super Admin": true,
          "Admin": true,
          "Viewer":true
        }
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
    userDetailsSet:(state, payload)=>(state.userDetails = payload),
    setKeysAndSecutity:(state, payload)=>(state.keysandsecurity= payload),
  },
  actions: {},
  modules: {}
});