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
          <v-btn depressed color="indigo" class="mx-1" dark>Create a New Event</v-btn>
          <v-btn depressed color="indigo" class="mx-1" dark>Create a New Event</v-btn>
        </v-toolbar>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <UpcomingMeetupEvents/>
      </v-col>
    </v-row>

    <v-row>
      <v-col md="4" class="">
        <CustomEvents/>
        <!-- <v-container>
          <v-row>
            <v-col class="lightModeCard pa-5">
              <h1>Custom Events Page</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et perspiciatis iure qui esse natus molestiae officiis ipsa nemo. Vero distinctio ipsum ducimus sint at ea sunt fugiat mollitia? Aliquid, deserunt.</p>
            </v-col>
          </v-row>
        </v-container> -->
      </v-col>
      <v-col md="">
        <MeetupEvents/>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import MeetupEvents from '@/components/Events/Meetups/MeetupEvents'
import UpcomingMeetupEvents from '@/components/Events/Meetups/UpcomingEvents'
import CustomEvents from '@/components/Events/CustomEvents/CustomEvents'
export default {
  name: 'Events',
  components:{
    MeetupEvents,
    UpcomingMeetupEvents,
    CustomEvents
  },
  data:()=>({
    userEmail:''
  }),
  mounted(){
  },
  methods:{
  }
}
</script>
