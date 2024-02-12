<template>
  <v-dialog v-model="dialog" persistent scrollable width="1000">
    <template v-slot:activator="{}">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            x-small
            outlined
            class="mx-1"
            icon
            color="primary"
            v-on="on"
            @click.stop="dialog = true"
            dark
          >
            <v-icon>mdi-lead-pencil</v-icon>
          </v-btn>
        </template>
        <span>Edit {{ partnerData.name }} Details</span>
      </v-tooltip>
    </template>

    <v-card v-if="dialog" style="border-radius: 12px;background-color: #F5F8FC;">
      <v-card-title
        class="google-font white"
        primary-title
        >Edit {{ partnerData.name }} Details</v-card-title
      >

      <v-card-text class>
        <v-container fluid class="pa-0">
          <v-row class="pa-0">
            <v-col md="12" cols="12">
              <v-form ref="form" v-model="valid" lazy-validation>
                <!-- Row 1 -->
                <v-row class="pa-3">
                  <v-col md="12" cols="12" class="pa-1 ma-0">
                    <p class="google-font mb-0" style="color: red">
                      *indicates required field
                    </p>
                  </v-col>
                  <v-col md="12" cols="12" class="pa-1 ma-0">
                    <p style="font-size: 120%" class="my-0">Partner Status</p>
                  </v-col>

                  <v-col md="3" xs="3" cols="12" class="pa-1 ma-0">
                    <v-select
                      :items="items"
                      v-model="updatedData.active"
                      label="Active Status"
                      background-color="white"
                      outlined
                    ></v-select>
                  </v-col>

                  <v-col md="3" xs="3" cols="12" class="pa-1 ma-0">
                    <v-select
                      :items="items"
                      v-model="updatedData.visible"
                      label="Visiblity Status"
                      background-color="white"
                      outlined
                    ></v-select>
                  </v-col>

                  <v-col md="3" xs="3" cols="12" class="pa-1 ma-0">
                    <v-text-field
                      v-model="updatedData.id"
                      class="ma-0"
                      disabled
                      background-color="white"
                      label="ID"
                      type="text"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- Row 1 -->

                <!-- Row 2 -->
                <v-row class="pa-3">
                  <v-col md="12" cols="12" class="pa-1 ma-0">
                    <p style="font-size: 120%" class="my-0">Partner Info</p>
                  </v-col>

                  <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                    <v-text-field
                      v-model="updatedData.name"
                      :rules="nameRules"
                      class="ma-0"
                      background-color="white"
                      label="Name *"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                    <v-text-field
                      v-model="updatedData.pocEmail"
                      class="ma-0"
                      label="Partner POC Email"
                      background-color="white"
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col md="7" xs="7" cols="8" class="pa-1 ma-0">
                    <v-text-field
                      v-model="updatedData.image"
                      class="ma-0"
                      label="Image URL"
                      background-color="white"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col md="4" xs="4" cols="4" class="pa-1 ma-0">
                    <UploadImage
                      type="partner"
                      :userId="updatedData.id"
                      @message="showMessageSnakeBar"
                      @uploadedImage="imageUploadDone"
                    />
                  </v-col>

                  <v-col md="12" xs="12" cols="12" class="pa-1 ma-0">
                    <v-textarea
                      outlined
                      name="input-7-4"
                      v-model="updatedData.des"
                      background-color="white"
                      label="Description"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <!-- Row 2 -->

                <!-- Row 3 -->
                <v-row class="pa-3">
                  <v-col md="12" cols="12" class="pa-1 ma-0">
                    <p style="font-size: 120%" class="my-0">Social Links</p>
                  </v-col>

                  <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                    <v-text-field
                      class="ma-0"
                      label="Facebook"
                      outlined
                      v-model="updatedData.socialLinks.facebook"
                      background-color="white"
                    ></v-text-field>
                  </v-col>

                  <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                    <v-text-field
                      class="ma-0"
                      label="Github"
                      v-model="updatedData.socialLinks.github"
                      background-color="white"
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                    <v-text-field
                      class="ma-0"
                      v-model="updatedData.socialLinks.linkedin"
                      background-color="white"
                      label="Linkedin"
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                    <v-text-field
                      class="ma-0"
                      v-model="updatedData.socialLinks.twitter"
                      background-color="white"
                      label="Twitter"
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                    <v-text-field
                      class="ma-0"
                      v-model="updatedData.socialLinks.web"
                      background-color="white"
                      label="Website/Blog"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- Row 3 -->
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="white">
        <div class="flex-grow-1"></div>
        <v-btn color="primary" text @click="dialog = false">Close</v-btn>
        <v-btn
          color="primary"
          depressed
          dark
          :disabled="!valid"
          :loading="loading"
          @click="UpdateData"
          >Update {{ partnerData.name.split(" ")[0] }} Details</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
import PartnersServices from "@/services/PartnersServices";
export default {
  name:"EditPartners",
  props: {
    partnerData: {},
  },
  components: {
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
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 50) || "Name must be less than 50 characters",
      ],
      dialog: false,
      loading: false,
      items: [true, false],
      updatedData: {
        active: this.partnerData.active,
        visible: this.partnerData.visible,
        name: this.partnerData.name,
        des: this.partnerData.des,
        image: this.partnerData.image,
        id: this.partnerData.id,
        pocEmail: this.partnerData.pocemail || "",
        socialLinks: {
          facebook: this.partnerData.socialLinks.facebook,
          github: this.partnerData.socialLinks.github,
          linkedin: this.partnerData.socialLinks.linkedin,
          twitter: this.partnerData.socialLinks.twitter,
          web: this.partnerData.socialLinks.web,
        },
      },
    };
  },
  computed: {
    ...mapState(["userDetails"]),
  },
  methods: {
    showMessageSnakeBar(text) {
      this.$emit("message", text);
    },
    imageUploadDone(text) {
      this.updatedData.image = text;
    },
    UpdateData() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        let data = {
          active: this.updatedData.active,
          visible: this.updatedData.visible,
          name: this.updatedData.name,
          des: this.updatedData.des,
          image: this.updatedData.image,
          id: this.updatedData.id,
          pocemail: this.updatedData.pocEmail,
          lastUpdatedOn: new Date(),
          lastUpdatedBy: {
            name: this.userDetails.name,
            id: this.userDetails.id,
          },
          socialLinks: {
            facebook: this.updatedData.socialLinks.facebook,
            github: this.updatedData.socialLinks.github,
            linkedin: this.updatedData.socialLinks.linkedin,
            twitter: this.updatedData.socialLinks.twitter,
            web: this.updatedData.socialLinks.web,
          },
        };
        PartnersServices.editPartner(this.partnerData.id, data)
          .then((res) => {
            if (res.success == true) {
              this.loading = false;
              this.dialog = false;
              this.$emit("editedSuccess", res.msg);
            }
          })
          .catch((e) => {
            console.log(e.msg);
            this.loading = false;
          });
      }
    },
  },
};
</script>