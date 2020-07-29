<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent scrollable width="1200">
      <template v-slot:activator="{ on }">
        <!-- For Large screen (Laptops and up) -->
        <v-btn color="indigo hidden-sm-and-down" depressed dark v-on="on">Add New Partner</v-btn>
        <!-- For small Screen (Tablet and smaller) -->
        <v-btn fab x-small color="indigo" outlined class="hidden-md-and-up" dark v-on="on">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card v-if="dialog">
        <v-card-title
          class="google-font"
          style="border-bottom:1px solid #e0e0e0;"
          primary-title
          dark
        >Add New Partner</v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row class="pa-0">
              <v-col md="12" cols="12">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-row class="pa-3">
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p class="google-font mb-0" style="color:red">*indicates required field</p>
                      <p style="color:red">ID should be unique, Once you assigned an ID to event, it can't be changed</p>

                    </v-col>
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p style="font-size:120%" class="my-0">Partner Status</p>
                    </v-col>

                    <v-col md="3" xs="3" cols="12" class="pa-1 ma-0">
                      <v-select :items="items" v-model="active" label="Active Status *" outlined></v-select>
                    </v-col>

                    <v-col md="3" xs="3" cols="12" class="pa-1 ma-0">
                      <v-select :items="items" v-model="visible" label="Visiblity Status *" outlined></v-select>
                    </v-col>

                    <v-col md="3" xs="3" cols="12" class="pa-1 ma-0">
                      <v-text-field v-model="id" class="ma-0" label="ID *" type="text" outlined></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="pa-3">
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p style="font-size:120%" class="my-0">Partner Info</p>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        class="ma-0"
                        label="Name *"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field
                        v-model="pocEmail"
                        class="ma-0"
                        label="Partner POC Email"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col md="7" xs="7" cols="8" class="pa-1 ma-0">
                      <v-text-field v-model="imageURL" class="ma-0" label="Image URL" outlined></v-text-field>
                    </v-col>
                    <v-col md="4" xs="4" cols="4" class="pa-1 ma-0">
                      <UploadImage type="partner" :userId="id" @message="showMessageSnakeBar" @uploadedImage="imageUploadDone"/>
                    </v-col>

                    <v-col md="12" xs="12" cols="12" class="pa-1 ma-0">
                      <v-textarea outlined name="input-7-4" v-model="des" label="Description"></v-textarea>
                    </v-col>
                  </v-row>
                
                  <v-row class="pa-3">
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p style="font-size:120%" class="my-0">Social Links</p>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field class="ma-0" label="Facebook" outlined v-model="facebook"></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field class="ma-0" label="Github" v-model="github" outlined></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field class="ma-0" v-model="linkedin" label="Linkedin" outlined></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field class="ma-0" v-model="twitter" label="Twitter" outlined></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field class="ma-0" v-model="web" label="Website/Blog" outlined></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="indigo" text @click="dialog = false">Close</v-btn>
          <v-btn
            color="indigo"
            dark
            depressed
            :disabled="!valid"
            :loading="loading"
            @click="SaveEvent"
          >Add New Partner</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {mapState}  from 'vuex';
import PartnersServices from "@/services/PartnersServices"
export default {
  props: [],
  components:{
    UploadImage: () => import("@/components/Common/ImageUpload"),
  },
  data() {
    return {
      imageUpload: [],
      imagePre: "",
      imageUploading: false,
      valid: true,
      dialogImageUload: false,
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 50) || "Name must be less than 50 characters"
      ],
      dialog: false,
      loading: false,
      items: [true, false],
      active: Boolean,
      visible: Boolean,
      id: "",
      name: "",
      pocEmail:"",
      facebook: "",
      github: "",
      linkedin: "",
      twitter: "",
      web: "",
      des: "",
      imageURL: ""
    };
  },
  computed:{
    ...mapState(['userDetails'])
  },
  methods: {
    showMessageSnakeBar(text){
      this.$emit("message", text);
    },
    imageUploadDone(text){
      this.imageURL = text;
    },
    SaveEvent() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        var Data = {
          active: this.active,
          visible: this.visible,
          name: this.name,
          des: this.des,
          image: this.imageURL,
          id: this.id,
          pocemail:this.pocEmail,
          createdBy: {
            name: this.userDetails.name,
            id: this.userDetails.id
          },
          createdOn: new Date(),
          lastUpdatedOn: "",
          lastUpdatedBy: {
            name: "",
            id: ""
          },
          socialLinks: {
            facebook: this.facebook,
            github: this.github,
            linkedin: this.linkedin,
            twitter: this.twitter,
            web: this.web
          }
        }
        PartnersServices.addPartner(Data.id, Data).then(res=>{
          if(res.success== true){
            this.loading = false
            this.dialog = false
            this.$emit("showSuccess", res.msg)
          }
        }).catch(e=>{
          this.loading = false
          this.$emit("message", e.msg);
        })
      }
    }
  }
};
</script>