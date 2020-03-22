<template>
  <v-container style="max-width:1600px">
    <v-row>
      <v-col>
        <p>{{userEmail}}</p>
        <v-btn class="primary" v-on:click="logout">Logout</v-btn>
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
