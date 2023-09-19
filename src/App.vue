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
    <AuraAdminBottomNav
      v-if="$route.meta.requiresAuth && $route.meta.bottomVisible"
    />
    <v-main class="fill-height" v-if="isLoading">
      <v-container class="fill-height">
        <v-row justify="center" align="center" class>
          <v-col cols="12" md="12" class="text-center">
            <v-progress-circular
              :width="5"
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <AuraAdminView v-else />
  </v-app>
</template>

<script>
import firebase from "@/config/firebase";
import { mapState, mapMutations } from "vuex";
import UserService from "@/services/UsersServices";
import TeamService from "@/services/TeamServices";


export default {
  name: "App",
  components: {
    AuraAdminToolbar: () => import("@/components/Core/Toolbar"),
    AuraAdminDrawer: () => import("@/components/Core/Drawer"),
    AuraAdminBottomNav: () => import("@/components/Core/BottomNav"),
    AuraAdminView: () => import("@/components/Core/Views"),
  },
  data: () => ({
    refreshing: false,
    registration: null,
    snackBtnText: "",
    snackWithBtnText: "",
    snackWithButtons: false,
    timeout: 25000,
    addFirstTime: false,
    isLoading: false,
  }),
  computed: {
    ...mapState(["generalConfig", "role", "appVersion"]),
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
  async mounted() {
    if (this.isLoggedIn()) {
      if (this.role.length <= 0) await this.getData();

      Object.keys(this.generalConfig).length <= 2
        ? await this.getDataFromServer()
        : console.log("data froung in vuex");
    }

    console.log("Current App version", this.appVersion)
  },
  methods: {
    ...mapMutations([
      "setGeneral",
      "roleSet",
      "userDetailsSet",
    ]),
    isLoggedIn() {
      if (firebase.auth.currentUser) return true;
      else return false;
    },
    showRefreshUI(e) {
      this.registration = e.detail;
      this.snackBtnText = "Refresh";
      this.snackWithBtnText = "New version available!";
      this.snackWithButtons = true;
    },
    refreshApp() {
      this.snackWithButtons = false;
      if (!this.registration || !this.registration.waiting) return;
      this.registration.waiting.postMessage("skipWaiting");
    },
    getData() {
      this.isLoading = true;
      UserService.getUserRole().then(async (res) => {
        if (res.success) {
          if (!res.exists) {
            alert("You have been Removed :(");
            await firebase.auth.currentUser.delete();
            await firebase.auth.signOut();
            this.isLoading = false;
            return;
          }

          if (res.data.disabled) {
            alert("You have been disabled");
            await firebase.auth.signOut();
            this.isLoading = false;
            return;
          }

          this.roleSet(res.data.userType);
          await TeamService.getTeamMemberDetails(res.data.id)
            .then((res) => {
              if (res.isFound) {
                this.userDetailsSet(res.data);
              }
              this.isLoading = false;
            })
            .catch((e) => {
              console.log(e);
            });
          this.isLoading = false;
        } else {
          alert("Something went wrong");
          await firebase.auth.signOut();
          this.isLoading = false;
        }
      });
    },

    getDataFromServer() {
      this.speakersData = [];
      this.isLoading = true;
      firebase.firestore
        .collection("config")
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            this.isLoading = false;
            return;
          }
          snapshot.forEach((doc) => {
            if (doc.id == "general") {
              this.setGeneral(doc.data());
            }
          });
          this.isLoading = false;
        })
        .catch((err) => {
          this.isLoading = false;
          console.log("Error getting documents", err);
        });
    },
  },
};
</script>
