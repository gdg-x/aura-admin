<template>
  <v-container fluid class="ma-0 pa-0">
    <Snakebar
      :message="snakeBarMessage"
      :isShow.sync="isSnakeBarVisible"
      :color="snakeBarColor"
      :timeout="snakeBarTimeOut"
    />
    <v-row justify="center" align="center" class v-if="isLoading">
      <v-col cols="12" md="12" class="text-center">
        <v-progress-circular :width="5" :size="50" color="indigo" indeterminate></v-progress-circular>
      </v-col>
    </v-row>
    <v-row class="ma-0 pa-0" v-else>
      <v-col md="8" cols="12">
        <v-row>
          <v-col>
              <v-toolbar class="elevation-0" style="border:1px solid #e0e0e0;border-radius:5px;">
                <v-toolbar-title class="google-font mr-3">Mange Home Page Partners </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <AddPartner @show="showSnakeBar" />
                </v-toolbar>
              {{partnersData}}
          </v-col>
        </v-row>
      </v-col>
     
      <v-col>
        <v-btn
          depressed
          color="indigo"
          :loading="isAdding"
          @click="setData"
          dark
        >Save General Settings</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import firebase from "@/config/firebase";
import Snakebar from "@/components/Common/Snakebar";
import AddPartner from '@/components/Config/Partners/AddPartner'
export default {

  name: "Config",
  components:{
    AddPartner,
    Snakebar
  },
  data: () => ({
    tab: null,
    isLoading: false,
    isAdding: false,
    partnersData:[],
    snakeBarMessage: "",
    isSnakeBarVisible: false,
    snakeBarColor: "green",
    snakeBarTimeOut: 5000
  }),
  mounted() {
    this.getData();
  },
  methods: {
    showSnakeBar(e) {
      this.snakeBarMessage = e;
      this.isSnakeBarVisible = true;
      this.ShowPartners()
    },
    setData() {
      this.isAdding = true;
      firebase.firestore
        .collection("config")
        .doc("general")
        .set(this.communityinfo)
        .then(() => {
          this.$emit("show", "Community Data Added Success");
          this.isAdding = false;
        })
        .catch(e => {
          this.$emit("show", e);
          this.isAdding = false;
          console.log(e);
        });
    },

    ShowPartners(){
        firebase.firestore
        .collection("config")
        .doc("partners")
        .get()
        .then(doc => {
        //   console.log(doc);
          if (!doc.exists) {
            this.isLoading = false;
            return;
          }
          doc = doc.data();
          for(let a=0;a<doc.length;a++){
            firebase.firestore.collection("partners").where('id','==',doc[a]).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    console.log(doc.id, " => ", doc.data());
                });
            })
          }

          
          console.log(doc);
        //   console.log(Object.keys(doc).length);
        //   if (Object.keys(doc).length > 0) {
        //     this.communityinfo = doc;
        //   }
          this.isLoading = false;
        })
        .catch(e => {
          console.log(e);
          this.isLoading = false;
        });
    },
    
    getData() {
      this.isLoading = false;
      this.ShowPartners()
      
    //   firebase.firestore
    //     .collection("config")
    //     .doc("general")
    //     .get()
    //     .then(doc => {
    //       console.log(doc);
    //       if (!doc.exists) {
    //         this.isLoading = false;
    //         return;
    //       }
    //       doc = doc.data();
    //       console.log(doc);
    //       console.log(Object.keys(doc).length);
    //       if (Object.keys(doc).length > 0) {
    //         this.communityinfo = doc;
    //       }
    //       this.isLoading = false;
    //     })
    //     .catch(e => {
    //       console.log(e);
    //       this.isLoading = false;
    //     });
    }
  }
};
</script>