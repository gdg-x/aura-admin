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
      <v-col md="7" cols="12">
        <v-row>
          <v-col>
             <v-toolbar class="elevation-0" style="border:1px solid #e0e0e0;border-radius:5px;">
                <v-toolbar-title class="google-font mr-3">Mange Links </v-toolbar-title>
                <v-spacer></v-spacer>
                <FooterLink @show="showSnakeBar" />
            </v-toolbar>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="5" cols="12">
        <v-row class="my-0 py-0">
          <v-col class="mb-0 pb-0" cols="12">
            <v-textarea
              outlined
              label="Community Short Description"
              class="mb-0 pb-0"
            ></v-textarea>
          </v-col>
          <v-col class="mb-0 pb-0" cols="12">
            <v-textarea
              outlined
              label="Community Long Description"
              class="mb-0 pb-0"
            ></v-textarea>
          </v-col>
        </v-row>

      
      </v-col>

      <v-col>
        <v-btn
          depressed
          color="indigo"
          :loading="isAdding"
          @click="setData"
          dark
        >Save General Settings</v-btn>
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
    
  }),
  mounted() {
    this.getData();
  },
  methods: {
    showSnakeBar(e) {
      this.snakeBarMessage = e;
      this.isSnakeBarVisible = true;
    },
    setData() {
      this.isAdding = true;
      firebase.firestore
        .collection("config")
        .doc("general")
        .set(this.communityinfo)
        .then(() => {
          this.$emit("show", "Community Data Added Success");
          this.isAdding = false;
        })
        .catch(e => {
          this.$emit("show", e);
          this.isAdding = false;
          console.log(e);
        });
    },
    getData() {
      this.isLoading = true;
      firebase.firestore
        .collection("config")
        .doc("general")
        .get()
        .then(doc => {
          console.log(doc);
          if (!doc.exists) {
            this.isLoading = false;
            return;
          }
          doc = doc.data();
          console.log(doc);
          console.log(Object.keys(doc).length);
          if (Object.keys(doc).length > 0) {
            this.communityinfo = doc;
            // this.communityinfo.name = doc.name;
            // this.communityinfo.email = doc.email;
            // this.communityinfo.website = doc.website;
            // this.communityinfo.meetupLink = doc.meetupLink;
            // this.communityinfo.shortDescription = doc.shortDescription;
            // this.communityinfo.longDescription = doc.longDescription;
            // this.communityinfo.socialLinks.medium = doc.socialLinks.medium;
            // this.communityinfo.socialLinks.facebook = doc.socialLinks.facebook;
            // this.communityinfo.socialLinks.linkedin = doc.socialLinks.linkedin;
            // this.communityinfo.socialLinks.twitter = doc.socialLinks.twitter;
            // this.communityinfo.socialLinks.github = doc.socialLinks.github;
            // this.communityinfo.socialLinks.instagram = doc.socialLinks.instagram;
            // this.communityinfo.blogs.medium = doc.blogs.medium;
            // this.communityinfo.blogs.devto = doc.blogs.devto;
            // this.communityinfo.hashtags = doc.hashtags;
          }
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