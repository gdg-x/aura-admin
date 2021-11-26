<template>
  <v-container class="" style="max-width: 1600px">
    <Snakebar
      :message="snakeBarMessage"
      :isShow.sync="isSnakeBarVisible"
      :color="snakeBarColor"
      :timeout="snakeBarTimeOut"
    />
    <v-row class="">
      <v-col>
        <v-toolbar
          extended
          class="elevation-0"
          style="border: 1px solid #e0e0e0; border-radius: 5px"
        >
          <v-toolbar-title class="google-font mr-3"
            >User Management
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <!-- Desktop -->
          <v-text-field
            flat
            dense
            v-model="search"
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-search-web"
            label="Search"
            single-line
            class="mr-2 hidden-sm-and-down"
          ></v-text-field>
          <!-- Desktop -->

          <!-- Mobile -->
          <v-slide-x-reverse-transition>
            <v-text-field
              flat
              dense
              v-if="isSearch"
              v-model="search"
              solo-inverted
              hide-details
              prepend-inner-icon="mdi-search-web"
              label="Search"
              single-line
              class="mr-2 hidden-md-and-up"
            ></v-text-field>
          </v-slide-x-reverse-transition>

          <v-btn
            fab
            x-small
            color="primary"
            @click="openCloseSearch"
            class="mr-2 hidden-md-and-up"
            outlined
            dark
          >
            <v-icon dark v-if="!isSearch">mdi-account-search</v-icon>
            <v-icon dark v-else>mdi-close</v-icon>
          </v-btn>
          <!-- Mobile -->
          &nbsp;

          <AddUser
            class="ml-2"
            @showSuccess="showSnakeBar"
            @failed="showFailedSnakeBar"
          />

          <template v-slot:extension>
            <v-tabs v-model="userModel">
              <v-tab href="#onboardedUsers"
                >Onboarded Users
                <span v-if="usersData.length > 0"
                  >({{ usersData.length }})</span
                ></v-tab
              >
              <v-tab href="#pendingUsers"
                >Pending Users
                <span v-if="pendingUsersData.length > 0"
                  >({{ pendingUsersData.length }})</span
                ></v-tab
              >
            </v-tabs>
          </template>
        </v-toolbar>
      </v-col>
    </v-row>

    <v-row class="px-2">
      <v-col cols="12 " class="mx-0 px-0">
        <v-container fluid class="pa-0 ma-0">
          <v-tabs-items
            v-model="userModel"
            class="pa-0 ma-0"
            style="background: #fafafa"
          >
            <!-- For Onboarded User -->
            <v-tab-item value="onboardedUsers" class="pa-0 ma-0">
              <!-- Check the Condition Where we have a Data or not -->
              <!-- Table View -->
              <div class="pa-0 ma-0">
                <UsersDataLayout
                  :loading.sync="onboardedUserLoading"
                  :usersData="usersData"
                  :search.sync="search"
                  :showSnakeBar.sync="showSnakeBar"
                />
              </div>
              <!-- Table View -->
            </v-tab-item>

            <!-- Pending Users -->
            <v-tab-item value="pendingUsers">
              <div class="pa-0 ma-0">
                <PendingUsersDataLayout
                  :loading.sync="pendingUsersLoading"
                  :usersData="pendingUsersData"
                  :search.sync="search"
                  :showSnakeBar.sync="showSnakeBar"
                />
              </div>
            </v-tab-item>
          </v-tabs-items>
        </v-container>
      </v-col>
    </v-row>

    <!-- Dialog -->
    <v-dialog v-model="showDialog" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text class="py-5">
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- Dialog -->
  </v-container>
</template>

<script>
import UsersServices from "@/services/UsersServices";
import { mapState } from "vuex";
export default {
  name: "TeamView",
  inject: ["theme"],
  components: {
    UsersDataLayout: () => import("@/components/Users/UsersDataLayout"),
    PendingUsersDataLayout: () => import("@/components/Users/PendingUsersData"),
    Snakebar: () => import("@/components/Common/Snakebar"),
    AddUser: () => import("@/components/Users/addUser"),
  },
  data: () => ({
    userModel: "onboardedUsers",
    dataView: 0,
    isSearch: false,
    search: "",
    snakeBarMessage: "",
    isSnakeBarVisible: false,
    snakeBarColor: "green",
    snakeBarTimeOut: 5000,
    showDialog: false,
    usersData: [],
    pendingUsersData: [],
    onboardedUserLoading: false,
    pendingUsersLoading: false,
  }),
  computed: { ...mapState(["role"]) },
  beforeMount() {
    if (!this.$route.meta.access[this.role]) {
      alert("Not Auth");
      this.$router.replace("/home");
    }
  },
  mounted() {
    if (this.$route.query.msg) this.showSnakeBar("User Removed Sucessfully");
    else this.showData();
  },
  methods: {
    changeSnakebar(vale) {
      this.isSnakeBarVisible = vale;
    },
    openCloseSearch() {
      this.isSearch = !this.isSearch;
      this.search = "";
    },
    showFailedSnakeBar(text) {
      this.snakeBarMessage = text;
      this.isSnakeBarVisible = true;
    },
    showSnakeBar(text) {
      this.snakeBarMessage = text;
      this.isSnakeBarVisible = true;
      this.showData();
    },
    async showData() {
      this.usersData = [];
      this.onboardedUserLoading = true;
      await UsersServices.getAllUsers()
        .then((res) => {
          this.usersData = res.data;
          this.onboardedUserLoading = false;
        })
        .catch((e) => {
          this.onboardedUserLoading = false;
          console.log("Error getting documents", e);
        });

      // Get All Pending Users Info
      this.pendingUsersLoading = true;
      await UsersServices.getAllPendingUsers().then((res) => {
        if (res.success) {
          this.pendingUsersData = res.data;
          this.pendingUsersLoading = false;
        }
      });
      this.pendingUsersLoading = false;
    },
  },
};
</script>
