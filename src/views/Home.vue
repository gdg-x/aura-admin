<template>
  <v-container style="width:95%">
    <v-row class="mb-0">
     <v-col>
       <h1 class="google-font d-none d-sm-none d-md-block">Dashboard</h1>
       <p class="google-font d-block d-sm-none mb-0">Dashboard</p>
     </v-col>
    </v-row>

    <v-row class="mt-0 pt-0" justify="center" align="center">

     <v-col class="ma-3 px-5 mt-0" style="background:#BBDEFB;border:1px solid #BBDEFB;border-radius:5px;">
       <v-container class="mb-5 py-5">
         <v-row class="mb-5" >
           <v-col md="9" class="my-0 py-0">
              <h1 class="google-font mb-0" style="color:#3F51B5">Welcome! Username</h1>
              <p class="google-font mb-0">Manage your community</p>
           </v-col>
           <v-col md="3" style="margin-top:-185px" class="d-none d-sm-none d-md-block">
             <v-img :src="require('@/assets/img/svg/login.svg')"></v-img>
           </v-col>
         </v-row>
       </v-container>
     </v-col>
    </v-row>

    <v-row class="px-5" style="margin-top:-80px"> 

      <v-col class="pa-1" md="3" lg="3" cols="6" style="">
        <div style="border:1px solid #e0e0e0;border-radius:5px;background:white">
          <v-container class="py-0">
            <v-row justify="center" align="center">
              <v-col md="3" class="pa-5 py-auto text-center d-none d-sm-none d-md-block">
                <v-icon class="my-auto" color="primary" style="font-size:400%">mdi-assistant</v-icon>
              </v-col>
              <v-col md="9" class="pa-5">
                <p class="google-font my-0">Events</p>
                <p class="google-font my-0" style="font-size:280%">145</p>
                <p class="google-font my-0" style="font-size:80%">View All Events</p>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>


      <v-col class="pa-1" md="3" lg="3" style="">
        <div style="border:1px solid #e0e0e0;border-radius:5px;background:white">
          <v-container class="py-0">
            <v-row justify="center" align="center">
              <v-col md="3" class="pa-5 py-auto text-center d-none d-sm-none d-md-block">
                <v-icon class="my-auto" color="primary" style="font-size:400%">mdi-nature-people</v-icon>
              </v-col>
              <v-col md="9" class="pa-5">
                <p class="google-font my-0">Team</p>
                <p class="google-font my-0" style="font-size:280%">14</p>
                <p class="google-font my-0" style="font-size:80%">View Team</p>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>

      <v-col class="pa-1" md="3" lg="3" style="">
        <div style="border:1px solid #e0e0e0;border-radius:5px;background:white">
          <v-container class="py-0">
            <v-row justify="center" align="center">
              <v-col md="3" class="pa-5 py-auto text-center d-none d-sm-none d-md-block">
                <v-icon class="my-auto" color="primary" style="font-size:400%">mdi-account-multiple</v-icon>
              </v-col>
              <v-col md="9" class="pa-5">
                <p class="google-font my-0">Speaker</p>
                <p class="google-font my-0" style="font-size:280%">10</p>
                <p class="google-font my-0" style="font-size:80%">View All Speaker</p>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>


      <v-col class="pa-1" md="3" lg="3" style="">
        <div style="border:1px solid #e0e0e0;border-radius:5px;background:white">
          <v-container class="py-0">
            <v-row justify="center" align="center">
              <v-col md="3" class="pa-5 py-auto text-center d-none d-sm-none d-md-block">
                <v-icon class="my-auto" color="primary" style="font-size:400%">mdi-kodi</v-icon>
              </v-col>
              <v-col md="9" class="pa-5">
                <p class="google-font my-0">Partners</p>
                <p class="google-font my-0" style="font-size:280%">5</p>
                <p class="google-font my-0" style="font-size:80%">View All Partners</p>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>

      

    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import firebase from '@/config/firebase'

export default {
  name: 'Home',
  data:()=>({
    userEmail:''
  }),
  mounted(){
    if(firebase.auth.currentUser){
        this.userEmail = firebase.auth.currentUser.email
    }else{
        this.$router.replace('login')
    }
  },
  methods:{
    logout(){
        firebase.auth.signOut().then(()=>{
            this.$router.replace('/login')
        })
    }
  }
}
</script>
