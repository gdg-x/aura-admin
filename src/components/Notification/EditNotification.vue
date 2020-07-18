<template>
  <v-dialog v-model="dialog" width="800" scrollable>
    <template v-slot:activator="{ }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            x-small
            icon
            outlined
            color="indigo"
            v-on="on"
            class="mx-1"
            @click.stop="dialog = true"
          >
            <v-icon>mdi-lead-pencil</v-icon>
          </v-btn>
        </template>
        <span>Edit Details</span>
      </v-tooltip>
    </template>
    <v-card v-if="dialog">
      <v-card-title class="headline google-font" primary-title>Edit Notification</v-card-title>

      <v-card-text>
        <v-container fluid>
          <v-row align="center">
            <v-col cols="12" md="6" class="pa-1 ma-0">
              <v-text-field v-model="editDialogData.title" label="Title" type="text" outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pa-1 ma-0">
              <v-text-field v-model="editDialogData.image" label="Image Link" type="url" outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pa-1 ma-0">
              <v-text-field v-model="editDialogData.regLink" label="Reg Link" type="url" outlined></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pa-1 ma-0">
              <v-text-field
                v-model="editDialogData.learnMore"
                label="Learn More"
                type="text"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" class="pa-1 ma-0 order-2 order-md-1">
              <v-textarea v-model="editDialogData.body" label="Body" type="text" outlined></v-textarea>
            </v-col>
            <v-col cols="12" md="6" class="pa-1 ma-0 order-1 order-md-2">
              <v-img
                contain
                max-height="200"
                :src="(editDialogData.image.length > 10)?editDialogData.image:require('@/assets/img/dontremove/noimage.jpg')"
              >
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">Close</v-btn>
        <v-btn
          color="green"
          text
          :loading="isAdding"
          @click="updateNotification(editDialogData.id)"
        >Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import PushNotificationServicers from "@/services/NotificationServices";
export default {
  name: "EditNotifications",
  props: ["editDialogData"],
  data: () => ({
    dialog: false,
    isAdding: false
  }),
  methods: {
    updateNotification(id) {
      this.isAdding = true;
      let data = {
        body: this.editDialogData.body,
        title: this.editDialogData.title,
        image: this.editDialogData.image,
        regLink: this.editDialogData.regLink,
        learnMore: this.editDialogData.learnMore
      };
      PushNotificationServicers.editPushNotification(id, data)
        .then(res => {
          if (res.success == true) {
            this.isAdding = false;
            this.dialog = false;
            this.$emit("addedSuccess", res.msg);
          }
        })
        .catch(e => {
          this.isAdding = false;
          console.log(e.msg);
          this.$emit("errorRecived", e);
        });
    }
  }
};
</script>

<style>
</style>