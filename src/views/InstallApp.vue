<template>
  <v-container style="max-width: 1600px" class="mt-2">
    <h3 class="google-font mb-0">Install First Time</h3>
    <h3 v-if="isLoading">Checking Status</h3>
    <AddTeamFirst v-else />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import firebase from "@/config/firebase";
export default {
  name: "InstallFirstTime",
  components: {
    AddTeamFirst: () => import("@/components/Common/AddFirstTime"),
  },
  computed: { ...mapState(["role", "unsub"]) },
  created() {
    this.isLoading = true;
    firebase.firestore
      .collection("users")
      .get()
      .then((res) => {
        if (!res.empty)
          this.$router.replace("/home");
        else 
          this.unsub();

        this.isLoading = false;

      }).catch(e=>{
        console.log(e);
        this.isLoading = false;
      });
  },
  data: () => ({
    addFirstTime: true,
    isLoading: false
  }),
  methods: {},
};
</script>
