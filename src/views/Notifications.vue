<template>
  <v-container style="max-width:1600px">
    <!-- Global Snakebar -->
    <Snakebar
      :message="snakeBarMessage"
      :isShow.sync="isSnakeBarVisible"
      :color="snakeBarColor"
      :timeout="snakeBarTimeOut"
    />
    <v-row justify="center" align="center">
      <v-col cols="12" md="12">
        <!-- Toolbar for PushNotifications -->
        <v-toolbar class="elevation-0" style="border:1px solid #e0e0e0;border-radius:5px;">
          <v-toolbar-title class="google-font">Push Notifications: {{ pushData.length }}</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <!-- Search Field for notifications -->
          <v-text-field
            flat
            dense
            v-model="search"
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-search-web"
            label="Search"
            single-line
            class="hidden-sm-and-down google-font"
          ></v-text-field>

          <!-- Add new Notifications -->
          <addNotification @addedSuccess="addedd" />
        </v-toolbar>
      </v-col>
    </v-row>
    <!-- Start of main data -->
    <v-row justify="center" align="center">
        <v-col cols="12" md="12">
          <!-- Data table for showing pushnotifications -->
          <v-data-table
            :mobile-breakpoint="0"
            style="border:1px solid #e0e0e0;border-radius:5px;"
            :headers="headers"
            :items="pushData"
            :items-per-page="10"
            :search="search"
            class="elevation-0 google-font"
            :loading="isLoading"
            loading-text="Loading... Please wait"
          >
            <template v-slot:item.action="{ item }">
              <!-- view Selected Notification -->
              <ViewNotification :dialogData="item" />
              <EditNotification @addedSuccess="addedd" @errorRecived="errors" :editDialogData="item" />
              <DeleteNotification @addedSuccess="addedd" @errorRecived="errors" :data="item" />
              <SendNotification @addedSuccess="addedd" @errorRecived="errors" :dataA="item" />
            </template>
          </v-data-table>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import firebase from "@/config/firebase";
import PushNotificationServicers from '@/services/NotificationServices'
export default {
  name: "Notifications",
  components: {
    Snakebar:()=>import('@/components/Common/Snakebar'),
    AddNotification:()=>import('@/components/Notification/AddNotification'),
    ViewNotification:()=>import('@/components/Notification/ViewNotification'),
    SendNotification:()=>import('@/components/Notification/SendNotification'),
    EditNotification:()=>import('@/components/Notification/EditNotification'),
    DeleteNotification:()=>import('@/components/Notification/DeleteNotification')
  },
  data: () => ({
    isSearch: false,
    search: "",
    snakeBarMessage: "",
    isSnakeBarVisible: false,
    snakeBarColor: "green",
    snakeBarTimeOut: 5000,
    isLoading: false,
    pushData: [],
    headers: [
      { text: "Title", align: "left", value: "title" },
      { text: "Body", value: "body" },
      { text: "Learn More", value: "learnMore" },
      { text: "Sent times", value: "noTimeSend" },
      { text: "Actions", value: "action", sortable: false }
    ]
  }),
  mounted(){
    this.loadData();
  },
  methods: {
    // Show snakebar
    addedd(e) {
      if (e.length > 0) {
        this.snakeBarMessage = e;
        this.isSnakeBarVisible = true;
        this.loadData();
      }
    },
    errors(e){
      this.snakeBarMessage = e;
      this.isSnakeBarVisible = true;
    },
    // Get Data from firestore
    loadData() {
      this.pushData = [];
      this.isLoading = true;
      PushNotificationServicers.getAllPushNotifications().then(res=>{
        if(res.success==true){
          this.pushData = res.data
          this.isLoading = false
        }
      }).catch(e=>{
        this.isLoading = false;
        this.snakeBarMessage = e;
        this.isSnakeBarVisible = true;
        console.log(e)
      })
    }
  },
};
</script>

<style>
</style>