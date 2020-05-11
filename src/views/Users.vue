<template>
  <v-container class="" style="max-width:1600px">
    <Snakebar
      :message="snakeBarMessage"
      :isShow.sync="isSnakeBarVisible"
      :color="snakeBarColor"
      :timeout="snakeBarTimeOut"
    />
    <v-row class="">
      <v-col>
        <v-toolbar
          class="elevation-0"
          style="border:1px solid #e0e0e0;border-radius:5px;"
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
            color="indigo"
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
        </v-toolbar>
      </v-col>
    </v-row>

    <v-row class="px-2">
      <v-col cols="12 ">
        <v-container fluid class="pa-0">
          <div>
            <!-- Check the Condition Where we have a Data or not -->
            <div>
              <!-- Table View -->
              <div class="pa-0 ma-0">
                <v-row>
                  <v-col class="pa-1">
                    <v-data-iterator
                      class="hidden-md-and-up"
                      :items="usersData"
                      :loading="isLoading"
                      loading-text="Loading Users Data"
                      :search="search"
                      disable-pagination
                      hide-default-footer
                    >
                      <template v-slot:default="props">
                        <v-row class="mx-0 px-0">
                          <v-col
                            col="12"
                            cols="12"
                            md="2"
                            lg="2"
                            sm="6"
                            v-for="item in props.items"
                            :key="item.id"
                            class="px-0 pb-1"
                          >
                            <v-card class="mx-auto" outlined>
                              <v-list-item three-line>
                                <v-list-item-content>
                                  <div class="overline mb-4">
                                    <v-chip
                                      x-small
                                      label
                                      dark
                                      v-if="item.disabled"
                                      class="red"
                                      >Disabled</v-chip
                                    >
                                    <v-chip label x-small dark v-else class="green"
                                      >Enabled</v-chip
                                    >
                                  </div>
                                  <v-list-item-title
                                    class="headline mb-1 google-font"
                                    >{{ item.name }}</v-list-item-title
                                  >
                                  <v-list-item-subtitle class="google-font">
                                    {{ item.email }}
                                  </v-list-item-subtitle>
                                  <v-list-item-subtitle class="google-font">
                                    {{ item.userType }}
                                  </v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-avatar tile size="80" color="grey">
                                  <img
                                    :src="
                                      item.image.length > 0
                                        ? item.image
                                        : require('@/assets/img/default_avatar.jpg')
                                    "
                                    alt
                                  />
                                </v-list-item-avatar>
                              </v-list-item>

                              <v-card-actions>
                                <!-- View Button -->
                                <v-tooltip bottom>
                                  <template v-slot:activator="{ on }">
                                    <v-btn
                                      fab
                                      x-small
                                      icon
                                      outlined
                                      color="indigo"
                                      class="mr-1"
                                      v-on="on"
                                      @click="gotoTeamDetails(item.id)"
                                    >
                                      <v-icon>mdi-eye</v-icon>
                                    </v-btn>
                                  </template>
                                  <span>{{ item.name }} Details</span>
                                </v-tooltip>
                                <!-- View Button -->

                                <!-- Disable Button -->
                                <v-tooltip bottom>
                                  <template v-slot:activator="{ on }">
                                    <v-btn
                                      fab
                                      x-small
                                      icon
                                      v-if="!item.disabled"
                                      outlined
                                      color="indigo"
                                      v-on="on"
                                      @click="disableUser(item.uid)"
                                    >
                                      <v-icon>mdi-account-remove</v-icon>
                                    </v-btn>
                                  </template>
                                  <span>Disable {{ item.name }}</span>
                                </v-tooltip>
                                <!-- Disable Button -->

                                <!-- Enable Button -->
                                <v-tooltip bottom>
                                  <template v-slot:activator="{ on }">
                                    <v-btn
                                      fab
                                      x-small
                                      v-if="item.disabled"
                                      color="indigo"
                                      outlined
                                      v-on="on"
                                      @click="enableUser(item.uid)"
                                    >
                                      <v-icon>mdi-account-check</v-icon>
                                    </v-btn>
                                  </template>
                                  <span>Enable {{ item.name }}</span>
                                </v-tooltip>
                                <!-- Enable Button -->

                                <!-- Edit Button -->
                                <EditUser
                                  @EditSuccess="showSnakeBar"
                                  :data="item"
                                />
                                <!-- Edit Button -->

                                <!-- Delete Button -->
                                <DeleteUser
                                  @RemovedSuccess="showSnakeBar"
                                  :data="item"
                                />
                                <!-- Delete Button -->
                              </v-card-actions>
                            </v-card>
                          </v-col>
                        </v-row>
                      </template>
                    </v-data-iterator>

                    <v-data-table
                      :mobile-breakpoint="0"
                      style="border:1px solid #e0e0e0;border-radius:5px;background:white;"
                      :search="search"
                      :loading="isLoading"
                      :headers="headers"
                      :items="usersData"
                      :items-per-page="5"
                      class="elevation-0 ma-0 pa-0 hidden-sm-and-down"
                    >
                      <template v-slot:item.name="{ item }">
                        <v-list-item>
                          <v-list-item-avatar>
                            <v-img
                              :src="
                                item.image.length > 0
                                  ? item.image
                                  : require('@/assets/img/default_avatar.jpg')
                              "
                            ></v-img>
                          </v-list-item-avatar>

                          <v-list-item-content>
                            <v-list-item-title
                              class="google-font"
                              v-html="item.name"
                            ></v-list-item-title>
                            <v-list-item-subtitle
                              class="google-font"
                              v-html="item.email"
                            ></v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                      <template v-slot:item.disabled="{ item }">
                        <v-chip small dark v-if="item.disabled" class="red"
                          >Disabled</v-chip
                        >
                        <v-chip small dark v-else class="green">Enabled</v-chip>
                      </template>
                      <template v-slot:item.actions="{ item }">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              fab
                              x-small
                              icon
                              outlined
                              color="indigo"
                              class="mr-1"
                              v-on="on"
                              @click="gotoTeamDetails(item.id)"
                            >
                              <v-icon>mdi-eye</v-icon>
                            </v-btn>
                          </template>
                          <span>{{ item.name }} Details</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              fab
                              x-small
                              icon
                              v-if="!item.disabled"
                              outlined
                              color="indigo"
                              v-on="on"
                              @click="disableUser(item.uid)"
                            >
                              <v-icon>mdi-account-remove</v-icon>
                            </v-btn>
                          </template>
                          <span>Disable {{ item.name }}</span>
                        </v-tooltip>

                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-btn
                              fab
                              x-small
                              v-if="item.disabled"
                              color="indigo"
                              outlined
                              v-on="on"
                              @click="enableUser(item.uid)"
                            >
                              <v-icon>mdi-account-check</v-icon>
                            </v-btn>
                          </template>
                          <span>Enable {{ item.name }}</span>
                        </v-tooltip>
                        <EditUser @EditSuccess="showSnakeBar" :data="item" />
                        <DeleteUser
                          @RemovedSuccess="showSnakeBar"
                          :data="item"
                        />
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
              </div>
              <!-- Table View -->
            </div>
          </div>
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
    Snakebar: () => import("@/components/Common/Snakebar"),
    AddUser: () => import("@/components/Users/addUser"),
    DeleteUser: () => import("@/components/Users/DeleteUser"),
    EditUser: () => import("@/components/Users/editUser"),
  },
  data: () => ({
    dataView: 0,
    isSearch: false,
    search: "",
    snakeBarMessage: "",
    isSnakeBarVisible: false,
    snakeBarColor: "green",
    snakeBarTimeOut: 5000,
    isLoading: false,
    showDialog: false,
    usersData: [],
    headers: [
      { text: "User Name", value: "name", width: "20%" },
      // { text: 'Email', value: 'email' },
      { text: "Role", value: "role" },
      { text: "User Type", value: "userType" },
      { text: "User Status", value: "disabled" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
  computed: { ...mapState(["role"]) },
  beforeMount() {
    if (!this.$route.meta.access[this.role]) {
      alert("Not Auth");
      this.$router.replace("/home");
    }
  },
  mounted() {
    if (this.$route.query.msg) {
      this.showSnakeBar("User Removed Sucessfully");
    } else this.showData();
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
    showData() {
      this.usersData = [];
      this.isLoading = true;
      UsersServices.getAllUsers()
        .then((res) => {
          this.usersData = res.data;
          this.isLoading = false;
        })
        .catch((e) => {
          this.isLoading = false;
          console.log("Error getting documents", e);
        });
    },
    gotoTeamDetails(id) {
      this.$router.push("/team/" + id);
    },
    disableUser(uid) {
      this.showDialog = true;
      UsersServices.disableUser(uid)
        .then((res) => {
          // console.log(res)
          this.showDialog = false;
          this.showSnakeBar(res.msg);
        })
        .catch((e) => {
          this.showDialog = false;
          console.log(e);
        });
    },
    enableUser(uid) {
      this.showDialog = true;
      UsersServices.enableUser(uid)
        .then((res) => {
          // console.log(res)
          this.showDialog = false;
          this.showSnakeBar(res.msg);
        })
        .catch((e) => {
          this.showDialog = false;
          console.log(e);
        });
    },
  },
};
</script>
