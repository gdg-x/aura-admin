<template>
  <v-container style="max-width:1600px">
    <Snakebar
      :message="snakeBarMessage"
      :isShow.sync="isSnakeBarVisible"
      :color="snakeBarColor"
      :timeout="snakeBarTimeOut"
    />
    <v-row class="">
      <v-col>
        <v-toolbar class="elevation-0" style="border:1px solid #e0e0e0;border-radius:5px;">
          <v-toolbar-title class="google-font mr-3">Partners: {{ partnersData.length }}</v-toolbar-title>
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
          <!-- Toggle Menu for View -->
          <v-btn-toggle v-if="partnersData.length" borderless background-color="white" color="indigo" dense v-model="dataView" class="hidden-sm-and-down">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on">
                  <v-icon>mdi-grid</v-icon>
                </v-btn>
              </template>
              <span>Grid View</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn v-on="on">
                  <v-icon>mdi-format-list-bulleted</v-icon>
                </v-btn>
              </template>
              <span>Table View</span>
            </v-tooltip>
          </v-btn-toggle>
          <!-- Toggle Menu for View -->
          <AddPartner v-if="(role=='Super Admin' || role=='Admin')" class="ml-2" @showSuccess="showSnakeBar" @message="showMessageSnakeBar" />
        </v-toolbar>
      </v-col>
    </v-row>

    <v-row class="px-2">
      <v-col cols="12 ">
        <v-container fluid class="pa-0">
          <v-row v-if="isLoading">
            <v-col col="12" sm="3" md="2" cols="6" v-for="n in 6" :key="n">
              <v-sheet
                :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                class=""
              >
                <v-skeleton-loader
                  class="mx-auto"
                  max-width="300"
                  type="card"
                ></v-skeleton-loader>
              </v-sheet>
            </v-col>
          </v-row>
          <div v-else>
            <!-- Check Wheather we have a data or not -->
            <div v-if="partnersData.length">
              <!-- Grid View -->
              <v-data-iterator
                :items="partnersData"
                v-if="dataView == 0"
                :loading="isLoading"
                loading-text="Loading Speakers from Dir"
                :search="search"
                disable-pagination
                hide-default-footer
              >
                <template v-slot:default="props">
                  <v-row class>
                    <v-col
                      col="12"
                      cols="6"
                      md="2"
                      lg="2"
                      sm="3"
                      v-for="(item) in props.items"
                      :key="item.id"
                      class="pa-1"
                    >
                      <v-container 
                      class="py-0" 
                      v-ripple
                      @click="gotoPartnerDetails(item.id)"
                      style="height:100% !important;border:1px solid #e0e0e0;border-radius:5px;background:white;cursor: pointer;user-select: none;">
                        <v-row class="">
                          <v-col class="grey lighten-4 pa-0" >
                            <v-img :aspect-ratio="16/6.5" :src="(item.image.length>0)?item.image:require('@/assets/img/dontremove/noimage.jpg')"></v-img>
                          </v-col>
                        </v-row>
                        <v-row class="">
                          <v-col style="background:white">
                            <p
                              class="mb-0 google-font black--text"
                              style="font-size:110%"
                            >{{item.name | summary(15)}}</p>
                            <v-chip
                                class="mr-1"
                                v-if="item.visible"
                                dark
                                label
                                color="green"
                                x-small
                            >Visible</v-chip>
                            <v-chip class="mr-1" v-else label dark color="red" x-small>Not Visible</v-chip>

                            <v-chip class="mr-1" v-if="item.active" dark label color="green" x-small>Active</v-chip>
                            <v-chip class="mr-1" v-else label dark color="red" x-small>Not Active</v-chip>
                          </v-col>
                        </v-row>
                      </v-container>
                      
                    </v-col>
                  </v-row>
                </template>
              </v-data-iterator>
              <!-- Grid View -->
              <!-- Table View -->
              <div v-else class="pa-0 ma-0">
                <v-row>
                  <v-col class="pa-1">
                    <v-data-table
                      style="border:1px solid #e0e0e0;border-radius:5px;background:white;"
                      :search="search"
                      :mobile-breakpoint="0"
                      :loading="isLoading"
                      :headers="headers"
                      :items="partnersData"
                      :items-per-page="5"
                      class="elevation-0 ma-0 pa-0"
                    >
                      <template v-slot:item.active="{ item }">
                        <v-chip small v-if="item.active == true" color="success">Active</v-chip>
                        <v-chip v-else small dark color="red">Inctive</v-chip>
                      </template>
                      <template v-slot:item.visible="{ item }">
                        <v-chip small v-if="item.visible == true" color="success">Visible</v-chip>
                        <v-chip v-else small dark color="red">Not Visible</v-chip>
                      </template>
                      <template v-slot:item.actions="{ item }">

                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on" @click="gotoPartnerDetails(item.id)">
                              <v-icon>mdi-eye</v-icon>
                            </v-btn>
                          </template>
                          <span>{{item.name}} Details</span>
                        </v-tooltip>
                        
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
                
              </div>
              <!-- Table View -->
            </div>
            <!-- Check Wheather we have a data or not -->
            <!-- No Data Found -->
            <div v-else>
              <v-row justify="center" align="center">
                <v-col cols="12" md="12" class="pa-1">
                  <v-container fluid class="" style="border:1px solid #e0e0e0;border-radius:5px;background:white">
                    <v-row justify="center" align="center" class="pa-3">
                      <v-col md="4" class="text-center">
                        <img style="width:50%;text-align:center" :src="require('@/assets/img/svg/DataNotFound.svg')"/>
                        <h1 class="google-font">Partners Data Not Found</h1>
                        <p class="google-font">Kindly add Partners</p>
                        <br>
                        <AddPartner v-if="(role=='Super Admin' || role=='Admin')" class="ml-2" @showSuccess="showSnakeBar"  @message="showMessageSnakeBar"  />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
            </div>
            <!-- No Data Found -->
            
          </div>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PartnersServices from "@/services/PartnersServices"
