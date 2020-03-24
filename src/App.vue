<template>
  <v-app class="grey lighten-2">
    
    <v-snackbar
        v-model="snackWithButtons"
        :timeout="timeout"
        bottom
        left
        class="snack"
      >
        {{ snackWithBtnText }}
        <v-spacer />
        <v-btn
          dark
          text
          color="#00f500"
          @click.native="refreshApp"
        >
          {{ snackBtnText }}
        </v-btn>
        <v-btn
          icon
          @click="snackWithButtons = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-snackbar>
    <!-- v-if="$route.meta.requiresAuth" -->
    <AuraAdminToolbar v-if="$route.meta.requiresAuth"/>
    <AuraAdminDrawer v-if="$route.meta.requiresAuth"/>
    <!-- <AuraAdminBottomNav v-if="$route.meta.requiresAuth" /> -->
    <AuraAdminView/> 
  </v-app>
  
</template>

<script>
import AuraAdminToolbar from '@/components/Core/Toolbar'
import AuraAdminDrawer from '@/components/Core/Drawer'
// import AuraAdminBottomNav from '@/components/Core/BottomNav'
import AuraAdminView from '@/components/Core/Views'
export default {
  name: 'App',
  components:{
    AuraAdminToolbar,
    AuraAdminDrawer,
    // AuraAdminBottomNav,
    AuraAdminView
  },
  data: () => ({
    refreshing: false,
    registration: null,
    snackBtnText: '',
    snackWithBtnText: '',
    snackWithButtons: false,
    timeout: 6000,
  }),
  created() {
    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener('swUpdated', this.showRefreshUI, { once: true });
    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return;
        this.refreshing = true;
      window.location.reload();
    });
  },
  methods:{
    showRefreshUI(e) {
      this.registration = e.detail;
      this.snackBtnText = 'Refresh';
      this.snackWithBtnText = 'New version available!';
      this.snackWithButtons = true;
    },
    refreshApp() {
      this.snackWithButtons = false;
      if (!this.registration || !this.registration.waiting) { return; }
      this.registration.waiting.postMessage('skipWaiting');
    },
    
  }
};
</script>
