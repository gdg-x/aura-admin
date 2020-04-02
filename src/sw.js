self.addEventListener('message', (e) => {
    if (!e.data) {
      return;
    }
  
    switch (e.data) {
      case 'skipWaiting':
        self.skipWaiting();
        break;
      default:
        // NOOP
        break;
    }
  });
  
  // workbox.core.clientsClaim();
  workbox.core.setCacheNameDetails({prefix: "aura-admin"});
  
  self.__precacheManifest = [].concat(self.__precacheManifest || []);
  workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

  
  // The precaching code provided by Workbox.
  // self.__precacheManifest = [].concat(self.__precacheManifest || []);
  // workbox.precaching.suppressWarnings();
  // workbox.precaching.precacheAndRoute(self.__precacheManifest, {}); 