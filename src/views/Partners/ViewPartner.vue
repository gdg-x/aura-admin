<template>
  <v-container fluid style="max-width:1600px">
    <Snakebar
      :message="snakeBarMessage"
      :isShow.sync="isSnakeBarVisible"
      :color="snakeBarColor"
      :timeout="snakeBarTimeOut"
    />
    <v-row>
      <v-col cols="12">
        <v-toolbar class="elevation-0" style="border:1px solid #e0e0e0;border-radius:5px;">
          <v-btn
            text
            @click="goToPartner"
            class="ma-0 google-font mb-0"
            style="border-radius:5px;text-transform: capitalize;text-decoration:none;"
          >
            <v-icon left style="font-size:150%">mdi-arrow-left-thick</v-icon>
            <span style="font-size:120%">Partner</span>
          </v-btn>
          <v-spacer></v-spacer>
          <ActivityLog :dialogData="partnerInfo" v-if="(!showLoader && !userNotFound) && (role=='Super Admin' || role=='Admin')"/>
          <EditPartner
            :partnerData="partnerInfo"
            v-if="(!showLoader && !userNotFound) && (role=='Super Admin' || role=='Admin')"
            @editedSuccess="showSnakeBar"
            @message="showMessageSnakeBar"
          />
          <DeletePartner
            :PartnerInfo="partnerInfo"
            @RemoveSuceess="showSnakeBar"
            v-if="(!showLoader && !userNotFound) && (role=='Super Admin')"
          />
        </v-toolbar>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" class v-if="showLoader">
      <v-col cols="12" md="12" class="text-center">
        <v-progress-circular :width="5" :size="50" color="indigo" indeterminate></v-progress-circular>
      </v-col>
    </v-row>

    <v-row v-else-if="!showLoader && !userNotFound">
      <v-col cols="12" md="12" class>
        <v-container fluid>
          <v-row>
            <v-col cols="12" sm="5" md="3" xl="2" class="pa-0 text-center" style="border:1px solid #e0e0e0;background:white;border-radius:5px;">
                <div class="pa-0">
                    <v-img
                        :src="(partnerInfo.image.length>0)?partnerInfo.image:require('@/assets/img/dontremove/noimage.jpg')"
                        :aspect-ratio="16/6.5"
                        class="grey lighten-4"
                    ></v-img>
                </div>

                <p
                class="mt-3 mb-2 google-font black--text"
                style="font-size:120%"
                >{{partnerInfo.name}}</p>
            
                <v-chip
                class="ma-1"
                v-if="partnerInfo.visible"
                dark
                label
                color="green"
                small
                >Visible</v-chip>
                <v-chip class="ma-1" v-else label dark color="red" small>Not Visible</v-chip>

                <v-chip class="ma-1" v-if="partnerInfo.active" dark label color="green" small>Active</v-chip>
                <v-chip class="ma-1" v-else label dark color="red" small>Not Active</v-chip>

                <br />
                <br />
                <br />
            </v-col>

            <v-col cols="12" sm="7" md="9" xl="10" class="py-5 text-left pa-5">
                <p class="mb-0">
                    <b>Description</b>
                </p>
                <p class="mt-1 mb-0 google-font mt-0" style="font-size:110%">{{partnerInfo.des.length?partnerInfo.des:'Not Available'}}</p>
                <div v-if="(role=='Super Admin' || role=='Admin')"><p class="mb-0 mt-3">
                    <b>Partner POC Email</b>
                </p>
                <p class="mt-0 mb-0 google-font mt-0" style="font-size:110%">{{partnerInfo.pocemail || "Not Available"}}</p>
                </div>
                <p class="mb-0 mt-3">
                    <b>Partner ID</b>
                </p>
                <p class="mt-0 mb-0 google-font mt-0" style="font-size:110%">{{partnerInfo.id}}</p>
                <p class="mb-0 mt-3">
                    <b>Social Links</b>
                </p>
                <p class="mt-1 mb-0 google-font mt-0" style="font-size:110%">
                    <span
                    style="cursor: pointer;"
                    v-for="(slink,i) in partnerInfo.socialLinks"
                    :key="i"
                    class="mr-1"
                    >
                    <a v-if="slink" :href="slink" target="_blank" style="text-decoration:none;">
                        <v-chip small ripple style="text-transform: uppercase;">{{i}}</v-chip>
                    </a>
                    </span>
                </p>
              
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" v-else>
      <v-col cols="12" md="12">
        <v-container fluid class="" style="border:1px solid #e0e0e0;border-radius:5px;background:white">
          <v-row justify="center" align="center" class="pa-3">
            <v-col md="4" class="text-center">
              <img style="width:50%;text-align:center" :src="require('@/assets/img/svg/DataNotFound.svg')"/>
              <h1 class="google-font">Partner Not Found</h1>
              <p class="google-font">The requested URL /{{this.$route.params.id}} was not found on this server. That’s all we know.</p>
              <br>
              <v-btn
                color="indigo"
                dark
                depressed
                @click="goToPartner"
                class="ma-0 google-font mb-0"
                style="border-radius:5px;text-transform: capitalize;text-decoration:none;"
              >
                <v-icon left style="font-size:150%">mdi-arrow-left-thick</v-icon>
                <span style="font-size:120%">Back to Partners</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PartnersServices from "@/services/PartnersServices"
import {mapState} from 'vuex'
export default {
  name: "ViewTeam",
  components: {
    Snakebar:()=>import('@/components/Common/Snakebar'),
    DeletePartner:()=>import('@/components/Partners/DeletePartner'),
    EditPartner:()=>import('@/components/Partners/EditPartner'),
    ActivityLog: ()=>import('@/components/Common/UserActivity')
  },
  data: () => ({
    snakeBarMessage: "",
    isSnakeBarVisible: false,
    snakeBarColor: "green",
    snakeBarTimeOut: 5000,
    showLoader: true,
    userNotFound: true,
    partnerInfo: {}
  }),
  mounted() {
    this.getPartnerData();
  },
  computed:{...mapState(['role'])},
  methods: {
    showMessageSnakeBar(text){
      this.snakeBarMessage = text;
      this.isSnakeBarVisible = true;
    },
    showSnakeBar(text) {
      this.snakeBarMessage = text;
      this.isSnakeBarVisible = true;
      this.getPartnerData();
    },
    goToPartner() {
      this.$router.replace("/partners");
    },
    getPartnerData() {
      this.showLoader = true;
      this.userNotFound = false;
      PartnersServices.getPartnerDetails(this.$route.params.id).then(res=>{
        if(res.isFound==false){
          this.showLoader = false
          this.userNotFound = true
        }else if(res.isFound == true){
          this.showLoader = false
          this.partnerInfo = res.data
        }else{
          this.showLoader = false
          this.userNotFound = true
        }
      }).catch(e=>{
        console.log("Message" + e)
        this.showLoader = false
        this.userNotFound = true
      })
    }
  }
};
</script>

<style scoped>
</style>