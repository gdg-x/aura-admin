<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{}">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn fab x-small icon v-on="on" dark color="primary" class="mx-1" outlined @click.stop="dialog = true">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Remove {{ TeamInfo.name }}</span>
      </v-tooltip>
    </template>

    <v-card v-if="dialog">
      <v-card-title class="google-font heading">Are you sure?</v-card-title>
      <v-card-text class="google-font">Would you like to remove {{ TeamInfo.name }} form the Team?</v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>

        <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>

        <v-btn color="red darken-1" text :loading="loading" @click="deleteItem()">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import TeamServices from '@/services/TeamServices'
export default {
  name:"DeleteTeamMember",
  props: {
    TeamInfo: {}
  },
  data: () => ({
    dialog: false,
    loading: false
  }),
  methods: {
    deleteItem() {
      this.loading = true;
      TeamServices.removeTeamMember(this.TeamInfo).then(res=>{
        if(res.success==true){
          this.loading = false;
          this.dialog = false;
          this.$router.push({
            path: "/team",
            query: { msg: res.msg }
          });
        }
      }).catch(e=>{
        console.log(e);
        this.isLoading = false;
      })
    }
  }
};
</script>
