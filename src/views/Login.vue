<template>
  <!-- style="background:#BBE2F2" -->
  <v-content class="">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
          <p></p>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-container fuild class="fill-height">
      <v-row align="center" justify="center" >
        <!-- Desktop View -->
        <v-col cols="12" sm="10" md="10" lg="9" class="text-center white elevation-1 hidden-sm-and-down">
          <v-container class="fill-height">
            <v-row align="center" justify="center">
              <v-col md="8" lg="7">
                <v-img :src="require('@/assets/img/home.svg')"></v-img>
              </v-col>
              <v-col md="4" lg="5">
                <h3 class="google-font mb-3">Aura Admin Desktop</h3>
                <v-text-field label="Email" v-model="email" outlined></v-text-field>

                <v-text-field label="Password" type="password" v-model="password" outlined></v-text-field>
                <v-btn v-on:click="login" class="primary" :loading="loading" block>Login</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <!-- Desktop View -->

        <v-col cols="12" sm="4" md="4" lg="3" class="text-center hidden-md-and-up">
          <v-img :src="require('@/assets/img/home.svg')"></v-img>
          <h3 class="google-font mb-3">Aura Admin Mobile</h3>
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