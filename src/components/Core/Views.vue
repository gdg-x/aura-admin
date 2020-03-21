<template>
    <v-content class="grey lighten-5">
        <v-container fluid >
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