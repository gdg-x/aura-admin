<template>
  <v-container style="width:95%">
    <v-row class="mb-0">
      <v-col class>
        <h1 class="google-font d-none d-sm-none d-md-block">Dashboard</h1>
        <p class="google-font d-block d-sm-none mb-0">Dashboard</p>
      </v-col>
    </v-row>

    <v-row class="mt-0 pt-0" justify="center" align="center">
      <v-col
        class="ma-3 px-5 mt-0"
        style="background:#BBDEFB;border:1px solid #BBDEFB;border-radius:12px;"
      >
        <v-container class="mb-5 py-5">
          <v-row class="mb-5">
            <v-col md="9" class="my-0 py-0">
              <h1 class="google-font mb-0" style="color:#3F51B5">Welcome {{userDetails.name && userDetails.name.split(" ")[0] || ""}}!</h1>
              <p class="google-font mb-0">Manage your community</p>
            </v-col>
            <v-col md="3" style="margin-top:-185px" class="d-none d-sm-none d-md-block">
              <v-img :src="require('@/assets/img/svg/login.svg')"></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <v-row class="px-5" style="margin-top:-80px">
      <v-col class="pa-1" md="3" sm="6" lg="3" cols="6" style>
        <div style="border:1px solid #e0e0e0;border-radius:12px;background:white">
          <v-container class="py-0">
            <v-row justify="center" align="center">
              <v-col md="6" lg="4" class="pa-5 text-center d-none d-sm-none d-md-block">
                <v-icon class="my-auto" color="primary" style="font-size:400%">mdi-assistant</v-icon>
              </v-col>
              <v-col md="6" lg="8" class="pa-5">
                <p class="google-font my-0">Events</p>
                <v-progress-circular indeterminate v-if="eventLoader" class="my-4" color="primary"></v-progress-circular>
                <p v-else class="google-font my-0" style="font-size:280%">{{customEventData.length}}</p>
                <p
                  class="google-font my-0"
                  v-on:click="goToRoute('/events')"
                  style="font-size:80%;cursor: pointer;user-select: none;"
                >View All Events</p>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>

      <v-col class="pa-1" md="3" sm="6" cols="6" lg="3" style>
        <div style="border:1px solid #e0e0e0;border-radius:12px;background:white">
          <v-container class="py-0">
            <v-row justify="center" align="center">
              <v-col md="6" lg="4" class="pa-5 py-auto text-center d-none d-sm-none d-md-block">
                <v-icon class="my-auto" color="primary" style="font-size:400%">mdi-nature-people</v-icon>
              </v-col>
              <v-col md="6" lg="8" class="pa-5">
                <p class="google-font my-0">Team</p>
                <v-progress-circular indeterminate v-if="teamLoader" class="my-4" color="primary"></v-progress-circular>
                <p
                  v-else
                  class="google-font my-0"
                  style="font-size:280%"
                >{{teamData.length?teamData.length:0}}</p>

                <p
                  class="google-font my-0"
                  v-on:click="goToRoute('/team')"
                  style="font-size:80%;cursor: pointer;user-select: none;"
                >View Team</p>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>

      <v-col class="pa-1" md="3" lg="3" style>
        <div style="border:1px solid #e0e0e0;border-radius:12px;background:white">
          <v-container class="py-0">
            <v-row justify="center" align="center">
              <v-col md="6" lg="4" class="pa-5 py-auto text-center d-none d-sm-none d-md-block">
                <v-icon class="my-auto" color="primary" style="font-size:400%">mdi-account-multiple</v-icon>
              </v-col>
              <v-col md="6" lg="8" class="pa-5">
                <p class="google-font my-0">Speakers</p>
                <v-progress-circular
                  indeterminate
                  v-if="speakersLoader"
                  class="my-4"
                  color="primary"
                ></v-progress-circular>
                <p
                  v-else
                  class="google-font my-0"
                  style="font-size:280%"
                >{{speakersData.length?speakersData.length:0}}</p>
                <p
                  class="google-font my-0"
                  v-on:click="goToRoute('/speakers')"
                  style="font-size:80%;cursor: pointer;user-select: none;"
                >View All Speakers</p>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>

      <v-col class="pa-1" md="3" lg="3" style>
        <div style="border:1px solid #e0e0e0;border-radius:12px;background:white">
          <v-container class="py-0">
            <v-row justify="center" align="center">
              <v-col md="6" lg="4" class="pa-5 py-auto text-center d-none d-sm-none d-md-block">
                <v-icon class="my-auto" color="primary" style="font-size:400%">mdi-toaster-oven</v-icon>
              </v-col>
              <v-col md="6" lg="8" class="pa-5">
                <p class="google-font my-0">Partners</p>
                <v-progress-circular
                  indeterminate
                  v-if="partnersLoader"
                  class="my-4"
                  color="primary"
                ></v-progress-circular>
                <p
                  v-else
                  class="google-font my-0"
                  style="font-size:280%"
                >{{partnersData.length?partnersData.length:0}}</p>
                <p
                  class="google-font my-0"
                  v-on:click="goToRoute('/partners')"
                  style="font-size:80%;cursor: pointer;user-select: none;"
                >View All Partners</p>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>
  </v-container>
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
    speakersData: [],
    speakersLoader: true,
    partnersData: [],
    partnersLoader: true,
    customEventData: [],
    eventLoader: true
  }),
  computed: {
    ...mapState(["userDetails"])
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
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.teamData.push(doc.data());
          });
          this.teamLoader = false;
        })
        .catch(err => {
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
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.speakersData.push(doc.data());
          });
          this.speakersLoader = false;
        })
        .catch(err => {
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
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.partnersData.push(doc.data());
          });
          this.partnersLoader = false;
        })
        .catch(err => {
          console.log("Error getting documents", err);
          this.partnersLoader = false;
        });
    },
    GetAllCustomEvents() {
      this.eventLoader = true;
      firebase.firestore
        .collection("events")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.customEventData.push(doc.data());
          });
          this.eventLoader = false;
        })
        .catch(err => {
          this.eventLoader = false;
          console.log("Error getting documents", err);
        });
    }
  }
};
</script>
