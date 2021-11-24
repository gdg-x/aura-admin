<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent scrollable width="400">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" depressed text dark v-on="on"
          >Reset Password</v-btn
        >
      </template>
      <v-card v-if="dialog" style="border-radius:12px">
        <v-card-title
          class="google-font text-center"
          primary-title
          dark
          >Reset Password</v-card-title
        >
        <v-card-text>
          <v-container fluid class="my-0 py-0">
            <v-row class="pa-0 mb-0 pb-0">
              <v-col md="12" cols="12" class="mb-0 pb-0 px-0">
                <p>Provide your account email for which you want to reset your password.</p>
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

        <!-- <v-divider></v-divider> -->

        <v-card-actions class="px-6 pb-6 mt-n5">
          <v-spacer></v-spacer>
          <v-btn color="primary" outlined @click="dialog = false">Close</v-btn>
          <v-btn
            class="white--text"
            depressed
            color="primary"
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