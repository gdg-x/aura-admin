<template>
  <v-container fluid>
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
        <v-toolbar class="elevation-1">
          <v-toolbar-title class="google-font">PushNotifications Details:</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <!-- Search Field for notifications -->
          <v-text-field
            flat
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
            :headers="headers"
            :items="pushData"
            :items-per-page="10"
            :search="search"
            class="elevation-1 google-font"
            :loading="isLoading"
            loading-text="Loading... Please wait"
          >
            <template v-slot:item.action="{ item }">
              <!-- view Selected Notification -->
              <ViewNotification :dialogData="item" />
              <SendNotification @addedSuccess="addedd" :data="item" />
              <!-- <v-icon small class="mr-2" @click="edit(item)">mdi-lead-pencil</v-icon> -->
              <!-- <v-icon small>mdi-send</v-icon> -->
            </template>
          </v-data-table>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import firebase from "@/config/firebase";

// Importing components
import Snakebar from "@/components/Common/Snakebar";  // Global Snakebar Compoment
import AddNotification from "@/components/Notification/AddNotification";  // Add new Notification component
import ViewNotification from "@/components/Notification/ViewNotification";
import SendNotification from "@/components/Notification/SendNotification";

export default {
  name: "Notifications",
  components: {
    Snakebar,
    AddNotification,
    ViewNotification,
    SendNotification
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
      { text: "EventID", value: "eventID" },
      { text: "Sent times", value: "noTimeSend" },
      { text: "Actions", value: "action", sortable: false }
    ]
  }),
  methods: {
    // Show snakebar after adding new Notifications
    addedd(e) {
      if (e.length > 0) {
        this.snakeBarMessage = e;
        this.isSnakeBarVisible = true;
        this.loadData();
      }
    },
    // Get Data from firestore
    loadData() {
      this.pushData = [];
      this.isLoading = true;
      firebase.firestore
        .collection("pushNotifications")
        .get()
        .then(res => {
          res.forEach(doc => {
            let data = doc.data();
            data.id = doc.id;
            this.pushData.push(data);
          });
          this.isLoading = false;
        });
    }
  },

  // Starting of App Page
  created() {
    // Check Current user
    if (firebase.auth.currentUser) {
      // If Found, load data 
      this.loadData();
    } else {
      // Not found, redirect to Login Screen
      this.$router.replace("login");
    }
  }
};
</script>

<style>
</style>