<template>
  <v-dialog v-model="dialog" persistent width="800" scrollable>
    <template v-slot:activator="{ on }">
      <!-- eye icon -->
      <v-btn icon v-on="on" class="mr-2">
        <v-icon>mdi-eye</v-icon>
      </v-btn>
      <!-- <v-icon small class="mr-2" v-on="on">mdi-eye</v-icon> -->
    </template>
    <v-card>
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
              <span style="font-weight:500" class="black--text">EventID:</span>
              {{ dialogData.eventID }}
            </p>
            <p class="google-font">
              <span style="font-weight:500" class="black--text">RegLink:</span>
              {{ dialogData.regLink }}
            </p>
          </v-col>
          <v-col cols="12" md="5">
            <v-img :src="dialogData.image" max-height="300" contain></v-img>
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