<template>
  <v-container fluid style="max-width:1600px">
    <Snakebar
      :message="snakeBarMessage"
      :isShow.sync="isSnakeBarVisible"
      :color="snakeBarColor"
      :timeout="snakeBarTimeOut"
    />
    <v-row>
      <v-col cols="12">
        <v-toolbar class="elevation-0" style="border:1px solid #e0e0e0;border-radius:5px;">
          <v-btn
            text
            @click="goToTeam"
            class="ma-0 google-font mb-0"
            style="border-radius:5px;text-transform: capitalize;text-decoration:none;"
          >
            <v-icon left style="font-size:150%">mdi-arrow-left-thick</v-icon>
            <span style="font-size:120%">Team</span>
          </v-btn>
          <v-spacer></v-spacer>
          <ActivityLog :dialogData="teamInfo" v-if="(!showLoader && !userNotFound) && (role=='Super Admin' || role=='Admin')"/>
          <EditTeam
            :teamData="teamInfo"
            v-if="(!showLoader && !userNotFound) && (role=='Super Admin' || role=='Admin')"
            @editedSuccess="showSnakeBar"
            @message="showMessageSnakeBar"
          />
          <DeleteTeam
            :TeamInfo="teamInfo"
            @RemoveSuceess="showSnakeBar"            
            v-if="(!showLoader && !userNotFound) && (role=='Super Admin')"
          />
          <ShareTeam
            v-if="(!showLoader && !userNotFound)"
            :url="'/team/'+teamInfo.id"
            :name="teamInfo.name"
          />
        </v-toolbar>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" class v-if="showLoader">
      <v-col cols="12" md="12" class="text-center">
        <v-progress-circular :width="5" :size="50" color="indigo" indeterminate></v-progress-circular>
      </v-col>
    </v-row>

    <v-row v-else-if="!showLoader && !userNotFound">
      <v-col cols="12" md="12" class>
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="5" md="3" xl="2" class="pa-0 text-center">
              <v-card height="100%" class="elevation-0" style="border:1px solid #e0e0e0">
                <v-card-title
                  class="grey lighten-4 google-font"
                  primary-title
                  :style="{'background-image':'url('+require('@/assets/img/dontremove/spakerhead.jpg')+')'}"
                  style="background-position:right top;padding-top:30%;"
                ></v-card-title>
                <v-card-text class="px-5 pb-5" style="margin-top: -70px;">
                  <v-avatar size="130">
                    <img
                      :src="(teamInfo.image.length>0)?teamInfo.image:require('@/assets/img/default_avatar.jpg')"
                      :alt="teamInfo.id"
                      style="border-style: solid;border-width: 5px;border-color:white"
                    />
                  </v-avatar>

                  <p
                    class="mt-3 mb-0 google-font black--text"
                    style="font-size:120%"
                  >{{teamInfo.name}}</p>
                  <p
                    class="mt-1 mb-0 google-font mt-0"
                    style="font-size:100%"
                  >{{teamInfo.designation}}</p>

                  <v-chip class="mt-2" small>{{teamInfo.role}}</v-chip>

                  <br />
                  <br />
                  <v-chip
                    class="ma-1"
                    v-if="teamInfo.visible"
                    dark
                    label
                    color="green"
                    small
                  >Visible</v-chip>
                  <v-chip class="ma-1" v-else label dark color="red" small>Not Visible</v-chip>

                  <v-chip class="ma-1" v-if="teamInfo.active" dark label color="green" small>Active</v-chip>
                  <v-chip class="ma-1" v-else label dark color="red" small>Not Active</v-chip>

                  <br />
                  <br />

                  <br />
                </v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" sm="7" md="9" xl="10" class="py-5 text-left pa-5">
              <p class="mb-0">
                <b>Bio</b>
              </p>
              <p
                class="mt-1 mb-0 google-font mt-0"
                style="font-size:110%"
              >{{teamInfo.bio.length?teamInfo.bio:'No Data Found'}}</p>

              <p class="mb-0 mt-3">
                <b>Email</b>
              </p>
              <p class="mt-0 mb-0 google-font mt-0" style="font-size:110%">{{teamInfo.email}}</p>

              <p class="mb-0 mt-3">
                <b>Mobile</b>
              </p>
              <p
                class="mt-0 mb-0 google-font mt-0"
                style="font-size:110%"
              >{{teamInfo.mbnumber.length?teamInfo.mbnumber:'No Data Found'}}</p>

              <p class="mb-0 mt-3">
                <b>User ID</b>
              </p>
              <p class="mt-0 mb-0 google-font mt-0" style="font-size:110%">{{teamInfo.id}}</p>

              <p class="mb-0 mt-3">
                <b>Social Links:</b>
              </p>
              <p class="mt-1 mb-0 google-font mt-0" style="font-size:110%">
                <span
                  style="cursor: pointer;"
                  v-for="(slink,i) in teamInfo.socialLinks"
                  :key="i"
                  class="mr-1"
                >
                  <v-chip
                    small
                    v-if="slink"
                    :href="slink"
                    target="_blank"
                    style="text-transform: uppercase;"
                  >{{i}}</v-chip>
                </span>
              </p>
              
              <EventByUserTable v-if="events.length>0" :events.sync="events" :isLoading.sync="isLoading"/>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" v-else>
      <v-col cols="12" md="12">
        <v-container
          fluid
          class
          style="border:1px solid #e0e0e0;border-radius:5px;background:white"
        >
          <v-row justify="center" align="center" class="pa-3">
            <v-col md="4" class="text-center">
              <img
                style="width:50%;text-align:center"
                :src="require('@/assets/img/svg/DataNotFound.svg')"
              />
              <h1 class="google-font">User Not Found</h1>
              <p
                class="google-font"
              >The requested URL /{{this.$route.params.id}} was not found on this server. That’s all we know.</p>
              <br />
              <v-btn
                color="indigo"
                dark
                depressed
                @click="goToTeam"
                class="ma-0 google-font mb-0"
                style="border-radius:5px;text-transform: capitalize;text-decoration:none;"
              >
                <v-icon left style="font-size:150%">mdi-arrow-left-thick</v-icon>
                <span style="font-size:120%">Back to Team</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "@/config/firebase";
