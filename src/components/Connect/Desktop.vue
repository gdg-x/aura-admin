<template>
  <v-container fluid class="my-0 py-0">
    <v-row class="ma-0 pa-0" style="">
      <v-col
        cols="3"
        class="ma-0 pa-0 pb-0"
        style="border:1px solid #e0e0e0;"
      >
        <v-container
          id="scroll-target"
          style="max-height: 93vh"
          class="overflow-y-auto"
        >
          <v-row
            v-scroll:#scroll-target="onScroll"
            style="height: 1000px"
          >
            <v-col>
              <v-list-item v-for="item in users" :key="item.id">
                <v-list-item-avatar>
                  <v-img
                    :src="
                      item.image.length > 0
                        ? item.image
                        : require('@/assets/img/default_avatar.jpg')
                    "
                  ></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    class="google-font"
                    v-html="item.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    class="google-font"
                    v-html="item.id"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="9" class="ma-0 pa-0">
        <Chat />
        <v-text-field
          label="Type here..."
          hide-details
          class="mx-3 my-0 mt-5 mb-0 pb-3"
          solo
          v-model="content"
          @keyup.enter="enterData"
        ></v-text-field>
        <!-- style="position:fixed; bottom:0;right: 0;" -->
        <!-- <v-textarea
          label="Type here..."
          solo
          rows="1"
          auto-grow
          class="my-0 rem"
          style="position:fixed; bottom:0;right: 0;"
          v-model="content"
          @keyup.enter="enterData"
        ></v-textarea> -->
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
    Chat: () => import("./Chat"),
  },
  data: () => ({
    users: [],
    isLoadingUsers: [],
    content: "",
    offsetTop: 0,
  }),
  computed: { ...mapState(["userDetails"]) },
  mounted() {
    this.getUsers();
  },
  methods: {
    onScroll (e) {
        this.offsetTop = e.target.scrollTop
    },
    getUsers() {
      this.isLoadingUsers = true;
      UserService.getAllUsers()
        .then((res) => {
          console.log(res);
          if (res.success) {
            this.users = res.data;
            this.users = this.users.filter((user) => user.disabled == false);
          }
          this.isLoadingUsers = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    enterData() {
      if (this.content.length > 2) {
        firebase.firestore
          .collection("connect")
          .add({
            message: this.content,
            name: this.userDetails.id,
            timestamp: Date.now(),
          })
          .catch((err) => {
            console.log(err);
          });
        this.content = null;
      } else {
        // this.errorText = "A message must be entered!";
      }
    },
  },
};
</script>

<style scoped>
.scrollable {
  overflow-y: auto;
  height: 100%;
  /* position: absolute; */
  top: 0;
  bottom: 0;
}
</style>
