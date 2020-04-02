<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent scrollable width="500">
      <template v-slot:activator="{ on }">
        <v-btn fab x-small color="indigo" outlined dark v-on="on">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card v-if="dialog" class >
        <v-card-title class="google-font" primary-title dark>
          Add New Footer Link
        </v-card-title>
        <v-card-text class="px-5">
          <v-container fluid>
            <v-row class="pa-0">
              <v-col cols="12" class="pa-1 ma-0" ref="form">
                  <!-- {{data}} -->
                <v-select
                    :items="items"
                    outlined
                    label="Link Type"
                    v-model="SelectedLinkType"
                ></v-select>

                <v-text-field
                    label="Link Name"
                    :rules="[() => !!linkname || 'This field is required']"
                    v-model="linkname"
                    outlined
                ></v-text-field>
                <v-text-field
                    label="Link"
                    v-model="link"
                    :rules="[() => !!link || 'This field is required']"
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
            @click="addData"
            :loading="loading"
          >Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from '@/config/firebase';
export default {
    props:['data'],
    components:{
    },
    data:()=>({
        dialog:false,
        loading:false,
        isAdding: false,
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
    mounted(){
        // this.ShowPartners()
    },
    methods:{
        addData(){

            this.loading = true
            var datalink={
                link:this.link,
                linkname:this.linkname,
                linktype:this.SelectedLinkType
            }

            if(this.SelectedLinkType == 'About'){
                this.data['About'].push(datalink)
            }else if(this.SelectedLinkType == 'Resources'){
                this.data['Resources'].push(datalink)
            }else if(this.SelectedLinkType == 'Developer Console'){
                this.data['Developer Console'].push(datalink)
            }else if(this.SelectedLinkType == 'Footer End Session Link'){
                this.data['Footer End Session Link'].push(datalink)
            }
            this.loading = false;  
            this.dialog = false
        },
     
    }
};
</script>

<style>
</style>