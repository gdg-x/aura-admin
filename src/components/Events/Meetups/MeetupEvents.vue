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
                    :loading="isLoading"
                    :items-per-page="5"
                    style="border:1px solid #e0e0e0;border-radius:5px;"
                >   
                    <template v-slot:item.name="{ item }">
                        {{item.name | summary(12) }}
                    </template>

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
export default {
    name:'MeetupEvents',
    props:['meetupkey'],
    data:()=>({
        search:'',
        isSearch:false,
        isLoading:true,
        headers: [
          {
            text: 'Event Name',
            align: 'start',
            value: 'name',
          },
          { text: 'Date', value: 'local_date' },
          { text: 'Status', value: 'status' },
          { text: 'RSVP', value: 'yes_rsvp_count' },
          { text: 'See More', value: 'link' },
        ],
        MeetupData:[],
        MeetupURLID:{},
    }),
    mounted(){
        // this.getConfig()
        this.getAllMeetupEvents();
    },
    methods:{
        openCloseSearch(){
            this.isSearch = !this.isSearch
            this.search = "";
        },
        getAllMeetupEvents(path){
            this.isLoading = true
            fetch('https://cors-anywhere.herokuapp.com/https://api.meetup.com/'+this.meetupkey+'/events?desc=true&photo-host=public&sign=true&page=1000&status=past').then(res=>res.json()).then(data=>{
                this.MeetupData = data
                this.isLoading = false
            }).catch(e=>{
                this.isLoading = false;
                console.log('Error ', e)
            })
        }

    },
    filters:{
        summary: (val,num)=>{
          if(val.length > num){
            return val.substring(0,num)+"..."
          }else{
            return val
          }
        }
    }
}
</script>