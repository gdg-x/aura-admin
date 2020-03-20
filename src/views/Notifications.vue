<template>
  <v-container fluid>
    <Snakebar
      :message="snakeBarMessage"
      :isShow.sync="isSnakeBarVisible"
      :color="snakeBarColor"
      :timeout="snakeBarTimeOut"
    />
    <v-row justify="center" align="center">
      <v-col cols="12" md="12">
        <v-toolbar class="elevation-1">
          <v-toolbar-title class="google-font">PushNotifications Details:</v-toolbar-title>
          <div class="flex-grow-1"></div>
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
          <addNotification @addedSuccess="addedd" />
        </v-toolbar>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
        <v-col cols="12" md="12">
          <v-data-table
            :headers="headers"
            :items="pushData"
            :items-per-page="10"
            :search="search"
            class="elevation-1 google-font"
            :loading="isLoading"
            loading-text="Loading... Please wait"
          >
            <template v-slot:item.action="{  }">
              <!-- <v-icon small class="mr-2" @click="view(item)">mdi-eye</v-icon> -->
              <!-- <v-icon small class="mr-2" @click="edit(item)">mdi-lead-pencil</v-icon> -->
              <v-icon small>mdi-send</v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import firebase from "@/config/firebase";
import Snakebar from "@/components/Common/Snakebar";
import AddNotification from "@/components/Notification/AddNotification";

export default {
  name: "Notifications",
  components: {
    Snakebar,
    AddNotification
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
    addedd(e) {
      if (e == "true" || e == true) {
        this.snakeBarMessage = "Added Success";
        this.isSnakeBarVisible = true;
        //  this.loadData();
      }
    },
    getDate(date) {
      if (this.viewDialog && date.toString().length > 0) {
        return date
          .toDate()
          .toString()
          .split("(")[0];
      } else {
        return date;
      }
    },
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
  created() {
    if (firebase.auth.currentUser) {
      this.loadData();
    } else {
      this.$router.replace("login");
    }
  }
};
</script>

<style>
</style>