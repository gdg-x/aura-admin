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
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Add New Custom Event</span>
        </v-tooltip>
      </template>
      <v-card v-if="dialog" class style="background-color: #f5f8fc">
        <v-toolbar color="white">
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title class="google-font"
            >New Custom Event</v-toolbar-title
          >
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            :loading="loading"
            depressed
            dark
            @click="SaveEvent"
            >Save Event</v-btn
          >
        </v-toolbar>
        <v-card-text class="px-1">
          <v-container class style>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row justify="center" align="start" class="mt-4">
                <v-col md="4" lg="3" cols="12" sm="3" class="pa-md-8">
                  <img
                    style="width: 100%; text-align: center"
                    :src="require('@/assets/img/svg/dataentry.svg')"
                  />
                  <h3 class="google-font">New Custom Event</h3>
                  <p class="google-font mb-0" style="color: red">
                    *indicates required field
                  </p>
                  <p>Event ID should be Unique</p>
                  <p style="color: red">
                    Once you assigned an ID to event, it can't be changed
                  </p>
                </v-col>
                <v-col
                  md="8"
                  lg="9"
                  cols="12"
                  sm="8"
                  style="background-color: white; border-radius: 12px"
                  class="pa-md-8"
                >
                  <v-row>
                    <v-col class="ma-0" md="12" cols="12">
                      <h4 class="google-font mb-0">Event Status</h4>
                    </v-col>
                    <v-col md="3" cols="6" class="ma-0">
                      <v-select
                        :items="items"
                        v-model="eventData.active"
                        label="Active Status*"
                        outlined
                        background-color="white"
                      ></v-select>
                    </v-col>

                    <v-col md="3" cols="6" class="ma-0">
                      <v-select
                        :items="items"
                        v-model="eventData.visible"
                        label="Visiblity Status*"
                        outlined
                        background-color="white"
                      ></v-select>
                    </v-col>

                    <v-col md="3" xs="12" cols="12" class="ma-0">
                      <v-text-field
                        v-model="eventData.id"
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
                        v-model="eventData.name"
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
                        v-model="eventData.date"
                        class="ma-0"
                        label="Date *"
                        type="date"
                        outlined
                        background-color="white"
                      ></v-text-field>
                    </v-col>

                    <v-col md="2" xs="3" cols="12" class="ma-0">
                      <v-text-field
                        v-model="eventData.time.starttime"
                        class="ma-0"
                        label="Start Time"
                        type="time"
                        outlined
                        background-color="white"
                      ></v-text-field>
                    </v-col>

                    <v-col md="2" xs="3" cols="12" class="ma-0">
                      <v-text-field
                        v-model="eventData.time.endtime"
                        class="ma-0"
                        label="End Time"
                        type="time"
                        outlined
                        background-color="white"
                      ></v-text-field>
                    </v-col>
                    <v-col md="4" xs="4" cols="12" class="ma-0">
                      <v-text-field
                        v-model="eventData.venue.name"
                        class="ma-0"
                        label="Venue"
                        outlined
                        background-color="white"
                      ></v-text-field>
                    </v-col>
                    <v-col md="8" xs="4" cols="12" class="ma-0">
                      <v-text-field
                        v-model="eventData.venue.googlemapsurl"
                        class="ma-0"
                        label="Venue Google Maps Link"
                        outlined
                        background-color="white"
                      ></v-text-field>
                    </v-col>
                    <v-col md="7" xs="7" cols="6" class="ma-0">
                      <v-text-field
                        v-model="eventData.image"
                        class="ma-0"
                        label="Image URL"
                        outlined
                        background-color="white"
                      ></v-text-field>
                    </v-col>
                    <v-col md="4" xs="4" cols="6" class="ma-0">
                      <UploadImage
                        type="events"
                        :userId="eventData.id"
                        @message="showMessageSnakeBar"
                        @uploadedImage="imageUploadDone"
                      />
                    </v-col>
                    <v-col md="12" xs="12" cols="12" class="ma-0">
                      <v-combobox
                        chips
                        v-model="eventData.hashtags"
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
                        v-model="eventData.des"
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
                      <h4 class="google-font mb-0">
                        Speaker, Partners & Team Info
                      </h4>
                    </v-col>
                    <v-col md="6" xs="6" lg="4" cols="12" class="ma-0">
                      <v-autocomplete
                        v-model="eventData.speakers"
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
                        v-model="eventData.partners"
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
                        v-model="eventData.team"
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
                            >(+{{ eventData.team.length - 1 }} others)</span
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
                        v-model="eventData.links.meetup"
                        class="ma-0"
                        label="Event Meetup URL"
                        outlined
                        background-color="white"
                      ></v-text-field>
                    </v-col>
                    <v-col md="4" xs="4" lg="4" cols="12" class="ma-0">
                      <v-text-field
                        v-model="eventData.links.registration"
                        class="ma-0"
                        label="Event Registration Link"
                        outlined
                        background-color="white"
                      ></v-text-field>
                    </v-col>
                    <v-col md="4" xs="4" lg="4" cols="12" class="ma-0">
                      <v-text-field
                        v-model="eventData.links.facebook"
                        class="ma-0"
                        label="Event Facebook Page Link"
                        outlined
                        background-color="white"
                      ></v-text-field>
                    </v-col>
                    <v-col md="4" xs="4" lg="4" cols="12" class="ma-0">
                      <v-text-field
                        v-model="eventData.links.feedback"
                        class="ma-0"
                        label="Event Feedback Link"
                        outlined
                        background-color="white"
                      ></v-text-field>
                    </v-col>
                    <v-col md="4" xs="4" lg="4" cols="12" class="ma-0">
                      <v-text-field
                        v-model="eventData.links.callforspeaker"
                        class="ma-0"
                        label="Call For Speaker Link"
                        outlined
                        background-color="white"
                      ></v-text-field>
                    </v-col>
                    <v-col md="4" xs="4" lg="4" cols="12" class="ma-0">
                      <v-text-field
                        v-model="eventData.links.youtube"
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
                        <AddNewAgenda :item="eventData.agenda" />
                      </v-toolbar>
                    </v-col>

                    <v-col cols="12" v-if="eventData.agenda.length <= 0" class>
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
                            :items.sync="eventData.agenda"
                            :items-per-page="5"
                            class="elevation-0 lightModeCard"
                          >
                            <template v-slot:[`item.actions`]="{ item }">
                              <EditAgenda :data="item" />
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
                              <!-- <RemoveAgenda :data.sync = "item"/> -->
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
import { mapState } from "vuex";
import TeamServices from "@/services/TeamServices";
import PartnersServices from "@/services/PartnersServices";
import SpeakerServices from "@/services/SpeakersServices";
import CustomEventServices from "@/services/CustomEventServices";
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

