<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row justify="center" align="center" class v-if="isLoading">
      <v-col cols="12" md="12" class="text-center">
        <v-progress-circular :width="5" :size="50" color="indigo" indeterminate></v-progress-circular>
        <p class="google-font mt-2">Getting Keys & Securities Settings</p>
      </v-col>
    </v-row>

    <v-row class="ma-0 pa-0" v-else>
      <v-col md="12">
        <v-toolbar class="elevation-0" style="border:1px solid #e0e0e0;border-radius:5px;">
          <v-toolbar-title class="google-font mr-3">Manage Keys & Securities</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            depressed
            color="indigo"
            :loading="isAdding"
            @click="setData"
            dark
          >Save Keys & Security</v-btn>
        </v-toolbar>
        <p class="mb-0 mt-3 google-font" style="color:red">
          <b>Important! </b> Settings will not be saved until and unless, if you will click the save button
        </p>
      </v-col>
      <v-col cols="12" md="6" class="mb-0 pb-0">
        <v-text-field class="my-0 py-0" label="Cloud Messaging  Server Key" v-model="key.server_key" outlined></v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="mb-0 pb-0">
        <v-text-field class="my-0 py-0" label="Cloud Messaging Web Push Certificates" v-model="key.web_push_certificate" outlined></v-text-field>
      </v-col>
      <!-- <v-col cols="12" md="6" class="mb-0 pb-0">
        <v-text-field class="my-0 py-0" label="Mail Gun API Key" :hidden="true" v-model="key.mail_champ" outlined></v-text-field>
      </v-col>
      <v-col cols="12" md="6" class="mb-0 pb-0">
        <v-text-field class="my-0 py-0" label="Mail Champ API Key" :hidden="true" v-model="key.mail_gun" outlined></v-text-field>
      </v-col> -->
      <v-col cols="12" md="6" class="mb-0 pb-0">
        <v-text-field
          class="my-0 py-0"
          label="Meetup Community UserName"
          v-model="key.meetup"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "@/config/firebase";
import { mapMutations } from "vuex";

export default {
  name: "KeysandSecurity",
  data: () => ({
    isLoading: false,
    isAdding: false,
    key: {
      mail_champ: "",
      mail_gun: "",
      server_key:"",
      web_push_certificate:"",
      meetup: ""
    }
  }),
  created() {
    this.getData();
  },
  methods: {
    ...mapMutations(['setKeysAndSecutity']),
    setData() {
      this.isAdding = true;
      firebase.firestore
        .collection("config")
        .doc("keysandsecurity")
        .set(this.key)
        .then(() => {
          localStorage.setItem(
            "keysandsecurity",
            JSON.stringify(this.key)
          );
          this.setKeysAndSecutity(this.key);
          this.$emit("show", "Keys & Security Updated");
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
        .doc("keysandsecurity")
        .get()
        .then(doc => {
          if (!doc.exists) {
            this.isLoading = false;
            return;
          }
          doc = doc.data();
          if (Object.keys(doc).length > 0) {
            this.key = doc;
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

<style>
</style>