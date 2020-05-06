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
          <v-toolbar-title class="google-font mr-3">User Management</v-toolbar-title>
          <v-spacer></v-spacer>

          <!-- Desktop -->
          <v-text-field
            flat
            dense
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
              dense
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

          <AddUser class="ml-2" @showSuccess="showSnakeBar" />
        </v-toolbar>
      </v-col>
    </v-row>

    <v-row class="px-2">
      <v-col cols="12 ">
        <v-container fluid class="pa-0">
          <div>
            <!-- Check the Condition Where we have a Data or not -->
            <div >
              <!-- Table View -->
              <div class="pa-0 ma-0">
                <v-row>
                  <v-col class="pa-1">
                    <p>Users Data</p>
                    {{usersData}}
                    <v-data-table
                      :mobile-breakpoint="0"
                      style="border:1px solid #e0e0e0;border-radius:5px;background:white;"
                      :search="search"
                      :loading="isLoading"
                      :headers="headers"
                      :items="usersData"
                      :items-per-page="5"
                      class="elevation-0 ma-0 pa-0"
                    >
                      
                      <template v-slot:item.actions="{ item }">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on" @click="gotoTeamDetails(item.id)">
                              <v-icon>mdi-eye</v-icon>
                            </v-btn>
                          </template>
                          <span>Details</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on" @click="disableUser(item.uid)">
                              <v-icon>mdi-account-minus</v-icon>
                            </v-btn>
                          </template>
                          <span>Disable</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on" @click="enableUser(item.uid)">
                              <v-icon>mdi-account-check</v-icon>
                            </v-btn>
                          </template>
                          <span>Enable</span>
                        </v-tooltip>
                        
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on" @click="removeUser(item.uid)">
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>
                          </template>
                          <span>Remove</span>
                        </v-tooltip>


                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
                
              </div>
              <!-- Table View -->
            </div>

          
          </div>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UsersServices from '@/services/UsersServices'
export default {
  name: "TeamView",
  inject: ['theme'],
  components: {
    Snakebar:()=>import('@/components/Common/Snakebar'),
    AddUser:()=>import('@/components/Users/addUser')
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
    usersData: [],
    headers: [
      { text: 'User ID', value: 'id' },
      { text: 'Email', value: 'email' },
      { text: 'User Type', value: 'userType' },
      { text: 'UID', value: 'uid' },
      { text: 'Actions', value: 'actions', sortable: false, },
    ],
  }),
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
      this.usersData = [];
      this.isLoading = true;
      UsersServices.getAllUsers().then(res=>{
        this.usersData = res.data
        this.isLoading = false
      }).catch(e=>{
        this.isLoading = false
        console.log("Error getting documents", e)
      })
    },
    removeUser(uid){
      console.log('Calling remove')
      console.log(uid)
      UsersServices.removeUser(uid).then(res=>{
        console.log(res)
        this.showData()
      }).catch(e=>{
        console.log(e)
      })
    },
    disableUser(uid){
      console.log('Calling disible')
      console.log(uid)
      UsersServices.disableUser(uid).then(res=>{
        console.log(res)
        this.showData()
      }).catch(e=>{
        console.log(e)
      })
    },
    enableUser(uid){
      console.log('Calling enable')
      console.log(uid)
      UsersServices.enableUser(uid).then(res=>{
        console.log(res)
        this.showData()
      }).catch(e=>{
        console.log(e)
      })
    }
  }
};
</script>
<style>
.v-badge--dot .v-badge__badge {
    border-radius: 6px;
    height: 12px;
    min-width: 0;
    padding: 0;
    width: 12px;
}
</style>
