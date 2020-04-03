<template>
  <div class="center-text">
    <v-dialog v-model="dialog" width="800" scrollable>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" class="indigo white--text ml-2" elevation="0">Add Notification</v-btn>
      </template>
      <v-card v-if="dialog">
        <v-card-title class="headline google-font" primary-title>Add Notification</v-card-title>
        <v-card-text>
          <v-container fluid>
                <v-form ref="form" v-model="valid" lazy-validation>

            <v-row align="center">
              <v-col cols="12" md="6" class="pa-1 ma-0">
                <v-text-field
                  v-model="dialogData.title"
                  :rules="rules.titleRules"
                  label="Title"
                  type="text"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pa-1 ma-0">
                <v-text-field v-model="dialogData.image" :rules="rules.imageLinkRule" label="Image Link" type="url" outlined></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pa-1 ma-0 order-2 order-md-1">
                <v-textarea
                  v-model="dialogData.body"
                  :rules="rules.bodyRules"
                  label="Body"
                  type="text"
                  outlined
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="6" class="pa-1 ma-0 order-1 order-md-2">
                <v-img :src="(dialogData.image.length > 10)?dialogData.image:''"></v-img>
              </v-col>
              <v-col cols="12" md="6" class="pa-1 ma-0">
                <v-text-field v-model="dialogData.regLink" :rules="rules.regLinkRule" label="Reg Link" type="text" outlined></v-text-field>
              </v-col>
              <v-col cols="12" md="6" class="pa-1 ma-0">
                <v-text-field v-model="dialogData.eventID" :rules="rules.eventidRule" label="Event ID" type="text" outlined></v-text-field>
              </v-col>
            </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Close</v-btn>
          <v-btn color="green" text :disabled="!valid" :loading="isAdding" @click="addNoti">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "@/config/firebase";

export default {
  name: "addNotification",
  data: () => ({
    dialog: false,
    isAdding: false,
    valid:false,
    rules: {
      titleRules: [
        v => !!v || "Title is required",
        v => (v && v.length <= 50) || "Name must be less than 50 characters"
      ],
      bodyRules: [
        v => !!v || "Body is required",
        v => (v && v.length <= 150) || "Name must be less than 150 characters"
      ],
      eventidRule: [
        v => !!v || "EventId is required",
      ],
      regLinkRule: [
        v => !!v || "Reg. Link is required",
      ],
      imageLinkRule: [
        v => !!v || "Image Link is required",
      ],
    },
    dialogData: {
      title: "",
      body: "",
      image: "",
      regLink: "",
      eventID: ""
    }
  }),
  methods: {
    addNoti() {
      if (this.$refs.form.validate()) {
        this.isAdding = true;
        var data = {
          title: this.dialogData.title,
          body: this.dialogData.body,
          image: this.dialogData.image,
          regLink: this.dialogData.regLink,
          eventID: this.dialogData.eventID,
          noTimeSend: 0,
          createdOn: new Date(),
          sentTime: ""
        };
        firebase.firestore
          .collection("pushNotifications")
          .add(data)
          .then(res => {
            // console.log(res);
            this.isAdding = false;
            this.$emit("addedSuccess", "Push Notification Added Success");
            this.dialog = false;
          });
      }
    }
  }
};
</script>

<style>
</style>