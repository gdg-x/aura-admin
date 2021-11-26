<template>
  <v-dialog v-model="dialog" persistent scrollable width="600">
    <template v-slot:activator="{}">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            x-small
            icon
            v-on="on"
            dark
            color="primary"
            class="mx-1"
            outlined
            @click.stop="dialog = true"
          >
            <v-icon>mdi-account-edit</v-icon>
          </v-btn>
        </template>
        <span>Edit {{ data.name }}</span>
      </v-tooltip>
    </template>
    <v-card v-if="dialog" class>
      <v-card-title
        class="google-font"
        style="border-bottom:1px solid #e0e0e0;"
        primary-title
        dark
      >Update {{ data.name.split(" ")[0] }}</v-card-title>
      <v-card-text class="px-5">
        <v-container fluid>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row class="pa-0">
              <v-col cols="12" class="pa-1 ma-0">
                <v-text-field v-model="name" label="Name" disabled outlined></v-text-field>
              </v-col>
              <v-col cols="12" class="pa-1 ma-0">
                <v-select :items="items" v-model="userRole" label="Role" outlined></v-select>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="grey lighten-4">
        <div class="flex-grow-1"></div>
        <v-btn color="primary" text @click="dialog = false">Close</v-btn>
        <v-btn color="primary" dark @click="updateUser" depressed :loading="loading">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import UserService from "@/services/UsersServices";
export default {
  name:"EditUserMgn",
  props: ["data"],
  data: () => ({
    dialog: false,
    loading: false,
    items: ["Super Admin", "Admin", "Viewer"],
    userRole: "",
    name: "",
    valid: false,
  }),
  mounted() {
    this.name = this.data.name;
    this.userRole = this.data.userType;
  },
  methods: {
    updateUser() {
      this.loading = true;
      UserService.updateUser(this.data.uid, this.userRole)
        .then(res => {
          if (res.success) {
            this.loading = false;
            this.dialog = false;
            this.$emit("EditSuccess", res.msg);
          }
        })
        .catch(e => {
          console.log(e);
          this.loading = false
        });
    }
  }
};
</script>