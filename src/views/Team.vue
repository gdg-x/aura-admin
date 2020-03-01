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
          <AddTeam @showSuccess="showSnakeBar" />
        </v-toolbar>
      </v-col>
    </v-row>

    <v-row class="px-2">
      <v-col cols="12">
        <v-container fluid>
          <v-row justify="center" align="center" v-if="isLoading">
            <v-col col="12" md="2" class="text-center">
              <v-progress-circular :width="4" :size="70" color="indigo" indeterminate></v-progress-circular>
            </v-col>
          </v-row>
          <div v-else>
            <v-data-iterator
              :items="teamData"
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
                    <div style="cursor: pointer;" v-ripple class="text-center py-3 elevation-1">
                      <v-avatar size="100">
                        <img
                          :src="(item.image.length>0)?item.image:require('@/assets/img/default_avatar.jpg')"
                          alt
                        />
                      </v-avatar>
                      <p class="mt-3 mb-0 google-font mb-0" style="font-size:120%">{{item.name}}</p>
                      <p
                        class="mt-0 mb-0 google-font mt-0 caption"
                        style="font-size:60%"
                      >{{item.designation}}</p>
                      <v-chip class="ma-1" x-small>{{item.role}}</v-chip>
                    </div>
                  </v-col>
                </v-row>
              </template>
            </v-data-iterator>
          </div>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "@/config/firebase";
import Snakebar from "@/components/Common/Snakebar";
import AddTeam from "@/components/Team/AddTeam";

export default {
  name: "TeamView",
  components: {
    Snakebar,
    AddTeam
  },
  data: () => ({
    search: "",
    snakeBarMessage: "",
    isSnakeBarVisible: false,
    snakeBarColor: "",
    snakeBarTimeOut: 5000,
    isLoading: false,
    showDialog: false,
    teamData: []
  }),
  computed: {},
  mounted() {
    this.showData();
  },
  methods: {
    showSnakeBar(text) {
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
          console.log(snapshot);
          snapshot.forEach(doc => {
            this.teamData.push(doc.data());
          });
          console.log(this.teamData);
          this.isLoading = false;
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    }
  }
};
</script>


// TODO: TO UPDATE SNAKEBAR a
// https://stackoverflow.com/questions/39868963/vue-2-mutating-props-vue-warn 
