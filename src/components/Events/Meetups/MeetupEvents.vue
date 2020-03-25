<template>
    <v-container class="pa-0 ma-0">
        <v-row class="my-0 py-0">
            <v-col>
                <v-toolbar class="elevation-0 mb-5" style="border:1px solid #e0e0e0;border-radius:5px;">
                    <v-toolbar-title class="google-font mr-3">All Meetup Events: {{MeetupData.length}}</v-toolbar-title>
                    <v-spacer></v-spacer>

                    <!-- Desktop -->
                    <v-text-field
                        flat
                        dense
                        v-model="search"
                        solo-inverted
                        hide-details
                        prepend-inner-icon="mdi-search-web"
                        label="Search"
                        single-line
                        class="mr-2 hidden-sm-and-down"
                    ></v-text-field>
                    <!-- Desktop -->

                    <!-- Mobile -->
                    <v-slide-x-reverse-transition>
                        <v-text-field
                        flat
                        dense
                        v-if="isSearch"
                        v-model="search"
                        solo-inverted
                        hide-details
                        prepend-inner-icon="mdi-search-web"
                        label="Search"
                        single-line
                        class="mr-2 hidden-md-and-up"
                        ></v-text-field>
                    </v-slide-x-reverse-transition>

                    <v-btn fab x-small color="indigo" @click="openCloseSearch" class="mr-2 hidden-md-and-up" outlined dark>
                        <v-icon dark v-if="!isSearch">mdi-account-search</v-icon>
                        <v-icon dark v-else>mdi-close</v-icon>
                    </v-btn>
                    <!-- Mobile -->
                    &nbsp;

                </v-toolbar>

                <!-- {{MeetupData}}   -->
                <v-data-table
                    :search="search"
                    mobile-breakpoint="no"
                    :headers="headers"
                    :items="MeetupData"
                    :items-per-page="10"
                    style="border:1px solid #e0e0e0;border-radius:5px;"
                >
                    <template v-slot:item.status="{ item }">
                        <v-chip small v-if="item.status == 'past'" dark color="red">Past</v-chip>
                        <v-chip v-else small dark color="green">Upcoming</v-chip>
                    </template>
                    <template v-slot:item.link="{ item }">
                        <a :href="item.link" target="_blank">See More</a>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
let configData = {
    'MeetupURLName':'GDG-Jalandhar'
}
let MeetupURL ='https://cors-anywhere.herokuapp.com/https://api.meetup.com/'+configData.MeetupURLName+'/events?desc=true&photo-host=public&sign=true&page=1000&status=past'
export default {
    name:'MeetupEvents',
    data:()=>({
        search:'',
        isSearch:false,
        headers: [
          {
            text: 'Event Name',
            align: 'start',
            value: 'name',
          },
          { text: 'Date', value: 'local_date' },
          { text: 'Status', value: 'status' },
          { text: 'Venue', value: 'venue.name' },
          { text: 'Meetup RSVP', value: 'yes_rsvp_count' },
          { text: 'Manual Attendees', value: 'manual_attendance_count' },
          { text: 'See More', value: 'link' },
        ],
        MeetupData:[]
    }),
    mounted(){
        this.GetAllMeetupEvents()
    },
    methods:{
        openCloseSearch(){
            this.isSearch = !this.isSearch
            this.search = "";
        },
        GetAllMeetupEvents(){
            fetch(MeetupURL).then(res=>res.json()).then(data=>{
                console.log(data)
                this.MeetupData = data
            })
        }
    }
}
</script>