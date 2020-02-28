import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from '@/config/firebase';
import store from '@/store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/home',
    name: 'HomePage',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/login',
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ '../views/Login'),
    meta:{
      requiresAuth:false
    }
  },
  {
    path: '/team',
    name: "Team",
    component: () => import(/* webpackChunkName: "team" */ '../views/Team'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/speakers',
    name: "Speakers",
    component: () => import(/* webpackChunkName: "speakers" */ '../views/Speakers'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/config',
    name: "Config",
    component: () => import(/* webpackChunkName: "login" */ '../views/Config'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/events',
    name: "Events",
    component: () => import(/* webpackChunkName: "events" */ '../views/Events'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/notifications',
    name: "Notifications",
    component: () => import(/* webpackChunkName: "events" */ '../views/Notifications'),
    meta:{
      requiresAuth:true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta:{
      requiresAuth:true
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // if (to.meta.title) {
  //   document.title = to.meta.title;
  // }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (firebase.auth.currentUser) {
        next();
    } else {
      next('login');
    }
  } else if(firebase.auth.currentUser && to.name=="Login") {
    next("/");
  }else{
    next();
  }
});



export default router
