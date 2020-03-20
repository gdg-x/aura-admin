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
    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae, illo qui. Neque maiores voluptatibus rerum magni vel tempore molestiae reprehenderit vitae delectus, non, fugiat sit reiciendis earum, quia assumenda tenetur?</h1>
  </v-container>
</template>

<script>
import Snakebar from "@/components/Common/Snakebar";
import AddNotification from '@/components/Notification/AddNotification';


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
    isLoading: false
  }),
  methods:{
    addedd(e){
      if(e=='true' || e==true){
        this.snakeBarMessage = "Added Success";
        this.isSnakeBarVisible = true;
      //  this.loadData();
      }
    }
  }
};
</script>

<style>
</style>