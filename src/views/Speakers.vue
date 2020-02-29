<template>
     <v-container>
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

                    <AddSpeaker @showSuccess="SpeakerAddedd" />
                </v-toolbar>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="google-font">
                <v-data-table
                    :search="search"
                    :headers="headers"
                    :items="SpeakersData"
                    item-key="name"
                    class="elevation-1"
                >
                </v-data-table>
            </v-col>
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
    computed:{
    },
    mounted(){
        this.ShowAllSpeakers()
    },
    methods: {
      SpeakerAddedd(){
        this.SMsg = 'Speaker Created Successfully'
        this.SVisible = true
        this.SColor = 'green'
      },
      ShowAllSpeakers(){
          firebase.firestore.collection('Speakers').get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
                this.SpeakersData.push(doc.data())
            });
            console.log(this.SpeakersData)
          })
          .catch((err) => {
              console.log('Error getting documents', err);
          });
      }
    }
  }

</script>