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
            @click="goToEvents"
            class="ma-0 google-font mb-0"
            style="border-radius:5px;text-transform: capitalize;text-decoration:none;"
          >
            <v-icon left style="font-size:150%">mdi-arrow-left-thick</v-icon>
            <span style="font-size:120%">Events</span>
          </v-btn>
          <v-spacer></v-spacer>
          <ActivityLog :dialogData="eventInfo"
            v-if="(!showLoader && !userNotFound) && (role=='Super Admin' || role=='Admin')"/>
          <EditEvent 
            :eventInfo="eventInfo"
            v-if="(!showLoader && !userNotFound) && (role=='Super Admin' || role=='Admin')"
            @editedSuccess="showSnakeBar"
            @message="showMessageSnakeBar"
          />
          <DeleteEvent
            :EventInfo="eventInfo"
            @RemoveSuceess="showSnakeBar"
            v-if="(!showLoader && !userNotFound) && (role=='Super Admin')"
          />
          <PublicUrl :EventInfo="eventInfo" v-if="!showLoader && !userNotFound" />
        </v-toolbar>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" class v-if="showLoader">
      <v-col cols="12" md="12" class="text-center">
        <v-progress-circular :width="5" :size="50" color="indigo" indeterminate></v-progress-circular>
      </v-col>
    </v-row>

    <v-row v-else-if="!showLoader && !userNotFound">
      <v-container fluid class>
        <v-row class="pa-0">
          <v-col md="3" class>
            <div class="pa-3" style="border:1px solid #e0e0e0;border-radius:5px;background:white">
              <p class="google-font" style="font-size:180%">{{eventInfo.name}}</p>
              <p class="google-font my-0">
                <b>Time: </b>
                {{eventInfo.time.starttime}} - {{eventInfo.time.endtime}}
              </p>
              <p class="google-font my-0">
                <b>Date: </b>
                {{eventInfo.date}}
              </p>
              <p class="google-font my-0">
                <b>Venue: </b>
                <a :href="eventInfo.venue.googlemapsurl">{{eventInfo.venue.name}}</a>
              </p>

              <br />
              <v-chip class="mr-1" v-if="eventInfo.visible" dark label color="green" small>Visible</v-chip>
              <v-chip class="ma-1" v-else label dark color="red" small>Not Visible</v-chip>

              <v-chip class="ma-1" v-if="eventInfo.active" dark label color="green" small>Active</v-chip>
              <v-chip class="ma-1" v-else label dark color="red" small>Not Active</v-chip>
              <br />
              <br />
              <p class="google-font">
                <b>Important Links</b>
              </p>
              <div>
                <v-btn
                  color="pink"
                  dark
                  target="_blank"
                  v-if="eventInfo.links.callforspeaker"
                  :href="eventInfo.links.callforspeaker"
                  class="ma-1"
                  label
                  small
                >Call For Speakers</v-btn>

                <v-btn
                  color="indigo"
                  dark
                  target="_blank"
                  v-if="eventInfo.links.facebook"
                  :href="eventInfo.links.facebook"
                  class="ma-1"
                  label
                  small
                >Facebook</v-btn>

                <v-btn
                  color="success"
                  dark
                  target="_blank"
                  v-if="eventInfo.links.feedback"
                  :href="eventInfo.links.feedback"
                  class="ma-1"
                  label
                  small
                >Feedback</v-btn>

                <v-btn
                  color="red"
                  dark
                  target="_blank"
                  v-if="eventInfo.links.meetup"
                  :href="eventInfo.links.meetup"
                  class="ma-1"
                  label
                  small
                >Meetup</v-btn>

                <v-btn
                  color="primary"
                  dark
                  target="_blank"
                  v-if="eventInfo.links.registration"
                  :href="eventInfo.links.registration"
                  class="ma-1"
                  label
                  small
                >Registration</v-btn>
                <v-btn
                  color="red"
                  dark
                  target="_blank"
                  v-if="eventInfo.links.youtube"
                  :href="eventInfo.links.youtube"
                  class="ma-1"
                  label
                  small
                >Youtube Live</v-btn>
              </div>
            </div>
          </v-col>
          <v-col class="pa-3" md="9">
            <div style="border:1px solid #e0e0e0;border-radius:5px;background:white">
              <v-img
                :src="(eventInfo.image.length>0)?eventInfo.image:require('@/assets/img/dontremove/eventbanner.jpg')"
                width="100%"
                cover
                style="border-top-left-radius:5px;"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,1)"
                height="300px"
                class
              >
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                  </v-row>
                </template>
                <v-card-title class="fill-height align-end google-font pb-5 white--text">
                  <p>
                    <span style="font-size:150%">{{eventInfo.name}}</span>
                  </p>
                </v-card-title>
                <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                </v-layout>
              </v-img>

              <div class="mx-3">
                <v-container>
                  <v-row>
                    <v-col>
                      <h1 class="google-font">{{eventInfo.name}} Details</h1>
                      <p class="google-font">{{eventInfo.des}}</p>

                      <span v-for="(item,i) in eventInfo.hashtags" :key="i">
                        <v-chip class="mr-1" label small>{{item}}</v-chip>
                      </span>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="12" md="6">
                      <h4 class="google-font">Speakers</h4>
                      <v-container class="pa-0">
                        <v-row v-if="eventInfo.speakers.length>0">
                          <v-col
                            class="ma-0"
                            md="4"
                            sm="4"
                            v-for="(item,i) in eventInfo.speakers"
                            :key="i"
                          >
                            <div v-for="(itemp,j) in speakersInfo" :key="j">
                              <div v-if="item == itemp.id" class="lightModeCard pa-3 text-center">
                                <v-avatar size="80">
                                  <img :src="(itemp.image.length>0)?itemp.image:require('@/assets/img/default_avatar.jpg')" :lazy-src="(itemp.image.length>0)?itemp.image:require('@/assets/img/default_avatar.jpg')" />
                                </v-avatar>
                                <p class="google-font mt-3">{{itemp.name}}</p>
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                        <v-row v-else>
                          <v-col md="4" class>
                            <p class="google-font">Speakers Not Found</p>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-col>
                    <v-col cols="12" md="6">
                      <h4 class="google-font">Partners</h4>
                      <v-container class="pa-0">
                        <v-row v-if="eventInfo.partners.length>0">
                          <v-col
                            class="ma-0"
                            md="4"
                            sm="6"
                            
                          >
                            <ul v-for="(item,i) in eventInfo.partners"
                            :key="i">
                                <div v-for="(itemp,j) in partnersInfo" :key="j">
                                  <div v-if="item == itemp.id">
                                    <li class="google-font">{{itemp.name}}</li>
                                  </div>
                                </div>
                            </ul>
                            
                          </v-col>
                        </v-row>
                        <v-row v-else>
                          <v-col md="4" class>
                            <p class="google-font">Partners Not Found</p>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-col>
                  </v-row>
                  
                  <v-row>
                    <v-col>
                      <h4 class="google-font">Team</h4>
                      <v-container class="pa-0">
                        <v-row v-if="eventInfo.team.length>0">
                          <v-col cols="12" class="ma-0 py-1">
                            <span class="font-weight-bold google-font">Core Team:</span>
                            <span v-for="doc in coreTeam" :key="doc.id">
                              <v-chip
                                outlined
                                :href="'/team/'+doc.id"
                                target="_blank"
                                small
                                class="mx-1"
                              >{{doc.name}}</v-chip>
                            </span>
                          </v-col>
                          <v-col cols="12" class="ma-0 py-1">
                            <span class="font-weight-bold google-font">Organizing Team:</span>
                            <span v-for="doc in orgTeam" :key="doc.id">
                              <v-chip
                                outlined
                                :href="'/team/'+doc.id"
                                target="_blank"
                                small
                                class="mx-1"
                              >{{doc.name}}</v-chip>
                            </span>
                          </v-col>
                          <v-col cols="12" class="ma-0 py-1">
                            <span class="font-weight-bold google-font">Volunteers:</span>
                            <span v-for="doc in vol" :key="doc.id">
                              <v-chip
                                outlined
                                :href="'/team/'+doc.id"
                                target="_blank"
                                small
                                class="mx-1"
                              >{{doc.name}}</v-chip>
                            </span>
                          </v-col>
                        </v-row>
                        <v-row v-else>
                          <v-col md="4" class>
                            <p class="google-font">Team Not Found</p>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <h4 class="google-font">Agenda</h4>
                      <p class="google-font" v-if="eventInfo.agenda.length == 0">No Agenda</p>
                      <dir v-else>
                        <v-data-table
                          :mobile-breakpoint="0"
                          style="border:1px solid #e0e0e0;border-radius:5px;background:white;"
                          :headers="headers"
                          :items="eventInfo.agenda"
                          :items-per-page="5"
                          class="elevation-0 ma-0 pa-0 mt-2"
                        ></v-data-table>
                      </dir>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
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
              <h1 class="google-font">Events Not Found</h1>
              <p
                class="google-font"
              >The requested URL /{{this.$route.params.id}} was not found on this server. That’s all we know.</p>
              <br />
              <v-btn
                color="indigo"
                dark
                depressed
                @click="goToEvents"
                class="ma-0 google-font mb-0"
                style="border-radius:5px;text-transform: capitalize;text-decoration:none;"
              >
                <v-icon left style="font-size:150%">mdi-arrow-left-thick</v-icon>
                <span style="font-size:120%">Back to Events</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CustomEventServices from '@/services/CustomEventServices'
