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
      <v-col sm="12" v-else-if="error.length > 1">
          {{error}}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import teamOnboardService from "@/services/onboardService";
import firebase from "@/config/firebase";
export default {
  name: "teamonboard",
  data: () => ({
    loading: false,
    isVisible: false,
    error: "",
    finalUser: {},
    userData: {
      password: "",
    },
  }),
  beforeMount() {
    teamOnboardService
      .getUserById(this.$route.params.id)
      .then((result) => {
        console.log(result);
        this.finalUser = result;
        this.userData = { ...result };
        this.isVisible = true;
      })
      .catch((e) => {
        this.isVisible = false
        this.error = e.message;
        console.log(e);
      });
  },
  methods: {
    async onBoardUser() {
      this.loading = true;
      try {
        const deleteData = await teamOnboardService.deleteTempUse(this.$route.params.id);
        if (!deleteData.success) throw { message: "Something went wrong" };
        const firebaseUser = await firebase.auth.createUserWithEmailAndPassword(this.finalUser.email, this.userData.password);
        await firebase.auth.signOut();
        const data = { uid: firebaseUser.user.uid, ...this.finalUser };
        const userAdd = await teamOnboardService.addOnBoardUserToUserManagement(data);
        this.loading = true;
        this.$router.replace("/login");
      } catch (e) {
        console.log(e);
        this.loading = false;
      }
    },
  },
};
</script>

<style>
</style>