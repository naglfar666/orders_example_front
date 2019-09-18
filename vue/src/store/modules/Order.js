import api from '@/api';

const name = 'User';

const namespaced = true;

const state = {
  values: [],
};

const getters = {
  STATE: state => state,
};

const mutations = {
  SET_VALUES: (state, values) => {
    state[values.type] = values.data;
  },
};

const actions = {
  SIGNIN: async (context, payload) => {
    const data = await api.Admin.signin(payload);
    return data;
  },
};

export default {
  name,
  namespaced,
  state,
  getters,
  actions,
};
