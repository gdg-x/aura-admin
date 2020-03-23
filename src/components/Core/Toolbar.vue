<template>
    <v-app-bar app fixed clipped-left class="white black--text">
        <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="google-font">Aura Admin</v-toolbar-title>
        <v-spacer></v-spacer>
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
  import firebase from '@/config/firebase'
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    name: 'Toolbar',
    data:()=>({
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
        }
    }
  }

</script>