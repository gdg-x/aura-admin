<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent scrollable width="1000">
      <template v-slot:activator="{ on }">
        <!-- For Large screen (Laptops and up) -->
        <v-btn color="primary hidden-sm-and-down" depressed dark v-on="on"
          >Add New Team Member</v-btn
        >
        <!-- For small Screen (Tablet and smaller) -->
        <v-btn
          fab
          x-small
          color="primary"
          outlined
          class="hidden-md-and-up"
          dark
          v-on="on"
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card v-if="dialog" style="border-radius: 12px;background-color: #F5F8FC;">
        <v-card-title
          class="google-font white"
          primary-title
          dark
          >Add New Team Member
          <!-- <div class="flex-grow-1"></div> asd -->
        </v-card-title>
        <v-card-text class="px-1">
          <v-container fluid>
            <v-row class="pa-0">
              <v-col md="12" cols="12">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-row class="pa-3 py-0">
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p class="google-font mb-0" style="color: red">
                        *indicates required field
                      </p>
                      <p style="color: red">
                        ID should be unique, Once you assigned an ID to event,
                        it can't be changed
                      </p>
                    </v-col>
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p style="font-size: 120%" class="my-0 mb-2">
                        Team Member Status
                      </p>
                    </v-col>

                    <v-col md="3" xs="3" cols="12" class="pa-1 ma-0">
                      <v-select
                        :items="items"
                        v-model="active"
                        label="Active Status*"
                        background-color="white"
                        outlined
                      ></v-select>
                    </v-col>

                    <v-col md="3" xs="3" cols="12" class="pa-1 ma-0">
                      <v-select
                        :items="items"
                        v-model="visible"
                        label="Visiblity Status*"
                        background-color="white"
                        outlined
                      ></v-select>
                    </v-col>

                    <v-col md="3" xs="3" cols="12" class="pa-1 ma-0">
                      <v-text-field
                        v-model="id"
                        class="ma-0"
                        :rules="idRules"
                        label="ID *"
                        background-color="white"
                        type="text"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col md="3" xs="3" cols="12" class="pa-1 ma-0">
                      <v-select
                        :items="teamRole"
                        v-model="role"
                        :rules="idRules"
                        background-color="white"
                        label="Role *"
                        outlined
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row class="pa-3 py-0">
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p style="font-size: 120%" class="my-0">
                        Team Member Info
                      </p>
                    </v-col>

                    <v-col md="6" xs="6" cols="12" class="pa-1 ma-0">
                      <v-text-field
                        v-model="name"
                        background-color="white"
                        :rules="nameRules"
                        class="ma-0"
                        label="Name *"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col md="6" xs="6" cols="12" class="pa-1 ma-0">
                      <v-text-field
                        v-model="designation"
                        background-color="white"
                        class="ma-0"
                        :rules="nameRules"
                        label="Desigination *"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col md="7" xs="7" cols="6" class="pa-1 py-0 ma-0">
                      <v-text-field
                        v-model="imageURL"
                        class="ma-0"
                        label="Image URL"
                        background-color="white"
                        outlined
                      ></v-text-field>
                    </v-col>
                    <v-col md="4" xs="4" cols="6" class="pa-1 py-0 ma-0">
                      <UploadImage
                        type="team"
                        :userId="id"
                        @message="showMessageSnakeBar"
                        @uploadedImage="imageUploadDone"
                      />
                    </v-col>

                    <v-col md="12" xs="12" cols="12" class="pa-1 ma-0">
                      <v-textarea
                        outlined
                        name="input-7-4"
                        v-model="bio"
                        background-color="white"
                        label="Bio"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row class="pa-3 py-0">
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p style="font-size: 120%" class="my-0">Personal Info</p>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field
                        class="ma-0"
                        v-model="mbnumber"
                        background-color="white"
                        label="Contact Number"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field
                        class="ma-0"
                        v-model="email"
                        :rules="emailRules"
                        background-color="white"
                        label="Email Id *"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row class="pa-3 py-0">
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p style="font-size: 120%" class="my-0">Social Links</p>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field
                        class="ma-0"
                        label="Facebook"
                        background-color="white"
                        outlined
                        v-model="facebook"
                      ></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field
                        class="ma-0"
                        label="Github"
                        v-model="github"
                        background-color="white"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field
                        class="ma-0"
                        v-model="linkedin"
                        label="Linkedin"
                        background-color="white"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field
                        class="ma-0"
                        background-color="white"
                        v-model="medium"
                        label="Medium"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field
                        class="ma-0"
                        v-model="twitter"
                        background-color="white"
                        label="Twitter"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                      <v-text-field
                        class="ma-0"
                        v-model="web"
                        background-color="white"
                        label="Website/Blog"
                        outlined
                      ></v-text-field>
                    </v-col>
                  </v-row>
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
            dark
            depressed
            :disabled="!valid"
            :loading="loading"
            @click="SaveEvent"
            >Add New Team Member</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TeamServices from "@/services/TeamServices";
export default {
  name: "AddTeamMember",
  components: {
    UploadImage: () => import("@/components/Common/ImageUpload"),
  },
  data() {
    return {
      valid: true,
      idRules: [
        (v) => !!v || "Field Value is required",
        (v) => (v && v.length <= 30) || "Name must be less than 30 characters",
      ],
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 50) || "Name must be less than 50 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      teamRole: ["Core Team", "Organizing Team", "Volunteer"],
      dialog: false,
      loading: false,
      items: [true, false],
      active: Boolean,
      visible: Boolean,
      id: "",
      mbnumber: "",
      name: "",
      facebook: "",
      github: "",
      linkedin: "",
      email: "",
      medium: "",
      twitter: "",
      password: "",
      web: "",
      bio: "",
      imageURL: "",
      designation: "",
      role: null,
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
      this.imageURL = text;
    },
    SaveEvent() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        var Data = {
          active: this.active,
          visible: this.visible,
          name: this.name,
          designation: this.designation,
          mbnumber: this.mbnumber,
          email: this.email,
          image: this.imageURL,
          password: this.password,
          bio: this.bio,
          id: this.id,
          role: this.role,
          createdBy: {
            name: this.userDetails.name,
            id: this.userDetails.id,
          },
          createdOn: new Date(),
          lastUpdatedOn: "",
          lastUpdatedBy: {
            name: "",
            id: "",
          },
          socialLinks: {
            facebook: this.facebook,
            github: this.github,
            linkedin: this.linkedin,
            medium: this.medium,
            twitter: this.twitter,
            web: this.web,
          },
        };
        TeamServices.addTeamMember(Data.id, Data)
          .then((res) => {
            if (res.success == true) {
              this.loading = false;
              this.dialog = false;
              this.$emit("showSuccess", res.msg);
            }
          })
          .catch((e) => {
            this.loading = false;
            console.log(e);
            this.$emit("message", e.msg);
          });
      }
    },
  },
};
</script>