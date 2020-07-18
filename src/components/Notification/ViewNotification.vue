<template>
  <v-dialog v-model="dialog" persistent width="800" scrollable>
    <template v-slot:activator="{ }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            outlined
            icon
            color="indigo"
            x-small
            v-on="on"
            class="mx-1"
            @click.stop="dialog = true"
          >
            <v-icon>mdi-eye</v-icon>
          </v-btn>
        </template>
        <span>View Details</span>
      </v-tooltip>
    </template>

    <v-card v-if="dialog">
      <v-card-title class="headline google-font" primary-title>{{ dialogData.title }}</v-card-title>
      <v-card-text>
        <v-row align="center">
          <v-col cols="12" md="7">
            <p class="google-font">
              <span style="font-weight:500" class="black--text">Body:</span>
              {{ dialogData.body }}
            </p>
            <p class="google-font">
              <span style="font-weight:500" class="black--text">Number of times Sent:</span>
              {{ dialogData.noTimeSend }}
            </p>
            <p class="google-font">
              <span style="font-weight:500" class="black--text">Created on :</span>
              {{ getDate(dialogData.createdOn) }}
            </p>
            <p class="google-font">
              <span style="font-weight:500" class="black--text">Last Sent on :</span>
              {{ getDate(dialogData.sentTime) }}
            </p>
            <p class="google-font">
              <span style="font-weight:500" class="black--text">Learn More:</span>
              {{ dialogData.learnMore }}
            </p>
            <p class="google-font">
              <span style="font-weight:500" class="black--text">RegLink:</span>
              {{ dialogData.regLink }}
            </p>
          </v-col>
          <v-col cols="12" md="5">
            <v-img
              :src="(dialogData.image.length > 10)?dialogData.image:require('@/assets/img/dontremove/noimage.jpg')"
              max-height="300"
              contain
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="indigo" text @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ViewNotification",
  props: ["dialogData"],
  data: () => ({
    dialog: false
  }),
  methods: {
    getDate(date) {
      if (date.toString().length > 0) {
        return date
          .toDate()
          .toString()
          .split("(")[0];
      } else {
        return date;
      }
    }
  }
};
</script>

<style>
</style>