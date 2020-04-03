<template>
    <v-dialog v-model="dialog" width="500">
        
      <template v-slot:activator="{ }">
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn fab x-small outlined icon v-on="on" dark color="indigo" @click.stop="dialog = true">
                        <v-icon>mdi-lead-pencil</v-icon>
                    </v-btn>
                </template>
                <span>Edit Agenda</span>
            </v-tooltip>

      </template>
      <v-card v-if="dialog" >
        <v-card-title class="google-font" primary-title dark>
          Edit Schedule
        </v-card-title>
        <v-card-text class="px-5">
          <v-container fluid>
            <v-row class="pa-0">
                <v-col md="6" lg="6" cols="6" class="pa-1 ma-0">
                    <v-text-field
                    v-model="data.starttime"
                    class="ma-0"
                    label="Start Time"
                    outlined
                    type="time"
                    ></v-text-field>
                </v-col>
                <v-col md="6" lg="6" cols="6" class="pa-1 ma-0">
                    <v-text-field
                    v-model="data.endtime"
                    class="ma-0"
                    label="End Time"
                    outlined
                    type="time"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" class="pa-1 ma-0">
                    <v-text-field
                    v-model="data.title"
                    class="ma-0"
                    label="Title"
                    outlined
                    ></v-text-field>
                </v-col>
                <v-col cols="12" class="pa-1 ma-0">
                    <v-textarea outlined v-model="data.des" label="Description"></v-textarea>
                </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="grey lighten-4">
          <div class="flex-grow-1"></div>
          <v-btn color="indigo" text @click="dialog = false">Close</v-btn>
          <v-btn
            color="indigo"
            dark
            depressed
            @click="addGuid"
            :loading="loading"
          >Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import firebase from '@/config/firebase';

export default {
    props:['data'],
    data:()=>({
        dialog:false,
        loading:false,
        name:"",
        des:"",
        starttime:'',
        endtime:''
    }),
    methods:{
      addGuid(){
        this.dialog = false;
      }
    }
};
</script>

<style>
</style>