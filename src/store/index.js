import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: true,
    appVersion: process.env.VUE_APP_VERSION,
    isLoggedin: false,
    role: "",
    unsub: {},
    userDetails: {},
    generalConfig: {
      email: '',
      name: ''
    },
    items: [{
        text: 'Home',
        to: '/home',
        icon: 'mdi-home-outline',
        access: {
          "Super Admin": true,
          "Admin": true,
          "Viewer": true
        }
      },
      {
        text: 'Events',
        to: '/events',
        icon: 'mdi-monitor-dashboard',
        access: {
          "Super Admin": true,
          "Admin": true,
          "Viewer": true
        }
      },
      {
        text: 'Team',
        to: '/team',
        icon: 'mdi-card-account-details-outline',
        access: {
          "Super Admin": true,
          "Admin": true,
          "Viewer": true
        }
      },
      {
        text: 'Speakers',
        to: '/speakers',
        icon: 'mdi-account-supervisor-outline',
        access: {
          "Super Admin": true,
          "Admin": true,
          "Viewer": true
        }
      },
      {
        text: 'Partners',
        to: '/partners',
        icon: 'mdi-toaster-oven',
        access: {
          "Super Admin": true,
          "Admin": true,
          "Viewer": true
        }
      },
      {
        text: 'User Manangment',
        to: '/roles',
        icon: 'mdi-account-group-outline',
        access: {
          "Super Admin": true,
          "Admin": false,
          "Viewer": false
        }
      },
      {
        text: 'Config',
        to: '/config',
        icon: 'mdi-widgets-outline',
        access: {
          "Super Admin": true,
          "Admin": false,
          "Viewer": false
        }
      },
      {
        text: 'Profile',
        to: '/profile',
        icon: 'mdi-account-circle-outline',
        access: {
          "Super Admin": true,
          "Admin": true,
          "Viewer": true
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
    unsub: (state, payload) => (state.unsub = payload),
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer),
    roleSet: (state, payload) => (state.role = payload),
    setGeneral: (state, payload) => (state.generalConfig = payload),
    userDetailsSet: (state, payload) => (state.userDetails = payload)
  },
  actions: {},
  modules: {}
});