export default {
  name: "AddCustomEvent",
  components: {
    TiptapVuetify,
    AddNewAgenda: () => import("@/components/Events/CustomEvents/AddNewAgenda"),
    EditAgenda: () => import("@/components/Events/CustomEvents/EditAgenda"),
    UploadImage: () => import("@/components/Common/ImageUpload"),
  },
  computed: { ...mapState(["userDetails"]) },
  data() {
    return {
      menu: false,
      modal2: false,
      modal1: false,
      headers: [
        { text: "Start Time", value: "starttime" },
        { text: "End Time", value: "endtime" },
        { text: "Title", value: "title" },
        { text: "Description", value: "des" },
        { text: "Actions", sortable: false, value: "actions" },
      ],
      imagePre: "",
      valid: true,
      idRules: [
        (v) => !!v || "Field Value is required",
        (v) =>
          (v && v.length <= 100) || "Name must be less than 100 characters",
      ],
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 100) || "Name must be less than 50 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      teamRole: ["Organizing Team", "Core Team", "Volunteer"],
      dialog: false,
      loading: false,
      items: [true, false],
      eventData: {
        id: "",
        active: Boolean,
        visible: Boolean,
        name: "",
        image: "",
        date: "",
        des: "",
        venue: {
          name: "",
          googlemapsurl: "",
        },
        links: {
          meetup: "",
          facebook: "",
          registration: "",
          feedback: "",
          callforspeaker: "",
          youtube: "",
        },
        time: {
          starttime: "",
          endtime: "",
        },
        hashtags: [],
        speakers: [],
        partners: [],
        team: [],
        agenda: [],
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
      this.eventData.image = text;
    },
    deleteData(index) {
      this.eventData.agenda.splice(index, 1);
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
      this.eventData.hashtags.splice(this.eventData.hashtags.indexOf(item), 1);
      this.eventData.hashtags = [...this.eventData.hashtags];
    },
    SaveEvent() {
      this.loading = true;
      this.eventData.createdBy = {
        name: this.userDetails.name,
        id: this.userDetails.id,
      };
      this.eventData.createdOn = new Date();
      this.eventData.lastUpdatedOn = "";
      this.eventData.lastUpdatedBy = {
        name: "",
        id: "",
      };
      CustomEventServices.addCustomEvent(this.eventData.id, this.eventData)
        .then((res) => {
          if (res.success == true) {
            this.loading = false;
            this.dialog = false;
            this.$emit("showSuccess", res.msg);
          }
        })
        .catch((e) => {
          this.loading = false;
          console.log(e);
          this.$emit("message", e.msg);
        });
    },
  },
  // }
};
</script>