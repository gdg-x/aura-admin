<template>
  <v-container fluid class="ma-0 pa-0">
    <!-- <Snakebar
      :message="snakeBarMessage"
      :isShow.sync="isSnakeBarVisible"
      :color="snakeBarColor"
      :timeout="snakeBarTimeOut"
    /> -->
    <v-row class="my-0 py-0" style="max-height:85vh">
        <v-col cols="12" class="pa-0 my-0">
            <Desktop />
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "connect",
  components:{
      Desktop:()=>import('@/components/Connect/Desktop')
  },
  data: () => ({
    snakeBarMessage: "",
    isSnakeBarVisible: false,
    snakeBarColor: "green",
    snakeBarTimeOut: 5000,
    showLoader: true
  })
};
</script>

<style>
</style>

