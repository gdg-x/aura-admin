<template>
  <v-container style="max-width: 1600px" class="mt-2">
    <Snakebar
      :message="snakeBarMessage"
      :isShow.sync="isSnakeBarVisible"
      :color="snakeBarColor"
      :timeout="snakeBarTimeOut"
    />
    <!-- <h3 class="google-font mb-0">Config</h3>
    <p class="google-font mb-5">Manage Your Community Info</p> -->
    <v-toolbar class="elevation-0 mb-4" style="border-radius: 12px">
      <v-toolbar-title class="google-font mr-3">Config</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-tabs
      v-model="tab"
      class="my-4"
      centered
      show-arrows
      style="
        border-radius: 12px;
        background-color: #a9c9ff;
        background-image: linear-gradient(
          76deg,
          #a9c9ff 15%,
          #ffbbec 69%,
          #ffffff 97%
        ) !important;
      "
    >
      <v-tab key="item1">General</v-tab>
      <v-tab key="item2">Community Guidelines</v-tab>
      <v-tab key="item3">Footer Config</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" style="border-radius: 12px !important">
      <v-tab-item key="item1" class="pa-0 ma-0" style="border-radius: 12px">
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
            <Footer @show="showSnakeBar" />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Config",
  components: {
    General: () => import("@/components/Config/General/General"),
    CommunityGuidelines: () =>
      import("@/components/Config/CommunityGuidelines/CommunityGuidelines"),
    Snakebar: () => import("@/components/Common/Snakebar"),
    Footer: () => import("@/components/Config/Footer/Footer"),
  },
  computed: { ...mapState(["role"]) },
  beforeMount() {
    if (!this.$route.meta.access[this.role]) {
      alert("Not Auth");
      this.$router.replace("/home");
    }
  },
  data: () => ({
    tab: null,
    snakeBarMessage: "",
    isSnakeBarVisible: false,
    snakeBarColor: "green",
    snakeBarTimeOut: 5000,
  }),
  methods: {
    showSnakeBar(e) {
      this.snakeBarMessage = e;
      this.isSnakeBarVisible = true;
    },
  },
};
</script>
