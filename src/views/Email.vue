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
          <v-toolbar-title class="google-font mr-3">Emails: {{ emailsData.length }}</v-toolbar-title>
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
            
          <addEmail class="ml-2" @showSuccess="showSnakeBar" />
        </v-toolbar>
      </v-col>
    </v-row>

    <v-row class="px-2">
      <v-col cols="12 ">
        <v-container fluid class="pa-0">
          <div >
            <!-- Check the Condition Where we have a Data or not -->
            <div>
              <!-- Table View -->
              <div class="pa-0 ma-0">
                <v-row>
                  <v-col class="pa-1">
                    <v-data-table
                      :mobile-breakpoint="0"
                      style="border:1px solid #e0e0e0;border-radius:5px;background:white;"
                      :search="search"
                      :loading="isLoading"
                      :headers="headers"
                      :items="emailsData"
                      :items-per-page="5"
                      class="elevation-0 ma-0 pa-0"
                    >
                      <template v-slot:item.actions="{ item }">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on" @click="gotoEmailDetails(item.id)">
                              <v-icon>mdi-eye</v-icon>
                            </v-btn>
                          </template>
                          <span>{{item.subject}} Details</span>
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
import EmailServices from '@/services/mailService'
import {mapState} from 'vuex'
export default {
  name: "EmailView",
  inject: ['theme'],
  components: {
    addEmail:()=> import('@/components/Email/AddEmail'),
    Snakebar:()=> import('@/components/Common/Snakebar')
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
    emailsData: [],
    headers: [
      {
        text: 'Teamplate',
        align: 'start',
        value: 'emailTypeName',
      },
      {
        text: 'Subject',
        align: 'start',
        value: 'subject',
      },
      { text: 'Actions', value: 'actions', sortable: false, },
    ],
  }),
  computed:{...mapState(['role'])},
  beforeMount(){
    if(!this.$route.meta.access[this.role]){
      alert("Not Auth")
      this.$router.replace('/home');
    }
  },
  mounted() {
    if (this.$route.query.msg) {
      this.showSnakeBar("Email Removed Sucessfully");
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
    gotoEmailDetails(id) {
      this.$router.push("/emails/" + id);
    },
    showData() {
      this.emailsData = [];
      this.isLoading = true;
      EmailServices.getAllMails().then(res=>{
        this.emailsData = res.data
        this.isLoading = false
      }).catch(e=>{
        this.isLoading = false
        console.log("Error getting documents", e)
      })
    }
  }
};
</script>
