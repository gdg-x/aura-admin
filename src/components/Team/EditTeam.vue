<template>
  <v-dialog v-model="dialog" persistent scrollable width="1200">
    <template v-slot:activator="{  }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            x-small
            icon
            color="indigo"
            class="mx-1"
            outlined
            v-on="on"
            @click.stop="dialog = true"
            dark
          >
            <v-icon>mdi-lead-pencil</v-icon>
          </v-btn>
        </template>
        <span>Edit {{teamData.name}} Details</span>
      </v-tooltip>
    </template>

    <v-card v-if="dialog">
      <v-card-title
        class="google-font"
        style="border-bottom:1px solid #e0e0e0;"
        primary-title
      >Edit {{teamData.name}} Details</v-card-title>

      <v-card-text class>
        <v-container fluid class="pa-0">
          <v-row class="pa-0">
            <v-col md="12" cols="12">
              <v-form ref="form" v-model="valid" lazy-validation>
                <!-- Row 1 -->
                <v-row class="pa-3">
                  <v-col md="12" cols="12" class="pa-1 ma-0">
                    <p class="google-font mb-0" style="color:red">*indicates required field</p>
                  </v-col>
                  <v-col
                    md="12"
                    cols="12"
                    class="pa-1 ma-0"
                    v-if="(role==='Super Admin' || role==='Admin')"
                  >
                    <p style="font-size:120%" class="my-0">Team Member Status</p>
                  </v-col>

                  <v-col md="3" xs="3" cols="12" class="pa-1 ma-0" v-if="(role==='Super Admin')">
                    <v-select
                      :items="items"
                      v-model="updatedData.active"
                      label="Active Status"
                      outlined
                    ></v-select>
                  </v-col>

                  <v-col md="3" xs="3" cols="12" class="pa-1 ma-0" v-if="(role==='Super Admin')">
                    <v-select
                      :items="items"
                      v-model="updatedData.visible"
                      label="Visiblity Status"
                      outlined
                    ></v-select>
                  </v-col>

                  <v-col
                    md="3"
                    xs="3"
                    cols="12"
                    class="pa-1 ma-0"
                    v-if="(role==='Super Admin' || role==='Admin')"
                  >
                    <v-text-field
                      v-model="updatedData.id"
                      class="ma-0"
                      disabled
                      label="ID"
                      type="text"
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col md="3" xs="3" cols="12" class="pa-1 ma-0" v-if="(role==='Super Admin')">
                    <v-select :items="teamRole" v-model="updatedData.role" label="Role" outlined></v-select>
                  </v-col>
                </v-row>
                <!-- Row 1 -->

                <!-- Row 2 -->
                <v-row class="pa-3">
                  <v-col md="12" cols="12" class="pa-1 ma-0">
                    <p style="font-size:120%" class="my-0">Team Member Info</p>
                  </v-col>

                  <v-col md="6" xs="6" cols="12" class="pa-1 ma-0">
                    <v-text-field
                      v-model="updatedData.name"
                      :rules="nameRules"
                      class="ma-0"
                      label="Name *"
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col md="6" xs="6" cols="12" class="pa-1 ma-0">
                    <v-text-field
                      v-model="updatedData.designation"
                      class="ma-0"
                      :rules="nameRules"
                      label="Desigination *"
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col md="7" xs="7" cols="6" class="pa-1 py-0 ma-0">
                      <v-text-field v-model="updatedData.image" class="ma-0" label="Image URL" outlined></v-text-field>
                    </v-col>
                    <v-col md="4" xs="4" cols="6" class="pa-1 py-0 ma-0">
                      <UploadImage type="team" :userId="updatedData.id" @message="showMessageSnakeBar" @uploadedImage="imageUploadDone"/>
                    </v-col>

                  <v-col md="12" xs="12" cols="12" class="pa-1 ma-0">
                    <v-textarea outlined name="input-7-4" v-model="updatedData.bio" label="Bio"></v-textarea>
                  </v-col>
                </v-row>
                <!-- Row 2 -->

                <!-- Row 3 -->
                <v-row class="pa-3">
                  <v-col md="12" cols="12" class="pa-1 ma-0">
                    <p style="font-size:120%" class="my-0">Personal Info</p>
                  </v-col>

                  <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                    <v-text-field
                      class="ma-0"
                      v-model="updatedData.mbnumber"
                      label="Contact Number"
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col v-if="(role==='Super Admin')" md="8" xs="8" cols="12" class="pa-1 ma-0">
                    <v-text-field
                      class="ma-0"
                      v-model="updatedData.email"
                      :rules="emailRules"
                      label="Email Id *"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- Row 3 -->

                <!-- Row 4 -->
                <v-row class="pa-3">
                  <v-col md="12" cols="12" class="pa-1 ma-0">
                    <p style="font-size:120%" class="my-0">Social Links</p>
                  </v-col>

                  <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                    <v-text-field
                      class="ma-0"
                      label="Facebook"
                      outlined
                      v-model="updatedData.socialLinks.facebook"
                    ></v-text-field>
                  </v-col>

                  <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                    <v-text-field
                      class="ma-0"
                      label="Github"
                      v-model="updatedData.socialLinks.github"
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                    <v-text-field
                      class="ma-0"
                      v-model="updatedData.socialLinks.linkedin"
                      label="Linkedin"
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                    <v-text-field
                      class="ma-0"
                      v-model="updatedData.socialLinks.medium"
                      label="Medium"
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                    <v-text-field
                      class="ma-0"
                      v-model="updatedData.socialLinks.twitter"
                      label="Twitter"
                      outlined
                    ></v-text-field>
                  </v-col>

                  <v-col md="4" xs="4" cols="12" class="pa-1 ma-0">
                    <v-text-field
                      class="ma-0"
                      v-model="updatedData.socialLinks.web"
                      label="Website/Blog"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <!-- Row 4 -->
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
          depressed
          dark
          :disabled="!valid"
          :loading="loading"
          @click="UpdateData"
        >Update {{teamData.name.split(" ")[0]}} Details</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import TeamServices from "@/services/TeamServices";
