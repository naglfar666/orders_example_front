import axios from 'axios';
import CONFIG from '@/core/config';

const client = axios.create({
  baseURL: `${CONFIG[process.env.NODE_ENV].BACKEND_ADDRESS}api/`,
  json: true,
});

export default {
  async execute(method, resource, data, headers = {}) {
    return client({
      crossdomain: true,
      headers,
      method,
      url: resource,
      data,
    }).then(
      response => response.data,
      (error) => {
        // eslint-disable-next-line
        console.log(`Error on ${resource} | status: ${error.request.status}`);
      },
    );
  },
  // Авторизация
  signin(values) {
    return this.execute('post', '/v1/admin/signin', (values), {});
  },
};
