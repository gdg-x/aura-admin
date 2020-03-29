<template>
  <v-container class style="max-width:1600px">
    <Snakebar
      :message="snakeBarMessage"
      :isShow.sync="isSnakeBarVisible"
      :color="snakeBarColor"
      :timeout="snakeBarTimeOut"
    />
    <h3 class="google-font mb-0">Config</h3>
    <p class="google-font mb-5">Lorem ipsum dolor sit amet consectetur</p>
    <v-tabs v-model="tab" show-arrows background-color="grey lighten-3">
      <v-tab key="item1">General</v-tab>
      <v-tab key="item2">Community Guidelines</v-tab>
      <v-tab key="item3">Footer Config</v-tab>
      <!-- <v-tab key="item4">Partners</v-tab> -->
      <v-tab key="item5">Keys & Securities</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" style="border:1px solid #e0e0e0;border-radius:5px;">
      <v-tab-item key="item1" class="pa-0 ma-0">
        <v-card flat class="pa-0 ma-0 px-2">
          <General @show="showSnakeBar" />
        </v-card>
      </v-tab-item>
      <v-tab-item key="item2" class="pa-0 ma-0">
        <v-card flat class="pa-0 ma-0 px-2">
          <CommunityGuidelines @show="showSnakeBar" />
        </v-card>
      </v-tab-item>
      <v-tab-item key="item3">
        <v-card flat>
          <v-card-text class="">
            <Footer @show="showSnakeBar"/>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <!-- <v-tab-item key="item4">
        <v-card flat>
          <v-card-text>
            <Partners @show="showSnakeBar"/>
          </v-card-text>
        </v-card>
      </v-tab-item> -->
      <v-tab-item key="item5">
        <v-card flat>
          <v-card-text>
             <KeysAndSecurity @show="showSnakeBar"/>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import Snakebar from "@/components/Common/Snakebar";
import General from "@/components/Config/General/General";
import CommunityGuidelines from "@/components/Config/CommunityGuidelines/CommunityGuidelines";
import Footer from "@/components/Config/Footer/Footer"
import KeysAndSecurity from "@/components/Config/Keys/Keys";
// import Partners from "@/components/Config/Partners/Partners";

export default {
  name: "Config",
  components: {
    General,
    CommunityGuidelines,
    Snakebar,
    Footer,
    KeysAndSecurity
    // Partners
  },
  data: () => ({
    tab: null,
    snakeBarMessage: "",
    isSnakeBarVisible: false,
    snakeBarColor: "green",
    snakeBarTimeOut: 5000
  }),
  mounted() {},
  methods: {
    showSnakeBar(e) {
      this.snakeBarMessage = e;
      this.isSnakeBarVisible = true;
    }
  }
};
</script>
