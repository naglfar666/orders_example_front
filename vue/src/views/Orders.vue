<template>
  <div>
    <h1 class="uk-heading-medium">Orders</h1>
    <button class="uk-button uk-button-default" @click="$router.push('/orders/add')">Create</button>
    <div class="uk-flex uk-flex-between uk-margin-top" v-if="!filterLoading">
      <div>
        <label class="uk-form-label" for="form-stacked-select">Filter by period</label>
        <div class="uk-form-controls">
          <select class="uk-select" v-model="filter.period">
            <option :value="0">All time</option>
            <option :value="1">Today</option>
            <option :value="2">Week</option>
          </select>
        </div>
      </div>

      <div>
        <label class="uk-form-label" for="form-stacked-select">Filter by user</label>
        <div class="uk-form-controls">
          <select class="uk-select" v-model="filter.user">
            <option :value="0">None</option>
            <option
              v-for="user in USER.list"
              :key="user.id + '_user'"
              :value="user.id"
            >{{ user.name }} {{ user.fname }}</option>
          </select>
        </div>
      </div>

      <div>
        <label class="uk-form-label" for="form-stacked-select">Filter by product</label>
        <div class="uk-form-controls">
          <select class="uk-select" v-model="filter.product">
            <option :value="0">None</option>
            <option
              v-for="product in PRODUCT.list"
              :key="product.id + '_product'"
              :value="product.id"
            >{{ product.title }}</option>
          </select>
        </div>
      </div>

      <div>
        <label class="uk-form-label" for="form-stacked-select">Page</label>
        <div class="uk-form-controls">
          <select class="uk-select" v-model="filter.page">
            <option
              v-for="page in ORDER.meta.pages"
              :key="page + '_page'"
              :value="page"
            >{{ page }}</option>
          </select>
        </div>
      </div>

    </div>
    <v-table :head="head" v-if="!loading">
      <template #body>
        <tr v-for="order in ORDER.list" :key="order.id + '_order'">
            <td>{{ order.id }}</td>
            <td>{{ order.user_name }} {{ order.user_surname }}</td>
            <td>{{ order.product_title }}</td>
            <td>{{ order.price }}</td>
            <td>{{ order.discount }}</td>
            <td>{{ order.quantity }}</td>
            <td>
              <button class="uk-button uk-button-primary" type="button" @click="$router.push('/orders/single/' + order.id)">
                Edit
              </button>
              <button class="uk-button uk-button-danger" type="button" @click="showRemover(order.id)">
                Remove
              </button>
            </td>
        </tr>
      </template>
    </v-table>
  </div>
</template>

<script>
import UIkit from 'uikit';
import { mapGetters, mapActions } from 'vuex';
import Table from '@/components/Table.vue';

export default {
  data() {
    return {
      head: ['#', 'User', 'Product', 'Sum', 'Discount', 'Quantity', 'Actions'],
      loading: true,
      filterLoading: true,
      filter: {
        period: 0,
        user: 0,
        product: 0,
        page: 1,
      },
    };
  },
  watch: {
    'filter.period': function (val) {
      const query = Object.assign({}, this.$route.query);
      switch (val) {
        case 1:
          query.filterDate = 'day';
          break;
        case 2:
          query.filterDate = 'week';
          break;
        default:
          delete query.filterDate;
          break;
      }
      this.$router.replace({ query });
      this.getOrders();
    },
    'filter.user': function (val) {
      const query = Object.assign({}, this.$route.query);
      if (val === 0) {
        delete query.user_id;
      } else {
        query.user_id = val;
      }
      this.$router.replace({ query });
      this.getOrders();
    },
    'filter.product': function (val) {
      const query = Object.assign({}, this.$route.query);
      if (val === 0) {
        delete query.product_id;
      } else {
        query.product_id = val;
      }
      this.$router.replace({ query });
      this.getOrders();
    },
    'filter.page': function (val) {
      const query = Object.assign({}, this.$route.query);
      if (val === 1) {
        delete query.page;
      } else {
        query.page = val;
      }
      this.$router.replace({ query });
      this.getOrders();
    },
  },
  computed: {
    ...mapGetters({
      ORDER: 'Order/STATE',
      USER: 'User/STATE',
      PRODUCT: 'Product/STATE',
    }),
  },
  async created() {
    this.prefillFilters();
    this.filterLoading = true;
    await this.getUsersList();
    await this.getProductsList();
    this.filterLoading = false;
    this.loading = true;
    await this.getOrders();
    this.loading = false;
  },
  methods: {
    ...mapActions({
      getUsersList: 'User/GET_USERS_LIST',
      getProductsList: 'Product/GET_PRODUCTS_LIST',
      getOrdersList: 'Order/GET_ORDERS_LIST',
      removeOrder: 'Order/REMOVE_ORDER',
    }),
    async getOrders() {
      let filter = '';
      if (this.$route.query !== {}) {
        filter = this.buildQueryString();
      }
      await this.getOrdersList(filter);
    },
    showRemover(id) {
      UIkit.modal.confirm('Remove confirmation').then(async () => {
        const response = await this.removeOrder(id);
        if (response.type === 'success') {
          UIkit.notification({
            message: `Order # ${id} was removed`,
            status: 'success',
            pos: 'bottom-right',
            timeout: 5000,
          });
        }
        this.getOrders();
      }, () => {
        UIkit.notification({
          message: 'Removing rejected',
          status: 'success',
          pos: 'bottom-right',
          timeout: 5000,
        });
      });
    },
    buildQueryString() {
      const result = [];
      for (const i in this.$route.query) {
        result.push(`${encodeURIComponent(i)}=${encodeURIComponent(this.$route.query[i])}`);
      }
      return `?${result.join('&')}`;
    },
    prefillFilters() {
      if (this.$route.query.filterDate === 'day') this.filter.period = 1;
      if (this.$route.query.filterDate === 'week') this.filter.period = 2;
      if (this.$route.query.user_id) this.filter.user = parseInt(this.$route.query.user_id, 10);
      if (this.$route.query.product_id) this.filter.product = parseInt(this.$route.query.product_id, 10);
    },
  },
  components: {
    'v-table': Table,
  },
};
</script>
