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
          <v-toolbar-title class="google-font mr-3">Events</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- <v-btn depressed color="indigo" class="mx-1" dark>Create a New Event</v-btn> -->
          <AddNewCustomEvent @showSuccess="showSnakeBar" class="ml-2"/>
          
          <!-- <v-btn depressed color="indigo" class="mx-1" dark>Create a New Event</v-btn> -->
        </v-toolbar>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <UpcomingMeetupEvents/>
      </v-col>
    </v-row>

    <v-row>
      <v-col md="5" class="">
        <CustomEvents />
      </v-col>
      <v-col md="">
        <MeetupEvents/>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import Snakebar from "@/components/Common/Snakebar";
import MeetupEvents from '@/components/Events/Meetups/MeetupEvents'
import UpcomingMeetupEvents from '@/components/Events/Meetups/UpcomingEvents'
import CustomEvents from '@/components/Events/CustomEvents/CustomEvents'
import AddNewCustomEvent from '@/components/Events/CustomEvents/AddCustomEvent'
export default {
  name: 'Events',
  components:{
    MeetupEvents,
    UpcomingMeetupEvents,
    CustomEvents,
    Snakebar,
    AddNewCustomEvent
  },
  data:()=>({
    userEmail:'',
    snakeBarMessage: "",
    isSnakeBarVisible: false,
    snakeBarColor: "green",
    snakeBarTimeOut: 5000
  }),
  mounted(){
  },
  methods:{
    showSnakeBar(e) {
      this.snakeBarMessage = e;
      this.isSnakeBarVisible = true;
    }
  }
}
</script>
