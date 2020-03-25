<template>
    <v-content class="grey lighten-5 ">
        <v-container fluid class="ma-0 pa-0">
            <!-- <p class="pa-2 red">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, eos. Nobis numquam fugiat necessitatibus error, deserunt modi aliquid dolorum! Ipsam corporis explicabo quaerat necessitatibus aliquam odio velit inventore adipisci at.</p> -->
            <v-slide-y-reverse-transition>
                
                <router-view v-show="show" />   
            </v-slide-y-reverse-transition>
        </v-container>
    </v-content>
</template>

<script>
    export default{
        name:"MainView",
        data:()=>({
            show : false,
        }),
        created(){
            this.show = true
        }
    }
</script>