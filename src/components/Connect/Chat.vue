<template>
  <div class="chat-container">
    <div
      class="message"
      v-for="(message,index) in messages"
      :key="index"
      :class="{'text-right': message.name == userDetails.id}"
    >
      <div v-if="index == 0">{{message.name}}</div>
      <div v-if="index>0 && messages[index-1].name != message.name">{{message.name}}</div>
      <v-card elevation="0" width="50%" :class="{'text-right blue': message.name == userDetails.id}">
        <v-card-text class>{{message.message}}</v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import firebase from "@/config/firebase";
import { mapState } from "vuex";
export default {
  name: "Chat-Connect",
  data: () => ({
    messages: [],
    name: "",
    content: ""
  }),
  computed: { ...mapState(["userDetails"]) },
  created() {
    this.getData();
  },
  mounted(){
  },
  methods: {
    getData() {
      firebase.firestore
        .collection("connect")
        .orderBy("timestamp")
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type == "added") {
              let doc = change.doc;
              this.messages.push({
                id: doc.id,
                name: doc.data().name,
                message: doc.data().message,
                timestamp: doc.data().timestamp
              });
            }
          });
        });
    },
  }
};
</script>

<style scoped>
.right{
    float:right;
}
.scrollable {
  overflow-y: auto;
  height: 90vh;
}
.chat-container {
  box-sizing: border-box;
  height: calc(100vh - 9.5rem);
  overflow-y: auto;
  padding: 10px;
  background-color: #f2f2f2;
}
</style>