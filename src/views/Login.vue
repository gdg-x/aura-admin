<template>
  <v-container fuild class="pa-0 fill-height">
    <Snakebar
      :message="snakebarMessage"
      color="primary"
      :isShow.sync="isSnakebar"
      :timeout="5000"
    />
    <!-- Desktop -->
    <v-row align="center" justify="center" class="d-none d-sm-block">
      <v-col
        md="8"
        lg="10"
        offset-md="1"
        sm="12"
        class="py-1"
        style="max-width: 1300px; margin-left: auto; margin-right: auto;"
      >
        <v-container fluid class="ma-0 pa-0 elevation-0" style="background:white;border:1px solid #E0E0E0;border-radius:15px">
          <v-row align="stretch" justify="center" class="ma-0 pa-0">
            <v-col md="5" lg="5" sm="6" class="pa-md-8">
              <h4 class="google-font primary--text mb-5">Aura Admin</h4>
              <br />
              <p
                class="google-font mt-5 mb-0 primary--text"
                style="font-size: 200%"
              >
                Managing Aura App
              </p>
              <p class="google-font mb-5 mt-0">
                Welcome, Please login to your account.
              </p>
              <br />
              <v-text-field
                class="ma-0 pa-0"
                label="Email"
                v-model="email"
                outlined
              ></v-text-field>
              <v-text-field
                class="ma-0 pa-0"
                label="Password"
                type="password"
                v-model="password"
                outlined
              ></v-text-field>

              <v-btn
                v-on:click="login"
                class="primary float-left"
                style="height: 38px; width: 150px"
                :loading="loading"
                depressed
                >Login</v-btn
              >
              <ResetPassword
                class="float-right"
                @message="showMessageSnakeBar"
              />
              <br /><br /><br /><br />
              <a
                href="https://github.com/gdg-x/aura-admin/blob/master/CODE_OF_CONDUCT.md"
                target="_blank"
                class="mr-3"
                >Privacy & Policy</a
              >
              <a
                href="https://github.com/gdg-x/aura-admin"
                target="_blank"
                class="mr-3"
                >Support</a
              >
              <a href="/about" target="_blank" class="mr-3">About</a>
            </v-col>
            <v-col md="7" lg="7" sm="6" class="grey lighten-4 pa-0">
              <v-img
                style="float: right"
                :src="require('@/assets/img/svg/login.svg')"
                width="70vh"
              ></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
    <!-- Desktop -->

    <!-- Mobile -->
    <v-row
      align="center"
      justify="center"
      class="mobile-view ma-0 pa-0 hidden-sm-and-up"
    >
      <v-container fluid class="ma-0 pa-0" style="height: 100vh">
        <v-row class="ma-0 pa-0 py-5 blue">
          <v-col class="ma-0 py-auto text-center">
            <!-- <span style="border:1px solid #e0e0e0;border-radius:5px;font-size:80%;color:white;width:300px" class="pa-2 google-font primary">This Portal in Development Mode</span> -->

            <v-img :src="require('@/assets/img/home.svg')"></v-img>
            <h2 class="google-font mb-3 white--text">Aura Admin</h2>
            <br />
          </v-col>
        </v-row>
        <v-row class="ma-0 pa-0 py-5" style="height: 30vh">
          <v-col class="ma-5 pa-0 text-center" style="height: 30vh">
            <v-text-field
              class="ma-0 pa-0"
              label="Email"
              v-model="email"
              outlined
            ></v-text-field>
            <v-text-field
              class="ma-0 pa-0"
              label="Password"
              type="password"
              v-model="password"
              outlined
            ></v-text-field>
            <v-btn
              v-on:click="login"
              class="primary"
              style="height: 35px"
              block
              :loading="loading"
              depressed
              >Login</v-btn
            >
            <ResetPassword @message="showMessageSnakeBar" />
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    <!-- Mobile -->
  </v-container>
</template>

<script>
import firebase from "@/config/firebase";
import ResetPassword from "@/components/ResetPassword/ResetPassword";
import Snakebar from "@/components/Common/Snakebar";
export default {
  name: "Login",
  components: {
    ResetPassword,
    Snakebar,
  },
  data: () => ({
    email: "",
    password: "",
    loading: false,
    alertMsg: "",
    isSnakebar: false,
    snakebarMessage: "",
  }),
  mounted() {
    if (firebase.auth.currentUser) this.$router.replace("/");
    else this.alertMsg = "Kindly login";
  },
  methods: {
    showMessageSnakeBar(text) {
      console.log(text);
      this.snakebarMessage = text;
      this.isSnakebar = true;
    },
    login() {
      var self = this;
      self.loading = true;
      firebase.auth
        .signInWithEmailAndPassword(self.email, self.password)
        .then((user) => {
          console.log("Loggedin");
        })
        .catch((e) => {
          self.loading = false;
          alert("Alert " + e);
        });
    },
  },
};
</script>

<style scoped>
.mobile-view {
  height: 100vh;
  background: white;
}
a {
  color: black;
  font-size: 90%;
  text-decoration: none;
}
</style>