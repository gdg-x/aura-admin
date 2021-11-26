<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent scrollable width="500">
      <template v-slot:activator="{ on }">
        <v-btn fab x-small color="primary" outlined dark v-on="on">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card v-if="dialog" class>
        <v-card-title class="google-font" primary-title dark>
          Add New Guideline
        </v-card-title>
        <v-card-text class="px-5">
          <v-container fluid>
            <v-row class="pa-0">
              <v-col cols="12" class="pa-1 ma-0">
                <v-text-field
                  v-model="name"
                  class="ma-0"
                  label="Name"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="pa-1 ma-0">
                <v-textarea
                  outlined
                  v-model="des"
                  label="Description"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="grey lighten-4">
          <div class="flex-grow-1"></div>
          <v-btn color="primary" text @click="dialog = false">Close</v-btn>
          <v-btn
            color="primary"
            dark
            depressed
            @click="addGuid"
            :loading="loading"
            >Add</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name:"AddGuidelinesConfig",
  props: ["data"],
  data: () => ({
    dialog: false,
    loading: false,
    name: "",
    des: "",
  }),
  methods: {
    addGuid() {
      this.data.push({
        name: this.name,
        des: this.des,
      });
      this.name = "";
      this.des = "";
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>