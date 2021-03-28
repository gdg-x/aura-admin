<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" md="4" v-if="isVisible && (!error || error.length < 1)">
        <v-text-field
          class="ma-0 pa-0"
          label="Email"
          v-model="userData.email"
          disabled
          outlined
        ></v-text-field>
        <v-text-field
          class="ma-0 pa-0"
          label="Password"
          type="password"
          v-model="userData.password"
          outlined
        ></v-text-field>
        <v-btn
          @click="onBoardUser"
          class="primary"
          style="height: 38px; width: 150px"
          :loading="loading"
          depressed
          >Onboard</v-btn
        >
      </v-col>
      <v-col sm="12" v-else-if="!successDialog && error.length > 1">
        {{ error }}
      </v-col>
    </v-row>

    <v-dialog v-model="successDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2"> Success </v-card-title>

        <v-card-text> Your account is created </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialogOkay"> Okay </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import teamOnboardService from "@/services/onboardService";
import firebase from "@/config/firebase";
export default {
  name: "teamonboard",
  data: () => ({
    loading: false,
    successDialog: false,
    isVisible: false,
    error: "",
    finalUser: {},
    userData: {
      password: "",
    },
  }),
  mounted() {
    teamOnboardService
      .getUserById(this.$route.params.id)
      .then((result) => {
        this.finalUser = result;
        this.userData = { ...result };
        this.isVisible = true;
      })
      .catch((e) => {
        this.isVisible = false;
        this.error = e.message;
        console.log(e);
      });
  },
  methods: {
    async onBoardUser() {
      this.loading = true;
      try {
        const firebaseUser = await firebase.auth.createUserWithEmailAndPassword(
          this.finalUser.email,
          this.userData.password
        );
        await firebase.auth.signOut();
        const deleteData = await teamOnboardService.deleteTempUse(
          this.$route.params.id
        );
        if (!deleteData.success) throw { message: "Something went wrong" };
        const data = { uid: firebaseUser.user.uid, ...this.finalUser };
        const userAdd = await teamOnboardService.addOnBoardUserToUserManagement(
          data
        );
        const updateTeamFields = await teamOnboardService.updateTeamWithUID(
          data.uid,
          data.id
        );
        if (!updateTeamFields.success) throw updateTeamFields;
        this.loading = true;
        this.successDialog = true;
      } catch (e) {
        console.log(e);
        this.loading = false;
      }
    },

    dialogOkay() {
      this.successDialog = false;
      this.$router.replace("/login");
    },
  },
};
</script>

<style>
</style>