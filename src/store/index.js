import Vue from "vue";
import Vuex from "vuex";

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
      email: "",
      name: "",
    },
    items: [
      {
        text: "Home",
        to: "/home",
        icon: "nest_thermostat_gen_3",
        access: {
          "Super Admin": true,
          Admin: true,
          Viewer: true,
        },
      },
      {
        text: "Events",
        to: "/events",
        icon: "mountain_flag",
        access: {
          "Super Admin": true,
          Admin: true,
          Viewer: true,
        },
      },
      {
        text: "Team",
        to: "/team",
        icon: "groups_3",
        access: {
          "Super Admin": true,
          Admin: true,
          Viewer: true,
        },
      },
      {
        text: "Speakers",
        to: "/speakers",
        icon: "interpreter_mode",
        access: {
          "Super Admin": true,
          Admin: true,
          Viewer: true,
        },
      },
      {
        text: "Partners",
        to: "/partners",
        icon: "partner_exchange",
        access: {
          "Super Admin": true,
          Admin: true,
          Viewer: true,
        },
      },
      {
        text: "Manage user",
        to: "/roles",
        icon: "supervisor_account",
        access: {
          "Super Admin": true,
          Admin: false,
          Viewer: false,
        },
      },
      {
        text: "Config",
        to: "/config",
        icon: "tv_options_input_settings",
        access: {
          "Super Admin": true,
          Admin: false,
          Viewer: false,
        },
      },
      {
        text: "Profile",
        to: "/profile",
        icon: "manage_accounts",
        access: {
          "Super Admin": true,
          Admin: true,
          Viewer: true,
        },
      },
    ],
  },
  getters: {
    links: (state) => {
      return state.items;
    },
  },
  mutations: {
    unsub: (state, payload) => (state.unsub = payload),
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: (state) => (state.drawer = !state.drawer),
    roleSet: (state, payload) => (state.role = payload),
    setGeneral: (state, payload) => (state.generalConfig = payload),
    userDetailsSet: (state, payload) => (state.userDetails = payload),
  },
  actions: {},
  modules: {},
});
