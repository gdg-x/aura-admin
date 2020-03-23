<template>
  <v-container>
    <Snakebar
      :message="snakeBarMessage"
      :isShow.sync="isSnakeBarVisible"
      :color="snakeBarColor"
      :timeout="snakeBarTimeOut"
    />
    <v-row class="">
      <v-col>
        <v-toolbar class="elevation-0" style="border:1px solid #e0e0e0;border-radius:5px;">
          <v-toolbar-title class="google-font mr-3">Partners</v-toolbar-title>
          <v-spacer></v-spacer>

          <!-- Desktop -->
          <v-text-field
            flat
            v-model="search"
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-search-web"
            label="Search"
            single-line
            class="mr-2 hidden-sm-and-down"
          ></v-text-field>
          <!-- Desktop -->

          <!-- Mobile -->
          <v-slide-x-reverse-transition>
            <v-text-field
              flat
              v-if="isSearch"
              v-model="search"
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-search-web"
              label="Search"
              single-line
              class="mr-2 hidden-md-and-up"
            ></v-text-field>
          </v-slide-x-reverse-transition>

          <v-btn fab small color="indigo" @click="openCloseSearch" class="mr-2 hidden-md-and-up" outlined dark>
            <v-icon dark v-if="!isSearch">mdi-account-search</v-icon>
            <v-icon dark v-else>mdi-close</v-icon>
          </v-btn>
          <!-- Mobile -->
          &nbsp;
          <AddTeam @showSuccess="showSnakeBar" />
        </v-toolbar>
      </v-col>
    </v-row>

    <v-row class="px-2">
      <v-col cols="12 ">
        <v-container fluid class="pa-0">
          <v-row justify="center" align="center" v-if="isLoading">
            <v-col col="12" md="2" class="text-center">
              <v-progress-circular :width="5" :size="50" color="indigo" indeterminate></v-progress-circular>
            </v-col>
          </v-row>
          <div v-else>
            <v-data-iterator
              :items="partnersData"
              :loading="isLoading"
              loading-text="Loading Speakers from Dir"
              :search="search"
              disable-pagination
              hide-default-footer
            >
              <template v-slot:default="props">
                <v-row class>
                  <v-col
                    col="12"
                    cols="6"
                    md="2"
                    lg="2"
                    sm="3"
                    v-for="(item) in props.items"
                    :key="item.id"
                    class="pa-1"
                  >
                    <v-container 
                    class="py-0" 
                    v-ripple
                    @click="gotoPartnerDetails(item.id)"
                    style="border:1px solid #e0e0e0;border-radius:5px;background:white;cursor: pointer;user-select: none;">
                      <v-row class="">
                        <v-col class="grey lighten-4 pa-0" >
                          <v-img :aspect-ratio="16/6.5" :src="(item.image.length>0)?item.image:require('@/assets/img/default_avatar.jpg')"></v-img>
                        </v-col>
                      </v-row>
                      <v-row class="">
                        <v-col style="background:white">
                          <p
                            class="mb-0 google-font black--text"
                            style="font-size:110%"
                          >{{item.name}}</p>
                          <v-chip
                              class="mr-1"
                              v-if="item.visible"
                              dark
                              label
                              color="green"
                              x-small
                          >Visible</v-chip>
                          <v-chip class="mr-1" v-else label dark color="red" x-small>Not Visible</v-chip>

                          <v-chip class="mr-1" v-if="item.active" dark label color="green" x-small>Active</v-chip>
                          <v-chip class="mr-1" v-else label dark color="red" x-small>Not Active</v-chip>
                        </v-col>
                      </v-row>
                    </v-container>
                    
                  </v-col>
                </v-row>
              </template>
            </v-data-iterator>
          </div>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "@/config/firebase";
import Snakebar from "@/components/Common/Snakebar";
import AddTeam from "@/components/Partners/AddPartner";

export default {
  name: "TeamView",
  components: {
    Snakebar,
    AddTeam
  },
  data: () => ({
    isSearch:false,
    search: "",
    snakeBarMessage: "",
    isSnakeBarVisible: false,
    snakeBarColor: "green",
    snakeBarTimeOut: 5000,
    isLoading: false,
    showDialog: false,
    partnersData: []
  }),
  computed: {},
  mounted() {
    if (this.$route.query.msg) {
      this.showSnakeBar("Partner Removed Sucessfully");
    }else
      this.showData();
  },
  methods: {
    changeSnakebar(vale) {
      this.isSnakeBarVisible = vale;
    },
    openCloseSearch(){
      this.isSearch = !this.isSearch
      this.search = "";
    },
    showSnakeBar(text) {
      this.snakeBarMessage = text;
      this.isSnakeBarVisible = true;
      this.showData();
    },
    gotoPartnerDetails(id) {
      this.$router.push("/partners/" + id);
    },
    showData() {
      this.partnersData = [];
      this.isLoading = true;
      firebase.firestore
        .collection("partners")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.partnersData.push(doc.data());
          });
          this.isLoading = false;
        })
        .catch(err => {
          console.log("Error getting documents", err);
        });
    }
  }
};
</script>

<style scoped>
.client-logo{
    height: 90px;
    padding: 12px 12px;
    border-radius: 7px;
    background: white;
    border: 1px solid #ebebeb;
    text-align: center;
}  
</style>


// TODO: TO UPDATE SNAKEBAR a
// https://stackoverflow.com/questions/39868963/vue-2-mutating-props-vue-warn 
