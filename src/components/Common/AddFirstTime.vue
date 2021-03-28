<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent scrollable width="1100">
      <v-card v-if="dialog" class style="border-radius:7px">
        <v-card-title
          class="google-font"
          primary-title
          style="border-bottom:1px solid #e0e0e0;"
          dark
        >
          Add First Time
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
                      <p
                        style="color:red"
                      >ID should be unique, Once you assigned an ID to event, it can't be changed</p>
                    </v-col>
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p style="font-size:120%" class="my-0 mb-2">Team Member Status</p>
                    </v-col>

                    <v-col md="3" xs="3" cols="12" class="pa-1 ma-0">
                      <v-text-field
                        v-model="id"
                        class="ma-0"
                        :rules="idRules"
                        label="ID *"
                        type="text"
                        outlined
                      ></v-text-field>
                    </v-col>

                    <v-col md="3" xs="3" cols="12" class="pa-1 ma-0">
                      <v-select
                        :items="teamRole"
                        v-model="role"
                        :rules="idRules"
                        label="Role *"
                        outlined
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row class="pa-3 py-0">
                    <v-col md="12" cols="12" class="pa-1 ma-0">
                      <p style="font-size:120%" class="my-0">Team Member Info</p>
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
                        v-model="designation"
                        class="ma-0"
                        :rules="nameRules"
                        label="Desigination *"
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
          >Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "@/config/firebase";
import TeamServices from "@/services/TeamServices";
export default {
  props: ["dialog"],
  data() {
    return {
      valid: true,
      idRules: [
        v => !!v || "Field Value is required",
        v => (v && v.length <= 30) || "Name must be less than 30 characters"
      ],
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length <= 50) || "Name must be less than 50 characters"
      ],
      teamRole: ["Organizing Team", "Core Team", "Volunteer"],
      loading: false,
      active: Boolean,
      visible: Boolean,
      id: "",
      name: "",
      designation: "",
      role: null
    };
  },
  methods: {
    SaveEvent() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        var Data = {
          active: false,
          visible: false,
          name: this.name,
          designation: this.designation,
          mbnumber: "",
          email: firebase.auth.currentUser.email,
          image: "",
          password: "",
          bio: "",
          id: this.id,
          role: this.role,
          socialLinks: {
            facebook: "",
            github: "",
            linkedin: "",
            medium: "",
            twitter: "",
            web: ""
          }
        };
        TeamServices.addFirstTime(Data)
          .then(res => {
            if (res.success == true) {
              this.loading = false;
              alert(
                "Added Success\n we are signin you out, please login in again."
              );
              firebase.auth.signOut().then(() => {
                this.$router.replace("/login");
              });
            }
          })
          .catch(e => {
            this.loading = false;
            console.log(e);
            alert("Something went wrong\n" + e);
          });
      }
    }
  }
};
</script>