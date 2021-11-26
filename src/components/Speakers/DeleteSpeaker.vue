<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{}">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn fab x-small outlined class="mx-1" icon v-on="on" dark color="primary" @click.stop="dialog = true">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Remove {{ SpeakerInfo.name }}</span>
      </v-tooltip>
    </template>

    <v-card v-if="dialog">
      <v-card-title class="google-font heading">Are you sure?</v-card-title>
      <v-card-text class="google-font">Would you like to remove {{ SpeakerInfo.name }} form the Speakers?</v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>

        <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>

        <v-btn color="red darken-1" text :loading="loading" @click="deleteItem(SpeakerInfo.id)">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import SpeakerServices from '@/services/SpeakersServices'
export default {
  name:"DeleteSpeaker",
  props: {
    SpeakerInfo: {}
  },
  data: () => ({
    dialog: false,
    loading: false
  }),
  methods: {
    deleteItem(id) {
      this.loading = true;
      SpeakerServices.removeSpeaker(this.SpeakerInfo.id).then(res=>{
        if(res.success==true){
          this.loading = false;
          this.dialog = false;
          this.$router.push({
            path: "/speakers",
            query: { msg: res.msg }
          });
        }
      }).catch(e=>{
        console.log(e.msg);
        this.isLoading = false;
      })
    }
  }
};
</script>
