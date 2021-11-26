<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row justify="center" align="center" class v-if="isLoading">
      <v-col cols="12" md="12" class="text-center">
        <v-progress-circular
          :width="5"
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
        <p class="google-font mt-2">Getting Community Guidelines Settings</p>
      </v-col>
    </v-row>

    <v-row class="ma-0 pa-0" v-else>
      <v-col md="12" class="my-0 py-0 mt-5">
        <v-toolbar
          class="elevation-0"
          style="border: 1px solid #e0e0e0; border-radius: 5px"
        >
          <v-toolbar-title class="google-font mr-3"
            >Manage Community Guidelines
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            depressed
            color="primary"
            dark
            :loading="isAdding"
            @click="setData"
            >Save Guidelines</v-btn
          >
        </v-toolbar>
        <p class="mb-0 mt-3 google-font" style="color: red">
          <b>Important! </b> Settings will not be saved until and unless, if you
          will click the save button
        </p>
      </v-col>
      <v-col cols="12" sm="6" md="6" class="">
        <v-toolbar
          class="elevation-0 mb-3"
          style="border: 1px solid #e0e0e0; border-radius: 5px"
        >
          <v-toolbar-title class="google-font mr-3"
            >Community Guidelines Setting v.2</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <AddGuideline :data.sync="communityGuidelines.communityGuidelines" />
        </v-toolbar>
        <v-row class="ma-0 pa-0">
          <v-col
            cols="12"
            v-if="communityGuidelines.communityGuidelines.length <= 0"
          >
            <v-img
              :src="require('@/assets/img/svg/DataNotFound.svg')"
              :height="150"
              contain
            ></v-img>
            <p class="google-font my-0 py-0 mb-2 text-center">
              No Community Guidelines found
            </p>
          </v-col>
          <v-list-item
            v-else
            class="my-0 mb-2 py-0 lightModeCard"
            v-for="(item, idx) in communityGuidelines.communityGuidelines"
            :key="idx"
          >
            <v-list-item-content>
              <v-list-item-title>{{
                item.name | summary(20)
              }}</v-list-item-title>
              <v-list-item-subtitle>{{
                item.des | summary(20)
              }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-row>
                <v-col cols="1">
                  <EditGuideline :data.sync="item" />
                </v-col>
                <v-col cols="1" class="mx-3">
                  <v-btn icon class="mx-1">
                    <v-icon @click="deleteguideline(idx)">mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-list-item-action>
          </v-list-item>
        </v-row>
      </v-col>
      <v-col cols="12" sm="6">
        <div
          class="pa-4"
          style="
            border: 1px solid #e0e0e0;
            border-radius: 5px;
            background: #fafafa;
          "
        >
          <p class="google-font my-0 py-0 mb-2">Community Code of Conduct</p>
          <v-textarea
            outlined
            name="codeofconduct"
            label="Community Code of Conduct"
            :auto-grow="true"
            v-model="communityGuidelines.codeOfConduct"
            class="mb-0 mt-3 pb-0"
          ></v-textarea>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "@/config/firebase";
export default {
  name:"CommunityGuidelinesConfig",
  components: {
    AddGuideline: () =>
      import("@/components/Config/CommunityGuidelines/AddGuideline"),
    EditGuideline: () =>
      import("@/components/Config/CommunityGuidelines/EditGuideline"),
  },
  data: () => ({
    tab: null,
    isLoading: false,
    isAdding: false,
    communityGuidelines: {
      communityGuidelines: [],
      codeOfConduct: "",
    },
  }),
  created() {
    this.getData();
  },
  methods: {
    deleteguideline(index) {
      this.communityGuidelines.communityGuidelines.splice(index, 1);
    },
    setData() {
      this.isAdding = true;
      firebase.firestore
        .collection("config")
        .doc("communityguidelines")
        .set(this.communityGuidelines)
        .then(() => {
          this.$emit("show", "Community Guidelines Updated Success");
          this.isAdding = false;
        })
        .catch((e) => {
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
        .then((doc) => {
          if (!doc.exists) {
            this.isLoading = false;
            return;
          }
          doc = doc.data();
          if (Object.keys(doc).length > 0) {
            this.communityGuidelines = doc;
          }
          this.isLoading = false;
        })
        .catch((e) => {
          console.log(e);
          this.isLoading = false;
        });
    },
  },
  filters: {
    summary: (val, num) => {
      if (val.length > num) {
        return val.substring(0, num) + "...";
      } else {
        return val;
      }
    },
  },
};
</script>