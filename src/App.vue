<template>
  <v-app class="grey lighten-2">
    <v-snackbar v-model="snackWithButtons" :timeout="timeout" bottom left class="snack">
      {{ snackWithBtnText }}
      <v-spacer />
      <v-btn dark text color="#00f500" @click.native="refreshApp">{{ snackBtnText }}</v-btn>
      <v-btn icon @click="snackWithButtons = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
    <!-- v-if="$route.meta.requiresAuth" -->
    <AuraAdminToolbar v-if="$route.meta.requiresAuth" />
    <AuraAdminDrawer v-if="$route.meta.requiresAuth" />
    <AuraAdminBottomNav v-if="$route.meta.requiresAuth" />
    <v-content class="fill-height"  v-if="isLoading">
      <v-container class="fill-height">
        <v-row justify="center" align="center" class>
          <v-col cols="12" md="12" class="text-center">
            <v-progress-circular :width="5" :size="50" color="indigo" indeterminate></v-progress-circular>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <AuraAdminView v-else/>
  </v-app>
</template>

<script>
import AuraAdminToolbar from "@/components/Core/Toolbar";
import AuraAdminDrawer from "@/components/Core/Drawer";
import AuraAdminBottomNav from "@/components/Core/BottomNav";
import AuraAdminView from "@/components/Core/Views";

import firebase from "@/config/firebase";

import { mapState, mapMutations } from 'vuex'

export default {
  name: "App",
  components: {
    AuraAdminToolbar,
    AuraAdminDrawer,
    AuraAdminBottomNav,
    AuraAdminView
  },
  data: () => ({
    refreshing: false,
    registration: null,
    snackBtnText: "",
    snackWithBtnText: "",
    snackWithButtons: false,
    timeout: 6000,
    isLoading:false,
  }),
  computed:{
      ...mapState(['generalConfig',"keysandsecurity"]),
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
      var getGeneralConfigData = localStorage.getItem("generalconfig");
      var getKeysAndSecurity = localStorage.getItem("keysandsecurity");
      // console.log(JSON.parse(getGeneralConfigData));
      if (getGeneralConfigData && getKeysAndSecurity) {
        console.log("Data Found in LocalStorage");
        console.log(this.generalConfig);
        if(Object.keys(this.generalConfig)<=0 && Object.keys(this.keysandsecurity)<=0){
          this.setGeneral(JSON.parse(getGeneralConfigData));
          this.setKeysAndSecutity(JSON.parse(getKeysAndSecurity))
        }
      } else {
        this.getDataFromServer();
      }
    }
  },
  methods: {
    ...mapMutations(['setGeneral','setKeysAndSecutity']),
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
      console.log("calling server");
      this.speakersData = [];
      this.isLoading = true;
      firebase.firestore
        .collection("config")
        .get()
        .then(snapshot => {
          console.log(snapshot);
          var gene = snapshot.docs[3].data();
          var keysa = snapshot.docs[4].data();
          localStorage.setItem('generalconfig', JSON.stringify(gene));
          localStorage.setItem('keysandsecurity', JSON.stringify(keysa));
          this.setGeneral(gene);
          this.setKeysAndSecutity(keysa)
          // snapshot.forEach(doc => {
          //   this.speakersData.push(doc.data());
          //   // this.speakersData = [];
          // });
          this.isLoading = false;
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    }
  }
};
</script>
