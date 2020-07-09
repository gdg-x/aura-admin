<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent scrollable width="1200">
      <template v-slot:activator="{ on }">
        <v-btn color="indigo hidden-sm-and-down" depressed dark v-on="on">Add New Speaker</v-btn>
        <v-btn fab x-small color="indigo" outlined class="hidden-md-and-up" dark v-on="on">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card v-if="dialog">
        <v-card-title
          class="google-font"
          style="border-bottom:1px solid #e0e0e0;"
          primary-title
          dark
        >Add New Speaker</v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row class="pa-0">
              <v-col md="12" cols="12">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <!-- Speaker Status -->
                  <v-row class="pa-3 py-0 my-0">
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p class="google-font mb-0" style="color:red">*indicates required field</p>
                      <p
                        style="color:red"
                      >ID should be unique, Once you assigned an ID to event, it can't be changed</p>
                    </v-col>
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p style="font-size:120%" class="my-0 mb-2">Speaker Status</p>
                    </v-col>

                    <v-col md="3" xs="3" cols="12" class="pa-1 py-0 ma-0">
                      <v-select :items="items" v-model="visible" label="Visiblity Status*" outlined></v-select>
                    </v-col>

                    <v-col md="3" xs="3" cols="12" class="pa-1 py-0 ma-0">
                      <v-text-field v-model="userId" class="ma-0" label="ID*" type="text" outlined></v-text-field>
                    </v-col>
                  </v-row>
                  <!-- Speaker Status -->

                  <!-- Speaker Info -->
                  <v-row class="pa-3 py-0 my-0">
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p style="font-size:120%" class="my-0">Speaker Info</p>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 py-0 ma-0">
                      <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        class="ma-0"
                        label="Full Name*"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 py-0 ma-0">
                      <v-text-field
                        v-model="designation"
                        class="ma-0"
                        :rules="nameRules"
                        label="Desigination *"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 py-0 ma-0">
                      <v-text-field
                        v-model="companyName"
                        class="ma-0"
                        :rules="nameRules"
                        label="Company Name *"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col md="4" xs="4" cols="12" class="pa-1 py-0 ma-0 ">
                      <v-text-field
                        v-model="companyURL"
                        class="ma-0"
                        :rules="nameRules"
                        label="Company URL *"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 py-0 ma-0">
                      <v-text-field
                        v-model="city"
                        class="ma-0"
                        :rules="nameRules"
                        label="City *"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 py-0 ma-0">
                      <v-text-field
                        v-model="country"
                        class="ma-0"
                        :rules="nameRules"
                        label="Country *"
                        outlined
                      ></v-text-field>
                    </v-col>
                    
                    <v-col md="7" xs="7" cols="6" class="pa-1 py-0 ma-0">
                      <v-text-field v-model="imageURL" class="ma-0" label="Image URL" outlined></v-text-field>
                    </v-col>
                    <v-col md="4" xs="4" cols="6" class="pa-1 py-0 ma-0">
                      <UploadImage type="speaker" :userId="userId" @message="showMessageSnakeBar" @uploadedImage="imageUploadDone"/>
                    </v-col>

                    <v-col md="12" xs="12" cols="12" class="pa-1 py-0 ma-0">
                      <v-textarea outlined name="input-7-4" v-model="bio" label="Bio"></v-textarea>
                    </v-col>
                  </v-row>

                  <!-- Personal Info -->
                  <v-row class="pa-3 py-0 my-0">
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p style="font-size:120%" class="my-0">Personal Info</p>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field class="ma-0" v-model="mbnumber" label="Contact Number" outlined></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field
                        class="ma-0"
                        v-model="email"
                        :rules="emailRules"
                        label="Email Id *"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <!-- Personal Info -->
                  <v-row class="pa-3">
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p style="font-size:120%" class="my-0">Social Links</p>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 py-0 ma-0">
                      <v-text-field class="ma-0" label="Facebook" outlined v-model="facebook"></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 py-0 ma-0">
                      <v-text-field class="ma-0" label="Github" v-model="github" outlined></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 py-0 ma-0">
                      <v-text-field class="ma-0" v-model="linkedin" label="Linkedin" outlined></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 py-0 ma-0">
                      <v-text-field class="ma-0" v-model="medium" label="Medium" outlined></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 py-0 ma-0">
                      <v-text-field class="ma-0" v-model="twitter" label="Twitter" outlined></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 py-0 ma-0">
                      <v-text-field class="ma-0" v-model="website" label="Website/Blog" outlined></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="indigo" text @click="dialog = false">Close</v-btn>
          <v-btn
            dark
            depressed
            color="indigo"
            :disabled="!valid"
            :loading="loading"
            @click="SaveSpeaker"
          >Add New Speaker</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SpeakerServices from "@/services/SpeakersServices";
export default {
  props: [],
  components:{
    UploadImage: () => import("@/components/Common/ImageUpload"),
  },
  data() {
    return {
      valid: true,
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 50) || "Name must be less than 50 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      dialog: false,
      loading: false,
      items: [true, false],
      visible: Boolean,
      userId: "",
      mbnumber: "",
      companyName: "",
      companyURL: "",
      country: "",
      city: "",
      name: "",
      facebook: "",
      github: "",
      linkedin: "",
      email: "",
      medium: "",
      twitter: "",
      password: "",
      website: "",
      bio: "",
      imageURL: "",
      designation: ""
    };
  },
  computed: {
    ...mapState(["userDetails"])
  },
  methods: {
    showMessageSnakeBar(text){
      this.$emit("message", text);
    },
    imageUploadDone(text){
      this.imageURL = text;
    },
    SaveSpeaker() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        var Data = {
          visible: this.visible,
          id: this.userId,
          name: this.name,
          designation: this.designation,
          mbnumber: this.mbnumber,
          email: this.email,
          image: this.imageURL,
          bio: this.bio,
          city: this.city,
          country: this.country,
          company: {
            name: this.companyName,
            url: this.companyURL
          },
          createdBy: {
            name: this.userDetails.name,
            id: this.userDetails.id
          },
          createdOn: new Date(),
          lastUpdatedOn: "",
          lastUpdatedBy: {
            name: "",
            id: ""
          },
          socialLinks: {
            facebook: this.facebook,
            github: this.github,
            linkedin: this.linkedin,
            medium: this.medium,
            twitter: this.twitter,
            web: this.website
          }
        };
        SpeakerServices.addSpeaker(Data.id, Data)
          .then(res => {
            if (res.success == true) {
              this.loading = false;
              this.dialog = false;
              this.$emit("showSuccess", res.msg);
            }
          })
          .catch(e => {
            this.loading = false;
            this.$emit("message", e.msg);
          });
      }
    }
  }
};
</script>