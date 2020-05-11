<template>
  <v-container class="" style="max-width:1600px">
    <Snakebar
      :message="snakeBarMessage"
      :isShow.sync="isSnakeBarVisible"
      :color="snakeBarColor"
      :timeout="snakeBarTimeOut"
    />
    <v-row class="">
      <v-col>
        <v-toolbar class="elevation-0" style="border:1px solid #e0e0e0;border-radius:5px;">
          <v-toolbar-title class="google-font mr-3">Emails Details:</v-toolbar-title>
          <v-spacer></v-spacer>
          <!-- Mobile -->
          &nbsp;
          <!-- <AddTeam class="ml-2" @showSuccess="showSnakeBar" /> -->
        </v-toolbar>
      </v-col>
    </v-row>

    <v-row class="mx-0">
      <v-container fluid>
        <v-row>
          <v-col md="7" class="elevation-0 px-2 mx-0 " style="border:1px solid #e0e0e0;border-radius:5px;background:white">
            <v-container fluid>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Subject"
                    placeholder="Subject"
                    outlined
                    v-model="mailData.subject"
                  ></v-text-field>
                </v-col>

                <v-col class="my-0 py-0" cols="12">
                  <v-combobox
                    v-model="mailData.emailids"
                    chips
                    clearable
                    label="Email Ids"
                    multiple
                    outlined
                  >
                    <template v-slot:selection="{ attrs, item, select, selected }">
                      <v-chip
                        v-bind="attrs"
                        :input-value="selected"
                        close
                        @click="select"
                        @click:close="remove(item)"
                      >
                        <strong class="google-font">{{ item }}</strong>
                      </v-chip>
                    </template>
                  </v-combobox>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Image URL"
                    placeholder="Subject"
                    outlined
                    v-model="mailData.image"
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    label="Button Name"
                    outlined
                    v-model="mailData.urlname"
                  ></v-text-field>
                </v-col>

                <v-col cols="6">
                  <v-text-field
                    label="Button URL"
                    v-model="mailData.url"
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    label="Title"
                    v-model="mailData.title"
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    outlined
                    name="input-7-4"
                    label="Body"
                    v-model="mailData.msg"
                  ></v-textarea>
                </v-col>

              </v-row>
            </v-container>
          </v-col>
          <v-col md="5" class="elevation-0 px-2 py-0 mx-0" >
            <v-container class="py-0 px-0" fluid style="border:1px solid #e0e0e0;border-radius:5px;background:white"  >
              <v-row class="py-3" style="background-color:#fafafa"> 
                <v-col class="text-center">
                  <p class="google-font mb-0" style="font-size:150%;">{{generalConfig.name.length?generalConfig.name:'Aura Admin'}}</p>
                </v-col>
              </v-row>
              <v-row class="pa-0 ma-0">
                <v-col class="pa-0 ma-0">
                  <v-img v-if="mailData.image.length>0" class="ma-0 pa-0" width="100%" :src="mailData.image"></v-img>
                </v-col>
              </v-row>
              <v-row class="px-3 py-5">
                <v-col>
                  <p class="googl-font" style="font-size:130%"><b>{{mailData.title}}</b></p>
                  <p class="google-font">{{mailData.msg}}</p>
                  <v-btn v-if="mailData.url.length>0" color="primary" :href="mailData.url" target="_blank" depressed>{{mailData.urlname}}</v-btn>

                  <p class="google-font mt-5 mb-0" v-if="generalConfig.becomemember" style="font-size:110%">Become a member: <a :href="generalConfig.becomemember" target="_blank">{{generalConfig.becomemember}}</a> </p>
                  <p v-if="generalConfig.learnMoreLink" class="google-font mt-0 mb-5" style="font-size:110%">To more about our community: <a :href="generalConfig.learnMoreLink" target="_blank">{{generalConfig.learnMoreLink}}</a></p>

                  <p class="google-font mt-5 mb-0" style="font-size:110%">Regards,</p>
                  <p class="google-font mt-0" style="font-size:110%">Team {{generalConfig.name.length?generalConfig.name:'Arua'}}</p>
                </v-col>
              </v-row>
              <v-row class="py-5" style="background-color:#4285F4">
                <v-col class="text-center">
                  <v-img width="15%" style="margin-left:auto;margin-right:auto" src="https://lh5.googleusercontent.com/qXNUtfa-s4_ahcnkh6ju_pgYhtJkrtpz76MelAqKZ3ZiXxMaDAiQ1n812rFkWdFYY9UTNyJsmJc5HmpZmi6UwVGkKCUfshPjlTucBDz-OIp4teVoYIc6s2D5hY4GhbXtQ5Th3TNs" ></v-img>
                  <!-- {{generalConfig.socialLinks}} -->

                  <div class="text-center mt-3">
                    <a v-if="generalConfig.meetupLink" :href="generalConfig.meetupLink" class="google-font mr-3" style="color:white;text-decoration:none;font-size:110%">Meetup</a>
                    <a v-if="generalConfig.socialLinks.facebook" :href="generalConfig.socialLinks.facebook" class="google-font mr-3" style="color:white;text-decoration:none;font-size:110%">Facebook</a>
                    <a v-if="generalConfig.socialLinks.twitter" :href="generalConfig.socialLinks.twitter" class="google-font mr-3" style="color:white;text-decoration:none;font-size:110%">Twitter</a>
                    <a v-if="generalConfig.socialLinks.linkedin" :href="generalConfig.socialLinks.linkedin" class="google-font mr-3" style="color:white;text-decoration:none;font-size:110%">LinkedIn</a>
                    <a v-if="generalConfig.socialLinks.github" :href="generalConfig.socialLinks.github" class="google-font mr-3" style="color:white;text-decoration:none;font-size:110%">Github</a>
                    <a v-if="generalConfig.socialLinks.instagram" :href="generalConfig.socialLinks.instagram" class="google-font mr-3" style="color:white;text-decoration:none;font-size:110%">Instagram</a>
                  </div>
                </v-col>
                

              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
      
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "ViewEmailView",
  inject: ['theme'],
  components: {
    Snakebar:()=>import('@/components/Common/Snakebar')
  },
  data: () => ({
    snakeBarMessage: "",
    isSnakeBarVisible: false,
    snakeBarColor: "green",
    snakeBarTimeOut: 5000,
    showDialog: false,
    
    mailData:{
      title:'This is Title Field',
      subject:'This is Subject',
      emailids:[],
      msg:'the Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through. the Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.the Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.',
      urlname:'Learn More',
      url:'https://google.com',
      image:'https://iambharat.tk/images/roadshow.png'
    }
  }),
  computed:{
      ...mapState(['generalConfig']),
  },
  mounted() {
  },
  methods: {
    remove (item) {
      this.mailData.emailids.splice(this.mailData.emailids.indexOf(item), 1)
      this.mailData.emailids = [...this.mailData.emailids]
    },
  }
};
</script>
