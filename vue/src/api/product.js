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
  // Get list of products
  list () {
    return this.execute('get', '/product/list', {});
  },
  // Get single product's info
  single (id) {
    return this.execute('get', '/product/single/' + id, {});
  },
  // Edit product
  edit (values) {
    return this.execute('post', '/product/edit', (values), {})
  },
  // Create new product
  add (values) {
    return this.execute('post', '/product/add', (values), {})
  },
  // Removing product
  delete (id) {
    return this.execute('get', '/product/delete/' + id, {});
  },
};
/* eslint-disable */