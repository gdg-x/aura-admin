<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{}">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            x-small
            icon
            v-on="on"
            dark
            color="primary"
            class="mx-1"
            outlined
            @click.stop="dialog = true"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Remove {{ data.name }}</span>
      </v-tooltip>
    </template>

    <v-card v-if="dialog">
      <v-card-title class="google-font heading">Are you sure?</v-card-title>
      <v-card-text class="google-font"
        >Would you like to remove {{ data.name }} form the User
        Management?</v-card-text
      >
      <v-card-actions>
        <div class="flex-grow-1"></div>

        <v-btn color="green darken-1" text @click="dialog = false"
          >Disagree</v-btn
        >

        <v-btn
          color="red darken-1"
          text
          :loading="loading"
          @click="removeUser(data)"
          >Agree</v-btn
        >
      </v-card-actions>
    </v-card>

    <v-dialog v-model="successDialog" max-width="500">
      <v-card v-if="successDialog">
        <v-card-title class="google-font heading">Next Steps</v-card-title>
        <v-card-text class="google-font"
          >To Completely remove a user, please follow the steps:<br />
          Step 1: Go to
          <a href="https://console.firebase.google.com" target="_blank"
            >Firebase Console</a
          ><br />
          Step 2: Go your project<br />
          Step 3: Navigate to Authentication Section <br />
          Step 4: Hover on email which want to delete, then view choose more
          option (Menu Icon of that email) and click on delete account
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            color="green darken-1"
            text
            :loading="loading"
            @click="closeDialog"
            >Agree</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script>
import UsersServices from "@/services/UsersServices";
import { mapState } from "vuex";
export default {
  name:"DeleteUserMgn",
  props: ["data"],
  data: () => ({
    dialog: false,
    loading: false,
    successDialog: false,
  }),
  computed: { ...mapState(["generalConfig"]) },
  methods: {
    closeDialog() {
      this.dialog = false;
      this.successDialog = false;
      this.$emit("RemovedSuccess", "Removed Success");
    },
    removeUser(data) {
      this.loading = true;
      UsersServices.removeUser(data.uid)
        .then((res) => {
          this.loading = false;
          // this.showSnakeBar('User Removed')
          this.successDialog = true;
        })
        .catch((e) => {
          this.loading = false;
          console.log(e);
        });
    },
  },
};
</script>
