<template>
    <v-app-bar dark app fixed clipped-left class="primary">
        <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Aura Admin</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
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