<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent scrollable width="1300">
      <template v-slot:activator="{ on }">
        <v-btn fab x-small color="indigo" outlined dark v-on="on">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card v-if="dialog" class="" style="border-radius:7px">
        <v-card-title
          class="google-font lightModeCard"
          primary-title
          dark
        >Add New Custom <div class="flex-grow-1"></div> asd</v-card-title>
        <v-card-text class="px-1">
          <v-container fluid>
            <v-row class="pa-0">
              <v-col md="12" cols="12">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-row class="pa-3 py-0">
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p class="google-font mb-0" style="color:red">*indicates required field</p>
                    </v-col>
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p style="font-size:120%" class="my-0 mb-2">Custom Event Status</p>
                    </v-col>

                    <v-col md="3" xs="3" cols="12" class="pa-1 ma-0">
                      <v-select :items="items" v-model="active" :rules="idRules" label="Active Status*" outlined></v-select>
                    </v-col>

                    <v-col md="3" xs="3" cols="12" class="pa-1 ma-0">
                      <v-select :items="items" v-model="visible" :rules="idRules" label="Visiblity Status*" outlined></v-select>
                    </v-col>

                    <v-col md="3" xs="3" cols="12" class="pa-1 ma-0">
                      <v-text-field v-model="id" class="ma-0" :rules="idRules" label="ID*" type="text" outlined></v-text-field>
                    </v-col>

                  </v-row>
                  <v-row class="pa-3 py-0">
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p style="font-size:120%" class="my-0">Custom Event Info</p>
                    </v-col>

                    <v-col md="5" xs="3" cols="12" class="pa-1 ma-0">
                      <v-text-field v-model="name" class="ma-0" :rules="idRules" label="Event Name*" type="text" outlined></v-text-field>
                    </v-col>

                    <v-col md="3" xs="3" cols="12" class="pa-1 ma-0">
                      <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="date"
                                    label="Date"
                                    outlined
                                    :rules="nameRules"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker v-model="date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-col>

                    <v-col md="2" xs="3" cols="12" class="pa-1 ma-0">
                      <v-text-field v-model="name" class="ma-0" :rules="idRules" label="Event Start Time*" type="time" outlined></v-text-field>
                    </v-col>

                    <v-col md="2" xs="3" cols="12" class="pa-1 ma-0">
                      <v-text-field v-model="name" class="ma-0" :rules="idRules" label="Event End Time*" type="time" outlined></v-text-field>
                    </v-col>
                    <v-col md="6" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field v-model="imageURL" class="ma-0" label="Venue" outlined></v-text-field>
                    </v-col>

                    <v-col md="6" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field v-model="imageURL" class="ma-0" label="Image URL" outlined></v-text-field>
                    </v-col>

                    <v-col md="12" xs="4" cols="12" class="pa-1 ma-0">
                     <v-combobox
                        chips
                        v-model="eventData.hashtags"
                        clearable
                        label="Event Hashtags"
                        multiple
                        outlined>
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

                    <!-- Image URL Upload Model -->
                    <!-- <v-col cols="12" sm="6" class="pa-1 ma-0">
                        <v-dialog v-model="dialogImageUload" max-width="290">
                          <template v-slot:activator="{ on }">
                            <v-btn
                              color="primary"
                              :loading="imageUploading"
                              dark
                              class="mt-n6"
                              v-on="on"
                            >Upload Image</v-btn>
                          </template>
                          <v-card>
                            <v-card-title>Upload Speaker Image</v-card-title>
                            <v-card-text>
                              <v-img :src="imagePre" class="mb-6"></v-img>

                              <v-file-input
                                v-model="imageUpload"
                                accept="image/*"
                                label="File input"
                                prepend-icon
                                @change="onFileChange"
                                outlined
                              ></v-file-input>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="green darken-1"
                                text
                                @click="dialogImageUload = false"
                              >Disagree</v-btn>
                              <v-btn color="green darken-1" text @click="uploadImage">Agree</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                    </v-col>-->
                    <!-- Image URL Upload Model -->

                    <!-- <v-col md="4" xs="12" cols="12" class="pa-1 ma-0">
                        <v-img :src="imageURL" class="mt-n7"></v-img>
                    </v-col>-->

                    <v-col md="12" xs="12" cols="12" class="pa-1 ma-0">
                      <v-textarea outlined name="input-7-4" v-model="bio" label="Event Description"></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row class="pa-3 py-0">
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p style="font-size:120%" class="my-0">Speakers Info</p>
                    </v-col>
                    <v-col md="8" xs="4" cols="12" class="pa-1 ma-0">
                        <v-select
                        v-model="selectedSpeaker"
                        :items="speakersData"
                        outlined
                        item-text="name"
                        item-value="id"
                        label="Select Speaker"
                        multiple>
                            <template v-slot:selection="{ item, index }">
                                <v-chip small v-if="index === 0">
                                    <span>{{ item.name }}</span>
                                </v-chip>
                                <span
                                    v-if="index === 1"
                                    class="grey--text caption"
                                >(+{{ speakersData.length - 1 }} others)</span>
                            </template>
                        </v-select>
                    </v-col>

                   
                  </v-row>
                  <v-row class="pa-3 py-0">
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p style="font-size:120%" class="my-0">Social Links</p>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field class="ma-0" label="Facebook" outlined v-model="facebook"></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field class="ma-0" label="Github" v-model="github" outlined></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field class="ma-0" v-model="linkedin" label="Linkedin" outlined></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field class="ma-0" v-model="meetup" label="Meetup" outlined></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field class="ma-0" v-model="twitter" label="Twitter" outlined></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field class="ma-0" v-model="web" label="Website/Blog" outlined></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="grey lighten-4 py-5">
          <div class="flex-grow-1"></div>
          <v-btn color="indigo" text @click="dialog = false">Close</v-btn>
          <v-btn
            color="indigo"
            dark
            depressed
            :disabled="!valid"
            :loading="loading"
            @click="SaveEvent"
          >Add New Team Member</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "@/config/firebase";
