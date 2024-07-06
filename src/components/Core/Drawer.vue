<template>
  <v-navigation-drawer
    app
    clipped-left
    v-model="drawer"
    floating
    width="100px"
    color="#F5F8FC"
    class="text-center"
  >
    <img :src="require('@/assets/img/aura-logo.svg')" />

    <v-list>
      <v-btn
        depressed
        :color="$vuetify.theme.dark ? '#292929' : '#F5F8FC'"
        class="px-0 py-8 mb-1"
        style="border-radius: 16px"
        v-for="(link, i) in links.filter((li) => li.access[role])"
        :key="i"
        @click="onClick($event, link)"
        :to="link.to"
      >
        <div>
          <v-icon
            style="display: block"
            size="24"
            class="material-symbols-outlined"
            >{{ link.icon }}</v-icon
          >
          <span
            style="
              font-size: 10px;
              text-transform: capitalize;
              font-weight: 600;
            "
            class="google-font caption"
            >{{ link.text }}</span
          >
        </div>
      </v-btn>
    </v-list>

    <img class="mt-10" :src="require('@/assets/img/aura_ai.svg')" />
    <v-icon style="display: block" size="24" class="material-symbols-outlined"
      >info</v-icon
    >

    <p class="caption font-weight-bold mt-8">V5 Aura</p>

    <!-- <v-list dense>
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
    </v-list> -->

    <!-- <template v-slot:append>
      <div class="pl-2">
        <p class="google-font my-0" style="color: #616161; font-size: 80%">
          Version: {{ appVersion }} - AURA
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
    </template> -->
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
export default {
  name: "AppDrawer",
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
<style scoped>
.material-symbols-outlined {
  font-family: "Material Symbols Outlined";
  font-weight: normal;
  font-style: normal;
  text-align: center;
  color: #000;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  -webkit-font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
}
</style>
