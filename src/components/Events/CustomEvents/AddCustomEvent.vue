<template>
  <div class="text-center">
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable >
      <template v-slot:activator="{ on }">
        <v-btn fab x-small color="indigo" outlined dark v-on="on">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card v-if="dialog" class="" style="">
        <v-toolbar color="white">
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title class="google-font">New Custom Event</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn text @click="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text class="px-1">
            <v-container fluid class="" style="">
                <v-form ref="form" v-model="valid" lazy-validation>
                <v-row justify="center" align="start">
                    <v-col md="3" lg="2" cols="12" sm="3">
                        <img style="width:100%;text-align:center" :src="require('@/assets/img/svg/dataentry.svg')"/>
                        <h3 class="google-font">New Custom Event </h3>
                        <p class="google-font mb-0" style="color:red">*indicates required field</p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi dolore facilis maiores sed doloribus ratione omnis modi saepe impedit laboriosam officia eligendi vel optio nulla voluptas, sapiente, fugiat eos ullam.
                    </v-col>
                    <v-col md="8" lg="9" cols="12" sm="8">
                        <v-row>
                            <v-col class="ma-0" md="12" cols="12">
                                <h4 class="google-font mb-0">Event Status</h4>
                                <p class="google-font mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, non nihil dignissimos atque delectus eum itaque unde necessitatibus excepturi provident debitis similique ullam blanditiis reiciendis ea perferendis in? Iusto, facilis.</p>
                            </v-col>
                            <v-col md="3" cols="6" class="ma-0">
                            <v-select :items="items" v-model="active" :rules="idRules" label="Active Status*" outlined></v-select>
                            </v-col>

                            <v-col md="3" cols="6" class="ma-0">
                            <v-select :items="items" v-model="visible" :rules="idRules" label="Visiblity Status*" outlined></v-select>
                            </v-col>

                            <v-col md="3" xs="12" cols="12" class="ma-0">
                            <v-text-field v-model="id" class="ma-0" :rules="idRules" label="Event ID*" type="text" outlined></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col class="ma-0" md="12" cols="12">
                                <h4 class="google-font mb-0">Event Info</h4>
                                <p class="google-font mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, non nihil </p>
                            </v-col>

                            <v-col md="5" xs="3" cols="12" class="ma-0">
                            <v-text-field v-model="name" class="ma-0" :rules="idRules" label="Event Name*" type="text" outlined></v-text-field>
                            </v-col>

                            <v-col md="3" xs="3" cols="12" class="ma-0">
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

                            <v-col md="2" xs="3" cols="12" class="ma-0">
                            <v-text-field v-model="name" class="ma-0" :rules="idRules" label="Event Start Time*" type="time" outlined></v-text-field>
                            </v-col>

                            <v-col md="2" xs="3" cols="12" class="ma-0">
                            <v-text-field v-model="name" class="ma-0" :rules="idRules" label="Event End Time*" type="time" outlined></v-text-field>
                            </v-col>
                            <v-col md="4" xs="4" cols="12" class="ma-0">
                            <v-text-field v-model="imageURL" class="ma-0" label="Venue" outlined></v-text-field>
                            </v-col>
                            <v-col md="8" xs="4" cols="12" class="ma-0">
                                <v-text-field v-model="imageURL" class="ma-0" label="Venue Google Maps Link" outlined></v-text-field>
                            </v-col>

                            <v-col md="6" xs="4" cols="12" class="ma-0">
                            <v-text-field v-model="imageURL" class="ma-0" label="Image URL" outlined></v-text-field>
                            </v-col>

                            <v-col md="6" xs="4" cols="12" class="ma-0">
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

                            <v-col md="12" xs="12" cols="12" class="ma-0">
                            <v-textarea outlined name="input-7-4" v-model="bio" label="Event Description"></v-textarea>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col class="ma-0" md="12" cols="12">
                                <h4 class="google-font mb-0">Speaker & Partners Info</h4>
                                <p class="google-font mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, non nihil </p>
                            </v-col>
                            <v-col md="6" xs="6" lg="4" cols="12" class="ma-0">
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
                            <v-col md="6" xs="6" lg="4" cols="12" class="ma-0">
                                <v-select
                                v-model="selectedPartners"
                                :items="partnersData"
                                outlined
                                item-text="name"
                                item-value="id"
                                label="Select Partners"
                                multiple>
                                    <template v-slot:selection="{ item, index }">
                                        <v-chip small v-if="index === 0">
                                            <span>{{ item.name }}</span>
                                        </v-chip>
                                        <span
                                            v-if="index === 1"
                                            class="grey--text caption"
                                        >(+{{ partnersData.length - 1 }} others)</span>
                                    </template>
                                </v-select>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col class="ma-0" md="12" cols="12">
                                <h4 class="google-font mb-0">Event Links Info</h4>
                                <p class="google-font mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, non nihil </p>
                            </v-col>
                            <v-col md="4" xs="4" lg="4" cols="12" class="ma-0">
                                <v-text-field v-model="sd" class="ma-0" label="Event Meetup URL" outlined></v-text-field>
                            </v-col>
                            <v-col md="4" xs="4" lg="4" cols="12" class="ma-0">
                                <v-text-field v-model="sd" class="ma-0" label="Event Registration Link" outlined></v-text-field>
                            </v-col>
                            <v-col md="4" xs="4" lg="4" cols="12" class="ma-0">
                                <v-text-field v-model="sd" class="ma-0" label="Event Facebook Page Link" outlined></v-text-field>
                            </v-col>
                            <v-col md="4" xs="4" lg="4" cols="12" class="ma-0">
                                <v-text-field v-model="sd" class="ma-0" label="Event Feedback Link" outlined></v-text-field>
                            </v-col>
                            <v-col md="4" xs="4" lg="4" cols="12" class="ma-0">
                                <v-text-field v-model="sd" class="ma-0" label="Call For Speaker Link" outlined></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row class="">
                            <v-col class="ma-0" md="12" cols="12" style="">
                                <h4 class="google-font mb-0">Event Agenda Info</h4>
                                <p class="google-font mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, non nihil </p>
                            </v-col>
                            <v-col class="ma-0" md="12" cols="12">
                                <v-toolbar class="elevation-0" style="border:1px solid #e0e0e0;border-radius:5px;">
                                    <v-toolbar-title class="google-font mr-3">Event Agenda </v-toolbar-title>
                                    <v-spacer></v-spacer>
                                    <AddNewAgenda :data.sync="eventData.agenda"/>
                                </v-toolbar>
                            </v-col>

                            <v-col cols="12" v-if="eventData.agenda.length<=0" class="">
                                <v-img :src="require('@/assets/img/svg/DataNotFound.svg')" :height="150" contain></v-img>
                                <p class="google-font my-0 py-0 mb-2 text-center">No Agenda found</p>
                            </v-col>

                            <v-col cols="12">
                                <v-row >
                                    <v-col md="12" class="my-1 py-0">
                                        <v-data-table
                                            v-for="(item,idx) in eventData.agenda" :key="idx"
                                            :headers="headers"
                                            :items="eventData.agenda"
                                            :items-per-page="5"
                                            class="elevation-0 lightModeCard"
                                        >
                                            <template v-slot:item.actions="{ item }">
                                               <EditAgenda class="red" :data.sync = "item"/>
                                               <RemoveAgenda :data.sync = "item"/>
                                            </template>
                                        </v-data-table>
                                    </v-col>
                                </v-row>
                            </v-col>
                            
                        </v-row>
                    </v-col>
                    
                </v-row>
                </v-form>
            </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <!-- <v-card-actions class="indigo py-5 elevation-5">
          <div class="flex-grow-1"></div>
          <v-btn color="white" text @click="dialog = false">Close</v-btn>
          <v-btn
            color="white"
            depressed
            :disabled="!valid"
            :loading="loading"
            @click="SaveEvent"
          >Save</v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "@/config/firebase";
