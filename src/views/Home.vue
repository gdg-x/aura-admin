<template>
  <v-main class="pa-0 ma-0">
    <v-container fluid>
      <!-- <v-row class="mb-0">
        <v-col class>
          <h1 class="google-font d-none d-sm-none d-md-block">Dashboard</h1>
          <p class="google-font d-block d-sm-none mb-0">Dashboard</p>
        </v-col>
      </v-row> -->

      <v-row class="mt-0 pt-0" justify="center" align="center">
        <v-col
          class="ma-3 px-5 mt-0"
          style="
            background: #bbdefb;
            border: 1px solid #bbdefb;
            border-radius: 12px;
          "
        >
          <v-container class="mb-0 py-0">
            <v-row>
              <v-col md="12" class="my-0 py-6">
                <h1 class="google-font mb-0" style="color: #3f51b5">
                  Welcome
                  {{
                    (userDetails.name && userDetails.name.split(" ")[0]) || ""
                  }}!
                </h1>
                <p class="google-font mb-0">Manage your community</p>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>

      <v-row class="px-2">
        <!-- Events -->
        <v-col class="pa-1" md="3" sm="6" lg="3" cols="6" v-for="(item, index) in summeryData" :key="index">
          <div
            style="
              border-radius: 12px;
              background: white;
            "
          >
            <v-container class="py-0">
              <v-row justify="center" align="center">
                <v-col
                  md="2"
                  lg="2"
                  class="text-center d-none d-sm-none d-md-block"
                >
                  <v-icon
                    class="my-auto mx-auto"
                    color="primary"
                    style="font-size: 200%"
                    >{{ item.icon }}</v-icon
                  >
                </v-col>
                <v-col md="6" lg="6">
                  <p class="google-font my-0">{{item.name}}</p>
                  <p
                    class="google-font my-0"
                    v-on:click="goToRoute(item.to)"
                    style="font-size: 80%; cursor: pointer; user-select: none"
                  >
                    View All {{item.name}}
                  </p>
                </v-col>
                <v-col md="4" lg="4" class="text-center">
                  <!-- <v-progress-circular
                    indeterminate
                    v-if="eventLoader"
                    class="my-4"
                    color="primary"
                  ></v-progress-circular> -->
                  <p class="google-font my-0" style="font-size: 280%">
                    {{ item.count }}
                  </p>     
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-col>
        <!-- Events -->
   
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
// @ is an alias to /src
import firebase from "@/config/firebase";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {},
  data: () => ({
    alert: true,
    userEmail: "",
    teamData: [],
    teamLoader: true,
    summeryData:[],
    speakersData: [],
    speakersLoader: true,
    partnersData: [],
    partnersLoader: true,
    customEventData: [],
    eventLoader: true,
  }),
  computed: {
    ...mapState(["userDetails"]),
  },
  mounted() {
    if (firebase.auth.currentUser) {
      this.userEmail = firebase.auth.currentUser.email;
      this.GetAllTeam();
      this.GetAllSpeakers();
      this.GetAllPartners();
      this.GetAllCustomEvents();
    } else {
      this.$router.replace("login");
    }
  },
  methods: {
    logout() {
      firebase.auth.signOut().then(() => {
        this.$router.replace("/login");
      });
    },
    goToRoute(path) {
      this.$router.push(path);
    },
    GetAllTeam() {
      this.teamLoader = true;
      this.teamData = [];
      firebase.firestore
        .collection("team")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.teamData.push(doc.data());
          });
          this.summeryData.push({
            name:'Team',
            count: this.teamData.length,
            icon: 'mdi-nature-people',
            to:'/team'
          })
          this.teamLoader = false;
        })
        .catch((err) => {
          console.log("Error getting documents", err);
          this.teamLoader = false;
        });
    },
    GetAllSpeakers() {
      this.speakersLoader = true;
      this.speakersData = [];
      firebase.firestore
        .collection("Speakers")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.speakersData.push(doc.data());
          });
          this.summeryData.push({
            name:'Speakers',
            count: this.speakersData.length,
            icon: 'mdi-account-multiple',
            to:'/speakers'
          })
          this.speakersLoader = false;
        })
        .catch((err) => {
          console.log("Error getting documents", err);
          this.speakersLoader = false;
        });
    },
    GetAllPartners() {
      this.partnersLoader = true;
      this.partnersData = [];
      firebase.firestore
        .collection("partners")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.partnersData.push(doc.data());
          });
          this.summeryData.push({
            name:'Partners',
            count: this.partnersData.length,
            icon: 'mdi-toaster-oven',
            to:'/partners'
          })
          this.partnersLoader = false;
        })
        .catch((err) => {
          console.log("Error getting documents", err);
          this.partnersLoader = false;
        });
    },
    GetAllCustomEvents() {
      this.eventLoader = true;
      firebase.firestore
        .collection("events")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.customEventData.push(doc.data());
          });
          this.summeryData.push({
            name:'Events',
            count: this.customEventData.length,
            icon: 'mdi-assistant',
            to:'/events'
          })
          this.eventLoader = false;
        })
        .catch((err) => {
          this.eventLoader = false;
          console.log("Error getting documents", err);
        });
    },
  },
};
</script>
