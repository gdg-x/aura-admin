<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{}">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn fab x-small icon v-on="on" dark color="indigo" class="mx-1" outlined @click.stop="dialog = true">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <span>Remove {{ data.name }}</span>
      </v-tooltip>
    </template>

    <v-card v-if="dialog">
      <v-card-title class="google-font heading">Are you sure?</v-card-title>
      <v-card-text class="google-font">Would you like to remove {{ data.name }} form the User Managemenet?</v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>

        <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>

        <v-btn color="red darken-1" text :loading="loading" @click="removeUser(data)">Agree</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import UsersServices from '@/services/UsersServices'
import {mapState} from 'vuex'
export default {
  props:['data'],
  data: () => ({
    dialog: false,
    loading: false
  }),
  computed:{...mapState(['generalConfig'])},
  methods: {
    removeUser(data){
        console.log(data)
      this.loading = true
      UsersServices.removeUser(data.uid, data.name, this.generalConfig.name, this.generalConfig.email).then(res=>{
        console.log(res)
        this.loading = false
        // this.showSnakeBar('User Removed')
        this.dialog = false;
        this.$emit('RemovedSuccess', res.msg)
      }).catch(e=>{
        this.loading = false
        console.log(e)
      })
    },
  }
};
</script>
