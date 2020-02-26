import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home'),
  },
  {
    path: '/login',
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ '../views/Login'),
  },
  {
    path: '/team',
    name: "Team",
    component: () => import(/* webpackChunkName: "team" */ '../views/Team'),
  },
  {
    path: '/speakers',
    name: "Speakers",
    component: () => import(/* webpackChunkName: "speakers" */ '../views/Speakers'),
  },
  {
    path: '/config',
    name: "Config",
    component: () => import(/* webpackChunkName: "login" */ '../views/Config'),
  },
  {
    path: '/events',
    name: "Events",
    component: () => import(/* webpackChunkName: "events" */ '../views/Events'),
  },
  {
    path: '/notifications',
    name: "Notifications",
    component: () => import(/* webpackChunkName: "events" */ '../views/Notifications'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
