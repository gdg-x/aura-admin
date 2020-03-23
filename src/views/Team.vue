<template>
  <v-container class="" style="max-width:1600px">
    <Snakebar
      :message="snakeBarMessage"
      :isShow.sync="isSnakeBarVisible"
      :color="snakeBarColor"
      :timeout="snakeBarTimeOut"
    />
    <v-row class="">
      <v-col>
        <v-toolbar class="elevation-0" style="border:1px solid #e0e0e0;border-radius:5px;">
          <v-toolbar-title class="google-font mr-3">Team</v-toolbar-title>
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

          <v-btn fab x-small color="indigo" @click="openCloseSearch" class="mr-2 hidden-md-and-up" outlined dark>
            <v-icon dark v-if="!isSearch">mdi-account-search</v-icon>
            <v-icon dark v-else>mdi-close</v-icon>
          </v-btn>
          <!-- Mobile -->
          &nbsp;

          <v-btn-toggle background-color="white" color="indigo" dense v-model="dataView" class="hidden-sm-and-down">
            <v-btn>
              <v-icon>mdi-grid</v-icon>
            </v-btn>

            <v-btn>
              <v-icon>mdi-format-list-bulleted</v-icon>
            </v-btn>
          </v-btn-toggle>
          <AddTeam class="ml-2" @showSuccess="showSnakeBar" />
        </v-toolbar>
      </v-col>
    </v-row>

    <v-row class="px-2">
      <v-col cols="12 ">
        <v-container fluid class="pa-0">
          <v-row justify="center" align="center" v-if="isLoading">
            <v-col col="12" md="2" cols="6" v-for="n in 6" :key="n" class="text-center">
              <v-sheet
                :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                class=""
              >
                <v-skeleton-loader
                  class="mx-auto"
                  max-width="300"
                  type="card"
                ></v-skeleton-loader>
              </v-sheet>
              <!-- <v-progress-circular :width="5" :size="50" color="indigo" indeterminate></v-progress-circular> -->
            </v-col>
          </v-row>
          <div v-else >
            <v-data-iterator
              :items="teamData"
              v-if="dataView == 0"
              :loading="isLoading"
              loading-text="Loading Team from Dir"
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
                        <v-avatar size="100">
                          <img
                            :src="(item.image.length>0)?item.image:require('@/assets/img/default_avatar.jpg')"
                            alt
                          />
                        </v-avatar>
                        <p
                          class="mt-3 mb-0 google-font black--text"
                          style="font-size:120%"
                        >{{item.name}}</p>
                        <p
                          class="mt-0 mb-0 google-font caption"
                          style="font-size:60%"
                        >{{item.designation}}</p>
                        <v-chip class="ma-1" x-small>{{item.role}}</v-chip>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </template>
            </v-data-iterator>

            <v-data-table
              v-else
              style="border:1px solid #e0e0e0;border-radius:5px;background:white"
              :search="search"
              :loading="isLoading"
              :headers="headers"
              :items="teamData"
              :items-per-page="5"
              class="elevation-0 ma-0 pa-0"
            >
              <template v-slot:item.active="{ item }">
                <v-chip small v-if="item.active == true" color="success">Active</v-chip>
                <v-chip v-else small dark color="red">Inctive</v-chip>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn icon v-on="on" class="mr-2" @click="gotoTeamDetails(item.id)">
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </div>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "@/config/firebase";
import Snakebar from "@/components/Common/Snakebar";
import AddTeam from "@/components/Team/AddTeam";

export default {
  name: "TeamView",
  inject: ['theme'],
  components: {
    Snakebar,
    AddTeam
  },
  data: () => ({
    dataView:0,
    isSearch:false,
    search: "",
    snakeBarMessage: "",
    isSnakeBarVisible: false,
    snakeBarColor: "green",
    snakeBarTimeOut: 5000,
    isLoading: false,
    showDialog: false,
    teamData: [],
    headers: [
      {
        text: 'Name',
        align: 'start',
        value: 'name',
      },
      { text: 'Role', value: 'role' },
      { text: 'Designation', value: 'designation' },
      { text: 'Status', value: 'active' },
      { text: 'Actions', value: 'actions', sortable: false, },
    ],
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
      this.teamData = [];
      this.isLoading = true;
      firebase.firestore
        .collection("team")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.teamData.push(doc.data());
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
