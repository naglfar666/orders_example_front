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
  // Get list of users
  list () {
    return this.execute('get', '/user/list', {});
  },
  // Get single user's info
  single (id) {
    return this.execute('get', '/user/single/' + id, {});
  },
  // Edit user's profile
  edit (values) {
    return this.execute('post', '/user/edit', (values), {})
  },
  // Create new user
  add (values) {
    return this.execute('post', '/user/add', (values), {})
  },
  // Removing user
  delete (id) {
    return this.execute('get', '/user/delete/' + id, {});
  },
};
/* eslint-disable */