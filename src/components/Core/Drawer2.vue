<template>
    <v-navigation-drawer app clipped v-model="drawer">
        <v-list-item two-line>
      <v-list-item-avatar>
        <img :src="require('@/assets/img/default_avatar.jpg')" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>Name</v-list-item-title>
        <v-list-item-subtitle>Email</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
        <v-divider></v-divider>
        <v-list dense shaped >
            <!-- List Group -->
            
            <!-- List Group -->
            <v-list-item
                v-for="(link, i) in links"
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
        </v-list>
        <template v-slot:append>
      <div class="pl-1">
        <p class="subtitle-2">Version: 0.0.1</p>
      </div>
    </template>
    </v-navigation-drawer>
</template>

<script>
    import {
        mapGetters,
        mapMutations
    } from 'vuex'
    export default {
        name:"Drawer",
        data:()=>({

        }),
        computed:{
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