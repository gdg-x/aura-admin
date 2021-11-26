<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{}">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            class="ml-3"
            fab
            x-small
            color="#5AB55E"
            outlined
            dark
            v-on="on"
            @click.stop="dialog = true"
          >
            <v-icon dark>mdi-delete-outline</v-icon>
          </v-btn>
        </template>
        <span>Clear All Featured Events</span>
      </v-tooltip>
    </template>

    <v-card v-if="dialog">
      <v-card-title class="google-font heading">Are you sure?</v-card-title>
      <v-card-text class="google-font">
        Would you like to remove All Featured Events?
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>

        <v-btn color="green darken-1" text @click="dialog = false"
          >Disagree</v-btn
        >

        <v-btn
          color="red darken-1"
          text
          :loading="loading"
          @click="deleteItem()"
          >Agree</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from "@/config/firebase";
export default {
  name: "ClearFeatureEvents",
  props: ["data"],
  data: () => ({
    loading: false,
    dialog: false,
  }),
  methods: {
    deleteItem() {
      console.log("I am acalled");
      this.loading = true;
      firebase.firestore
        .collection("featureevents")
        .doc("data")
        .set({ eventid: [] })
        .then(() => {
          this.dialog = false;
          this.$emit("show", "Removed Success");
          this.loading = false;
        })
        .catch((e) => {
          this.$emit("show", e);
          this.loading = false;
          console.log(e);
        });
    },
  },
};
</script>

<style>
</style>