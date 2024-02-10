<template>
  <v-main style="background-color: #F5F8FC;">
    <v-container fluid class="ma-0 pa-0" style="height: 100% !important">
      <v-row align="center" justify="center">
        <v-col md="11">
          <v-slide-y-reverse-transition>
        <router-view v-show="show" />
      </v-slide-y-reverse-transition>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "MainView",
  data: () => ({
    show: false,
  }),
  created() {
    this.show = true;
  },
};
</script>