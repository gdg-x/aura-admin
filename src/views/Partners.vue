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
                    <v-card
                      style="cursor: pointer;user-select: none;border:1px solid #e0e0e0;border-radius:5px;"
                      height="100%"
                      v-ripple
                      @click="gotoTeamDetails(item.id)"
                      class="text-center elevation-0"
                    >
                      <v-card-text style="height:100%">
                        <v-img
                        :src="(item.image.length>0)?item.image:require('@/assets/img/default_avatar.jpg')"
                        width="100%"
                        contain
                        />
                        <p
                          class="mt-3 mb-0 google-font black--text"
                          style="font-size:120%"
                        >{{item.name}}</p>
                        <v-chip
                            class="ma-1"
                            v-if="item.visible"
                            dark
                            label
                            color="green"
                            small
                        >Visible</v-chip>
                        <v-chip class="ma-1" v-else label dark color="red" small>Not Visible</v-chip>

                        <v-chip class="ma-1" v-if="item.active" dark label color="green" small>Active</v-chip>
                        <v-chip class="ma-1" v-else label dark color="red" small>Not Active</v-chip>
                      </v-card-text>
                    </v-card>
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
      this.showSnakeBar("Team Removed Sucessfully");
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
    gotoTeamDetails(id) {
      this.$router.push("/team/" + id);
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


// TODO: TO UPDATE SNAKEBAR a
// https://stackoverflow.com/questions/39868963/vue-2-mutating-props-vue-warn 
