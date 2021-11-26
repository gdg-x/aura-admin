<template>
  <div class="text-center">
    <v-dialog v-model="emailDialog" persistent scrollable width="500">
      <template v-slot:activator="{ on }">
        <v-btn depressed color="#5AB55E" dark v-on="on">Send Mail</v-btn>
      </template>
      <v-card v-if="emailDialog" class>
        <v-card-title
          class="google-font"
          style="border-bottom:1px solid #e0e0e0;"
          primary-title
          dark
        >Add User</v-card-title>
        <v-card-text class="px-5">
          <v-container fluid>
              <v-row class="pa-0">
                <v-col cols="12" class="pa-1 ma-0">
                {{data}}
                </v-col>
              </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="grey lighten-4">
          <div class="flex-grow-1"></div>
          <v-btn color="#5AB55E" text @click="emailDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import TeamServices from '@/services/TeamServices'
export default {
  name:"SuccessDialog",
  components: {},
  props:['data'],
  data: () => ({
    emailDialog: false,
    loading: false,
  }),
  mounted() {
    
  },
  methods: {
  }
};
</script>
