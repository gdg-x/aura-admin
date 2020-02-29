<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{}">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" dark color="red" @click.stop="dialog = true">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Remove {{ SpeakerData.name }} </span>
      </v-tooltip>
    </template>

    <v-card>
      <v-card-title class=" google-font heading">Are you sure?</v-card-title>
      <v-card-text class="google-font">
        Would you like to remove {{ SpeakerData.name }} form the Speakers?
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>

        <v-btn color="green darken-1" text @click="dialog = false">
          Disagree
        </v-btn>

        <v-btn
          color="green darken-1"
          text
          :loading="loading"
          @click="deleteItem(SpeakerData.id)"
        >
          Agree
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from "@/config/firebase";
export default {
  props: {
    SpeakerData: {}
  },
  data: () => ({
    dialog: false,
    loading: false
  }),
  methods: {
    deleteItem(id) {
      console.log(id)
      this.loading = true;
      firebase.firestore
        .collection("Speakers")
        .where("id", "==", id)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            doc.ref.delete();
            this.loading = false;
            // console.log("Removed ");

            this.dialog = false
            this.$emit('RemoveSuceess')
            this.$router.push({ path: '/speakers', query: { msg: 'removesuccess' } })
            // this.$router.replace('/admin/dashboard/team?msg=removesuccess')
          });
        });
    }
  }
};
</script>
