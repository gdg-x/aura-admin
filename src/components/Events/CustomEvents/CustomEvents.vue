<template>
  <v-container fluid class="pa-0 ma-0">
    <Snakebar
      :message="snakeBarMessage"
      :isShow.sync="isSnakeBarVisible"
      :color="snakeBarColor"
      :timeout="snakeBarTimeOut"
    />
    <v-row class="my-0 py-0">
      <v-col cols="12">
        <v-toolbar class="elevation-0 mb-5" style="border:1px solid #e0e0e0;border-radius:5px;">
          <v-toolbar-title class="google-font mr-3">All Custom Events: {{customEventData.length}}</v-toolbar-title>
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
            class="ml-2 hidden-sm-and-down"
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

          <v-btn
            fab
            x-small
            color="indigo"
            @click="openCloseSearch"
            class="mr-2 hidden-md-and-up"
            outlined
            dark
          >
            <v-icon dark v-if="!isSearch">mdi-account-search</v-icon>
            <v-icon dark v-else>mdi-close</v-icon>
          </v-btn>
          <!-- Mobile -->
          &nbsp;
          <AddNewCustomEvent v-if="(role=='Super Admin' || role=='Admin')" @showSuccess="showSnakeBar" @message="showMessageSnakeBar"  class="ml-2" />
        </v-toolbar>

        <!-- {{MeetupData}}   -->
        <v-data-table
          :search="search"
          mobile-breakpoint="no"
          :headers="headers"
          :loading="isLoading"
          :items="customEventData"
          :items-per-page="5"
          style="border:1px solid #e0e0e0;border-radius:5px;"
        >
          <template v-slot:item.venue.name="{ item }">{{item.venue.name | summary(20) }}</template>
          <template v-slot:item.name="{ item }">{{item.name | summary(12) }}</template>
          <template v-slot:item.active="{ item }">
            <v-chip small v-if="item.active == false" dark color="red">Inactive</v-chip>
            <v-chip v-else small dark color="green">Active</v-chip>
          </template>
          <template v-slot:item.view="{ item }">
            <!-- <p @click="goToEventDetails(item.id)">See More</p> -->
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click="goToEventDetails(item.id)">
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </template>
              <span>{{item.name}} Details</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CustomEventServices from '@/services/CustomEventServices'
import {mapState} from 'vuex'
export default {
  components: {
    AddNewCustomEvent: () => import("@/components/Events/CustomEvents/AddCustomEvent"),
    Snakebar: () => import("@/components/Common/Snakebar")
  },
  name: "MeetupEvents",
  data: () => ({
    search: "",
    isSearch: false,
    isLoading: true,
    headers: [
      {
        text: "Event Name",
        align: "start",
        value: "name"
      },
      { text: "Date", value: "date" },
      { text: "Active", value: "active" },
      { text: "Venue", value: "venue.name" },
      { text: "View", value: "view" }
    ],
    snakeBarMessage: "",
    isSnakeBarVisible: false,
    snakeBarColor: "green",
    snakeBarTimeOut: 5000,
    customEventData: []
  }),
  computed:{
    ...mapState(['role'])
  },
  mounted() {
    if (this.$route.query.msg) {
      this.showSnakeBar(this.$route.query.msg);
    }else
      this.showCustomEvents();
  },
  methods: {
    goToEventDetails(id) {
      this.$router.push("/events/" + id);
    },
    showMessageSnakeBar(text){
      this.snakeBarMessage = text;
      this.isSnakeBarVisible = true;
    },
    showCustomEvents() {
      this.isLoading = true;
      this.customEventData = [];
      CustomEventServices.getAllCustomEvents().then(res=>{
        if(res.success==true){
          this.customEventData= res.data
          this.isLoading = false;
        }
      }).catch(e=>{
        this.isLoading = false;
        console.log("Error getting documents", e);
      })
    },
    showSnakeBar(e) {
      this.snakeBarMessage = e;
      this.isSnakeBarVisible = true;
      this.showCustomEvents();
    },
    openCloseSearch() {
      this.isSearch = !this.isSearch;
      this.search = "";
    }
  },
  filters: {
    summary: (val, num) => {
      if (val.length > num) {
        return val.substring(0, num) + "...";
      } else {
        return val;
      }
    }
  }
};
</script>