import PartnersServices from "@/services/PartnersServices"
import { mapState } from 'vuex'

import firebase from "@/config/firebase";

export default {
  name: "ViewTeam",
  components: {
    Snakebar:()=>import('@/components/Common/Snakebar'),
    DeleteEvent:()=>import('@/components/Events/subcomponents/DeleteEvent'),
    EditEvent:()=>import('@/components/Events/CustomEvents/EditCustomEvent'),
    PublicUrl:()=>import('@/components/Events/subcomponents/PublicUrl'),
    ActivityLog: ()=>import('@/components/Common/UserActivity')

  },
  data: () => ({
    snakeBarMessage: "",
    isSnakeBarVisible: false,
    snakeBarColor: "green",
    snakeBarTimeOut: 5000,
    showLoader: true,
    userNotFound: true,
    eventInfo: {},
    partnersInfo: [],
    // teamInfo: [],
    coreTeam: [],
    orgTeam: [],
    vol: [],
    tempData: [],
    speakersInfo: [],
    headers: [
      {
        text: "Start Time",
        align: "start",
        value: "starttime"
      },
      { text: "End Time", value: "endtime" },
      { text: "Title", value: "title" },
      { text: "Description", value: "des" }
    ]
  }),
  computed:{
    ...mapState(['role'])
  },
  mounted() {
    this.getEventData();
    this.getSpeakersData();
    this.getPartnersData();
    this.getTeam();
  },
  methods: {
    showMessageSnakeBar(text){
      this.snakeBarMessage = text;
      this.isSnakeBarVisible = true;
    },
    showSnakeBar(text) {
      this.snakeBarMessage = text;
      this.isSnakeBarVisible = true;
      this.speakersInfo=[];
      this.vol=[];
      this.orgTeam=[];
      this.coreTeam=[];
      this.partnersInfo=[];
      this.getEventData();
      this.getSpeakersData();
      this.getPartnersData();
      this.getTeam();
    },
    goToEvents() {
      this.$router.replace("/events");
    },
    getEventData() {
      this.showLoader = true;
      this.userNotFound = false;
      CustomEventServices.getCustomEventDetails(this.$route.params.id)
      .then(res => {
          if (res.isFound == false) {
            this.showLoader = false;
            this.userNotFound = true;
          } else if (res.isFound == true) {
            this.showLoader = false;
            this.eventInfo = res.data;
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
    },
    getSpeakersData() {
      firebase.firestore
        .collection("Speakers")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.speakersInfo.push(doc.data());
          });
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    },
    getTeam() {
      firebase.firestore
      .collection("team")
      .orderBy("role", "asc")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          doc = doc.data();
          if (this.eventInfo.team.indexOf(doc.id) !== -1) {
            if (doc.role == "Core Team") this.coreTeam.push(doc);
            else if (doc.role == "Organizing Team") this.orgTeam.push(doc);
            else this.vol.push(doc);
          }
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
    },
    getPartnersData() {
      PartnersServices.getAllPartners().then(res=>{
        if(res.success==true){
          this.partnersInfo = res.data
        }
      }).catch(e=>{
        console.log("Error getting documents", e);
      })
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