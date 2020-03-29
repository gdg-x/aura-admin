<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent scrollable width="600">
      <template v-slot:activator="{ on }">
        <v-btn fab x-small color="indigo" outlined dark v-on="on">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card v-if="dialog" class >
        <v-card-title class="google-font" primary-title dark>
          Add New Partner
        </v-card-title>
        <v-card-text class="px-5">
          <v-container fluid>
            <v-row class="pa-0">
              <v-col cols="12" class="pa-1 ma-0">
                <v-select
                    v-model="selectedPartners"
                    :items="partnersData"
                    outlined
                    item-text="name"
                    item-value="id"
                    label="Select Partners"
                    multiple>
                        <template v-slot:selection="{ item, index }">
                            <v-chip small v-if="index === 0">
                                <span>{{ item.name }}</span>
                            </v-chip>
                            <span
                                v-if="index === 1"
                                class="grey--text caption"
                            >(+{{ partnersData.length - 1 }} others)</span>
                        </template>
                    </v-select>
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
            @click="addPartners"
            depressed
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
    components:{
    },
    data:()=>({
        dialog:false,
        loading:false,
        name:"",
        des:"",
        selectedPartners:[],
        partnersData:[],
        isAdding: false
    }),
    mounted(){
        this.ShowPartners()
    },
    methods:{
        ShowPartners(){
            firebase.firestore
            .collection("partners")
            .get()
            .then(snapshot => {
            snapshot.forEach(doc => {
                this.partnersData.push(doc.data());
                // console.log(this.partnersData)
            });
            })
            .catch(err => {
            console.log("Error getting documents", err);
            });
        },
        addPartners(){
            this.loading = true
            var UpdatedPartnerData = {
                partnersid:this.selectedPartners
            }
            // console.log(UpdatedPartnerData)
            firebase.firestore
            .collection("config")
            .doc("partners")
            .set(UpdatedPartnerData)
            .then(() => {
                this.dialog = false
                this.$emit("show", "Partners Data Added Success");
                this.loading = false;
                
            })
            .catch(e => {
                this.$emit("show", e);
                this.loading = false;
                console.log(e);
            });
        }
    }
};
</script>

<style>
</style>