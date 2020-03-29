<template>
  <v-container fluid class="ma-0 pa-0">
    <Snakebar
      :message="snakeBarMessage"
      :isShow.sync="isSnakeBarVisible"
      :color="snakeBarColor"
      :timeout="snakeBarTimeOut"
    />
    <v-row justify="center" align="center" class v-if="isLoading">
      <v-col cols="12" md="12" class="text-center">
        <v-progress-circular :width="5" :size="50" color="indigo" indeterminate></v-progress-circular>
      </v-col>
    </v-row>
    <v-row class="ma-0 pa-0" v-else>
      <v-col md="12" cols="12">
        <v-row>
          <v-col md="10">
             <v-toolbar class="elevation-0" style="border:1px solid #e0e0e0;border-radius:5px;">
                <v-toolbar-title class="google-font mr-3">Mange Links </v-toolbar-title>
                <v-spacer></v-spacer>
                <FooterLink @show="showSnakeBar" :data="this.linksData" />
            </v-toolbar>
          </v-col>
        </v-row>
        <v-row>
          <v-col md="10" v-if="linksData.length">

            {{linksData}}
          </v-col>
        </v-row>
      </v-col>
      <v-col md="5" cols="12">
        

      
      </v-col>

      <v-col>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import firebase from "@/config/firebase";
import Snakebar from "@/components/Common/Snakebar";
import FooterLink from "@/components/Config/Footer/AddFooterLink"
export default {
  components:{
    FooterLink,
    Snakebar
  },
  name: "Config",
  data: () => ({
    tab: null,
    isLoading: false,
    isAdding: false,
    snakeBarMessage: "",
    isSnakeBarVisible: false,
    snakeBarColor: "green",
    snakeBarTimeOut: 5000,
    linksData:[]
  }),
  mounted() {
    this.getData();
  },
  methods: {
    showSnakeBar(e) {
      this.snakeBarMessage = e;
      this.isSnakeBarVisible = true;
      this.getData()
    },
    getData() {
      this.isLoading = true;
      firebase.firestore
        .collection("config")
        .doc("footer")
        .get()
        .then(doc => {
          console.log(doc);
          if (!doc.exists) {
            this.isLoading = false;
            return;
          }
          doc = doc.data();
          this.linksData = doc
        
          console.log(doc);
          console.log(Object.keys(doc).length);
        //   if (Object.keys(doc).length > 0) {
        //     this.communityinfo = doc;
        //   }
          this.isLoading = false;
        })
        .catch(e => {
          console.log(e);
          this.isLoading = false;
        });
    }
  }
};
</script>