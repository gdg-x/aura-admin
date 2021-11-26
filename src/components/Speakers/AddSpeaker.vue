<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent scrollable width="1200">
      <template v-slot:activator="{ on }">
        <v-btn color="primary hidden-sm-and-down" depressed dark v-on="on"
          >Add New Speaker</v-btn
        >
        <v-btn
          fab
          x-small
          color="primary"
          outlined
          class="hidden-md-and-up"
          dark
          v-on="on"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card v-if="dialog">
        <v-card-title
          class="google-font"
          style="border-bottom: 1px solid #e0e0e0"
          primary-title
          dark
          >Add New Speaker</v-card-title
        >
        <v-card-text>
          <v-container fluid>
            <v-row class="pa-0">
              <v-col md="12" cols="12">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <!-- Speaker Status -->
                  <v-row class="pa-3 py-0 my-0">
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p class="google-font mb-0" style="color: red">
                        *indicates required field
                      </p>
                      <p style="color: red">
                        Speaker ID should be unique, it cannot be revised later
                      </p>
                    </v-col>
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p style="font-size: 120%" class="my-0 mb-2">
                        Speaker Status
                      </p>
                    </v-col>

                    <v-col md="3" cols="12" class="pa-1 py-0 ma-0">
                      <v-select
                        :items="items"
                        v-model="newUserData.visible"
                        label="Visiblity Status*"
                        outlined
                        clearable
                      ></v-select>
                    </v-col>

                    <v-col md="3" cols="12" class="pa-1 py-0 ma-0">
                      <v-text-field
                        v-model="newUserData.id"
                        label="Speaker ID*"
                        type="text"
                        outlined
                        clearable
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <!-- Speaker Status -->

                  <!-- Speaker Info -->
                  <v-row class="pa-3 py-0 my-0">
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p style="font-size: 120%" class="my-0 mb-2">
                        Speaker Info
                      </p>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 py-0 ma-0">
                      <v-text-field
                        v-model="newUserData.name"
                        :rules="nameRules"
                        class="ma-0"
                        label="Full Name*"
                        outlined
                        clearable
                        counter="50"
                      ></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 py-0 ma-0">
                      <v-text-field
                        v-model="newUserData.designation"
                        class="ma-0"
                        :rules="nameRules"
                        label="Designation*"
                        outlined
                        clearable
                        counter="50"
                      ></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 py-0 ma-0">
                      <v-text-field
                        v-model="newUserData.company.name"
                        class="ma-0"
                        :rules="nameRules"
                        label="Company Name*"
                        outlined
                        clearable
                        counter="50"
                      ></v-text-field>
                    </v-col>
                    <v-col md="4" xs="4" cols="12" class="pa-1 py-0 ma-0">
                      <v-text-field
                        v-model="newUserData.company.url"
                        class="ma-0"
                        :rules="urlRules"
                        label="Company URL*"
                        outlined
                        clearable
                        counter="50"
                      ></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 py-0 ma-0">
                      <v-text-field
                        v-model="newUserData.city"
                        class="ma-0"
                        :rules="nameRules"
                        label="City*"
                        outlined
                        clearable
                        counter="50"
                      ></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 py-0 ma-0">
                      <v-text-field
                        v-model="newUserData.country"
                        class="ma-0"
                        :rules="nameRules"
                        label="Country*"
                        outlined
                        clearable
                        counter="50"
                      ></v-text-field>
                    </v-col>

                    <v-col md="7" xs="7" cols="6" class="pa-1 py-0 ma-0">
                      <v-text-field
                        transition="fade-transition"
                        v-model="newUserData.image"
                        class="ma-0"
                        label="Image URL"
                        outlined
                        clearable
                        counter="50"
                      ></v-text-field>
                    </v-col>
                    <v-col md="4" xs="4" cols="6" class="pa-1 py-0 ma-0">
                      <UploadImage
                        type="speaker"
                        :userId="newUserData.id"
                        @message="showMessageSnakeBar"
                        @uploadedImage="imageUploadDone"
                      />
                    </v-col>

                    <v-col md="12" xs="12" cols="12" class="pa-1 py-0 ma-0">
                      <v-textarea
                        outlined
                        name="input-7-4"
                        v-model="newUserData.bio"
                        label="Bio"
                        clearable
                      ></v-textarea>
                    </v-col>
                  </v-row>

                  <!-- Personal Info -->
                  <v-row class="pa-3 py-0 my-0">
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p style="font-size: 120%" class="my-0 mb-2">
                        Personal Info
                      </p>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field
                        class="ma-0"
                        v-model="newUserData.mbnumber"
                        label="Contact Number"
                        outlined
                        clearable
                      ></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field
                        class="ma-0"
                        v-model="newUserData.email"
                        :rules="emailRules"
                        label="Email ID*"
                        outlined
                        clearable
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <!-- Personal Info -->
                  <v-row class="pa-3">
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p style="font-size: 120%" class="my-0 mb-2">
                        Social Links
                      </p>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 py-0 ma-0">
                      <v-text-field
                        class="ma-0"
                        label="Facebook"
                        placeholder="https://www.facebook.com/"
                        outlined
                        v-model="newUserData.socialLinks.facebook"
                        clearable
                      ></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 py-0 ma-0">
                      <v-text-field
                        class="ma-0"
                        label="Github"
                        v-model="newUserData.socialLinks.github"
                        placeholder="https://www.github.com/"
                        outlined
                        clearable
                      ></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 py-0 ma-0">
                      <v-text-field
                        class="ma-0"
                        v-model="newUserData.socialLinks.linkedin"
                        placeholder="https://www.linkedin.com/"
                        label="Linkedin"
                        outlined
                        clearable
                      ></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 py-0 ma-0">
                      <v-text-field
                        class="ma-0"
                        v-model="newUserData.socialLinks.medium"
                        placeholder="https://medium.com/"
                        label="Medium"
                        outlined
                        clearable
                      ></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 py-0 ma-0">
                      <v-text-field
                        class="ma-0"
                        v-model="newUserData.socialLinks.twitter"
                        placeholder="https://www.twitter.com/"
                        label="Twitter"
                        outlined
                        clearable
                      ></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 py-0 ma-0">
                      <v-text-field
                        class="ma-0"
                        v-model="newUserData.socialLinks.web"
                        placeholder="Website/Blog URL"
                        label="Website/Blog"
                        outlined
                        clearable
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Close</v-btn>
          <v-btn
            class="white--text"
            depressed
            color="primary"
            :disabled="!valid"
            :loading="loading"
            @click="SaveSpeaker"
            >Add New Speaker</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SpeakerServices from "@/services/SpeakersServices";
