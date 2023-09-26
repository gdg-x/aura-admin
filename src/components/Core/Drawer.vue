<template>
  <v-navigation-drawer
    app
    clipped
    v-model="drawer"
    floating
    width="280px"
    color="grey lighten-5"
  >
    <v-list-item two-line class="py-2">
      <v-list-item-avatar>
        <img
          :src="
            userDetails.image && userDetails.image.length > 0
              ? userDetails.image
              : require('@/assets/img/default_avatar.jpg')
          "
        />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="google-font">{{
          userDetails.name || "User-Name"
        }}</v-list-item-title>
        <v-list-item-subtitle>{{
          userDetails.email || "User-Email"
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>

    <v-list dense shaped>
      <v-list-item-group color="#4285F4">
        <v-list-item
          v-for="(link, i) in links.filter((li) => li.access[role])"
          :key="i"
          :to="link.to"
          :href="link.href"
          @click="onClick($event, link)"
          class="google-font my-0 py-0"
          color="primary"
        >
          <v-list-item-icon>
            <v-icon v-text="link.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title style="font-size: 100%" v-text="link.text" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-divider></v-divider>
    <v-list dense>
      <v-list-item
        to="/about"
        target="_blank"
        class="google-font my-0 py-0"
        color="primary"
      >
        <v-list-item-content>
          <v-list-item-title v-text="'About'" />
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        :href="sendMail('Feedback from ')"
        class="google-font my-0 py-0"
        color="primary"
      >
        <v-list-item-content>
          <v-list-item-title v-text="'Send Feedback'" />
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        :href="sendMail('Help Required in')"
        class="google-font my-0 py-0"
        color="primary"
      >
        <v-list-item-content>
          <v-list-item-title v-text="'Help'" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pl-2">
        <p class="google-font my-0" style="color: #616161; font-size: 80%">
          Version: {{appVersion}} - AURA
        </p>
        <p class="google-font my-0 mb-3" style="color: #616161; font-size: 80%">
          Based on Project
          <a
            href="https://github.com/gdg-x/aura-admin/"
            target="_blank"
            style="text-decoration: none"
            >Aura Admin</a
          >
        </p>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
export default {
  name: "Drawer",
  data: () => ({}),
  computed: {
    ...mapState(["userDetails", "role", "generalConfig", "appVersion"]),
    ...mapGetters(["links"]),
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.setDrawer(val);
      },
    },
  },
  methods: {
    ...mapMutations(["setDrawer"]),
    sendMail(subject) {
      return `mailto:connectwithaurapp@gmail.com?subject=${subject} ${this.generalConfig.name}`;
    },
    onClick(e, item) {
      e.stopPropagation();
      if (item.to === "/") {
        this.$vuetify.goTo(0);
        this.setDrawer(false);
        return;
      }
      if (item.to || !item.href) return;
      this.$vuetify.goTo(item.href);
      this.setDrawer(false);
    },
  },
};
</script>
