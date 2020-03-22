<template>
  <v-container style="max-width:1600px">
    <v-row>
      <!-- <v-col>
        <p>{{userEmail}}</p>
        <v-btn class="primary" v-on:click="logout">Logout</v-btn>
      </v-col> -->
      <v-col md="3" class="">
        <v-card
        >
          <v-list-item>
            <v-list-item-avatar color="grey"></v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="headline">Our Changing Planet</v-list-item-title>
              <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
            height="194"
          ></v-img>

          <v-card-text>
            Visit ten places on our planet that are undergoing the biggest changes today.
          </v-card-text>

          <v-card-actions>
            <v-btn
              text
              color="deep-purple accent-4"
            >
              Read
            </v-btn>
            <v-btn
              text
              color="deep-purple accent-4"
            >
              Bookmark
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
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
