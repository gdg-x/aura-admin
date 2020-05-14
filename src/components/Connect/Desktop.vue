<template>
  <v-container fluid>
    <v-row class="ma-0 pa-0">
      <v-col cols="3" class="ma-0 pa-0" style="border:1px solid #e0e0e0">
        <!-- {{users}} -->
        <v-list-item v-for="item in users" :key="item.id">
          <v-list-item-avatar>
            <v-img
              :src="item.image.length > 0? item.image: require('@/assets/img/default_avatar.jpg')"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="google-font" v-html="item.name"></v-list-item-title>
            <v-list-item-subtitle class="google-font" v-html="item.id"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      <v-col cols="9" class="ma-0 pa-0">
        <Chat />
        <div class="typer">
          <input
            type="text"
            placeholder="Type here..."
            v-on:keyup.enter="enterData"
            v-model="content"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserService from "@/services/UsersServices";
import firebase from "@/config/firebase";
import { mapState } from "vuex";
export default {
  name: "Desktop-Connect",
  components: {
    Chat: () => import("./Chat")
  },
  data: () => ({
    users: [],
    isLoadingUsers: [],
    content:"",
  }),
  computed: { ...mapState(["userDetails"]) },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      this.isLoadingUsers = true;
      UserService.getAllUsers()
        .then(res => {
          console.log(res);
          if (res.success) {
            this.users = res.data;
          }
          this.isLoadingUsers = false;
        })
        .catch(e => {
          console.log(e);
        });
    },
    enterData() {
      if (this.content) {
        firebase.firestore
          .collection("connect")
          .add({
            message: this.content,
            name: this.userDetails.id,
            timestamp: Date.now()
          })
          .catch(err => {
            console.log(err);
          });
        this.content = null;
      } else {
        // this.errorText = "A message must be entered!";
      }
    }
  }
};
</script>

<style>
</style>