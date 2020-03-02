<template>
     <v-container class="">
        <v-row >
            <v-col>
                <Snakebar :message="SMsg" :isShow="SVisible" :color="SColor" :timeout="STimeout" />
                <v-toolbar class="elevation-1">
                    <v-toolbar-title class="google-font mr-3">Speakers</v-toolbar-title>
                    
                    <v-spacer></v-spacer>
                    <v-text-field
                        flat
                        v-model="search"
                        solo-inverted
                        hide-details
                        prepend-inner-icon="mdi-search-web"
                        label="Search"
                        single-line
                        class="hidden-sm-and-down mr-2"
                    ></v-text-field>

                    <AddSpeaker @showSuccess="ShowSnakebar('Speaker Created Successfully', true, 'green')" />
                </v-toolbar>
            </v-col>
        </v-row>
        <!-- <v-row class="hidden-sm-and-down mr-2">
            <v-col class="google-font">
                <v-data-table
                    :search="search"
                    :headers="headers"
                    :items="SpeakersData"
                    :loading="loadingData"
                    item-key="name"
                    class="elevation-1"
                >
                </v-data-table>
            </v-col>
        </v-row> 
              :items-per-page.sync="itemsPerPage"
                :footer-props="{ itemsPerPageOptions }" -->
        <v-row class="px-2">
            <v-container>
             <v-data-iterator
                :items="SpeakersData"
                :loading = "loadingData"
                loading-text="Loading Speakers from Dir"
                :search="search"
                disable-pagination
                hide-default-footer
              >
                <template v-slot:default="props">
                  <v-row class="">
                  <v-col col="12" cols="6" md="2" lg="2" sm="3" v-for="(item) in props.items" :key="item.name" class="pa-1">
                    <div v-on:click="showTeam(item.id)" style="cursor: pointer;" class="text-center py-3 elevation-1" >
                      
                      <v-avatar size="100">
                          <img 
                          :src="(item.image.length>0)?item.image:require('@/assets/img/default_avatar.jpg')" alt=""
                          >
                      </v-avatar>
                      <p class="mt-3 mb-0 google-font mb-0" style="font-size:120%">{{item.name}}</p>
                      <p class="mt-0 mb-0 google-font mt-0" style="font-size:80%">{{item.designation}}</p>
                    </div>
                  </v-col>
                  </v-row>
                </template>
              </v-data-iterator>
            </v-container>
        </v-row>
    </v-container>
</template>

<script>
  import firebase from '@/config/firebase'
  import AddSpeaker from '@/components/Speakers/AddSpeaker'
  import Snakebar from '@/components/Common/Snakebar'

  export default {
    name: 'SpeakerView',
    components:{
        AddSpeaker,
        Snakebar
    },
    data:()=>({
        loadingData: false,
        itemsPerPageOptions: [8, 16, 32],
        itemsPerPage: 8,
        search:'',
        SMsg:'',
        SVisible:false,
        SColor:'',
        STimeout:5000,
        SpeakersData:[],
        headers:[
            {
                text: 'Name',
                align: 'start',
                sortable: true,
                value: 'name',
            },
            { text: 'Visible', value: 'visible' },
            { text: 'Email', value: 'email' },
            { text: 'Country', value: 'country' },
            { text: 'Contact', value: 'mbnumber' },
            { text: 'Actions', value: '' }
        ]
    }),
    created(){
        if(this.$route.query.msg){
            this.ShowSnakebar('Speaker Removed Sucessfully', true, 'green')
        }
    },
    computed:{
    },
    mounted(){
        this.ShowAllSpeakers()
    },
    methods: {
      showTeam(id){
        this.$router.replace('/speakers/'+id)
      },
      ShowSnakebar(msg,visible,color){
        this.SMsg = msg
        this.SVisible = visible
        this.SColor = color
        this.ShowAllSpeakers()
      },
      ShowAllSpeakers(){
          this.SpeakersData = []
          this.loadingData = true
          firebase.firestore.collection('Speakers').get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
                this.SpeakersData.push(doc.data())
            });
            this.loadingData = false
            // console.log(this.SpeakersData)
          })
          .catch((err) => {
              this.loadingData = false
              console.log('Error getting documents', err);
          });
      }
    }
  }

</script>