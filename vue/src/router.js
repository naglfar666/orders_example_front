import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/orders',
      name: 'Orders',
      component: () => import('./views/Orders.vue'),
    },
    {
      path: '/products',
      name: 'Products',
      component: () => import('./views/Products.vue'),
    },
    {
      path: '/users',
      name: 'Users',
      component: () => import('./views/Users.vue'),
    },
    {
      path: '/users/single/:id',
      name: 'SingleUser',
      component: () => import('./views/SingleUser.vue'),
    },
    {
      path: '/users/add',
      name: 'AddUser',
      component: () => import('./views/SingleUser.vue'),
    },
    {
      path: '/orders/single/:id',
      name: 'SingleOrder',
      component: () => import('./views/SingleOrder.vue'),
    },
    {
      path: '/orders/add',
      name: 'AddOrder',
      component: () => import('./views/SingleOrder.vue'),
    },
    {
      path: '/products/single/:id',
      name: 'SingleProduct',
      component: () => import('./views/SingleProduct.vue'),
    },
    {
      path: '/products/add',
      name: 'AddProduct',
      component: () => import('./views/SingleProduct.vue'),
    },
  ],
});
