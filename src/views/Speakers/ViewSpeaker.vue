<template>
    <v-container>
        <v-row>
            <v-toolbar class="elevation-1">
                    
                <router-link
                    to="/speakers"
                    class="ma-0 google-font mb-0"
                    style="border-radius:5px;text-transform: capitalize;text-decoration:none;color:black"
                >
                <v-icon left>mdi-arrow-left-thick</v-icon>
                Speakers</router-link>
                &nbsp;
                <!-- <v-toolbar-title>Team Details: </v-toolbar-title> -->
                    <div class="flex-grow-1"></div>
                    <!-- <editTeam :teamData="teamData" v-on:editedSuccess="editedSuccessFun" class="mr-2" v-if="showTeamData"/>
                    &nbsp;
                    <removeTeam class="mr-1" v-if="showTeamData" :teamData="{id:$route.params.id,name:teamData.name}" /> --> 
                    
                    <!-- <v-tooltip bottom v-if="showTeamData">
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on" target="_blank" v-on:click="showPublicURL($route.params.id)">
                            <v-icon color="indigo">mdi-eye</v-icon>
                            </v-btn>
                        </template>
                        <span>Show Public URL</span>
                    </v-tooltip> -->
                    <RemoveSpeaker :SpeakerData="{id:$route.params.id,name:speakerData.name}"/>
                </v-toolbar>
        </v-row>

        <!-- Loading -->
        <v-row class="my-5" v-if="showLoader">
            <v-col class="text-center">
                <v-progress-circular
                :size="70"
                :width="5"
                color="primary"
                indeterminate
                ></v-progress-circular>
            </v-col>
        </v-row>
        <!-- Loading -->

        <!-- Not Found -->
        <v-row class="my-5" v-else-if="userNotFound">
            <v-col class="text-center elevation-1">
                <h1 class="google-font">User Not Found</h1>
            </v-col>
        </v-row>
        <!-- Not Found -->

        <v-row class="mt-3" v-else>
            <v-container>
                <v-row>
                    <v-col col="12" md="3" cols="12" class="pa-1 elevation-1 py-5 text-center">
                        <v-avatar size="120">
                            <img 
                            :src="speakerData.image" alt=""
                            >
                        </v-avatar>
                        
                        <p class="mt-3 mb-0 google-font mb-0" style="font-size:120%">{{speakerData.name}}</p>
                        <p class="mt-1 mb-0 google-font mt-0" style="font-size:100%">{{speakerData.designation}}</p>

                        <br><br>
                        <v-chip class="ma-1" v-if="speakerData.visible" dark label color="green" small>Visible</v-chip>
                        <v-chip class="ma-1" v-else label dark color="red" small>Not Visible</v-chip>
                        
                    </v-col>

                    <v-col col="12" md="9" cols="12" class="pa-1 elevation-1 py-5 px-5">
                        <p class="mb-0"><b>Bio</b></p>
                        <p class="mt-1 mb-0 google-font mt-0" style="font-size:110%">{{speakerData.bio}}</p>

                        <p class="mb-0 mt-3"><b>Email</b></p>
                        <p class="mt-0 mb-0 google-font mt-0" style="font-size:110%">{{speakerData.email}}</p>

                        <p class="mb-0 mt-3"><b>Mobile</b></p>
                        <p class="mt-0 mb-0 google-font mt-0" style="font-size:110%">{{speakerData.mbnumber}}</p>

                        <p class="mb-0 mt-3"><b>User ID</b></p>
                        <p class="mt-0 mb-0 google-font mt-0" style="font-size:110%">{{speakerData.id}}</p>

                        <p class="mb-0 mt-3"><b>Social Links</b></p>
                        <p class="mt-1 mb-0 google-font mt-0" style="font-size:110%">
                            <span style="cursor: pointer;" v-for="(slink,i) in speakerData.socialLinks" :key="i" class="mr-1">
                                <a v-if="slink" :href="slink" target="_blank" style="text-decoration:none;">
                                    <v-chip small style="text-transform: uppercase;">{{i}}</v-chip>
                                </a>
                            </span>
                        </p>
                        
                    </v-col>

                </v-row>
            </v-container>
            
        </v-row>

        
    </v-container>
</template>

<script>
    import RemoveSpeaker from '@/components/Speakers/RemoveSpeaker'
    import firebase from '@/config/firebase'
    export default{
        name:"ViewSpeaker",
        components:{
            RemoveSpeaker
        },
        data: ()=>({
            speakerData:[],
            showLoader: true,
            userNotFound: false
        }),
        mounted(){
            this.getTeamData()
        },
        methods:{
            getTeamData(){
                this.showLoader = true
                this.userNotFound = false
                firebase.firestore.collection('Speakers').doc(this.$route.params.id).get().then(doc=>{
                    console.log(doc.data())
                    if(doc.data() == undefined){
                        this.showLoader = false
                        this.userNotFound = true
                    }
                    else if(doc.data()){
                        this.showLoader = false
                        this.speakerData = doc.data()
                    }
                    else{
                        this.showLoader = false
                        this.userNotFound = true
                    }
                })
            },
        }
    }
</script>