<template>
    <v-navigation-drawer app clipped v-model="drawer" width="280px">
        <v-list-item two-line>
        <v-list-item-avatar>
            <img :src="(userDetails.image && userDetails.image.length>0)?userDetails.image:require('@/assets/img/default_avatar.jpg')" />
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title class="google-font">{{userDetails.name || "User-Name"}}</v-list-item-title>
            <v-list-item-subtitle>{{ userDetails.email || "User-Email"}}</v-list-item-subtitle>
        </v-list-item-content>
        </v-list-item >
        <v-divider></v-divider>
        <v-list dense>
            <v-list-item
                v-for="(link, i) in links.filter(li=>li.access[role])"
                :key="i"
                :to="link.to"
                :href="link.href"
                @click="onClick($event, link)"
                class="google-font my-0 py-0"
                color="primary"
            >
                <v-list-item-icon>
                <v-icon v-text="link.icon"></v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                <v-list-item-title v-text="link.text" />
                </v-list-item-content>
                
            </v-list-item>

            <!-- <v-divider inset></v-divider>
            <v-subheader inset>Support</v-subheader>
            <v-list-item
                v-for="(link, i) in links.filter(li=>li.access[role])"
                :key="i"
                :to="link.to"
                :href="link.href"
                @click="onClick($event, link)"
                class="google-font my-0 py-0"
                color="primary"
            >
                <v-list-item-icon>
                <v-icon v-text="link.icon"></v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                <v-list-item-title v-text="link.text" />
                </v-list-item-content>
                
            </v-list-item> -->

        </v-list>
        <template v-slot:append>
            <div class="pl-2">
                <p class="google-font my-0" style="color:#616161" >Version: 3.1.1 - AURA</p>
                <p class="google-font my-0 mb-3" style="color:#616161" >Based on Project <a href="https://github.com/gdg-x/aura-admin/" target="_blank" style="text-decoration:none">Aura Admin</a></p>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<script>
    import {
        mapGetters,
        mapState,
        mapMutations
    } from 'vuex';
    import firebase from '@/config/firebase'
    export default {
        name:"Drawer",
        data:()=>({
        }),
        computed:{
            ...mapState(['userDetails','role']),
            ...mapGetters(['links']),
            drawer: {
                get () {
                  return this.$store.state.drawer
                },
                set (val) {
                    this.setDrawer(val)
                }
            }
        },
        methods:{
            ...mapMutations(['setDrawer']),
            onClick (e, item) {
            e.stopPropagation()
                if (item.to === '/') {
                    this.$vuetify.goTo(0)
                    this.setDrawer(false)
                    return
                }
                if (item.to || !item.href) return
                this.$vuetify.goTo(item.href)
                this.setDrawer(false)
            }
        }
    }
</script>