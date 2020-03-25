<template>
    <div class="">
      <v-container fluid class="primary py-5" style="">
        <v-row class="mb-5 pb-5">
          <v-col class="mb-5 px-5 pb-5">
            <h1 class="google-font mb-0" style="color:white">Events</h1>
            <p class="google-font" style="color:white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa fugiat aut, sunt dolorem quas earum dicta eum unde nemo assumenda nostrum ex quos. Sed corporis aut repellat quibusdam animi ut.</p>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="" style="margin-top:-100px" >
        <v-row justify="center" align="center" class="">
          <v-col></v-col>
          <v-col class="">
            <v-toolbar class="elevation-0" style="border:1px solid #e0e0e0;border-radius:5px;">
              <v-toolbar-title class="google-font mr-3">Events</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn>Add New Event</v-btn>
            </v-toolbar>
          </v-col>
        </v-row>

        <v-row justify="center" align="center" class="px-2">
          <v-col class="" >
            <UpcomingMeetupEvents style=""/>
          </v-col>
        </v-row>

        <v-row justify="center" align="stretch" class="px-5">  
          <v-col class="lightModeCard my-3 pa-5" md="3">
            <h1>Custom Event</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum, a. Asperiores voluptas deleniti quo eius repellendus repudiandae veniam, velit repellat voluptates minima dicta beatae ea libero, cumque mollitia neque quaerat.</p>
          </v-col>
          <v-col class="my-0 pa-0 " md="9">
            <MeetupEvents />
          </v-col>
        </v-row>
      </v-container>
    </div>
</template>

<script>
import MeetupEvents from '@/components/Events/Meetups/MeetupEvents'
import UpcomingMeetupEvents from '@/components/Events/Meetups/UpcomingEvents'
export default {
  name: 'Events',
  components:{
    MeetupEvents,
    UpcomingMeetupEvents
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
