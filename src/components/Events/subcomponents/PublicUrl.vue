<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{}">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            dark
            color="primary"
            class="mx-1"
            outlined
            @click.stop="dialog = true"
          >
            Public Url
          </v-btn>
        </template>
        <span>Public Url of {{ EventInfo.name }}</span>
      </v-tooltip>
    </template>

    <v-card v-if="dialog">
      <v-card-title class="google-font heading"
        >Here is Your Event's Public URL</v-card-title
      >
      <v-card-text class="google-font"
        ><a
          :href="generalConfig.website + '/events/' + EventInfo.id"
          style="text-decoration: none"
          target="_blank"
          >{{ generalConfig.website }}/events/{{ EventInfo.id }}</a
        ></v-card-text
      >
      <v-card-actions>
        <div class="flex-grow-1"></div>

        <v-btn color="green darken-1" text @click="dialog = false">close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
  name:"PublicUriForEvent",
  props: {
    EventInfo: {},
  },
  data: () => ({
    dialog: false,
    loading: false,
  }),
  computed: {
    ...mapState(["generalConfig"]),
  },
  methods: {},
};
</script>
