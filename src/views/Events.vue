<template>
    <v-container class="" style="max-width:1600px;width:98%" >
      <v-row>
        <v-col>
          <h1 class="google-font mb-0">Events</h1>
          <p class="google-font">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa fugiat aut, sunt dolorem quas earum dicta eum unde nemo assumenda nostrum ex quos. Sed corporis aut repellat quibusdam animi ut.</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="">
          <v-container>
            <v-row>
              <v-col>
                <UpcomingMeetupEvents/>
              </v-col>
            </v-row>
          </v-container>
          
          
        </v-col>
      </v-row>
      <v-row justify="center" align="stretch">  
        <v-col class="lightModeCard my-3 pa-5" md="3">
          <h1>Custom Event</h1>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum, a. Asperiores voluptas deleniti quo eius repellendus repudiandae veniam, velit repellat voluptates minima dicta beatae ea libero, cumque mollitia neque quaerat.</p>
        </v-col>
        <v-col class="my-0 py-0" md="9">
          <MeetupEvents class="my-0 py-0"/>
        </v-col>
      </v-row>
    </v-container>
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
