<template>
<v-container class="ma-0 pa-0">
    <v-row justify="center" align="center" class v-if="showLoader">
      <v-col cols="12" md="12" class="text-center">
        <v-progress-circular :width="5" :size="50" color="indigo" indeterminate></v-progress-circular>
      </v-col>
    </v-row>
  <div class="chat-container mt-1" v-chat-scroll="{smooth: true, notSmoothOnInit: true}">
    <div
      class="message"
      v-for="(message,index) in messages"
      :key="index"
      :class="{'text-right': message.name == userDetails.id}"
    >
      <p v-if="index == 0" class="my-0 mt-2" style="text-transform: uppercase;font-size:80%;color:#eb6eb8">
        {{message.name }}
      </p>
      <p style="text-transform: uppercase;font-size:80%;color:#99B113" class="my-0 mt-2" v-if="index>0 && messages[index-1].name != message.name">{{message.name }}</p>
      
      <div elevation="0" class="my-1 white py-2 content" >
        {{message.message}}
        <p class="ma-0"><span class="timecss">{{message.timestamp | dateFilter}}</span></p>
      </div>
    </div>
  </div>
</v-container>
</template>

<script>
import firebase from "@/config/firebase";
import { mapState } from "vuex";
export default {
  name: "Chat-Connect",
  data: () => ({
    messages: [],
    name: "",
    content: "",
    showLoader:false
  }),
  computed: { ...mapState(["userDetails"]) },
  created() {
    this.getData();
  },
  mounted(){
  },
  methods: {
    getDateTime(date){
      if (date.toString().length > 0) {
        return new Date(date).toString().split("(")[0];
      } else {
        return date;
      }
    },
    getData() {
      this.showLoader = true;
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
          this.showLoader = false;
        });
    },
  },
  filters: {
    dateFilter: value => {
      const date = new Date(value);
      return date.toLocaleString(["en-US"], {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    }
  }
  
};
</script>

<style scoped>
.card{
  background: white;
  display: inline;
}
.timecss{
  font-size: 70%;
  color: grey;
  float: right;
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
  height: calc(100vh - 10rem);
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