export default {
  name:"AddSpeaker",
  components: {
    UploadImage: () => import("@/components/Common/ImageUpload"),
  },
  data() {
    return {
      valid: true,
      nameRules: [
        (v) => !!v || "Input is required",
        (v) => (v && v.length <= 50) || "Input must be less than 50 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      urlRules: [
        (v) => !!v || "URL is required",
        (v) =>
          /^(www\.|http:\/\/|https:\/\/|ftp:\/\/)\w+\.\w+/.test(v) ||
          "URL must be valid",
      ],
      dialog: false,
      loading: false,
      items: [true, false],
      newUserData: {
        visible: Boolean,
        id: "",
        name: "",
        designation: "",
        mbnumber: "",
        email: "",
        image: "",
        bio: "",
        city: "",
        country: "",
        company: {
          name: "",
          url: "",
        },
        createdBy: {
          name: "",
          id: "",
        },
        createdOn: "",
        lastUpdatedOn: "",
        lastUpdatedBy: {
          name: "",
          id: "",
        },
        socialLinks: {
          facebook: "",
          github: "",
          linkedin: "",
          medium: "",
          twitter: "",
          web: "",
        },
      },
    };
  },
  computed: {
    ...mapState(["userDetails"]),
  },
  methods: {
    showMessageSnakeBar(text) {
      this.$emit("message", text);
    },
    imageUploadDone(text) {
      this.imageURL = text;
    },
    SaveSpeaker() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.newUserData.createdBy.name = this.userDetails.name;
        this.newUserData.createdBy.id = this.userDetails.id;
        this.newUserData.createdOn = new Date();
        SpeakerServices.addSpeaker(this.newUserData.id, this.newUserData)
          .then((res) => {
            if (res.success == true) {
              this.loading = false;
              this.dialog = false;
              this.$emit("showSuccess", res.msg);
            }
          })
          .catch((e) => {
            this.loading = false;
            this.$emit("message", e.msg);
          });
      }
    },
  },
};
</script>