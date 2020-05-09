<template>
  <v-app-bar app fixed clipped-left class="white black--text">
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title class="google-font ml-n5"
      >{{ generalConfig.name || "Community Name" }} - Aura Admin
      3.0</v-toolbar-title
    >
    <v-spacer></v-spacer>
    <offline @detected-condition="handleConnectivityChange"></offline>

    <!-- <p>los</p> -->
    <v-toolbar-title
      v-if="isOffline"
      style="border:1px solid red;border-radius:6px;color:red;font-size:90%"
      class="google-font px-2"
      >Offline</v-toolbar-title
    >

    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      class="elevation-0"
      offset-y
      transition="slide-y-transition"
      bottom
    >
      <template v-slot:activator="{ on:menu }">
          <v-tooltip bottom>
              <template v-slot:activator="{ on: tooltip }">
                <v-avatar size="36">
                    <img  v-on="{ ...tooltip, ...menu }" :src="(userDetails.image && userDetails.image.length>0)?userDetails.image:require('@/assets/img/default_avatar.jpg')" alt="John" />
                </v-avatar>
              </template>
              <span>Profile Settings</span>
          </v-tooltip>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img :src="(userDetails.image && userDetails.image.length>0)?userDetails.image:require('@/assets/img/default_avatar.jpg')" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{userDetails.name || "User-Name"}}</v-list-item-title>
              <v-list-item-subtitle>{{ userDetails.email || "User-Email"}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn icon>
                <v-icon>mdi-account-circle</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item v-on:click="logout">
            <v-list-item-action>
                <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-action>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>

    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" v-on:click="logout">
          <v-icon>mdi-logout-variant</v-icon>
        </v-btn>
      </template>
      <span>Logout</span>
    </v-tooltip>
  </v-app-bar>
</template>
<script>
import offline from "v-offline";
import firebase from "@/config/firebase";
import { mapGetters, mapState, mapMutations } from "vuex";
export default {
  components: {
    offline,
  },
  name: "Toolbar",
  data: () => ({
    isOffline: false,
    menu: false,
  }),
  computed: {
    ...mapState(["generalConfig","userDetails"]),
    ...mapGetters(["links"]),
  },
  methods: {
    ...mapMutations(["toggleDrawer", "setGeneral", "setKeysAndSecutity"]),
    onClick(e, item) {
      e.stopPropagation();
      if (item.to || !item.href) return;
      this.$vuetify.goTo(item.href);
    },
    logout() {
      firebase.auth.signOut().then(() => {
        localStorage.removeItem("generalconfig");
        localStorage.removeItem("keysandsecurity");
        this.setGeneral({});
        this.setKeysAndSecutity({});
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
