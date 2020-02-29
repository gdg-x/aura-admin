<template>
  <div class="text-center">
    <v-dialog v-model="dialog" scrollable width="1200">
      <template v-slot:activator="{ on }">
        <v-btn depressed color="primary" dark v-on="on">Add Speaker</v-btn>
      </template>
      <v-card>
        <v-card-title class="google-font">Add new Speaker</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container fluid>
            <v-form lazy-validation>
              <v-row align="center">
                <v-col cols="12">
                  <v-row align="center">
                    <v-col cols="12">
                      <p style="font-size:120%" class="my-0">Speaker Status</p>
                    </v-col>
                    <v-col cols="6" md="4" xl="3">
                      <v-select
                        :items="visiblity"
                        v-model="visible"
                        label="Visiblity Status"
                        outlined
                      ></v-select>
                    </v-col>
                    <v-col cols="6" md="4" xl="3">
                      <v-text-field v-model="userId" label="ID" type="text" outlined></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row align="center">
                    <v-col cols="12">
                      <p style="font-size:120%" class="my-0">Speaker info</p>
                    </v-col>
                    <v-col cols="12" sm="8" md="10">
                      <v-row align="center">
                        <v-col cols="12" md="8" xl="3" class="pa-1 ma-0">
                          <v-text-field v-model="name" label="Full Name" type="text" outlined></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" xl="3" class="pa-1 ma-0">
                          <v-text-field
                            v-model="desigination"
                            label="Desigination"
                            type="text"
                            outlined
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" class="pa-1 ma-0">
                          <v-text-field
                            v-model="imageURL"
                            label="Profile Image URL"
                            type="text"
                            outlined
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col cols="12" md="10" class="pa-1 ma-0">
                      <v-textarea outlined v-model="bio" label="Bio"></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row align="center">
                    <v-col cols="12">
                      <p style="font-size:120%" class="my-0">Personal Info</p>
                    </v-col>
                    <v-col cols="12" md="6" class="pa-1 ma-0">
                      <v-text-field
                        v-model="mbnumber"
                        label="Contact Number"
                        type="tel"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="pa-1 ma-0">
                      <v-text-field v-model="email" label="Email" type="email" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="pa-1 ma-0">
                      <v-text-field v-model="companyName" label="Company Name" type="text" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="pa-1 ma-0">
                      <v-text-field v-model="companyURL" label="Company URL" type="url" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="pa-1 ma-0">
                      <v-text-field v-model="city" label="City" type="text" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="pa-1 ma-0">
                      <v-text-field v-model="country" label="Country" type="text" outlined></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row align="center">
                    <v-col cols="12">
                      <p style="font-size:120%" class="my-0">Social Links</p>
                    </v-col>
                    <v-col cols="12" md="6" class="pa-1 ma-0">
                      <v-text-field v-model="facebook" label="Facebook" type="url" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="pa-1 ma-0">
                      <v-text-field v-model="twitter" label="Twitter" type="url" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="pa-1 ma-0">
                      <v-text-field v-model="github" label="Github" type="url" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="pa-1 ma-0">
                      <v-text-field v-model="linkedin" label="LinkdeIN" type="url" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="pa-1 ma-0">
                      <v-text-field v-model="medium" label="Medium" type="url" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6" class="pa-1 ma-0">
                      <v-text-field v-model="website" label="Website" type="url" outlined></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="primary" dark @click="saveData" :loading="addSpeakerLoading">Add new Speaker</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from '@/config/firebase'
export default {
  name: "addSpeaker",
  data: () => ({
    dialog: false,
    visiblity: [true, false],
    visible: Boolean,
    userId: "",
    name: "",
    desigination: "",
    imageURL: "",
    imagePre: "",
    bio: "",
    mbnumber: "",
    email: "",
    companyName: "",
    companyURL: "",
    country: "",
    city: "",
    facebook: "",
    github: "",
    linkedin: "",
    twitter: "",
    medium: "",
    website: "",
    addSpeakerLoading: false
  }),
  methods: {
    saveData() {
      this.addSpeakerLoading = true;
      var Data = {
        visible: this.visible,
        id: this.userId,
        name: this.name,
        designation: this.desigination,
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
        socialLinks: {
          facebook: this.facebook,
          github: this.github,
          linkedin: this.linkedin,
          medium: this.medium,
          twitter: this.twitter,
          web: this.website
        }
      };
      firebase.firestore
        .collection("Speakers")
        .doc(Data.id)
        .set(Data)
        .then(res => {
            console.log(res);
            this.dialog = false;
            alert('Added')
            this.addSpeakerLoading = false;
            this.$emit("showSuccess", true);
        })
        .catch(e => {
            console.log(e);
        });
    }
  }
};
</script>
