import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from '@/config/firebase';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'Home',
    component: () => import( /* webpackChunkName: "home" */ '@/views/Home'),
    meta: {
      requiresAuth: true,
      title: "Home",
      access: {
        "Super Admin": true,
        "Admin": true,
        "Viewer":true
      }
    }
  },
  {
    path: '/home',
    name: 'HomePage',
    component: () => import( /* webpackChunkName: "home1" */ '@/views/Home'),
    meta: {
      requiresAuth: true,
      title: "Home",
      access: {
        "Super Admin": true,
        "Admin": true,
        "Viewer":true
      }
    }
  },
  {
    path: '/login',
    name: "Login",
    component: () => import( /* webpackChunkName: "login" */ '@/views/Login'),
    meta: {
      requiresAuth: false,
      title: "Login",
    }
  },
  {
    path: '/team',
    name: "Team",
    component: () => import( /* webpackChunkName: "team" */ '@/views/Team'),
    meta: {
      requiresAuth: true,
      title: "Team",
      access: {
        "Super Admin": true,
        "Admin": true,
        "Viewer":true
      }
    }
  },
  {
    path: '/partners',
    name: "Partners",
    component: () => import( /* webpackChunkName: "partners" */ '@/views/Partners'),
    meta: {
      requiresAuth: true,
      title: "Partners",
      access: {
        "Super Admin": true,
        "Admin": true,
        "Viewer":true
      }
    }
  },
  {
    path: '/partners/:id',
    name: "Partners-Details",
    component: () => import( /* webpackChunkName: "partners-details" */ '@/views/Partners/ViewPartner'),
    meta: {
      requiresAuth: true,
      title: "Partner Details",
      access: {
        "Super Admin": true,
        "Admin": true,
        "Viewer":true
      }
    }
  },
  {
    path: '/team/:id',
    name: "Team-Details",
    component: () => import( /* webpackChunkName: "team-details" */ '@/views/Team/ViewTeam'),
    meta: {
      requiresAuth: true,
      title: "Team Details",
      access: {
        "Super Admin": true,
        "Admin": true,
        "Viewer":true
      }
    }
  },
  {
    path: '/speakers',
    name: "Speakers",
    component: () => import( /* webpackChunkName: "speakers" */ '@/views/Speakers'),
    meta: {
      requiresAuth: true,
      title: "Speakers",
      access: {
        "Super Admin": true,
        "Admin": true,
        "Viewer":true
      }
    }
  },
  {
    path: '/speakers/:id',
    name: "Speaker-Details",
    component: () => import( /* webpackChunkName: "speakers-details" */ '@/views/Speakers/ViewSpeaker'),
    meta: {
      requiresAuth: true,
      title: "Speakers Details",
      access: {
        "Super Admin": true,
        "Admin": true,
        "Viewer":true
      }
    }
  },
  {
    path: '/config',
    name: "Config",
    component: () => import( /* webpackChunkName: "config" */ '@/views/Config'),
    meta: {
      requiresAuth: true,
      title: "Config",
      access: {
        "Super Admin": true,
        "Admin": false,
        "Viewer":false
      }
    }
  },
  {
    path: '/events',
    name: "Events",
    component: () => import( /* webpackChunkName: "events" */ '@/views/Events'),
    meta: {
      requiresAuth: true,
      title: "Events",
      access: {
        "Super Admin": true,
        "Admin": true,
        "Viewer":true
      }
    }
  },
  {
    path: '/events/:id',
    name: "Event-Details",
    component: () => import( /* webpackChunkName: "event-details" */ '@/views/Events/ViewEvent'),
    meta: {
      requiresAuth: true,
      title: "Event Details",
      access: {
        "Super Admin": true,
        "Admin": true,
        "Viewer":true
      }
    }
  },
  {
    path: '/notification',
    name: "Notification",
    component: () => import( /* webpackChunkName: "notifications" */ '@/views/Notifications'),
    meta: {
      requiresAuth: true,
      title: "Notifications",
      access: {
        "Super Admin": true,
        "Admin": true,
        "Viewer":false
      }
    }
  },
  {
    path: '/emails',
    name: "Email",
    component: () => import( /* webpackChunkName: "email" */ '@/views/Email'),
    meta: {
      requiresAuth: true,
      title: "Email",
      access: {
        "Super Admin": true,
        "Admin": true,
        "Viewer":false
      }
    }
  },
  {
    path: '/roles',
    name: "UserManagement",
    component: () => import( /* webpackChunkName: "roles" */ '@/views/Users'),
    meta: {
      requiresAuth: true,
      title: "User Management",
      access: {
        "Super Admin": true,
        "Admin": false,
        "Viewer":false
      }
    }
  },
  {
    path: '/profile',
    name: "profile",
    component: () => import( /* webpackChunkName: "roles" */ '@/views/Profile/Profile'),
    meta: {
      requiresAuth: true,
      title: "Profile Settings",
      access: {
        "Super Admin": true,
        "Admin": true,
        "Viewer":true
      }
    }
  },
  {
    path: '/emails/:id',
    name: "EmailView",
    component: () => import( /* webpackChunkName: "notifications" */ '@/views/Email/ViewEmail'),
    meta: {
      requiresAuth: true,
      title: "Email",
      access: {
        "Super Admin": true,
        "Admin": true,
        "Viewer":false
      }
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( /* webpackChunkName: "about" */ '@/views/About.vue'),
    meta: {
      requiresAuth: true,
      title: "About",
      access: {
        "Super Admin": true,
        "Admin": true,
        "Viewer":true
      }
    }
  },
  {
    path: '*',
    name: 'redirect',
    redirect: {
      path: '/'
    },
    meta: {
      title: `Redirect `,
      color: "#0277bd",
    }
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + " - Aura Admin";
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (firebase.auth.currentUser) {
      next();
    } else {
      next('login');
    }
  } else if (firebase.auth.currentUser && to.name == "Login") {
    next("/");
  } else {
    next();
  }
});


export default router;