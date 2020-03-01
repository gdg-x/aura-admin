<template>
  <v-container fluid>
    <Snakebar
      :message="snakeBarMessage"
      :isShow.sync="isSnakeBarVisible"
      :color="snakeBarColor"
      :timeout="snakeBarTimeOut"
    />
    <v-row>
      <v-col cols="12">
        <v-toolbar class="elevation-1">
          <v-btn
            text
            @click="goToTeam"
            class="ma-0 google-font mb-0"
            style="border-radius:5px;text-transform: capitalize;text-decoration:none;"
          >
            <v-icon left>mdi-arrow-left-thick</v-icon>
            <span>Team</span>
          </v-btn>
          <v-spacer></v-spacer>
          <DeleteTeam :TeamInfo="teamInfo" @RemoveSuceess="showSnakeBar" />
        </v-toolbar>
      </v-col>
    </v-row>
    <v-row justify="center" align="center" class v-if="showLoader">
      <v-col cols="12" md="12" class="text-center">
        <v-progress-circular :width="4" :size="70" color="indigo" indeterminate></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-else-if="!showLoader && !userNotFound">
      <v-col cols="12" md="12" class>
        <v-container fluid>
          <v-row>
            <v-col col="12" sm="5" md="3" class="pa-1 elevation-1 py-5 text-center">
              <v-avatar size="120">
                <img
                  :src="(teamInfo.image.length>0)?teamInfo.image:require('@/assets/img/default_avatar.jpg')"
                  :alt="teamInfo.id"
                />
              </v-avatar>

              <p class="mt-3 mb-0 google-font mb-0" style="font-size:120%">{{teamInfo.name}}</p>
              <p class="mt-1 mb-0 google-font mt-0" style="font-size:100%">{{teamInfo.designation}}</p>

              <v-chip class="mt-2" small>{{teamInfo.role}}</v-chip>

              <br />
              <br />
              <v-chip class="ma-1" v-if="teamInfo.visible" dark label color="green" small>Visible</v-chip>
              <v-chip class="ma-1" v-else label dark color="red" small>Not Visible</v-chip>

              <v-chip class="ma-1" v-if="teamInfo.active" dark label color="green" small>Active</v-chip>
              <v-chip class="ma-1" v-else label dark color="red" small>Not Active</v-chip>

              <br />
              <br />

              <br />
            </v-col>

            <v-col col="12" sm="7" md="9" class="elevation-1 py-5 text-left pa-5">
              <p class="mb-0">
                <b>Bio</b>
              </p>
              <p class="mt-1 mb-0 google-font mt-0" style="font-size:110%">{{teamInfo.bio}}</p>

              <p class="mb-0 mt-3">
                <b>Email</b>
              </p>
              <p class="mt-0 mb-0 google-font mt-0" style="font-size:110%">{{teamInfo.email}}</p>

              <p class="mb-0 mt-3">
                <b>Mobile</b>
              </p>
              <p class="mt-0 mb-0 google-font mt-0" style="font-size:110%">{{teamInfo.mbnumber}}</p>

              <p class="mb-0 mt-3">
                <b>User ID</b>
              </p>
              <p class="mt-0 mb-0 google-font mt-0" style="font-size:110%">{{teamInfo.id}}</p>

              <p class="mb-0 mt-3">
                <b>Social Links</b>
              </p>
              <p class="mt-1 mb-0 google-font mt-0" style="font-size:110%">
                <span
                  style="cursor: pointer;"
                  v-for="(slink,i) in teamInfo.socialLinks"
                  :key="i"
                  class="mr-1"
                >
                  <a v-if="slink" :href="slink" target="_blank" style="text-decoration:none;">
                    <v-chip small ripple style="text-transform: uppercase;">{{i}}</v-chip>
                  </a>
                </span>
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <v-row justify="center" align="center" class v-else>
      <v-col cols="12" md="11">
        <v-container fluid>
          <v-row class="elevation-1 pa-3 white">
            <v-col>
              <h1>User Not Found</h1>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "@/config/firebase";
import Snakebar from "@/components/Common/Snakebar";
import DeleteTeam from "@/components/Team/DeleteTeam";

export default {
  name: "ViewTeam",
  components: {
    Snakebar,
    DeleteTeam
  },
  data: () => ({
    snakeBarMessage: "",
    isSnakeBarVisible: false,
    snakeBarColor: "",
    snakeBarTimeOut: 5000,
    showLoader: true,
    userNotFound: true,
    teamInfo: {}
  }),
  mounted() {
    this.getTeamData();
  },
  methods: {
    showSnakeBar(text) {
      this.snakeBarMessage = text;
      this.isSnakeBarVisible = true;
      this.showData();
    },
    goToTeam() {
      this.$router.replace("/team");
    },
    getTeamData() {
      this.showLoader = true;
      this.userNotFound = false;
      firebase.firestore
        .collection("team")
        .doc(this.$route.params.id)
        .get()
        .then(doc => {
          console.log(doc.data());
          if (doc.data() == undefined) {
            this.showLoader = false;
            this.userNotFound = true;
          } else if (doc.data()) {
            this.showLoader = false;
            this.teamInfo = doc.data();
          } else {
            this.showLoader = false;
            this.userNotFound = true;
          }
        })
        .catch(e => {
          console.log("Message" + e);
          this.showLoader = false;
          this.userNotFound = true;
        });
    }
  }
};
</script>

<style>
</style>