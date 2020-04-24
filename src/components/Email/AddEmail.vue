<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent scrollable width="1100">
      <template v-slot:activator="{ on }">
        <!-- For Large screen (Laptops and up) -->
        <v-btn color="indigo hidden-sm-and-down" depressed dark v-on="on">Add New Email</v-btn>
        <!-- For small Screen (Tablet and smaller) -->
        <v-btn fab x-small color="indigo" outlined class="hidden-md-and-up" dark v-on="on">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card v-if="dialog" class="" style="border-radius:7px">
        <v-card-title
          class="google-font"
          primary-title
          style="border-bottom:1px solid #e0e0e0;"
          dark
        >Add New Email 
        <!-- <div class="flex-grow-1"></div> asd -->
        </v-card-title>
        <v-card-text class="px-1">
          <v-container fluid>
            <v-row class="pa-0">
              <v-col md="12" cols="12">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-row class="pa-3 py-0">
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p class="google-font mb-0" style="color:red">*indicates required field</p>
                      <p style="color:red">ID should be unique, Once you assigned an ID to mail, it can't be changed</p>
                    </v-col>
                    
                    <v-col md="3" xs="3" cols="12" class="pa-1 ma-0">
                      <v-text-field v-model="mailData.id" class="ma-0" label="ID *" type="text" outlined></v-text-field>
                    </v-col>

                    <v-col md="3" xs="3" cols="12" class="pa-1 ma-0">
                      <v-select :items="emailType" v-model="mailData.emailTypeName" label="Email Type *" outlined></v-select>
                    </v-col>
                  </v-row>
                  <v-row class="pa-3 py-0">
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p style="font-size:120%" class="my-0">Email Info</p>
                    </v-col>

                    <v-col md="12" xs="12" cols="12" class="pa-1 ma-0">
                      <v-text-field
                        v-model="mailData.subject"
                        class="ma-0"
                        label="Email Subject *"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col md="12" xs="12" cols="12" class="pa-1 ma-0">
                      <v-text-field v-model="mailData.image" class="ma-0" label="Image URL" outlined></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field v-model="mailData.urlname" class="ma-0" label="Button URL Name" outlined></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field v-model="mailData.url" class="ma-0" label="Button URL" outlined></v-text-field>
                    </v-col>

                    <v-col md="12" xs="12" cols="12" class="pa-1 ma-0">
                      <v-text-field v-model="mailData.title" class="ma-0" label="Title" outlined></v-text-field>
                    </v-col>

                    <v-col md="12" xs="12" cols="12" class="pa-1 ma-0">
                      <v-textarea outlined name="input-7-4" v-model="mailData.msg" label="body"></v-textarea>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="grey lighten-4 py-5">
          <div class="flex-grow-1"></div>
          <v-btn color="indigo" text @click="dialog = false">Close</v-btn>
          <v-btn
            color="indigo"
            dark
            depressed
            :disabled="!valid"
            :loading="loading"
            @click="SaveEvent"
          >Add Email</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import EmailServices from '@/services/mailService'
export default {
  props: [],
  data() {
    return {
      valid: true,
      emailType: ["General", "Confirmation", "Feedback", "Announcements" ],
      dialog: false,
      loading: false,
      mailData:{
        id: "",
        title:'',
        emailTypeName: null,
        subject:'',
        emailids:[],
        msg:'',
        urlname:'',
        url:'',
        image:''
      },
    };
  },
  mounted(){
  },
  methods: {
    SaveEvent() {
      if (this.$refs.form.validate()) {
        this.loading = true
        var Data = {
            id: this.mailData.id,
            title: this.mailData.title,
            emailTypeName: this.mailData.emailTypeName,
            subject: this.mailData.subject,
            emailids:[],
            msg: this.mailData.msg,
            urlname: this.mailData.urlname,
            url: this.mailData.url,
            image: this.mailData.image
        }
        EmailServices.addMail(Data.id, Data).then(res=>{
          if(res.success==true){
            this.loading = false;
            this.dialog = false;
            this.$emit("showSuccess", res.msg);
          }
        }).catch(e=>{
          this.loading = false;
          console.log(e);
          this.$emit("showSuccess", e.msg);
        })
      }
    }
  }
};
</script>