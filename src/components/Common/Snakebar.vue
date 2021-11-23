<template>
  <v-snackbar :timeout="timeout" right bottom v-model="showS">
    {{ message }}
    <v-btn :color="color" text @click="showS = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: "CustomSnakebar",
  props: ["message", "isShow", "color", "timeout"],
  computed: {
    showS: {
      get: function () {
        return this.isShow;
      },
      set: function (value) {
        this.$emit("update:isShow", value);
      },
    },
  },
};
</script>

<style>
</style>