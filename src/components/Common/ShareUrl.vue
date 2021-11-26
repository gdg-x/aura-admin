<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{}">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            fab
            x-small
            outlined
            class="mx-1"
            icon
            v-on="on"
            dark
            color="primary"
            @click.stop="dialog = true"
          >
            <v-icon>mdi-link</v-icon>
          </v-btn>
        </template>
        <span>Public Url of {{ name }}</span>
      </v-tooltip>
    </template>

    <v-card v-if="dialog">
      <v-card-title class="google-font heading"
        >Here is Your Public URL</v-card-title
      >
      <v-card-text class="google-font"
        ><a
          :href="generalConfig.website + url"
          style="text-decoration: none"
          target="_blank"
          >{{ generalConfig.website }}{{ url }}</a
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
  name:"ShareUrlComponent",
  props: ["url", "name"],
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
