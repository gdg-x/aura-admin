<template>
  <v-snackbar :timeout="timeout" v-model="isShow">
    {{ message }}
    <v-btn :color="color" text @click="isShow = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "CustomSnakebar",
  props: ["message", "isShow", "color", "timeout"]
};
</script>

<style>
</style>