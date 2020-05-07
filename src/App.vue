<template>
  <v-app class="grey lighten-2">
    <v-snackbar
      v-model="snackWithButtons"
      :timeout="timeout"
      bottom
      left
      class="snack"
    >
      {{ snackWithBtnText }}
      <v-spacer />
      <v-btn dark text color="#00f500" @click.native="refreshApp">{{
        snackBtnText
      }}</v-btn>
      <v-btn icon @click="snackWithButtons = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
    <!-- v-if="$route.meta.requiresAuth" -->
    <AuraAdminToolbar v-if="$route.meta.requiresAuth" />
    <AuraAdminDrawer v-if="$route.meta.requiresAuth" />
    <AuraAdminBottomNav v-if="$route.meta.requiresAuth" />
    <v-content class="fill-height" v-if="isLoading">
      <v-container class="fill-height">
        <v-row justify="center" align="center" class>
          <v-col cols="12" md="12" class="text-center">
            <v-progress-circular
              :width="5"
              :size="50"
              color="indigo"
              indeterminate
            ></v-progress-circular>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <AuraAdminView v-else />
  </v-app>
</template>

<script>
import firebase from "@/config/firebase";
import { mapState, mapMutations } from "vuex";

export default {
  name: "App",
  components: {
    AuraAdminToolbar: () => import("@/components/Core/Toolbar"),
    AuraAdminDrawer: () => import("@/components/Core/Drawer"),
    AuraAdminBottomNav: () => import("@/components/Core/BottomNav"),
    AuraAdminView: () => import("@/components/Core/Views")
  },
  data: () => ({
    refreshing: false,
    registration: null,
    snackBtnText: "",
    snackWithBtnText: "",
    snackWithButtons: false,
    timeout: 25000,
    isLoading: false
  }),
  computed: {
    ...mapState(["generalConfig", "keysandsecurity"])
  },
  created() {
    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener("swUpdated", this.showRefreshUI, { once: true });
    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  },
  mounted() {
    if (firebase.auth.currentUser) {
      
        if (
          Object.keys(this.generalConfig).length <= 2 &&
          Object.keys(this.keysandsecurity).length <= 2
        ) {
          // console.log("not found in vuex")
          this.getDataFromServer();
        } else {
          console.log("data froung in vuex");
        }
    }
  },
  methods: {
    ...mapMutations(["setGeneral", "setKeysAndSecutity"]),
    showRefreshUI(e) {
      this.registration = e.detail;
      this.snackBtnText = "Refresh";
      this.snackWithBtnText = "New version available!";
      this.snackWithButtons = true;
    },
    refreshApp() {
      this.snackWithButtons = false;
      if (!this.registration || !this.registration.waiting) {
        return;
      }
      this.registration.waiting.postMessage("skipWaiting");
    },
    getDataFromServer() {
      this.speakersData = [];
      this.isLoading = true;
      firebase.firestore
        .collection("config")
        .get()
        .then(snapshot => {
          if (snapshot.empty){this.isLoading = false; return}
          snapshot.forEach(doc => {
            if (doc.id == "general") {
              this.setGeneral(doc.data());
            } else if (doc.id == "keysandsecurity") {
              this.setKeysAndSecutity(doc.data());
            }
          });
          this.isLoading = false;
        })
        .catch(err => {
          this.isLoading = false;
          console.log("Error getting documents", err);
        });
    }
  }
};
</script>
