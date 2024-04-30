<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <template v-slot:activator="{}">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              fab
              x-small
              color="primary"
              outlined
              background-color="white"
              dark
              v-on="on"
              @click.stop="dialog = true"
            >
              <v-icon dark>mdi-lead-pencil</v-icon>
            </v-btn>
          </template>
          <span>Edit {{ eventInfo.name }}</span>
        </v-tooltip>
      </template>
      <v-card v-if="dialog" class style="background-color: #F5F8FC;">
        <v-toolbar color="white">
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title class="google-font"
            >Edit {{ eventInfo.name }}</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            :loading="loading"
            depressed
            dark
            @click="SaveEvent"
            >Edit Event</v-btn
          >
        </v-toolbar>
        <v-card-text class="px-1">
          <v-container class style>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row justify="center" align="start" class="mt-4">
                <v-col md="4" lg="3" cols="12" sm="3" class="pa-md-4">
                  <img
                    style="width: 100%; text-align: center"
                    :src="require('@/assets/img/svg/dataentry.svg')"
                  />
                  <h3 class="google-font">Edit {{ eventInfo.name }}</h3>
                  <p class="google-font mb-0" style="color: red">
                    *indicates required field
                  </p>
                  <p>Event ID should be Unique</p>
                </v-col>
                <v-col md="8" lg="9" cols="12" sm="9" class="pa-md-8" style="background-color: white;border-radius: 12px;" >
                  <v-row>
                    <v-col class="ma-0" md="12" cols="12">
                      <h4 class="google-font mb-0">Event Status</h4>
                    </v-col>
                    <v-col md="3" cols="6" class="ma-0">
                      <v-select
                        :items="items"
                        v-model="updatedeventData.active"
                        label="Active Status*"
                        outlined
                        background-color="white"
                      ></v-select>
                    </v-col>

                    <v-col md="3" cols="6" class="ma-0">
                      <v-select
                        :items="items"
                        v-model="updatedeventData.visible"
                        label="Visiblity Status*"
                        outlined
                        background-color="white"
                      ></v-select>
                    </v-col>

                    <v-col md="3" xs="12" cols="12" class="ma-0">
                      <v-text-field
                        disabled
                        v-model="updatedeventData.id"
                        class="ma-0"
                        :rules="idRules"
                        label="Event ID*"
                        type="text"
                        outlined
                        background-color="white"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col class="ma-0" md="12" cols="12">
                      <h4 class="google-font mb-0">Event Info</h4>
                    </v-col>

                    <v-col md="5" xs="3" cols="12" class="ma-0">
                      <v-text-field
                        v-model="updatedeventData.name"
                        class="ma-0"
                        :rules="idRules"
                        label="Event Name*"
                        type="text"
                        outlined
                        background-color="white"
                      ></v-text-field>
                    </v-col>

                    <v-col md="3" xs="3" cols="12" class="ma-0">
                      <v-text-field
                        v-model="updatedeventData.date"
                        class="ma-0"
                        label="Date *"
                        type="date"
                        outlined
                        background-color="white"
                      ></v-text-field>
                    </v-col>

                    <v-col md="2" xs="3" cols="12" class="ma-0">
                      <v-text-field
                        v-model="updatedeventData.time.starttime"
                        class="ma-0"
                        label="Start Time"
                        type="time"
                        outlined
                        background-color="white"
                      ></v-text-field>
                      
                    </v-col>

                    <v-col md="2" xs="3" cols="12" class="ma-0">
                      <v-text-field
                        v-model="updatedeventData.time.endtime"
                        class="ma-0"
                        label="End Time"
                        type="time"
                        outlined
                        background-color="white"
                      ></v-text-field>
                    </v-col>
                    <v-col md="4" xs="4" cols="12" class="ma-0">
                      <v-text-field
                        v-model="updatedeventData.venue.name"
                        class="ma-0"
                        label="Venue"
                        outlined
                        background-color="white"
                      ></v-text-field>
                    </v-col>
                    <v-col md="8" xs="4" cols="12" class="ma-0">
                      <v-text-field
                        v-model="updatedeventData.venue.googlemapsurl"
                        class="ma-0"
                        label="Venue Google Maps Link"
                        outlined
                        background-color="white"
                      ></v-text-field>
                    </v-col>

                    <!-- <v-col md="6" xs="4" cols="12" class="ma-0">
                      <v-text-field
                        v-model="updatedeventData.image"
                        class="ma-0"
                        label="Image URL"
                        outlined
                        background-color="white"
                      ></v-text-field>
                    </v-col>-->
                    <v-col md="7" xs="7" cols="6" class="ma-0">
                      <v-text-field
                        v-model="updatedeventData.image"
                        class="ma-0"
                        label="Image URL"
                        outlined
                        background-color="white"
                      ></v-text-field>
                    </v-col>
                    <v-col md="4" xs="4" cols="6" class="ma-0">
                      <UploadImage
                        type="events"
                        :userId="updatedeventData.id"
                        @message="showMessageSnakeBar"
                        @uploadedImage="imageUploadDone"
                      />
                    </v-col>

                    <v-col md="12" xs="12" cols="12" class="ma-0">
                      <v-combobox
                        chips
                        v-model="updatedeventData.hashtags"
                        clearable
                        label="Event Hashtags"
                        multiple
                        outlined
                        background-color="white"
                      >
                        <template
                          v-slot:selection="{ attrs, item, select, selected }"
                        >
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

                      <tiptap-vuetify
                        v-model="updatedeventData.des"
                        :extensions="extensions"
                        class="elevation-0"
                        placeholder="Event Description"
                        :card-props="{
                          flat: true,
                          color: '#F0F0F0',
                          outlined: true,
                        }"
                        :toolbar-attributes="{ color: '#e0e0e0' }"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col class="ma-0" md="12" cols="12">
                      <h4 class="google-font mb-0">Speaker & Partners Info</h4>
                    </v-col>
                    <v-col md="6" xs="6" lg="4" cols="12" class="ma-0">
                      <v-autocomplete
                        v-model="updatedeventData.speakers"
                        :items="speakersData"
                        outlined
                        background-color="white"
                        item-text="name"
                        item-value="id"
                        label="Select Speaker"
                        multiple
                      >
                        <template v-slot:selection="{ item, index }">
                          <v-chip small v-if="index === 0">
                            <span>{{ item.name }}</span>
                          </v-chip>
                          <span v-if="index === 1" class="grey--text caption"
                            >(+{{ speakersData.length - 1 }} others)</span
                          >
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col md="6" xs="6" lg="4" cols="12" class="ma-0">
                      <v-autocomplete
                        v-model="updatedeventData.partners"
                        :items="partnersData"
                        outlined
                        background-color="white"
                        item-text="name"
                        item-value="id"
                        label="Select Partners"
                        multiple
                      >
                        <template v-slot:selection="{ item, index }">
                          <v-chip small v-if="index === 0">
                            <span>{{ item.name }}</span>
                          </v-chip>
                          <span v-if="index === 1" class="grey--text caption"
                            >(+{{ partnersData.length - 1 }} others)</span
                          >
                        </template>
                      </v-autocomplete>
                    </v-col>
                    <v-col md="6" xs="6" lg="4" cols="12" class="ma-0">
                      <v-autocomplete
                        v-model="updatedeventData.team"
                        :items="teamData"
                        outlined
                        background-color="white"
                        chips
                        item-text="name"
                        item-value="id"
                        small-chips
                        label="Select Team"
                        multiple
                      >
                        <template v-slot:selection="{ item, index }">
                          <v-chip small v-if="index === 0">
                            <span>{{ item.name }}</span>
                          </v-chip>
                          <span v-if="index === 1" class="grey--text caption"
                            >(+{{
                              updatedeventData.team.length - 1
                            }}
                            others)</span
                          >
                        </template>
                      </v-autocomplete>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col class="ma-0" md="12" cols="12">
                      <h4 class="google-font mb-0">Event Links Info</h4>
                    </v-col>
                    <v-col md="4" xs="4" lg="4" cols="12" class="ma-0">
                      <v-text-field
                        v-model="updatedeventData.links.meetup"
                        class="ma-0"
                        label="Event Meetup URL"
                        outlined
                        background-color="white"
                      ></v-text-field>
                    </v-col>
                    <v-col md="4" xs="4" lg="4" cols="12" class="ma-0">
                      <v-text-field
                        v-model="updatedeventData.links.registration"
                        class="ma-0"
                        label="Event Registration Link"
                        outlined
                        background-color="white"
                      ></v-text-field>
                    </v-col>
                    <v-col md="4" xs="4" lg="4" cols="12" class="ma-0">
                      <v-text-field
                        v-model="updatedeventData.links.facebook"
                        class="ma-0"
                        label="Event Facebook Page Link"
                        outlined
                        background-color="white"
                      ></v-text-field>
                    </v-col>
                    <v-col md="4" xs="4" lg="4" cols="12" class="ma-0">
                      <v-text-field
                        v-model="updatedeventData.links.feedback"
                        class="ma-0"
                        label="Event Feedback Link"
                        outlined
                        background-color="white"
                      ></v-text-field>
                    </v-col>
                    <v-col md="4" xs="4" lg="4" cols="12" class="ma-0">
                      <v-text-field
                        v-model="updatedeventData.links.callforspeaker"
                        class="ma-0"
                        label="Call For Speaker Link"
                        outlined
                        background-color="white"
                      ></v-text-field>
                    </v-col>
                    <v-col md="4" xs="4" lg="4" cols="12" class="ma-0">
                      <v-text-field
                        v-model="updatedeventData.links.youtube"
                        class="ma-0"
                        label="Youtube Live URL"
                        outlined
                        background-color="white"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row class>
                    <v-col class="ma-0" md="12" cols="12" style>
                      <h4 class="google-font mb-0">Event Agenda Info</h4>
                    </v-col>
                    <v-col class="ma-0" md="12" cols="12">
                      <v-toolbar
                        class="elevation-0"
                        style="border-radius: 12px"
                        color="#F5F8FC"
                      >
                        <v-toolbar-title class="google-font mr-3"
                          >Event Agenda</v-toolbar-title
                        >
                        <v-spacer></v-spacer>
                        <AddNewAgenda @add="updatedeventData.agenda=$event" :item.sync="updatedeventData.agenda" />
                      </v-toolbar>
                    </v-col>

                    <v-col
                      cols="12"
                      v-if="updatedeventData.agenda.length <= 0"
                      class
                    >
                      <v-img
                        :src="require('@/assets/img/svg/DataNotFound.svg')"
                        :height="150"
                        contain
                      ></v-img>
                      <p class="google-font my-0 py-0 mb-2 text-center">
                        No Agenda found
                      </p>
                    </v-col>

                    <v-col cols="12" v-else>
                      <v-row>
                        <v-col md="12" class="my-1 py-0">
                          <v-data-table
                            :headers="headers"
                            mobile-breakpoint="0"
                            :items.sync="updatedeventData.agenda"
                            :items-per-page="5"
                            class="elevation-0 lightModeCard"
                          >
                            <template v-slot:[`item.actions`]="{ item }">
                              <EditAgenda :item="item" />
                              <v-btn
                                fab
                                x-small
                                color="primary"
                                class="mx-1"
                                outlined
                                background-color="white"
                                dark
                              >
                                <v-icon @click="deleteData(idx)"
                                  >mdi-delete</v-icon
                                >
                              </v-btn>
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
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Image,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from "tiptap-vuetify";
import { mapState } from "vuex";
import TeamServices from "@/services/TeamServices";
import PartnersServices from "@/services/PartnersServices";
import SpeakerServices from "@/services/SpeakersServices";
import CustomEventServices from "@/services/CustomEventServices";
export default {
  name:"EditCustomEvent",
  components: {
    TiptapVuetify,
    AddNewAgenda: () => import("@/components/Events/CustomEvents/AddNewAgenda"),
    EditAgenda: () => import("@/components/Events/CustomEvents/EditAgenda"),
    UploadImage: () => import("@/components/Common/ImageUpload"),
  },
  computed: {
    ...mapState(["userDetails"]),
  },
  props: {
    eventInfo: {},
  },
  data() {
    return {
      menu: false,
      modal2: false,
      modal1: false,
      headers: [
        {
          text: "Start Time",
          value: "starttime",
        },
        {
          text: "End Time",
          value: "endtime",
        },
        { text: "Title", value: "title" },
        { text: "Description", value: "des" },
        { text: "Actions", sortable: false, value: "actions" },
      ],
      valid: true,
      idRules: [
        (v) => !!v || "Field Value is required",
        (v) => (v && v.length <= 30) || "Name must be less than 30 characters",
      ],
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 50) || "Name must be less than 50 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      teamRole: ["Organizing Team", "Core Team", "Volunteer"],
      dialog: false,
      loading: false,
      items: [true, false],

      updatedeventData: {
        id: this.eventInfo.id,
        active: this.eventInfo.active,
        visible: this.eventInfo.visible,
        name: this.eventInfo.name,
        image: this.eventInfo.image,
        date: this.eventInfo.date,
        des: this.eventInfo.des,
        venue: {
          name: this.eventInfo.venue.name,
          googlemapsurl: this.eventInfo.venue.googlemapsurl,
        },
        links: {
          meetup: this.eventInfo.links.meetup,
          facebook: this.eventInfo.links.facebook,
          registration: this.eventInfo.links.registration,
          feedback: this.eventInfo.links.feedback,
          callforspeaker: this.eventInfo.links.callforspeaker,
          youtube: this.eventInfo.links.youtube,
        },
        time: {
          starttime: this.eventInfo.time.starttime,
          endtime: this.eventInfo.time.endtime,
        },
        hashtags: this.eventInfo.hashtags,
        speakers: this.eventInfo.speakers,
        partners: this.eventInfo.partners,
        team: this.eventInfo.team,
        agenda: this.eventInfo.agenda,
      },
      speakersData: [],
      partnersData: [],
      teamData: [],
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3],
            },
          },
        ],
        Bold,
        Code,
        Image,
        HorizontalRule,
        Paragraph,
        HardBreak,
      ],
    };
  },
  mounted() {
    this.ShowSpeakers();
    this.ShowPartners();
    this.ShowTeam();
  },
  methods: {
    showMessageSnakeBar(text) {
      this.$emit("message", text);
    },
    imageUploadDone(text) {
      this.updatedeventData.image = text;
    },
    deleteData(index) {
      this.updatedeventData.agenda.splice(index, 1);
    },
    ShowSpeakers() {
      this.speakersData = [];
      SpeakerServices.getAllSpeakers()
        .then((res) => {
          if (res.success == true) {
            this.speakersData = res.data;
          }
        })
        .catch((e) => {
          console.log("Error getting documents", e);
        });
    },
    ShowPartners() {
      this.partnersData = [];
      PartnersServices.getAllPartners()
        .then((res) => {
          if (res.success == true) {
            this.partnersData = res.data;
          }
        })
        .catch((e) => {
          console.log("Error getting documents", e);
        });
    },
    ShowTeam() {
      this.teamData = [];
      TeamServices.getAllTeam()
        .then((res) => {
          this.teamData = res.data;
        })
        .catch((e) => {
          console.log("Error getting documents", e);
        });
    },
    remove(item) {
      this.updatedeventData.hashtags.splice(
        this.updatedeventData.hashtags.indexOf(item),
        1
      );
      this.updatedeventData.hashtags = [...this.updatedeventData.hashtags];
    },
    SaveEvent() {
      this.loading = true;
      let datatoupdate = {
        active: this.updatedeventData.active,
        visible: this.updatedeventData.visible,
        name: this.updatedeventData.name,
        image: this.updatedeventData.image,
        date: this.updatedeventData.date,
        des: this.updatedeventData.des,
        venue: {
          name: this.updatedeventData.venue.name,
          googlemapsurl: this.updatedeventData.venue.googlemapsurl,
        },
        lastUpdatedOn: new Date(),
        lastUpdatedBy: {
          name: this.userDetails.name,
          id: this.userDetails.id,
        },
        links: {
          meetup: this.updatedeventData.links.meetup,
          facebook: this.updatedeventData.links.facebook,
          registration: this.updatedeventData.links.registration,
          feedback: this.updatedeventData.links.feedback,
          callforspeaker: this.updatedeventData.links.callforspeaker,
          youtube: this.updatedeventData.links.youtube,
        },
        time: {
          starttime: this.updatedeventData.time.starttime,
          endtime: this.updatedeventData.time.endtime,
        },
        hashtags: this.updatedeventData.hashtags,
        speakers: this.updatedeventData.speakers,
        partners: this.updatedeventData.partners,
        team: this.updatedeventData.team,
        agenda: this.updatedeventData.agenda,
      };
      CustomEventServices.editCustomEvent(this.eventInfo.id, datatoupdate)
        .then((res) => {
          if (res.success == true) {
            this.loading = false;
            this.dialog = false;
            this.$emit("editedSuccess", res.msg);
          }
        })
        .catch((e) => {
          console.log(e.msg);
          this.loading = false;
          this.$emit("message", e.msg);
        });
    },
  },
  // }
};
</script>