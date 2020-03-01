<template>
    <v-app-bar app fixed clipped-left class="white black--text">
        <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Aura Admin</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text v-on:click="logout">
            Logout
        </v-btn>
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