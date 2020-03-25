<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row justify="center" align="center" class v-if="isLoading">
      <v-col cols="12" md="12" class="text-center">
        <v-progress-circular :width="5" :size="50" color="indigo" indeterminate></v-progress-circular>
      </v-col>
    </v-row>
    <v-row class="ma-0 pa-0" v-else>
      <v-col cols="12" sm="6">
        <v-row class="py-0 my-2" justify="space-between">
          <v-col cols="6">
            <p class="google-font">Community Guidelines</p>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="3">
            <AddGuideline :data.sync="communityGuidelines.communityGuidelines" />
          </v-col>
        </v-row>
        <v-row class="ma-0 pa-0">
          <v-col cols="12" v-if="communityGuidelines.communityGuidelines.length<=0">
            <v-img :src="require('@/assets/img/svg/DataNotFound.svg')" :height="150" contain></v-img>
            <p class="google-font my-0 py-0 mb-2 text-center">No Community Guidelines found</p>
          </v-col>
          <v-col
            cols="6"
            class="my-0 py-0"
            v-else
            v-for="(item,idx) in communityGuidelines.communityGuidelines"
            :key="idx"
          >
            <v-textarea
              outlined
              :label="item.name"
              v-model="item.des"
              auto-grow="true"
              rows="3"
              disabled="true"
              class="mb-0 pb-0"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" sm="6">
        <div class="pa-4" style="border:1px solid #e0e0e0;border-radius:5px;background:#fafafa">
          <p class="google-font my-0 py-0 mb-2">Community Code of Conduct</p>
          <v-textarea
            outlined
            name="codeofconduct"
            label="Community Code of Conduct"
            v-model="communityGuidelines.codeOfConduct"
            class="mb-0 mt-3 pb-0"
          ></v-textarea>
        </div>
      </v-col>
      <v-col>
        <v-btn
          depressed
          color="indigo"
          dark
          :loading="isAdding"
          @click="setData"
        >Save Community Guidelines Settings</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "@/config/firebase";

import AddGuideline from "@/components/Config/CommunityGuidelines/AddGuideline";

export default {
  name: "Config",
  components: {
    AddGuideline
  },
  data: () => ({
    tab: null,
    isLoading: false,
    isAdding: false,
    communityGuidelines: {
      communityGuidelines: [],
      codeOfConduct: ""
    }
  }),
  mounted() {
    this.getData();
  },
  methods: {
    setData() {
      this.isAdding = true;
      firebase.firestore
        .collection("config")
        .doc("communityguidelines")
        .set(this.communityGuidelines)
        .then(() => {
          this.$emit("show", "Community Guidelines Added Success");
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
        .doc("communityguidelines")
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
            console.log("yes");
            console.log(doc.communityGuidelines);
            this.communityGuidelines = doc;
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