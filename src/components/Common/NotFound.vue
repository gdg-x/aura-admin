<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-img :src="require('@/assets/img/svg/DataNotFound.svg')" :height="100" contain></v-img>
        <p class="google-font my-0 py-0 mb-2 text-center">{{ text }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    name:"notFoundComponent",
    props:['text']
};
</script>

<style>
</style>