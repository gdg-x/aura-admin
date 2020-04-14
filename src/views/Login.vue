<template>
  <v-container fuild class="pa-0 fill-height">
    <!-- Desktop -->
    <v-row align="center" justify="center" class="d-none d-sm-block" >
      <v-col md="8" lg="10" offset-md="1" sm="12" class="py-5" style="max-width:1300px;margin-left:auto;margin-right:auto"> 
        <v-container fluid class="ma-0 pa-0 white elevation-1 mt-5">
          <v-row align="stretch" justify="center" class="ma-0 pa-0">
            <v-col md="5" lg="5" sm="6" class="pa-5"> 
              <h4 class="google-font primary--text mb-5">Aura Admin</h4>
              <br>
              <p class="google-font mt-5 mb-0 primary--text" style="font-size:200%">Managing Aura App</p>
              <p class="google-font mb-5 mt-0">Welcome, Please login to your account.</p>
              <br>
              <v-text-field class="ma-0 pa-0" label="Email" v-model="email" outlined></v-text-field>
              <v-text-field class="ma-0 pa-0" label="Password" type="password" v-model="password" outlined></v-text-field>
              <v-btn v-on:click="login" class="primary" style="height:38px;width:150px" :loading="loading" depressed>Login</v-btn>
              <br><br><br><br>
              <a href="https://github.com/gdg-x/aura-admin/blob/master/CODE_OF_CONDUCT.md" target="_blank" class="mr-3">Privacy & Policy</a>
              <a href="https://github.com/gdg-x/aura-admin" target="_blank" class="mr-3">Support</a>
              <a href="https://github.com/gdg-x/aura-admin" target="_blank" class="mr-3" >About</a>
            </v-col>
            <v-col md="7" lg="7" sm="6" class="grey lighten-4 pa-0"> 
              <v-img style="float:right" :src="require('@/assets/img/svg/login.svg')" width="70vh"></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <!-- Desktop -->

    <!-- Mobile -->
    <v-row align="center" justify="center" class="mobile-view ma-0 pa-0 hidden-sm-and-up">
      <v-container fluid class="ma-0 pa-0" style="height:100vh">
        <v-row class="ma-0 pa-0 py-5 blue">
          <v-col class="ma-0 py-auto text-center">
            <!-- <span style="border:1px solid #e0e0e0;border-radius:5px;font-size:80%;color:white;width:300px" class="pa-2 google-font primary">This Portal in Development Mode</span> -->

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
    </v-row>
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
a{
  color:black;
  font-size:90%;
  text-decoration: none;
}

</style>