export default {
  props: [],
  data() {
    return {
      menu:false,
      imageUpload: [],
      imagePre: "",
      imageUploading: false,
      valid: true,
      dialogImageUload: false,
      idRules: [
        v => !!v || "Field Value is required",
        v => (v && v.length <= 30) || "Name must be less than 30 characters"
      ],
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 50) || "Name must be less than 50 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      teamRole: ["Organizing Team", "Core Team", "Volunteer"],
      dialog: false,
      loading: false,
      items: [true, false],
      active: Boolean,
      visible: Boolean,
      id: "",
      mbnumber: "",
      name: "",
      facebook: "",
      github: "",
      linkedin: "",
      email: "",
      meetup: "",
      twitter: "",
      password: "",
      web: "",
      bio: "",
      imageURL: "",
      designation: "",
      role: null,
      eventData:{
        hashtags:[]
      },
      speakersData:[],
      selectedSpeaker:[]
    };
  },
  mounted(){
    this.ShowSpeakers()
    console.log('Add Team component created')
  },
  methods: {
    ShowSpeakers(){
        firebase.firestore
        .collection("Speakers")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.speakersData.push(doc.data());
            console.log(this.speakersData)
            // this.speakersData = [];
          });
        //   this.isLoading = false;
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    },
    remove(item) {
      this.eventData.hashtags.splice(
        this.eventData.hashtags.indexOf(item),
        1
      );
      this.eventData.hashtags = [...this.eventData.hashtags];
    },
    SaveEvent() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        var Data = {
          active: this.active,
          visible: this.visible,
          name: this.name,
          designation: this.designation,
          mbnumber: this.mbnumber,
          email: this.email,
          image: this.imageURL,
          bio: this.bio,
          id: this.id,
          role: this.role,
          socialLinks: {
            facebook: this.facebook,
            github: this.github,
            linkedin: this.linkedin,
            meetup: this.meetup,
            twitter: this.twitter,
            web: this.web
          }
        };
        firebase.firestore
          .collection("team")
          .doc(Data.id)
          .set(Data)
          .then(res => {
            this.loading = false;
            this.dialog = false;
            this.$emit("showSuccess", "Team Member Added Success");

            // firebase.auth.createUserWithEmailAndPassword(this.email, this.password).then((user)=>{
            //   console.log(user.user.uid);
            //   var userData = {
            //     email: this.email,
            //     id: this.id,
            //     name:this.name,
            //     profile: this.imageURL,
            //     role:this.role
            //   }
            //   // firebase.firestore.collection("users").doc(user.user.uid).set(userData).then(res=>{
            //   //   console.log(res);
            //   //   this.dialog = false;
            //   //   this.$emit("showSuccess","Team Member Added Success");
            //   // })
            // }).catch(e=>{
            //   console.log(e);
            //   this.$emit("showSuccess","Failed to Add Team Member");
            //   })
          })
          .catch(e => {
            this.loading = false;
            console.log(e);
            this.$emit("showSuccess", "Failed to Add Team Member");
          });
      }
    }
  }
};
</script>