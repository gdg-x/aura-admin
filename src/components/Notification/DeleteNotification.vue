<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{  }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn fab x-small icon color="indigo" class="mx-1" outlined v-on="on" @click.stop="dialog = true">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Remove</span>
      </v-tooltip>
    </template>

    <v-card v-if="dialog">
      <v-card-title class="google-font heading">Are you sure?</v-card-title>
      <v-card-text class="google-font">
        Would you like to remove
        <span class="font-weight-bold black--text google-font">{{ data.title }}</span> Notificaion form the Notifications?
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>

        <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>

        <v-btn color="red darken-1" text :loading="loading" @click="deleteItem(data.id)">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import PushNotificationServicers from "@/services/NotificationServices";
export default {
  name: "DeleteNotification",
  props: ["data"],
  data: () => ({
    loading: false,
    dialog: false
  }),
  methods: {
    deleteItem(id) {
      this.loading = true;
      PushNotificationServicers.removeNotification(id)
        .then(res => {
          if (res.success == true) {
            this.$emit("addedSuccess", this.data.title + " " + res.msg);
          } else {
            this.$emit("errorRecived", "Something went wrong");
          }
          this.loading = false;
          this.dialog = false;
        })
        .catch(e => {
          console.log(e);
          this.$emit("errorRecived", e);
          this.isLoading = false;
        });
    }
  }
};
</script>

<style>
</style>