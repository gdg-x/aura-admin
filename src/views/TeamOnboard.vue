<template>
  <v-main>
    <v-container class="mt-md-15">
      <v-row justify="center" align="center">
        <v-col
          cols="12"
          md="4"
          lg="3"
          sm="6"
          class="text-center mt-md-5"
          v-if="isVisible && (!error || error.length < 1)"
        >
          <p class="google-font" style="font-size: 2.5em">Team Onboard</p>
          <v-divider class="mb-md-10"></v-divider>
          <br />
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
            v-model="userData.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            placeholder="Your Password"
            outlined
          ></v-text-field>
          <v-text-field
            class="ma-0 pa-0"
            label="Confirm Password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            @click:append="show2 = !show2"
            v-model="cpassword"
            placeholder="Confirm Password"
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
        <v-col
          sm="4"
          class="google-font text-center"
          v-else-if="!successDialog && error.length > 1"
        >
          <p class="google-font" style="font-size: 2.5em">Team Onboard</p>
          <v-divider></v-divider>

          <p class="mt-md-10 mt-4" style="font-size: 1.2em">{{ error }}</p>
          <v-btn class="mt-3" to="/login" color="primary" depressed
            >Back to Login</v-btn
          >
        </v-col>
      </v-row>

      <v-dialog v-model="successDialog" width="500">
        <v-card>
          <v-card-title
            class="google-font grey lighten-2"
            style="font-size: 1.3em"
          >
            Success
          </v-card-title>

          <v-card-text>
            <p class="google-font mt-4 mb-0" style="font-size: 1.2em">
              Your account is created
            </p>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialogOkay"> Okay </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-main>
</template>

<script>
import teamOnboardService from "@/services/onboardService";
import firebase from "@/config/firebase";
import { mapState } from "vuex";

export default {
  name: "teamonboard",
  data: () => ({
    show1: false,
    show2: false,
    loading: false,
    successDialog: false,
    isVisible: false,
    error: "",
    cpassword: "",
    finalUser: {},
    userData: {
      password: "",
    },
  }),
  computed: {
    ...mapState(["unsub"]),
  },
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
      if (this.cpassword == this.userData.password) {
        try {
          this.unsub();
          const firebaseUser =
            await firebase.auth.createUserWithEmailAndPassword(
              this.finalUser.email,
              this.userData.password
            );
          await firebase.auth.signOut();
          const deleteData = await teamOnboardService.deleteTempUse(
            this.$route.params.id
          );
          if (!deleteData.success) throw { message: "Something went wrong" };
          const data = { uid: firebaseUser.user.uid, ...this.finalUser };
          const userAdd =
            await teamOnboardService.addOnBoardUserToUserManagement(data);
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
      } else {
        alert("Password Not Match");
        this.loading = false;
      }
    },

    dialogOkay() {
      this.successDialog = false;
      window.location.href = "/login";
    },
  },
};
</script>

<style></style>
