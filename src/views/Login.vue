<template>
<!-- style="background:#BBE2F2" -->
    <v-content >
        <v-container fuild class="fill-height" >
            <v-row align="center" justify="center" class="ma-0">
                <v-col cols="12" sm="4" md="4" lg="3" class="text-center">
                    <v-img :src="require('@/assets/img/home.svg')">
                    </v-img>
                    <h3 class="google-font mb-3">Aura Admin</h3>
                    <v-text-field
                        label="Email"
                        v-model="email"
                        outlined
                    ></v-text-field>

                    <v-text-field
                        label="Password"
                        type="password"
                        v-model="password"
                        outlined
                    ></v-text-field>
                    <v-btn v-on:click="login" class="primary" :loading="loading" block>Login</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</template>

<script>
import firebase from '@/config/firebase'
export default {
    name:"Login",
    data:()=>({
        email:'',
        password:'',
        loading: false,
        alertMsg:''
    }),
    mounted(){
        if(firebase.auth.currentUser){
            this.$router.replace('/')
        }else{
            this.alertMsg = 'Kindly login'
        }
    },
    methods:{
        login(){
            this.loading = true
            firebase.auth.signInWithEmailAndPassword(this.email,this.password).then((user)=>{
                this.loading = false
                this.$router.replace('/')
                console.log(user)
            }).catch(e=>{
                this.loading=false
                alert('Alert '+e);
            })
        }
    }
}
</script>

<style>

</style>