import {mapState} from 'vuex';
export default {
  name: "TeamView",
  inject: ['theme'],
  components: {
    Snakebar:()=>import('@/components/Common/Snakebar'),
    AddPartner:()=>import('@/components/Partners/AddPartner')
  },
  data: () => ({
    dataView:0,
    isSearch:false,
    search: "",
    snakeBarMessage: "",
    isSnakeBarVisible: false,
    snakeBarColor: "green",
    snakeBarTimeOut: 5000,
    isLoading: false,
    showDialog: false,
    partnersData: [],
    headers: [
      {
        text: 'Name',
        align: 'start',
        value: 'name',
      },
      { text: 'Status', value: 'active' },
      { text: 'Visiblity Status', value: 'visible' },
      { text: 'Actions', value: 'actions', sortable: false, },
    ],
  }),
  computed: {
    ...mapState(['role'])
  },
  mounted() {
    if (this.$route.query.msg) {
      this.showSnakeBar("Partner Removed Sucessfully");
    }else
      this.showData();
  },
  methods: {
    showMessageSnakeBar(text){
      this.snakeBarMessage = text;
      this.isSnakeBarVisible = true;
    },
    changeSnakebar(vale) {
      this.isSnakeBarVisible = vale;
    },
    openCloseSearch(){
      this.isSearch = !this.isSearch
      this.search = "";
    },
    showSnakeBar(text) {
      this.snakeBarMessage = text;
      this.isSnakeBarVisible = true;
      this.showData();
    },
    gotoPartnerDetails(id) {
      this.$router.push("/partners/" + id);
    },
    showData() {
      this.partnersData = []
      this.isLoading = true
      PartnersServices.getAllPartners().then(res=>{
        if(res.success==true){
          this.partnersData= res.data
          this.isLoading = false
        }
      }).catch(e=>{
        console.log("Error getting documents", e);
      })
    }
  },
  filters:{
    summary: (val,num)=>{
      if(val.length > num){
        return val.substring(0,num)+".."
      }else{
        return val
      }
    },
  }
};
</script>

<style scoped>
.client-logo{
    height: 90px;
    padding: 12px 12px;
    border-radius: 7px;
    background: white;
    border: 1px solid #ebebeb;
    text-align: center;
}  
</style>


// TODO: TO UPDATE SNAKEBAR a
// https://stackoverflow.com/questions/39868963/vue-2-mutating-props-vue-warn 
