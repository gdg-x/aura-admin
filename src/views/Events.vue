<template>
  <v-container class="" style="max-width:1600px">
    <Snakebar
      :message="snakeBarMessage"
      :isShow.sync="isSnakeBarVisible"
      :color="snakeBarColor"
      :timeout="snakeBarTimeOut"
    />
    <v-row class="">
      <v-col>
        <v-toolbar class="elevation-0" style="border:1px solid #e0e0e0;border-radius:5px;">
          <v-toolbar-title class="google-font mr-3">Events | {{generalConfig.name || 'Aura' }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-btn depressed color="indigo" class="mx-1" dark>Create a New Event</v-btn> -->
          <!-- <AddFeatureEvent @showSuccess="showSnakeBar" /> -->
          <!-- <AddNewCustomEvent @show="showSnakeBar" class="ml-2"/> -->
          
          <!-- <v-btn depressed color="indigo" class="mx-1" dark>Create a New Event</v-btn> -->
        </v-toolbar>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <UpcomingMeetupEvents v-if="keysandsecurity.meetup.length >3" :meetupkey="keysandsecurity.meetup"/>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <FeatureEvents/>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12" :md="keysandsecurity.meetup.length >3?'5':'12'" class="">
        <CustomEvents />
      </v-col>
      <v-col cols="12" sm="12" md="7">
        <MeetupEvents v-if="keysandsecurity.meetup.length >3" :meetupkey="keysandsecurity.meetup"/>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import firebase from "@/config/firebase";
import { mapState } from 'vuex';

export default {
  name: 'Events',
  components:{
    MeetupEvents:()=>import('@/components/Events/Meetups/MeetupEvents'),
    UpcomingMeetupEvents:()=>import('@/components/Events/Meetups/UpcomingEvents'),
    CustomEvents:()=>import('@/components/Events/CustomEvents/CustomEvents'),
    Snakebar:()=>import('@/components/Common/Snakebar'),
    FeatureEvents:()=>import('@/components/Events/FeaturesEvents/FeatureEvents')
  },
  data:()=>({
    userEmail:'',
    snakeBarMessage: "",
    isSnakeBarVisible: false,
    snakeBarColor: "green",
    snakeBarTimeOut: 5000,
    communityName:''
  }),
  computed:{
      ...mapState(['generalConfig',"keysandsecurity"]),
  },
  mounted(){
    // this.getConfig()
  },
  methods:{
    getConfig(){
      firebase.firestore
      .collection("config")
      .doc('general')
      .get()
      .then(doc => {
      if (doc.data() == undefined) {
          console.log('Not Found')
      } else if (doc.data()) {
          this.communityName = doc.data().name
      } else {
          console.log('Not Found')
      }
      })
      .catch(e => {
        console.log("Message" + e);
      });
    },
    showSnakeBar(e) {
      this.snakeBarMessage = e;
      this.isSnakeBarVisible = true;
    }
  }
}
</script>
