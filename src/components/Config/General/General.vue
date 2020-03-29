<template>
  <v-container fluid class="ma-0 pa-0">
    <v-row justify="center" align="center" class v-if="isLoading">
      <v-col cols="12" md="12" class="text-center">
        <v-progress-circular :width="5" :size="50" color="indigo" indeterminate></v-progress-circular>
        <p class="google-font mt-2">Getting General Settings</p>
      </v-col>
    </v-row>
    <v-row class="ma-0 pa-0" v-else>
      <v-col md="12" class="my-0 py-0 mt-5">
        <v-toolbar class="elevation-0" style="border:1px solid #e0e0e0;border-radius:5px;">
            <v-toolbar-title class="google-font mr-3">Mange Community Data </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
              depressed
              color="indigo"
              :loading="isAdding"
              @click="setData"
              dark
            >Save General Settings</v-btn>
        </v-toolbar>
      </v-col>
      <v-col md="4" cols="12">
        <v-row>
          <v-col>
            <div class="pa-4" style="border:1px solid #e0e0e0;border-radius:5px;background:#fafafa">
              <p class="google-font my-0 py-0 mb-2">Community Info</p>
              <v-text-field
                class="my-0 py-0"
                label="Community Name"
                v-model="communityinfo.name"
                outlined
              ></v-text-field>
              <v-text-field
                class="my-0 py-0"
                label="Community Email"
                type="email"
                v-model="communityinfo.email"
                outlined
              ></v-text-field>
              <v-text-field
                class="my-0 py-0"
                label="Community Website Link"
                type="url"
                v-model="communityinfo.website"
                outlined
              ></v-text-field>

              <v-text-field
                class="my-0 py-0"
                label="Community Meetup Link"
                v-model="communityinfo.meetupLink"
                outlined
              ></v-text-field>
            </div>
            <div
              class="pa-4 mt-5"
              style="border:1px solid #e0e0e0;border-radius:5px;background:#fafafa"
            >
              <p class="google-font my-0 py-0 mb-2">Blogs</p>
              <v-text-field
                class="my-0 py-0"
                label="Medium Blog"
                v-model="communityinfo.blogs.medium"
                outlined
              ></v-text-field>
              <v-text-field
                class="my-0 py-0"
                label="Dev.to Blog"
                v-model="communityinfo.blogs.devto"
                outlined
              ></v-text-field>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="8" cols="12">
        <v-row class="my-0 py-0">
          <v-col class="mb-0 pb-0" cols="12">
            <v-textarea
              outlined
              label="Community Short Description"
              v-model="communityinfo.shortDescription"
              class="mb-0 pb-0"
            ></v-textarea>
          </v-col>
          <v-col class="mb-0 pb-0" cols="12">
            <v-textarea
              outlined
              label="Community Long Description"
              v-model="communityinfo.longDescription"
              class="mb-0 pb-0"
            ></v-textarea>
          </v-col>
        </v-row>

        <!-- Socail Links -->
        <v-row class="my-0 py-0">
          <v-col md="12" class="my-0 py-0">
            <p>Social Links</p>
          </v-col>
          <v-col class="my-0 py-0" cols="12">
            <v-row class="my-0 py-0">
              <v-col class="my-0 py-0" md="4" cols="12">
                <v-text-field
                  class="my-0 py-0"
                  label="Linkedin"
                  v-model="communityinfo.socialLinks.linkedin"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col class="my-0 py-0" md="4" cols="12">
                <v-text-field
                  class="my-0 py-0"
                  label="Twitter"
                  v-model="communityinfo.socialLinks.twitter"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col class="my-0 py-0" md="4" cols="12">
                <v-text-field
                  class="my-0 py-0"
                  label="Github"
                  v-model="communityinfo.socialLinks.github"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="my-0 py-0">
              <v-col class="my-0 py-0" md="4" cols="12">
                <v-text-field
                  class="my-0 py-0"
                  label="Instagram"
                  v-model="communityinfo.socialLinks.instagram"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col class="my-0 py-0" md="4" cols="12">
                <v-text-field
                  class="my-0 py-0"
                  label="Facebook"
                  v-model="communityinfo.socialLinks.facebook"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col class="my-0 py-0" md="4" cols="12">
                <v-text-field
                  class="my-0 py-0"
                  label="Medium"
                  v-model="communityinfo.socialLinks.medium"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <!-- Socail Links -->

        <!-- Hashtag -->
        <v-row class="my-0 py-0">
          <v-col md="12" class="my-0 py-0" cols="12">
            <p>HashTags</p>
          </v-col>
          <v-col class="my-0 py-0" cols="12">
            <v-combobox
              v-model="communityinfo.hashtags"
              chips
              clearable
              label="Community Hashtags"
              multiple
              outlined
            >
              <template v-slot:selection="{ attrs, item, select, selected }">
                <v-chip
                  v-bind="attrs"
                  :input-value="selected"
                  close
                  @click="select"
                  @click:close="remove(item)"
                >
                  <strong class="google-font">{{ item }}</strong>
                </v-chip>
              </template>
            </v-combobox>
          </v-col>
        </v-row>
        <!-- Hashtag -->
      </v-col>

     
    </v-row>
  </v-container>
</template>
<script>
import firebase from "@/config/firebase";

export default {
  name: "Config",
  data: () => ({
    tab: null,
    isLoading: false,
    isAdding: false,
    communityinfo: {
      name: "",
      email:"",
      website: "",
      meetupLink: "",
      shortDescription: "",
      longDescription: "",
      hashtags: [],
      socialLinks: {
        linkedin: "",
        twitter: "",
        github: "",
        instagram: "",
        facebook: "",
        medium: ""
      },
      blogs: {
        medium: "",
        devto: ""
      }
    }
  }),
  mounted() {
    this.getData();
  },
  methods: {
    remove(item) {
      this.communityinfo.hashtags.splice(
        this.communityinfo.hashtags.indexOf(item),
        1
      );
      this.communityinfo.hashtags = [...this.communityinfo.hashtags];
    },
    setData() {
      this.isAdding = true;
      firebase.firestore
        .collection("config")
        .doc("general")
        .set(this.communityinfo)
        .then(() => {
          this.$emit("show", "Community Data Updated Success");
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