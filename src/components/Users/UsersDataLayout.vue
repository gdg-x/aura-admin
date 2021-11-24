<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col class="pa-1">
        <v-data-iterator
          class="hidden-md-and-up"
          :items="usersData"
          :loading="loading"
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
                      <v-list-item-title class="headline mb-1 google-font">{{
                        item.name
                      }}</v-list-item-title>
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
                          color="primary"
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
                          color="primary"
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
                          color="primary"
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
                    <EditUser @EditSuccess="showSnakeBar" :data="item" />
                    <!-- Edit Button -->

                    <!-- Delete Button -->
                    <DeleteUser @RemovedSuccess="showSnakeBar" :data="item" />
                    <!-- Delete Button -->
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>

        <v-data-table
          :mobile-breakpoint="0"
          style="
                        border: 1px solid #e0e0e0;
                        border-radius: 5px;
                        background: white;
                      "
          :search="search"
          :loading="loading"
          :headers="headers"
          sort-by="disabled"
          :items="usersData"
          :items-per-page="10"
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
                  color="primary"
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
                  color="primary"
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
                  color="primary"
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
            <DeleteUser @RemovedSuccess="showSnakeBar" :data="item" />
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UsersServices from "@/services/UsersServices";
export default {
  name: "UserDataLayout",
  components: {
    DeleteUser: () => import("@/components/Users/DeleteUser"),
    EditUser: () => import("@/components/Users/editUser"),
  },
  props: ["usersData", "search", "showSnakeBar", "loading"],
  data: () => ({
    showDialog: false,
    headers: [
      { text: "User Name", value: "name", width: "20%" },
      // { text: 'Email', value: 'email' },
      { text: "Role", value: "role" },
      { text: "User Type", value: "userType" },
      { text: "User Status", value: "disabled", sortable: true },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
  methods: {
    enableUser(uid) {
      this.showDialog = true;
      UsersServices.enableUser(uid)
        .then((res) => {
          this.showDialog = false;
          this.showSnakeBar("User Enabled");
        })
        .catch((e) => {
          this.showDialog = false;
          console.log(e);
        });
    },
    disableUser(uid) {
      this.showDialog = true;
      UsersServices.disableUser(uid)
        .then((res) => {
          this.showDialog = false;
          this.showSnakeBar("User Disabled");
        })
        .catch((e) => {
          this.showDialog = false;
          console.log(e);
        });
    },
    gotoTeamDetails(id) {
      this.$router.push("/team/" + id);
    },
  },
};
</script>
