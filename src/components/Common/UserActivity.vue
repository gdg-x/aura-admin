  <template>
  <v-dialog v-model="dialog" width="500" scrollable>
    <template v-slot:activator="{}">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            outlined
            icon
            color="primary"
            x-small
            v-on="on"
            class="mx-1"
            @click.stop="dialog = true"
          >
            <v-icon>mdi-progress-clock</v-icon>
          </v-btn>
        </template>
        <span>View Activity Log</span>
      </v-tooltip>
    </template>

    <v-card v-if="dialog">
      <v-card-title class="headline google-font"
        ><span class="google-font"
          >{{ dialogData.name.split(" ")[0] }}'s Activity Log</span
        ></v-card-title
      >
      <v-card-text>
        <v-row align="center">
          <v-col cols="12" md="12">
            <p class="google-font py-0 my-1">
              <span style="font-weight: 500" class="black--text"
                >Created By:
              </span>
              <a
                v-if="dialogData.createdBy"
                target="_blank"
                style="text-decoration: none"
                :href="'/team/' + dialogData.createdBy.id"
                >{{ dialogData.createdBy.name }}</a
              >
              <span v-else>{{ "Data Not Found" }}</span>
            </p>
            <p class="google-font py-0 my-1">
              <span style="font-weight: 500" class="black--text"
                >Created on:
              </span>
              <span v-if="dialogData.createdOn">{{
                getDate(dialogData.createdOn)
              }}</span>
              <span v-else>Data Not Found</span>
            </p>
            <p class="google-font py-0 my-1">
              <span style="font-weight: 500" class="black--text"
                >Last Updated By:
              </span>
              <a
                v-if="dialogData.lastUpdatedBy"
                target="_blank"
                style="text-decoration: none"
                :href="'/team/' + dialogData.lastUpdatedBy.id"
                >{{ dialogData.lastUpdatedBy.name }}</a
              >
              <span v-else>Data Not Found</span>
            </p>
            <p class="google-font py-0 my-1">
              <span style="font-weight: 500" class="black--text"
                >Last Sent on:
              </span>
              <span v-if="dialogData.lastUpdatedOn">{{
                getDate(dialogData.lastUpdatedOn)
              }}</span>
              <span v-else>Data Not Found</span>
            </p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "UserActivity",
  props: ["dialogData"],
  data: () => ({
    dialog: false,
  }),
  methods: {
    getDate(date) {
      if (date.toString().length > 0) {
        return date.toDate().toString().split("(")[0];
      } else {
        return date;
      }
    },
  },
};
</script>

<style>
</style>
