<template>
  <div class="">
    <v-card
      class=""
      style="border-radius: 12px; border: 1px solid #fafafa; background: white"
    >
      <v-card-title
        class="google-font"
        primary-title
        style="border-bottom: 1px solid #e0e0e0"
        dark
      >
        Install Aura Admin
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
                      ID should be unique, Once you assigned an ID to event, it
                      can't be changed
                    </p>
                  </v-col>

                  <v-col md="12" cols="12" class="pa-1 ma-0">
                    <p style="font-size: 120%" class="my-0 mb-2">Login Info</p>
                  </v-col>
                  <v-col sm="12" md="4" class="pa-1 ma-0">
                    <v-text-field
                      class="ma-0 pa-0"
                      label="Email"
                      v-model="email"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col sm="12" md="4" class="pa-1 ma-0">
                    <v-text-field
                      class="ma-0 pa-0"
                      label="Password"
                      type="password"
                      v-model="password"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col md="12" cols="12" class="pa-1 ma-0">
                    <p style="font-size: 120%" class="my-0 mb-2">
                      Team Member Status
                    </p>
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
                    <p style="font-size: 120%" class="my-0">Team Member Info</p>
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
        <v-btn
          color="primary"
          dark
          depressed
          :disabled="!valid"
          :loading="loading"
          @click="saveUser"
          >Install</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import firebase from "@/config/firebase";
import TeamServices from "@/services/TeamServices";
export default {
  name:"AddFirstTimeUser",
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
      teamRole: ["Organizing Team", "Core Team", "Volunteer"],
      loading: false,
      active: Boolean,
      visible: Boolean,
      id: "",
      name: "",
      designation: "",
      role: null,
      email: "",
      password: "",
    };
  },
  methods: {
    async createUser() {
      let createUserFirstTime =
        await firebase.auth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
      console.log(createUserFirstTime);
    },

    async saveUser() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try {
          await this.createUser();
          let data = {
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
              web: "",
            },
          };
          let res = await TeamServices.addFirstTime(data);
          if (res.success == true) {
            alert(
              "Added Success\n we are signin you out, please login in again."
            );
            await firebase.auth.signOut();
            window.location.href = "/login";
          }
        } catch (e) {
          console.log(e);
          alert("Something went wrong\n" + e);
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>