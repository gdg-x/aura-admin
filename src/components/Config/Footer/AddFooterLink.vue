<template>
  <div class="text-center">
    <v-dialog v-model="dialog" persistent scrollable width="500">
      <template v-slot:activator="{ on }">
        <v-btn fab x-small color="primary" outlined dark v-on="on">
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card v-if="dialog" class>
        <v-card-title class="google-font" primary-title dark>
          Add New Footer Link
        </v-card-title>
        <v-card-text class="px-5">
          <v-container fluid>
            <v-row class="pa-0">
              <v-col cols="12" class="pa-1 ma-0" ref="form">
                <!-- {{data}} -->
                <v-select
                  :items="items"
                  outlined
                  label="Link Type"
                  v-model="SelectedLinkType"
                ></v-select>

                <v-text-field
                  label="Link Name"
                  :rules="[() => !!linkname || 'This field is required']"
                  v-model="linkname"
                  outlined
                ></v-text-field>
                <v-text-field
                  label="Link"
                  v-model="link"
                  :rules="[() => !!link || 'This field is required']"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="grey lighten-4">
          <div class="flex-grow-1"></div>
          <v-btn color="primary" text @click="dialog = false">Close</v-btn>
          <v-btn
            color="primary"
            dark
            depressed
            @click="addData"
            :loading="loading"
            >Add</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name:"AddFooterConfig",
  props: ["item"],
  components: {},
  data: () => ({
    dialog: false,
    loading: false,
    isAdding: false,
    SelectedLinkType: "",
    link: "",
    linkname: "",
    items: [
      "About",
      "Resources",
      "Developer Console",
      "Footer End Session Link",
    ],
    updatedData:null
  }),
  watch: {
    dialog: {
      handler() {
        if (this.dialog) {
          // if edit
          if (this.item && Object.keys(this.item).length) {
            this.updatedData = this.item;
          }
        }
      },
    },
  },
  mounted() {
    // this.ShowPartners()
  },
  methods: {
    addData() {
      this.loading = true;
      var datalink = {
        link: this.link,
        linkname: this.linkname,
        linktype: this.SelectedLinkType,
      };

      if (this.SelectedLinkType == "About") {
        this.updatedData["About"].push(datalink);
      } else if (this.SelectedLinkType == "Resources") {
        this.updatedData["Resources"].push(datalink);
      } else if (this.SelectedLinkType == "Developer Console") {
        this.updatedData["Developer Console"].push(datalink);
      } else if (this.SelectedLinkType == "Footer End Session Link") {
        this.updatedData["Footer End Session Link"].push(datalink);
      }
      this.$emit('add', this.updatedData)
      this.loading = false;
      this.dialog = false;
    },
  },
};
</script>