<template>
  <v-container fuild class="red ma-0 pa-0">
    <!-- Desktop -->
    <v-row align="center" justify="center" class="hidden-sm-and-down blue">
      <v-col> 
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit accusantium vitae culpa vero odio ea. Culpa aperiam rem aspernatur magnam unde eius totam ullam atque impedit? Aliquid eos accusamus magni!</p>
      </v-col>
    </v-row>
    <!-- Desktop -->
    <!-- Mobile -->
    <!-- <v-row align="center" justify="center" class="mobile-view ma-0 pa-0 hidden-md-and-up">
      <v-container fluid class="ma-0 pa-0" style="height:100vh">
        <v-row class="ma-0 pa-0 py-5 blue" style="height:60vh;">
          <v-col class="ma-0 py-auto text-center" style="height:60vh">
            <span style="border:1px solid #e0e0e0;border-radius:5px;font-size:80%;color:white;width:300px" class="pa-2 google-font primary">This Portal in Development Mode</span>

            <v-img :src="require('@/assets/img/home.svg')"></v-img>
            <h2 class="google-font mb-3 white--text">Aura Admin</h2>
            <br>
          </v-col>
        </v-row>
        <v-row class="ma-0 pa-0 py-5" style="height:30vh">
          <v-col class="ma-5 pa-0 text-center" style="height:30vh">
            <v-text-field class="ma-0 pa-0" label="Email" v-model="email" outlined></v-text-field>
            <v-text-field class="ma-0 pa-0" label="Password" type="password" v-model="password" outlined></v-text-field>
            <v-btn v-on:click="login" class="primary" style="height:35px" block :loading="loading" depressed>Login</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-row> -->
    <!-- Mobile -->
  </v-container>
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

<style scoped>
.mobile-view{
  height: 100vh;
  background: white;
}
</style>