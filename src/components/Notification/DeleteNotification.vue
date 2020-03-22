<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ on }">
      <v-icon small class="mr-2" v-on="on">mdi-delete</v-icon>
    </template>

    <v-card>
      <v-card-title class="google-font heading">Are you sure?</v-card-title>
      <v-card-text
        class="google-font"
      >Would you like to remove <span class="font-weight-bold black--text google-font">{{ data.title }} </span> Notificaion form the Notifications?</v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>

        <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>

        <v-btn
          color="red darken-1"
          text
          :loading="loading"
          @click="deleteItem(data.id)"
        >Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from '@/config/firebase';

export default {
  name: "DeleteNotification",
  props:['data'],
  data:()=>({
      loading:false,
      dialog:false
  }),
  methods:{
      deleteItem(id) {
      console.log(id);
      this.loading = true;
      firebase.firestore
        .collection("pushNotifications")
        .doc(id)
        .delete()
        .then(() => {
          this.loading = false;
          this.dialog = false;
          this.$emit("addedSuccess", this.data.title+" Notification Deleted");
        })
        .catch(e => {
          console.log(e);
          this.isLoading = false;
          this.$emit("addedSuccess", e);
        });
    }
  }
};
</script>

<style>
</style>