import { mapState } from "vuex";
export default {
  props: {
    teamData: {}
  },
  components:{
    UploadImage: () => import("@/components/Common/ImageUpload"),
  },
  data() {
    return {
      valid: true,
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 50) || "Name must be less than 50 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      teamRole: ["Core Team", "Organizing Team", "Volunteer"],
      dialog: false,
      loading: false,
      items: [true, false],
      updatedData: {
        active: this.teamData.active,
        visible: this.teamData.visible,
        name: this.teamData.name,
        designation: this.teamData.designation,
        mbnumber: this.teamData.mbnumber,
        email: this.teamData.email,
        image: this.teamData.image,
        bio: this.teamData.bio,
        id: this.teamData.id,
        role: this.teamData.role,
        socialLinks: {
          facebook: this.teamData.socialLinks.facebook,
          github: this.teamData.socialLinks.github,
          linkedin: this.teamData.socialLinks.linkedin,
          medium: this.teamData.socialLinks.medium,
          twitter: this.teamData.socialLinks.twitter,
          web: this.teamData.socialLinks.web
        }
      }
    };
  },
  computed: { ...mapState(["role", "userDetails"]) },
  methods: {
    showMessageSnakeBar(text){
      this.$emit("message", text);
    },
    imageUploadDone(text){
      this.updatedData.image = text;
    },
    UpdateData() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        let data = {
          active: this.updatedData.active,
          visible: this.updatedData.visible,
          name: this.updatedData.name,
          designation: this.updatedData.designation,
          mbnumber: this.updatedData.mbnumber,
          email: this.updatedData.email,
          image: this.updatedData.image,
          bio: this.updatedData.bio,
          id: this.updatedData.id,
          role: this.updatedData.role,
          lastUpdatedOn: new Date(),
          lastUpdatedBy: {
            name: this.userDetails.name,
            id: this.userDetails.id
          },
          socialLinks: {
            facebook: this.updatedData.socialLinks.facebook,
            github: this.updatedData.socialLinks.github,
            linkedin: this.updatedData.socialLinks.linkedin,
            medium: this.updatedData.socialLinks.medium,
            twitter: this.updatedData.socialLinks.twitter,
            web: this.updatedData.socialLinks.web
          }
        };
        TeamServices.editTeamMember(this.teamData.id, data)
          .then(res => {
            if (res.success == true) {
              this.loading = false;
              this.dialog = false;
              this.$emit("editedSuccess", res.msg);
            }
          })
          .catch(e => {
            console.log(e.msg);
            this.loading = false;
          });
      }
    }
  }
};
</script>