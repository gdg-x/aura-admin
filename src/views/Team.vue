<template>
  <v-container>
    <Snakebar
      :message="snakeBarMessage"
      :isShow="isSnakeBarVisible"
      :color="snakeBarColor"
      :timeout="snakeBarTimeOut"
    />
    <v-row>
      <v-col>
        <v-toolbar class="elevation-1">
          <v-toolbar-title class="google-font mr-3">Team</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            flat
            v-model="search"
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-search-web"
            label="Search"
            single-line
            class="mr-2"
          ></v-text-field>
          <AddTeam @showSuccess="showSnakeBar"/>
        </v-toolbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "@/config/firebase";
import Snakebar from "@/components/Common/Snakebar";
import AddTeam from '@/components/Team/AddTeam';

export default {
  name: "TeamView",
  components: {
    Snakebar,
    AddTeam,
  },
  data: () => ({
    search: "",
    snakeBarMessage: "",
    isSnakeBarVisible: true,
    snakeBarColor: "",
    snakeBarTimeOut: 5000,
    isLoading: false,
    showDialog:false,
    teamData: []
  }),
  computed: {},
  mounted() {
    this.showData();
  },
  methods: {
    showSnakeBar(text){
      this.snakeBarMessage = text;
      this.isSnakeBarVisible = true;
      this.showData();
    },
    showData() {
      this.isLoading = true;
      this.teamData = [];
      console.log("Calling Show Data");
      firebase.firestore
        .collection("team")
        .get()
        .then(snapshot => {
          console.log(snapshot)
          snapshot.forEach(doc => {
            this.teamData.push(doc.data());
          });
          console.log(this.teamData)
          this.isLoading = false;
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
      // this.snackbarSuccess = true
      // this.dataLoadingStatus = false
    }
  }
};
</script>


// TODO: TO UPDATE SNAKEBAR a
// https://stackoverflow.com/questions/39868963/vue-2-mutating-props-vue-warn 
