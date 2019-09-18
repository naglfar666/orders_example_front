import api from '@/api';

const name = 'Product';

const namespaced = true;

const state = {
  list: [],
  single: {},
};

const getters = {
  STATE: state => state,
};

const mutations = {
  SET_LIST: (state, values) => {
    state.list = values.data;
  },
  SET_SINGLE_PRODUCT: (state, values) => {
    state.single = values.data;
  },
};

const actions = {
  GET_PRODUCTS_LIST: async (context) => {
    const data = await api.Product.list();
    context.commit('SET_LIST', data);
  },
  GET_SINGLE_PRODUCT: async (context, payload) => {
    const data = await api.Product.single(payload);
    context.commit('SET_SINGLE_PRODUCT', data);
  },
  UPDATE_PRODUCT: async (context, payload) => await api.Product.edit(payload),
  CREATE_PRODUCT: async (context, payload) => await api.Product.add(payload),
  REMOVE_PRODUCT: async (context, payload) => await api.Product.delete(payload),
};

export default {
  name,
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
