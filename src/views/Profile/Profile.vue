<template>
  <v-container class style="max-width: 1600px">
    <Snakebar
      :message="snakeBarMessage"
      :isShow.sync="isSnakeBarVisible"
      :color="snakeBarColor"
      :timeout="snakeBarTimeOut"
    />
    <v-row class>
      <v-col>
        <v-toolbar
          class="elevation-0"
          style="border: 1px solid #e0e0e0; border-radius: 5px"
        >
          <v-toolbar-title class="google-font mr-3"
            >Profile Settings</v-toolbar-title
          >
          <v-spacer></v-spacer>&nbsp;
          <EditTeam
            v-if="!isLoading"
            @editedSuccess="showSnakeBar"
            :teamData="userData"
          />
        </v-toolbar>
      </v-col>
    </v-row>

    <v-row class="px-0">
      <v-col cols="12" md="7">
        <v-container v-if="isLoading" class="fill-height">
          <v-row justify="center" align="center" class>
            <v-col cols="12" md="12" class="text-center">
              <v-progress-circular
                :width="5"
                :size="50"
                color="primary"
                indeterminate
              ></v-progress-circular>
            </v-col>
          </v-row>
        </v-container>
        <v-container
          v-else
          style="
            border: 1px solid #e0e0e0;
            border-radius: 5px;
            background: white;
          "
        >
          <v-row>
            <v-col class>
              <v-list-item>
                <v-list-item-avatar>
                  <v-img
                    :src="
                      userData.image && userData.image.length > 0
                        ? userData.image
                        : require('@/assets/img/default_avatar.jpg')
                    "
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title
                    class="google-font"
                    v-html="userData.name"
                  ></v-list-item-title>
                  <v-list-item-subtitle
                    class="google-font"
                    v-html="userData.email"
                  ></v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
            </v-col>
          </v-row>
          <v-row justify="center" align="center">
            <v-col md="12" class="px-5">
              <p class="google-font my-0">
                <b>Bio</b>
              </p>
              <p class="google-font">{{ userData.bio }}</p>

              <p class="google-font my-0">
                <b>Mobile</b>
              </p>
              <p class="google-font">
                {{
                  userData.mbnumber && userData.mbnumber.length > 0
                    ? userData.mbnumber
                    : "Not Found"
                }}
              </p>

              <p class="google-font mt-5 my-0">
                <b>Role</b>
              </p>
              <v-chip small>{{ userData.role }}</v-chip>

              <p class="google-font mt-5 my-0">
                <b>Designation</b>
              </p>
              <p class="google-font">{{ userData.designation }}</p>

              <p class="google-font mt-5 my-0">
                <b>Social</b>
              </p>
              <p class="mt-1 mb-0 google-font mt-0" style="font-size: 110%">
                <span
                  style="cursor: pointer"
                  v-for="(slink, i) in userData.socialLinks"
                  :key="i"
                  class="mr-1"
                >
                  <v-chip
                    small
                    v-if="slink"
                    :href="slink"
                    target="_blank"
                    style="text-transform: uppercase"
                    >{{ i }}</v-chip
                  >
                </span>
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="12" md="5">
        <v-container
          style="
            border: 1px solid #e0e0e0;
            border-radius: 5px;
            background: white;
          "
        >
          <v-row justify="center" align="center">
            <v-col class="px-5">
              <h1 class="google-font">Password</h1>
              <v-divider></v-divider>
              <v-text-field
                :append-icon="p0 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="p0 ? 'text' : 'password'"
                @click:append="p0 = !p0"
                label="Current Password"
                class="mt-5"
                v-model="currentPassword"
                outlined
              ></v-text-field>
              <v-text-field
                :append-icon="p1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="p1 ? 'text' : 'password'"
                @click:append="p1 = !p1"
                label="New Password"
                v-model="password"
                outlined
              ></v-text-field>

              <v-text-field
                :append-icon="p2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="p2 ? 'text' : 'password'"
                @click:append="p2 = !p2"
                label="Confirm Password"
                v-model="confPassword"
                outlined
              ></v-text-field>
              <v-btn
                color="primary"
                dark
                depressed
                @click="updatePassword"
                :loading="isUpdating"
                >Update Password</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "@/config/firebase";
import UsersServices from "@/services/UsersServices";
export default {
  name: "Profile",
  inject: ["theme"],
  components: {
    Snakebar: () => import("@/components/Common/Snakebar"),
    EditTeam: () => import("@/components/Team/EditTeam"),
  },
  data: () => ({
    snakeBarMessage: "",
    isSnakeBarVisible: false,
    snakeBarColor: "green",
    snakeBarTimeOut: 5000,
    isLoading: true,
    isUpdating: false,
    userData: [],
    confPassword: "",
    password: "",
    currentPassword: "",
    p1: false,
    p2: false,
    p0: false,
  }),
  mounted() {
    this.getCurrentUser();
  },
  methods: {
    getCurrentUser() {
      this.isLoading = true;
      UsersServices.getCurrentUserDetails()
        .then((res) => {
          if (res.success) {
            this.userData = res.data;
          }
          this.isLoading = false;
        })
        .catch((e) => {
          console.log(e);
          this.showOnlySnakeBar(e);
          this.isLoading = false;
        });
    },
    showSnakeBar(text) {
      this.snakeBarMessage = text;
      this.isSnakeBarVisible = true;
      this.getCurrentUser();
    },
    showOnlySnakeBar(text) {
      this.snakeBarMessage = text;
      this.isSnakeBarVisible = true;
    },
    updatePassword() {
      this.isUpdating = true;
      if (this.confPassword === this.password) {
        UsersServices.updateUserPassword(this.currentPassword, this.password)
          .then((res) => {
            this.showOnlySnakeBar(res.msg);
            this.isUpdating = false;
          })
          .catch((e) => {
            console.log(e);
            this.showOnlySnakeBar(e.msg.message);
            this.isUpdating = false;
          });
      } else {
        this.showOnlySnakeBar("Password and Confirm password does not match");
        this.isUpdating = false;
      }
    },
  },
};
</script>
