<template>
<div color="ma-0 pa-0">
  <!-- <v-toolbar color="#e0e0e0" class="google-font">
      <v-toolbar-title>Connect</v-toolbar-title>
  </v-toolbar> -->
  <div class="chat-container mt-1">

    <div
      class="message "
      v-for="(message,index) in messages"
      :key="index"
      :class="{'text-right': message.name == userDetails.id}"
    >
      <p v-if="index == 0" class="my-0 mt-2" style="text-transform: uppercase;font-size:80%;color:#eb6eb8">
        {{message.name }}
      </p>
      <p style="text-transform: uppercase;font-size:80%;color:#99B113" class="my-0 mt-2" v-if="index>0 && messages[index-1].name != message.name">{{message.name }}</p>
      
      <div elevation="0" class="my-1 white py-2 content" :class="{'right-content': message.name == userDetails.id}" >
        {{message.message}}
      </div>

      <!-- <v-card elevation="0" style="width: 60%;" class="my-1" :class="{'right-content': message.name == userDetails.id}" >
        <v-card-text class="">{{message.message}}</v-card-text>
      </v-card> -->
    </div>
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
  },
  
};
</script>

<style scoped>
.card{
  background: white;
  display: inline;
}
.right-content{
  /* display: inline;
  flex-wrap: wrap; */
  /* background: red; */
  /* padding-left: 10%;
  padding-right: 0;
  margin-right: 0;
  margin-left: auto;
  text-align: right; */
}
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
  z-index: -50;
  background-color: #f2f2f2;
}

.chat-container .content{
    padding: 8px;
    border-radius: 10px;
    display:inline-block;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12);
    max-width: 50%;
    word-wrap: break-word;
    }
</style>