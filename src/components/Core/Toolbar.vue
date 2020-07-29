<template>
  <v-app-bar app fixed clipped-left class="white black--text" style="box-shadow: 0 2px 6px 0 rgba(0,0,0,.12), inset  0 -1px 0 0 #dadce0">
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title class="google-font ml-n5">
      {{ generalConfig.name || "Community Name" }} - Aura Admin
      3.1
    </v-toolbar-title>
    

    <v-spacer></v-spacer>
    <offline @detected-condition="handleConnectivityChange"></offline>

    <!-- <p>los</p> -->
    <v-toolbar-title
      v-if="isOffline"
      style="border:1px solid red;border-radius:6px;color:red;font-size:90%"
      class="google-font px-2 mx-1"
    >Offline</v-toolbar-title>

    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="100"
      :max-width="320"
      class="elevation-0"
      offset-y
      transition="slide-y-transition"
      bottom
    >
      <template v-slot:activator="{ on:menu }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-avatar size="36" style="cursor: pointer;">
              <img
                v-on="{ ...tooltip, ...menu }"
                :src="(userDetails.image && userDetails.image.length>0)?userDetails.image:require('@/assets/img/default_avatar.jpg')"
                alt="John"
              />
            </v-avatar>
          </template>
          <span>Profile Settings</span>
        </v-tooltip>
      </template>

      <v-card elevation="0">
        <v-container fluid>
          <v-row class justify="center" align="center">
            <v-col cols="12" class="ma-0 pb-0 text-center">
              <v-avatar size="100">
                <img
                  :src="(userDetails.image && userDetails.image.length>0)?userDetails.image:require('@/assets/img/default_avatar.jpg')"
                />
              </v-avatar>
            </v-col>
            <v-col cols="12" class="text-center ma-0 pa-0">
              <v-list>
                <v-list-item-content>
                  <v-list-item-title class="google-font">{{userDetails.name || "User-Name"}}</v-list-item-title>
                  <v-list-item-subtitle class="google-font">{{ userDetails.email || "User-Email"}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list>
            </v-col>
            <v-col cols="12" class="text-center ma-0 pa-0">
              <v-btn small to="/profile" class="google-font text-none" rounded color="#3c4043" outlined>Manage Your Profile</v-btn>
            </v-col>
            <v-col cols="12" class=" px-0">
        <v-divider></v-divider>

            </v-col>
            <v-col cols="12" class="px-0 text-center">
              <v-btn @click="logout" class="google-font grey--text darken-3 text-none" outlined color="grey"><v-icon left>mdi-logout-variant</v-icon> Signout from AURA</v-btn>

            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-menu>


    
  </v-app-bar>
</template>
<script>
import offline from "v-offline";
import firebase from "@/config/firebase";
import { mapGetters, mapState, mapMutations } from "vuex";
export default {
  components: {
    offline
  },
  name: "Toolbar",
  data: () => ({
    isOffline: false,
    menu: false,
    model: 'tab-2',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  }),
  computed: {
    ...mapState(["generalConfig", "userDetails"]),
    ...mapGetters(["links"])
  },
  methods: {
    ...mapMutations(["toggleDrawer", "setGeneral", "setKeysAndSecutity","userDetailsSet","roleSet"]),
    onClick(e, item) {
      e.stopPropagation();
      if (item.to || !item.href) return;
      this.$vuetify.goTo(item.href);
    },
    logout() {
      firebase.auth.signOut().then(() => {
        this.setGeneral({});
        this.setKeysAndSecutity({});
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
    }
  }
};
</script>
