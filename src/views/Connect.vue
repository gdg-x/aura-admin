<template>
  <v-container fluid style="max-width:1600px">
    <!-- <Snakebar
      :message="snakeBarMessage"
      :isShow.sync="isSnakeBarVisible"
      :color="snakeBarColor"
      :timeout="snakeBarTimeOut"
    /> -->
    <v-row class="ma-0 pa-0">
        <v-col cols="12">
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

