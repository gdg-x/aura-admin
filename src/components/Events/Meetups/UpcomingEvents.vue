<template>
    <v-container class="pa-0 ma-0">
        <v-row class="my-0 pa-0 px-3" >
            <v-col md="12" lg="12" sm="12" class="lightModeCard" cols="12">
                <p class="google-font my-0" style="font-size:130%">Upcoming Meetup Events</p>
            </v-col>
        </v-row>
        <v-row class="my-0 pa-0" v-if="loader">
            <v-col class="my-0" md="3" lg="3" sm="6" cols="12">
                <div class="lightModeCard pa-5 text-center">
                    <v-progress-circular :width="5" :size="50" color="indigo" indeterminate></v-progress-circular>
                </div>
            </v-col>
        </v-row>
        <v-row class="my-0 pa-0" v-else-if="UpcomingMeetupData.length">
            <v-col class="my-0" md="3" lg="3" sm="6" cols="12" v-for="(item,i) in UpcomingMeetupData" :key="i">
                <UpcomingEventCard :data="{data:item}"/>
            </v-col>
        </v-row>
        <v-row class="my-0 pa-0" v-else >
            <v-col class="my-0 text-center" md="3" lg="3" sm="6" cols="12">
                <div class="lightModeCard pa-3">
                    <img style="width:20%;text-align:center" :src="require('@/assets/img/svg/DataNotFound.svg')"/>
                    <p class="google-font mt-3">Meetup Upcomimg Event not Found</p>
                </div>
            </v-col>
        </v-row>
        <v-row class="my-0 pa-0" v-if="showNetworkError">
            <v-col class="my-0 text-center" md="3" lg="3" sm="6" cols="12">
                <div class="lightModeCard pa-3">
                    <img style="width:20%;text-align:center" :src="require('@/assets/img/svg/DataNotFound.svg')"/>
                    <p class="google-font mt-3">Network Problem</p>
                    <p class="google-font mt-0">Failed to fetch</p>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import UpcomingEventCard from '@/components/Events/Meetups/UpcomingEventCard'
let configData = {
    'MeetupURLName':'GDG-Jalandhar'
}
let MeetupURL ='https://cors-anywhere.herokuapp.com/https://api.meetup.com/'+configData.MeetupURLName+'/events?events?&sign=true'
export default {
    name:'MeetupEvents',
    components:{
        UpcomingEventCard
    },
    data:()=>({
        search:'',
        loader:true,
        showNetworkError:false,
        UpcomingMeetupData:[]
    }),
    mounted(){
        this.GetAllUpcomingMeetupEvents()
    },
    methods:{
        openCloseSearch(){
            this.isSearch = !this.isSearch
            this.search = "";
        },
        GetAllUpcomingMeetupEvents(){
            this.loader = true
            this.showNetworkError = false
            fetch(MeetupURL).then(res=>res.json()).then(data=>{
                this.UpcomingMeetupData =data
                this.loader = false
            }).catch(e=>{
                this.showNetworkError = true
                this.loader = false
                console.log('Error: ', e)
            })
        }
    }
}
</script>