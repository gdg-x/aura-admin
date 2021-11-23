<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent scrollable width="400">
      <template v-slot:activator="{ on }">
        <v-btn color="indigo" depressed text dark v-on="on"
          >Reset Password</v-btn
        >
      </template>
      <v-card v-if="dialog">
        <v-card-title
          class="google-font"
          style="border-bottom: 1px solid #e0e0e0"
          primary-title
          dark
          >Reset Password</v-card-title
        >
        <v-card-text>
          <v-container fluid>
            <v-row class="pa-0">
              <v-col md="12" cols="12">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    class="ma-0 pa-0"
                    label="Email"
                    v-model="email"
                    :rules="emailRules"
                    outlined
                  ></v-text-field>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="indigo" text @click="dialog = false">Close</v-btn>
          <v-btn
            class="white--text"
            depressed
            color="indigo"
            :disabled="!valid"
            :loading="loading"
            @click="resetUserPassword"
            >Reset Password</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService"
export default {
  name: "ResetPassword",
  data() {
    return {
      valid: true,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      dialog: false,
      loading: false,
      email: ""
    };
  },
  methods: {
    showMessageSnakeBar(text) {
      this.$emit("message", text);
    },
    async resetUserPassword() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        try{
            const result = await AuthService.resetPassword(this.email);
            this.dialog = false;
            this.showMessageSnakeBar("Reset Password Email has been sent");
        }catch(e){
            console.log(e);
            this.showMessageSnakeBar(e.message.message);
        }finally{
            this.loading = false;
        }
      }
    },
  },
};
</script>