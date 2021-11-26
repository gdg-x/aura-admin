<template>
  <v-main class="grey lighten-5">
    <v-container fluid class="ma-0 pa-0" style="height: 100% !important">
      <v-slide-y-reverse-transition>
        <router-view v-show="show" />
      </v-slide-y-reverse-transition>
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