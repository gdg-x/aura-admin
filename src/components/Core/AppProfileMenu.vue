<template>
  <div>
    <v-avatar size="40" style="cursor: pointer" @click="toggleMenu">
      <img
        :src="
          userDetails.image && userDetails.image.length > 0
            ? userDetails.image
            : require('@/assets/img/default_avatar.jpg')
        "
        alt="John"
        class="circle"
      />
    </v-avatar>

    <v-card
      v-if="menuOpen"
      elevation="5"
      class="menu-card"
      outlined
      flat
      style="background-color: #f5f8fc"
    >
      <p class="text-end my-0">
        <v-btn icon text class="ma-2" elevation="0" @click="closeMenu"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </p>
      <v-card-text class="google-font text-center pt-0 px-8">
        <v-avatar size="100">
          <img
            :src="
              userDetails.image && userDetails.image.length > 0
                ? userDetails.image
                : require('@/assets/img/default_avatar.jpg')
            "
            class="circle"
          />
        </v-avatar>

        <p style="font-size: 150%; font-weight: 600" class="mt-4 mb-1">
          Hi, {{ userDetails.name || "User-Name" }}
        </p>
        <p
          class="google-font mb-0"
          style="margin-left: auto; margin-right: auto"
        >
          {{ userDetails.email || "User-Email" }}
        </p>
        <!-- <p style="font-size: 80% !important">Managed by Aura</p> -->
      </v-card-text>
      <v-card-actions class="pa-8">
        <v-btn
          class="px-7 py-3"
          style="
            border-radius: 1rem 0rem 0rem 1rem;
            border-right: 2px solid rgb(220, 215, 215);
          "
          color="white"
          elevation="0"
          to="/profile"
          large
          >Profile</v-btn
        >
        <v-btn
          class="px-6 py-3 ml-0"
          style="border-radius: 0rem 1rem 1rem 0rem"
          elevation="0"
          color="white"
          large
          @click="logout"
        >
          <v-icon>mdi-logout-variant</v-icon>Logout
        </v-btn>
      </v-card-actions>
    </v-card>
    <!-- <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="100"
      :max-width="320"
      class="elevation-0"
      offset-y
      transition="slide-y-transition"
      bottom
      rounded
    >
      <template v-slot:activator="{ on: menu }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-avatar size="36" style="cursor: pointer">
              <img
                v-on="{ ...tooltip, ...menu }"
                :src="
                  userDetails.image && userDetails.image.length > 0
                    ? userDetails.image
                    : require('@/assets/img/default_avatar.jpg')
                "
                alt="John"
                class="circle"
              />
            </v-avatar>
          </template>
          <span>Profile Settings</span>
        </v-tooltip>
      </template>

      <v-card elevation="0" rounded="10" outlined flat>
        <v-container fluid>
          <v-row class justify="center" align="center">
            <v-col cols="12" class="ma-0 pb-0 text-center">
              <v-avatar size="100">
                <img
                  :src="
                    userDetails.image && userDetails.image.length > 0
                      ? userDetails.image
                      : require('@/assets/img/default_avatar.jpg')
                  "
                />
              </v-avatar>
            </v-col>
            <v-col cols="12" class="text-center ma-0 pa-0">
              <v-list>
                <v-list-item-content>
                  <v-list-item-title class="google-font">{{
                    userDetails.name || "User-Name"
                  }}</v-list-item-title>
                  <v-list-item-subtitle class="google-font">{{
                    userDetails.email || "User-Email"
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list>
            </v-col>
            <v-col cols="12" class="text-center ma-0 pa-0">
              <v-btn
                small
                to="/profile"
                class="google-font text-none"
                rounded
                color="#3c4043"
                outlined
                >Manage Your Profile</v-btn
              >
            </v-col>
            <v-col cols="12" class="px-0">
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12" class="px-0 text-center">
              <v-btn
                @click="logout"
                class="google-font grey--text darken-3 text-none"
                outlined
                color="grey"
                ><v-icon left>mdi-logout-variant</v-icon> Signout from
                AURA</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-menu> -->
  </div>
</template>

<script>
import firebase from "@/config/firebase";
// import { mapGetters, mapState, mapMutations } from "vuex";
export default {
  props: ["userDetails"],
  data: () => ({
    menuOpen: false,
  }),
  mounted() {
    // Listen for route changes to close the menu
    this.$router.afterEach(() => {
      this.closeMenu();
    });
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
    logout() {
      firebase.auth.signOut().then(() => {
        this.setGeneral({});
        this.userDetailsSet({});
        this.roleSet("");
        this.$router.replace("/login");
      });
    },
  },
};
</script>
<style scoped>
.menu-card {
  border-radius: 1.5rem;
  position: absolute;
  top: calc(100% + 0px); /* Adjust this value as needed */
  right: 2rem;
  z-index: 1000; /* Ensure the card is above other content */
}
.circle {
  /* width: 200px;
  height: 200px; */
  border-radius: 50%;
  border: 2.5px solid transparent;
  background-size: 100% 100%, 50% 50%, 50% 50%, 50% 50%, 50% 50%;
  background-repeat: no-repeat;
  background-image: linear-gradient(white, white),
    linear-gradient(30deg, #ea4335 36%, #4285f4 30%),
    linear-gradient(120deg, #4285f4 36%, #34a853 30%),
    linear-gradient(300deg, #fbbc04 36%, #ea4335 30%),
    linear-gradient(210deg, #34a853 36%, #fbbc04 30%);
  background-position: center center, left top, right top, left bottom,
    right bottom;
  background-origin: content-box, border-box, border-box, border-box, border-box;
  background-clip: content-box, border-box, border-box, border-box, border-box;
}
</style>