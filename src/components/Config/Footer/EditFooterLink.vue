<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent scrollable width="500">
      <template v-slot:activator="{ on }">
        <v-btn fab elevation="0" outlined x-small text v-on="on">
          <v-icon>mdi-lead-pencil</v-icon>
        </v-btn>
      </template>
      <v-card v-if="dialog" class >
        <v-card-title class="google-font" primary-title dark>
          Update Footer Link
        </v-card-title>
        <v-card-text class="px-5">
          <v-container fluid>
            <v-row class="pa-0">
              <v-col cols="12" class="pa-1 ma-0">
                <v-select
                    :items="items"
                    v-model="data.linktype"
                    outlined
                    disabled
                    label="Link Type"
                ></v-select>
                <v-text-field
                    label="Link Name"
                    :rules="[() => !!data.linkname || 'This field is required']"
                    v-model="data.linkname"
                    outlined
                ></v-text-field>
                <v-text-field
                    label="Link"
                    v-model="data.link"
                    :rules="[() => !!data.link || 'This field is required']"
                    outlined
                ></v-text-field>
                
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
  </div>
</template>

<script>
import firebase from '@/config/firebase';

export default {
    props:['data'],
    data:()=>({
        dialog:false,
        loading:false,
        SelectedLinkType:'',
        link:'',
        linkname:'',
        items:[
            "About",
            "Resources",
            "Developer Console",
            "Footer End Session Link"
        ]
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