import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/orders',
      name: 'orders',
      component: () => import('./views/Orders.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('./views/Products.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('./views/Users.vue'),
    },
  ],
});
