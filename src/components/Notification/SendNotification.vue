<template>
  <v-dialog v-model="dialog" hide-overlay persistent width="300">
    <template v-slot:activator="{ on }">
      <!-- send icon -->
      <v-btn icon v-on="on" @click="send" class="mr-2">
        <v-icon>mdi-send</v-icon>
      </v-btn>
      <!-- <v-icon small class="mr-2" v-on="on" @click="send">mdi-send</v-icon> -->
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

export default {
  name: "SendNotifications",
  data: () => ({
    dialog: false
  }),
  props:['dataA'],
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
              // docs.forEach(doc => {
              //   let token = doc.data().token;
              //   let body = {
              //     to: token,
              //     notification: {
              //       title: data.title,
              //       body: {
              //         body: data.body,
              //         eventID: data.eventID,
              //         regLink: data.regLink
              //       },
              //       tag: "newEvent",
              //       image: data.image
              //     }
              //   };
              //   const options = {
              //     method: "POST",
              //     headers: new Headers({
              //       Authorization:
              //         "key=AAAAJKAFx0g:APA91bG4RFcmV5d3PYgeNSXui0oCgcS8AqnTGe79Zv0X3udydnTnRM0r4EEQlWrpDPmOABVOTBbI3nCuST_3c1Z8yfyIPBwAa4jjoIOrzdocg3lsuJdpo4XIam01_Kk-mKUzaGjsqDep",
              //       "Content-Type": "application/json"
              //     })
              //   };
              //   options.body = JSON.stringify(body);
              //   fetch("https://fcm.googleapis.com/fcm/send", options)
              //     .then(res => res.json())
              //     .then(data => {
              //       console.log(data);
              //       if (data.failure == 1) {
              //         firebase.firestore
              //           .collection("apiEnd")
              //           .doc(doc.id)
              //           .delete()
              //           .then(() => {
              //             console.log("removed Success");
              //           });
              //       }
              //     })
              //     .catch(err => alert(err));
              // });
              // console.log(docs);
              this.$emit("addedSuccess", "Push Notifications Sent Success");
              this.dialog = false;
            });
        });
    },
  }
};
</script>

<style>
</style>