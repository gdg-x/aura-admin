<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent scrollable width="600">
      <template v-slot:activator="{ on }">
        <v-btn depressed color="#5AB55E" dark v-on="on" @click="getData"
          >Add/Update Feature Event</v-btn
        >
      </template>
      <v-card v-if="dialog" class>
        <v-card-title
          class="google-font"
          style="border-bottom: 1px solid #e0e0e0"
          primary-title
          dark
          >Add Feature Events</v-card-title
        >
        <v-card-text class="px-5">
          <v-container fluid>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row class="pa-0">
                <v-col cols="12" class="pa-1 ma-0">
                  <p class="google-font">You can add Feature Event up to 4</p>
                  <v-autocomplete
                    v-model="selectedEvents"
                    :items="eventsData"
                    outlined
                    :loading="loading"
                    chips
                    :rules="event"
                    item-text="name"
                    item-value="id"
                    small-chips
                    label="Select Features Event"
                    multiple
                  >
                    <template v-slot:selection="{ item, index }">
                      <v-chip small v-if="index === 0">
                        <span>{{ item.name }}</span>
                      </v-chip>
                      <span v-if="index === 1" class="grey--text caption"
                        >(+{{ selectedEvents.length - 1 }} others)</span
                      >
                    </template>
                  </v-autocomplete>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="grey lighten-4">
          <div class="flex-grow-1"></div>
          <v-btn color="#5AB55E" text @click="dialog = false">Close</v-btn>
          <v-btn
            color="#5AB55E"
            dark
            @click="addFeatureEvents"
            depressed
            :loading="loading"
            >Add</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "@/config/firebase";
export default {
  name:"AddFeatureEvents",
  components: {},
  data: () => ({
    dialog: false,
    loading: false,
    loadingSpeaker: true,
    name: "",
    des: "",
    valid: false,
    event: [(v) => v.length <= 4 || "Can not exceed 4"],
    selectedEvents: [],
    eventsData: [],
    isAdding: false,
  }),
  mounted() {},
  methods: {
    getData() {
      this.ShowEvents();
      this.loadFeatureEvents();
    },
    ShowEvents() {
      this.loading = true;
      firebase.firestore
        .collection("events")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.eventsData.push(doc.data());
          });
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log("Error getting documents", err);
        });
    },
    loadFeatureEvents() {
      this.loading = true;
      firebase.firestore
        .collection("featureevents")
        .doc("data")
        .get()
        .then((snapshot) => {
          if (!snapshot.exists) {
            this.isLoading = false;
            return;
          }
          this.selectedEvents = snapshot.data().eventid;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.$emit("show", "Error getting documents");
          console.log("Error getting documents", err);
        });
    },
    addFeatureEvents() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        var UpdatedEventData = {
          eventid: this.selectedEvents,
        };
        firebase.firestore
          .collection("featureevents")
          .doc("data")
          .set(UpdatedEventData)
          .then(() => {
            this.dialog = false;
            this.$emit("show", "Feature Events Data Added Success");
            this.loading = false;
          })
          .catch((e) => {
            this.$emit("show", e);
            this.loading = false;
            console.log(e);
          });
      }
    },
  },
};
</script>
