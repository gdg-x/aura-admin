<template>
    <v-container fluid class="pa-0 ma-0">
        <Snakebar
        :message="snakeBarMessage"
        :isShow.sync="isSnakeBarVisible"
        :color="snakeBarColor"
        :timeout="snakeBarTimeOut"
        />
        <v-row class="my-0 pa-0 px-3" >
            <v-toolbar class="elevation-0" style="border:1px solid #e0e0e0;border-radius:5px;border-left:8px solid #5AB55E">
                <v-toolbar-title class="google-font mr-3">Features Events</v-toolbar-title>
                <v-spacer></v-spacer>
                <AddFeatureEvent @show="showSnakeBar" />
                <ClearFeaturedEvents @show="showSnakeBar" />
            </v-toolbar>
        </v-row>
        <v-row class="my-0 pa-0" v-if="loader">
            <v-col class="my-0" md="3" lg="3" sm="6" cols="12">
                <div class="lightModeCard pa-5 text-center" style="border-left:8px solid #5AB55E">
                    <v-progress-circular :width="5" :size="50" color="success" indeterminate></v-progress-circular>
                </div>
            </v-col>
        </v-row>
        <v-row class="my-0 pa-0" v-else-if="featureEvendsID.length>0">
            <v-col class="my-0" md="3" lg="3" sm="3" cols="6" v-for="(item,i) in featureEvendsData" :key="i">
                <div 
                    style="cursor: pointer;border-left:8px solid #5AB55E"
                    class="pa-2 ma-0 lightModeCard"
                    @click="goToEventDetails(item.id)">
                    <p class="google-font ma-0 mt-0" style="font-size:120%;" >{{item.name | summary(8) }}</p>
                    <p class="google-font mt-0 mb-0" style="font-size:90%;">{{item.date}}</p>
                    <p class="google-font mt-0 mb-0" style="font-size:90%;">{{item.venue.name | summary(15) }}</p>
                </div>
            </v-col>
            
        </v-row>
        <v-row class="my-0 pa-0" v-else-if="featureEvendsID.length==0 && !showNetworkError" >
            <v-col class="my-0 text-center" md="3" lg="3" sm="6" cols="12">
                <div class="lightModeCard pa-3" style="border-left:8px solid #5AB55E">
                    <img style="width:20%;text-align:center" :src="require('@/assets/img/svg/DataNotFound.svg')"/>
                    <p class="google-font mt-3">Feature Events not Found</p>
                </div>
            </v-col>
        </v-row>
        <v-row class="my-0 pa-0" v-if="showNetworkError">
            <v-col class="my-0 text-center" md="3" lg="3" sm="6" cols="12">
                <div class="lightModeCard pa-3" style="border-left:8px solid #5AB55E">
                    <img style="width:20%;text-align:center" :src="require('@/assets/img/svg/DataNotFound.svg')"/>
                    <p class="google-font mt-3">Network Problem</p>
                    <p class="google-font mt-0">Failed to fetch</p>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import firebase from "@/config/firebase";

export default {
    name:'MeetupEvents',
    components:{
        AddFeatureEvent:()=>import('@/components/Events/FeaturesEvents/AddFeatureEvent'),
        Snakebar:()=>import('@/components/Common/Snakebar'),
        ClearFeaturedEvents:()=>import('@/components/Events/FeaturesEvents/ClearFeaturedEvents')
    },
    data:()=>({
        search:'',
        snakeBarMessage: "",
        isSnakeBarVisible: false,
        snakeBarColor: "green",
        snakeBarTimeOut: 5000,
        loader:true,
        showNetworkError:false,
        featureEvendsID:[],
        featureEvends:[],
        eventsData:[],
        featureEvendsData:[]

    }),
    mounted(){
        this.getFeaturesEventID()
    },
    methods:{
        showSnakeBar(e) {
            this.snakeBarMessage = e;
            this.isSnakeBarVisible = true;
            this.getFeaturesEventID()
        },
        goToEventDetails(id){
            this.$router.push("/events/" + id);
        },
        getFeaturesEventID(){
            this.loader = true
            this.showNetworkError = false
            firebase.firestore
            .collection("featureevents")
            .doc("data")
            .get()
            .then(snapshot => {
                if (!snapshot.exists) {
                    this.loader = false
                    return;
                }
                this.featureEvendsID = snapshot.data().eventid;
                this.GetAllCustomEvents()
            })
            .catch(err => {
                this.loader = false
                this.showNetworkError = true
                this.$emit("show", "Error getting documents")
                console.log("Error getting documents", err);
            });
        },
        openCloseSearch(){
            this.isSearch = !this.isSearch
            this.search = "";
        },
        GetAllCustomEvents(ids){
            this.showNetworkError = false
            this.loader = true
            this.eventsData = []
            this.featureEvendsData = []
            firebase.firestore
            .collection("events")
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    this.eventsData.push(doc.data());
                });
                this.loader = false

                this.featureEvendsID.map(res=>{
                    this.eventsData.map(obj=>{
                        if(obj.id == res){
                            this.featureEvendsData.push(obj)
                        }
                    })
                })
            })
            .catch(err => {
                this.loader = false
                this.showNetworkError = true
                console.log("Error getting documents", err);
            });  
            
        },
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