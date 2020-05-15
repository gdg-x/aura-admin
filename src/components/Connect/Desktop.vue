<template>
  <v-container fluid class="my-0 py-0" style="max-height:85vh">
    <v-row class="ma-0 pa-0 ">
      <v-col cols="3" class="ma-0 pa-0 scrollable" style="border:1px solid #e0e0e0">
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
        <div class="py-1 mb-0" style="background-color:#e0e0e0">
          <v-textarea
            label="Type here..."
            solo
            rows="1"
            class="my-0"
            v-model="content"
            v-on:keyup.enter="enterData"
          ></v-textarea>
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
            this.users = [...this.users,...this.users,...this.users,...this.users]
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

<style scoped>
.scrollable {
  overflow-y: auto;
  height: 90vh;
}
</style>