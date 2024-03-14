<template>
  <v-app-bar
    app
    fixed
    clipped-left
    class="white black--text"
    flat
    color="#F5F8FC"
  >
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title class="google-font ml-n5">
      {{ generalConfig.name || "Community Name" }} - Aura Admin {{appVersion}}
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <offline @detected-condition="handleConnectivityChange"></offline>

    <!-- <p>los</p> -->
    <v-toolbar-title
      v-if="isOffline"
      style="
        border: 1px solid red;
        border-radius: 6px;
        color: red;
        font-size: 90%;
      "
      class="google-font px-2 mx-1"
      >Offline</v-toolbar-title
    >

   <AppProfileMenuVue :userDetails="userDetails"/>
  </v-app-bar>
</template>
<script>

import offline from "v-offline";
import firebase from "@/config/firebase";
import { mapGetters, mapState, mapMutations } from "vuex";
import AppProfileMenuVue from './AppProfileMenu.vue';
export default {
  name: "AppToolbar",
  components: {
    offline,
    AppProfileMenuVue
  },
  data: () => ({
    isOffline: false,
    menu: false,
    model: "tab-2",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  }),
  computed: {
    ...mapState(["generalConfig", "userDetails", "appVersion"]),
    ...mapGetters(["links"]),
  },
  methods: {
    ...mapMutations([
      "toggleDrawer",
      "setGeneral",
      "userDetailsSet",
      "roleSet",
    ]),
    onClick(e, item) {
      e.stopPropagation();
      if (item.to || !item.href) return;
      this.$vuetify.goTo(item.href);
    },
    logout() {
      firebase.auth.signOut().then(() => {
        this.setGeneral({});
        this.userDetailsSet({});
        this.roleSet("");
        this.$router.replace("/login");
      });
    },
    handleConnectivityChange(status) {
      if (status === true) {
        this.isOffline = false;
      } else {
        this.isOffline = true;
      }
    },
  },
};
</script>