import AddNewAgenda from "@/components/Events/CustomEvents/AddNewAgenda"
import EditAgenda from "@/components/Events/CustomEvents/EditAgenda"
import RemoveAgenda from "@/components/Events/CustomEvents/RemoveAgenda"
export default {
  components:{
    AddNewAgenda,
    EditAgenda,
    RemoveAgenda
  },
  props: [],
  data() {
    return {
      menu:false,
      imageUpload: [],
      headers:[
          {
            text: 'Start Time',
            value: 'starttime',
          },
          {
            text: 'End Time',
            value: 'endtime',
          },
          { text: 'Title', value: 'title' },
          { text: 'Description', value: 'des' },
          { text: 'Actions', sortable: false, value: 'actions' },
      ],
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
      dialog: true,
      loading: false,
      items: [true, false],
      eventData:{
        id:'',
        active: Boolean,
        visible: Boolean,
        name:'',
        image:'',
        date:'',
        des:'',
        venue:{
            name:'',
            googlemapsurl:''
        },
        links:{
            meetup:'',
            facebook:'',
            registration:'',
            feedback:'',
            callforspeaker:''
        },
        time:{
            starttime:'',
            endtime:''
        },
        hashtags:[],
        speakers:[],
        partners:[],
        agenda:[
            {
                starttime:'5',
                endtime:'5',
                title:'asfdsafsaf',
                des:'asfasdfsdfsdfdfdsfdsfdsfdsf'
            }]
      },
      speakersData:[],
      selectedSpeaker:[],
      selectedPartners:[],
      partnersData:[]
    };
  },
  mounted(){
    this.ShowSpeakers()
    this.ShowPartners()
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
          });
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    },
    ShowPartners(){
        firebase.firestore
        .collection("partners")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.partnersData.push(doc.data());
            console.log(this.partnersData)
          });
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