import Vue from 'vue';
import Vuex from 'vuex';
import User from './modules/User';
import Product from './modules/Product';
import Order from './modules/Order';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [],
  modules: {
    User,
    Product,
    Order,
  },
});
