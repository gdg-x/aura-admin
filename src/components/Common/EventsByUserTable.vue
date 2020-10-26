<template>
  <div>
    <v-toolbar class="elevation-0 mb-3 mt-5" style="border:1px solid #e0e0e0;border-radius:5px;">
      <v-toolbar-title class="google-font mr-3">Events: {{ events.length }}</v-toolbar-title>
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

          <v-btn fab x-small color="indigo" @click="openCloseSearch" class="mr-2 hidden-md-and-up" outlined dark>
            <v-icon dark v-if="!isSearch">mdi-account-search</v-icon>
            <v-icon dark v-else>mdi-close</v-icon>
          </v-btn>
          <!-- Mobile -->
      
    </v-toolbar>
    <!-- :search="search" -->
    <v-data-table
      :mobile-breakpoint="0"
      style="border:1px solid #e0e0e0;border-radius:5px;background:white;"
      :loading="isLoading"
      :headers="headers"
      :search="search"
      sort-by="date"
      sort-desc="true"
      :items="events"
      :items-per-page="5"
      class="elevation-0 ma-0 pa-0"
    >
      <template v-slot:item.view="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click="goToEventDetails(item.id)">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
          </template>
          <span>{{ item.name }} Details</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: "EventsByUsersTable",
  props:['events','isLoading'],
  data: () => ({
    isSearch:false,
    search:'',
    headers: [
      { text: "Event", value: "name" },
      { text: "Date", value: "date" },
      { text: "Venue", value: "venue.name" },
      { text: "See More", value: "view", sortable: false },
    ],
  }),
  methods: {
    openCloseSearch(){
      this.isSearch = !this.isSearch
      this.search = "";
    },
    goToEventDetails(id) {
      this.$router.push("/events/" + id);
    },
  },
};
</script>
