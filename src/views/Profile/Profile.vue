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
          <v-toolbar-title class="google-font mr-3">Profile Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          &nbsp;
        </v-toolbar>
      </v-col>
    </v-row>

    <v-row class="px-0">
      <v-col cols="7" >
            <v-container style="border:1px solid #e0e0e0;border-radius:5px;background:white;">
                <v-row>
                    <v-col class="">
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-img :src="(userData.image.length>0)?userData.image:require('@/assets/img/default_avatar.jpg')"></v-img>
                          </v-list-item-avatar>

                          <v-list-item-content>
                            <v-list-item-title class="google-font" v-html="userData.name"></v-list-item-title>
                            <v-list-item-subtitle class="google-font" v-html="userData.email"></v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                    </v-col>
                </v-row>
              <v-row justify="center" align="center">
                    <v-col md="12" class="px-5">
                        
                        <p class="google-font my-0"><b>Bio</b></p>
                        <p class="google-font">{{userData.bio}}</p>

                        <p class="google-font my-0"><b>Mobile</b></p>
                        <p class="google-font">{{userData.mbnumber.length>0?userData.mbnumber:'Not Found'}}</p>

                        <p class="google-font mt-5 my-0"><b>Role</b></p>
                        <v-chip small>{{userData.role}}</v-chip>

                        <p class="google-font mt-5 my-0"><b>Designation</b></p>
                        <p class="google-font">{{userData.designation}}</p>
                        

                        <p class="google-font mt-5 my-0"><b>Social</b></p>
                        <p class="mt-1 mb-0 google-font mt-0" style="font-size:110%">
                        <span
                          style="cursor: pointer;"
                          v-for="(slink,i) in userData.socialLinks"
                          :key="i"
                          class="mr-1"
                        >
                          <v-chip
                            small
                            v-if="slink"
                            :href="slink"
                            target="_blank"
                            style="text-transform: uppercase;"
                          >{{i}}</v-chip>
                        </span>
                      </p>
                    </v-col>
              </v-row>
            </v-container>
      </v-col>
      <v-col cols="5" >
          <v-container style="border:1px solid #e0e0e0;border-radius:5px;background:white;">
              <v-row justify="center" align="center">
                <v-col class="px-5">
                  <h1 class="google-font">Password</h1>
                  <v-divider></v-divider>
                  <v-text-field
                    class="mt-5"
                    :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show4 ? 'text' : 'password'"
                    @click:append="show4 = !show4"
                    label="Current Password"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show4 ? 'text' : 'password'"
                    @click:append="show4 = !show4"
                    label="New Password"
                    outlined
                  ></v-text-field>

                  <v-text-field
                    :append-icon="show4 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show4 ? 'text' : 'password'"
                    @click:append="show4 = !show4"
                    label="Confirm Password"
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
          </v-container>
       
      </v-col>
    </v-row>

    
  </v-container>
</template>

<script>
import firebase from '@/config/firebase'
import UsersServices from '@/services/UsersServices'
export default {
  name: "EmailView",
  inject: ['theme'],
  components: {
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
    userData:[],
    show4:false
  }),
  mounted() {
    // let user = firebase.auth.currentUser
    // console.log(user.email)
    
    if (this.$route.query.msg) {
      this.showSnakeBar("Email Removed Sucessfully");
    }else
      this.showData();
      this.getCurrentUser()
  },
  methods: {
    getCurrentUser(){
        UsersServices.getCurrentUserDetails().then(res=>{
            if(res.success){
                this.userData = res.data
            }
            console.log(res)
            
        }).catch(e=>{
            console.log(e)
        })
    },
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
    showData() {
      
    }
  }
};
</script>
