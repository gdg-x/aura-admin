<template>
  <!-- style="background:#BBE2F2" -->
  <v-content>
    <v-container fuild class="fill-height">
      <v-row align="center" justify="center" class="ma-0">
        <v-col cols="12" sm="4" md="4" lg="3" class="text-center">
          <v-img :src="require('@/assets/img/home.svg')"></v-img>
          <h3 class="google-font mb-3">Aura Admin</h3>
          <v-text-field label="Email" v-model="email" outlined></v-text-field>

          <v-text-field label="Password" type="password" v-model="password" outlined></v-text-field>
          <v-btn v-on:click="login" class="primary" :loading="loading" block>Login</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import firebase from "@/config/firebase";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
    loading: false,
    alertMsg: ""
  }),
  mounted() {
    if (firebase.auth.currentUser) {
      this.$router.replace("/");
    } else {
      this.alertMsg = "Kindly login";
    }
  },
  methods: {
      ...mapMutations(['roleSet']),
    login() {
        var self = this;
      self.loading = true;
      firebase.auth
        .signInWithEmailAndPassword(self.email, self.password)
        .then(user => {
          firebase.firestore
            .collection("users")
            .doc(user.user.uid)
            .get()
            .then(doc => {
              self.roleSet(doc.role);
              self.$router.replace("/home");
              self.loading = false;
            })
            .catch(e => {
              console.log(e+" SOmething went wrong");
              self.loading = false;
            });
        })
        .catch(e => {
          self.loading = false;
          alert("Alert " + e);
        });
    }
  }
};
</script>

<style>
</style>