import api from '@/api';

const name = 'Order';

const namespaced = true;

const state = {
  list: [],
  single: {},
  meta: {
    pages: [],
  },
};

const getters = {
  STATE: state => state,
};

const mutations = {
  SET_LIST: (state, values) => {
    state.list = values.data.data;
    state.meta.pages = [];
    if (--values.data.last_page > 1) {
      for (let i = 0; i < values.data.last_page; i++) {
        state.meta.pages.push(i + 1);
      }
    }
  },
  SET_SINGLE_ORDER: (state, values) => {
    state.single = values.data;
  },
};

const actions = {
  GET_ORDERS_LIST: async (context, payload) => {
    const data = await api.Order.list(payload);
    context.commit('SET_LIST', data);
  },
  GET_SINGLE_ORDER: async (context, payload) => {
    const data = await api.Order.single(payload);
    context.commit('SET_SINGLE_ORDER', data);
  },
  UPDATE_ORDER: async (context, payload) => await api.Order.edit(payload),
  CREATE_ORDER: async (context, payload) => await api.Order.add(payload),
  REMOVE_ORDER: async (context, payload) => await api.Order.delete(payload),
};

export default {
  name,
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
