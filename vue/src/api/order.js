import axios from 'axios';
import CONFIG from '@/core/config';

const client = axios.create({
  baseURL: `${CONFIG[process.env.NODE_ENV].BACKEND_ADDRESS}api/`,
  json: true,
});
/* eslint-disable */
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
        try {
            let data = JSON.parse(error.request.response);
            return data;
        } catch (e) {
            return e
        }
        
      },
    );
  },
  // Get list of orders
  list (filter) {
    return this.execute('get', '/order/list' + filter, {});
  },
  // Get single order's info
  single (id) {
    return this.execute('get', '/order/single/' + id, {});
  },
  // Edit order
  edit (values) {
    return this.execute('post', '/order/edit', (values), {})
  },
  // Create new order
  add (values) {
    return this.execute('post', '/order/add', (values), {})
  },
  // Removing order
  delete (id) {
    return this.execute('get', '/order/delete/' + id, {});
  },
};
/* eslint-disable */