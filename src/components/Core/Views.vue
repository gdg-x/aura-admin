<template>
    <v-content class="grey lighten-5 ">
        <v-container fluid class="ma-0 pa-0">
            <v-alert type="error" dismissible>
               This app in Development
            </v-alert>
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