import api from '@/api';

const name = 'User';

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
  SET_SINGLE_USER: (state, values) => {
    state.single = values.data
  },
};

const actions = {
  GET_USERS_LIST: async (context) => {
    let data = await api.User.list();
    context.commit('SET_LIST', data);
  },
  GET_SINGLE_USER: async (context, payload) => {
    let data = await api.User.single(payload);
    context.commit('SET_SINGLE_USER', data);
  },
  UPDATE_USER: async (context, payload) => {
    return await api.User.edit(payload);
  },
  CREATE_USER: async (context, payload) => {
    return await api.User.add(payload);
  },
  REMOVE_USER: async (context, payload) => {
    return await api.User.delete(payload);
  },
};

export default {
  name,
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
