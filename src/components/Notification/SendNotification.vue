<template>
  <v-dialog v-model="dialog" hide-overlay persistent width="300">
        <template v-slot:activator="{ on }">
          <v-btn fab x-small icon color="indigo" class="mx-1" outlined v-on="on" @click="send" >
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </template>
    <v-card color="primary" dark v-if="dialog">
      <v-card-text class="py-5">
        Sending Notifications
        <v-progress-linear indeterminate color="white" class="mb-0 mt-1"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from '@/config/firebase';
import { mapState } from 'vuex'

export default {
  name: "SendNotifications",
  data: () => ({
    dialog: false
  }),
  props:['dataA'],
  computed:{
    ...mapState(['keysandsecurity'])
  },
  methods:{
    send() {
      firebase.firestore
        .collection("pushNotifications")
        .doc(this.dataA.id)
        .update({
          sentTime: new Date(),
          noTimeSend: this.dataA.noTimeSend + 1
        })
        .then(() => {
          firebase.firestore
            .collection("apiEnd")
            .get()
            .then(docs => {
              docs.forEach(doc => {
                let token = doc.data().token;
                let body = {
                  to: token,
                  notification: {
                    title: this.dataA.title,
                    body: {
                      body: this.dataA.body,
                      learnMore: this.dataA.learnMore,
                      regLink: this.dataA.regLink
                    },
                    tag: "newEvent",
                    image: this.dataA.image
                  }
                };
                const options = {
                  method: "POST",
                  headers: new Headers({
                    Authorization:
                      "key="+this.keysandsecurity.server_key,
                    "Content-Type": "application/json"
                  })
                };
                options.body = JSON.stringify(body);
                fetch("https://fcm.googleapis.com/fcm/send", options)
                  .then(res => res.json())
                  .then(data => {
                    // console.log(data);
                    if (data.failure == 1) {
                      firebase.firestore
                        .collection("apiEnd")
                        .doc(doc.id)
                        .delete()
                        .then(() => {
                          console.log("removed Success");
                        });
                    }
                  })
                  .catch(err => {
                    this.$emit("errorRecived", err);
                  });
              });
              // console.log(docs);
              this.$emit("addedSuccess", "Push Notifications Sent Success");
              this.dialog = false;
            }).catch(e=>{
              this.$emit("errorRecived", e);
              this.dialog = false;
            });
        });
    },
  }
};
</script>

<style>
</style>