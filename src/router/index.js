import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from '@/config/firebase';
import store from '@/store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import( /* webpackChunkName: "home" */ '@/views/Home'),
    meta: {
      requiresAuth: true,
      title: "Home",
    }
  },
  {
    path: '/home',
    name: 'HomePage',
    component: () => import( /* webpackChunkName: "home1" */ '@/views/Home'),
    meta: {
      requiresAuth: true,
      title: "Home"
    }
  },
  {
    path: '/login',
    name: "Login",
    component: () => import( /* webpackChunkName: "login" */ '@/views/Login'),
    meta: {
      requiresAuth: false,
      title: "Login"
    }
  },
  {
    path: '/team',
    name: "Team",
    component: () => import( /* webpackChunkName: "team" */ '@/views/Team'),
    meta: {
      requiresAuth: true,
      title: "Team"
    }
  },
  {
    path: '/partners',
    name: "Partners",
    component: () => import( /* webpackChunkName: "partners" */ '@/views/Partners'),
    meta: {
      requiresAuth: true,
      title: "Partners"
    }
  },
  {
    path: '/partners/:id',
    name: "Partners-Details",
    component: () => import( /* webpackChunkName: "partners-details" */ '@/views/Partners/ViewPartner'),
    meta: {
      requiresAuth: true,
      title: "Partner Details"
    }
  },
  {
    path: '/team/:id',
    name: "Team-Details",
    component: () => import( /* webpackChunkName: "team-details" */ '@/views/Team/ViewTeam'),
    meta: {
      requiresAuth: true,
      title: "Team Details"
    }
  },
  {
    path: '/speakers',
    name: "Speakers",
    component: () => import( /* webpackChunkName: "speakers" */ '@/views/Speakers'),
    meta: {
      requiresAuth: true,
      title: "Speakers"
    }
  },
  {
    path: '/speakers/:id',
    name: "Speaker-Details",
    component: () => import( /* webpackChunkName: "speakers-details" */ '@/views/Speakers/ViewSpeaker'),
    meta: {
      requiresAuth: true,
      title: "Speakers Details"
    }
  },
  {
    path: '/config',
    name: "Config",
    component: () => import( /* webpackChunkName: "config" */ '@/views/Config'),
    meta: {
      requiresAuth: true,
      title: "Config"
    }
  },
  {
    path: '/events',
    name: "Events",
    component: () => import( /* webpackChunkName: "events" */ '@/views/Events'),
    meta: {
      requiresAuth: true,
      title: "Events"
    }
  },
  {
    path: '/events/:id',
    name: "Event-Details",
    component: () => import( /* webpackChunkName: "event-details" */ '@/views/Events/ViewEvent'),
    meta: {
      requiresAuth: true,
      title: "Event Details"
    }
  },
  {
    path: '/notification',
    name: "Notification",
    component: () => import( /* webpackChunkName: "notifications" */ '@/views/Notifications'),
    meta: {
      requiresAuth: true,
      title: "Notifications"
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( /* webpackChunkName: "about" */ '@/views/About.vue'),
    meta: {
      requiresAuth: true,
      title: "About"
    }
  },
  {
      path: '*',
      name: 'redirect',
      redirect: { path: '/' },
      meta:{
        title:`Redirect `,
        color:"#0277bd",
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