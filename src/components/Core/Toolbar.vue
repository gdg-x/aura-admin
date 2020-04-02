<template>
    <v-app-bar app fixed clipped-left class="white black--text">
        <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="google-font">Aura Admin 2.0</v-toolbar-title>
        <v-spacer></v-spacer>
        <offline @detected-condition="handleConnectivityChange"></offline>

        <!-- <p>los</p> -->
        <v-toolbar-title v-if="isOffline" style="border:1px solid red;border-radius:6px;color:red;font-size:90%" class="google-font px-2">Offline</v-toolbar-title>
        <!-- <v-btncolor="red" small outlined disabled>Offline</v-btn> -->
        <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" v-on:click="logout">
                    <v-icon>mdi-logout-variant</v-icon>
                </v-btn>
            </template>
            <span>Logout</span>
        </v-tooltip>
    </v-app-bar>
</template>
<script>
  import offline from 'v-offline';
  import firebase from '@/config/firebase'
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    components:{
        offline
    },
    name: 'Toolbar',
    data:()=>({
        isOffline: false
    }),
    computed:{
        ...mapGetters(['links'])
    },
    methods: {
        ...mapMutations(['toggleDrawer']),
        onClick (e, item) {
            e.stopPropagation()
            if (item.to || !item.href) return
            this.$vuetify.goTo(item.href)
        },
        logout(){
            firebase.auth.signOut().then(()=>{
                this.$router.replace('/login')
            })
        },
        handleConnectivityChange(status) {
            if(status === true){
                this.isOffline=false
            }else{
                this.isOffline=true
            }
        }
    }
  }

</script>