import TeamServices from "@/services/TeamServices";
import {mapState} from "vuex"
export default {
  name: "ViewTeam",
  components: {
    Snakebar: () => import("@/components/Common/Snakebar"),
    DeleteTeam: () => import("@/components/Team/DeleteTeam"),
    EditTeam: () => import("@/components/Team/EditTeam"),
    EventByUserTable: ()=> import('@/components/Common/EventsByUserTable'),
    ShareTeam: ()=> import('@/components/Common/ShareUrl'),
    ActivityLog: ()=>import('@/components/Common/UserActivity'),
  },
  computed:{
    ...mapState(['role'])
  },
  data: () => ({
    snakeBarMessage: "",
    isSnakeBarVisible: false,
    snakeBarColor: "green",
    snakeBarTimeOut: 5000,
    showLoader: true,
    userNotFound: true,
    isLoading: false,
    teamInfo: {},
    events:[],
  }),
  mounted() {
    this.getTeamData();
    this.getEventsDataHostedByMember()
  },
  methods: {
    showMessageSnakeBar(text){
      this.snakeBarMessage = text;
      this.isSnakeBarVisible = true;
    },
    showSnakeBar(text) {
      this.snakeBarMessage = text;
      this.isSnakeBarVisible = true;
      this.getTeamData();
    },
    goToTeam() {
      this.$router.replace("/team");
    },
    getEventsDataHostedByMember(){
      this.isLoading = true
      TeamServices.getEventsByTeamMember(this.$route.params.id).then(res=>{
        if(res.success){
          this.events = res.data
          this.isLoading = false
        }
      }).catch(e=>{
        console.log(e)
        this.isLoading = false
      })
    },
    getTeamData() {
      this.showLoader = true;
      this.userNotFound = false;
      TeamServices.getTeamMemberDetails(this.$route.params.id)
        .then(res => {
          if (res.isFound == false) {
            this.showLoader = false;
            this.userNotFound = true;
          } else if (res.isFound == true) {
            this.showLoader = false;
            this.teamInfo = res.data;
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

<style scoped>
.team-details {
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  border-left: 0px;
  background: white;
}
</style>