<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col class="pa-1">
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
          class="elevation-0 ma-0 pa-0"
        >
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
                  outlined
                  color="primary"
                  class="mr-1"
                  v-on="on"
                  @click="removeUserFromPending(item.id)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>{{ item.name }} Remove</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserService from "@/services/UsersServices";
export default {
  name: "PendingUserData",
  components: {},
  props: ["usersData", "search", "loading", "showSnakeBar"],
  data: () => ({
    headers: [
      { text: "User ID", value: "id", width: "20%" },
      { text: "Email", value: "email" },
      { text: "User Type", value: "userType" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
  methods: {
    gotoTeamDetails(id) {
      this.$router.push("/team/" + id);
    },
    async removeUserFromPending(id) {
      let confirm = window.confirm("you sure want to delete " + id);
      if (confirm) {
        try {
          await UserService.removePendingUser(id);
          this.showSnakeBar("User Deleted");
        } catch (e) {
          alert(e.message);
          console.log(e);
        }
      }
    },
  },
};
</script>
