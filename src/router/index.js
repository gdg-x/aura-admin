import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home'),
    meth:{
      requiresAuth:true
    }
  },
  {
    path: '/home',
    name: 'HomePage',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home'),
    meth:{
      requiresAuth:true
    }
  },
  {
    path: '/login',
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ '../views/Login'),
    meth:{
      requiresAuth:false
    }
  },
  {
    path: '/team',
    name: "Team",
    component: () => import(/* webpackChunkName: "team" */ '../views/Team'),
    meth:{
      requiresAuth:true
    }
  },
  {
    path: '/speakers',
    name: "Speakers",
    component: () => import(/* webpackChunkName: "speakers" */ '../views/Speakers'),
    meth:{
      requiresAuth:true
    }
  },
  {
    path: '/config',
    name: "Config",
    component: () => import(/* webpackChunkName: "login" */ '../views/Config'),
    meth:{
      requiresAuth:true
    }
  },
  {
    path: '/events',
    name: "Events",
    component: () => import(/* webpackChunkName: "events" */ '../views/Events'),
    meth:{
      requiresAuth:true
    }
  },
  {
    path: '/notifications',
    name: "Notifications",
    component: () => import(/* webpackChunkName: "events" */ '../views/Notifications'),
    meth:{
      requiresAuth:true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meth:{
      requiresAuth:true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
