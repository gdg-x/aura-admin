<template>
  <v-main>
    <v-container fluid style="max-width: 1600px" class="mt-md-16">
      <v-row align="start" justify="center">
        <v-col md="4" cols="11">
           <p style="font-size:25px;font-weight:600" class="google-font mb-0">
            Install Aura Admin
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente
            asperiores amet iusto, nulla facere quae culpa eos modi rerum fugit
            molestiae pariatur ex
          </p>

          <div>
            <p class="mb-0 google-font">Need Help?</p>
            <a href="https://github.com/gdg-x/aura-admin" target="_blank" style="text-decoration:none">Checkout the docs-></a>
          </div>
        </v-col>
        <v-col md="7" cols="11">
          <div v-if="isLoading">
            <v-progress-circular
              :size="40"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </div>
          <AddTeamFirst v-else />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
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
        if (!res.empty) this.$router.replace("/home");
        else this.unsub();

        this.isLoading = false;
      })
      .catch((e) => {
        console.log(e);
        this.isLoading = false;
      });
  },
  data: () => ({
    addFirstTime: true,
    isLoading: false,
  }),
  methods: {},
};
</script>
