<template>
  <div>
    <h1 class="uk-heading-medium">{{ title }}</h1>
    <div v-if="!loading">
      <label class="uk-form-label" for="form-stacked-select">Select user</label>
      <div class="uk-form-controls">
        <select class="uk-select" v-model="input.user_id">
        <option
            v-for="user in USER.list"
            :key="user.id + '_user'"
            :value="user.id"
        >{{ user.name }} {{ user.surname }}</option>
        </select>
      </div>
      <label class="uk-form-label" for="form-stacked-select">Select product</label>
      <div class="uk-form-controls">
        <select class="uk-select" v-model="input.product_id">
        <option
            v-for="product in PRODUCT.list"
            :key="product.id + '_product'"
            :value="product.id"
        >{{ product.title }} {{ product.price }}$</option>
        </select>
      </div>
      <label class="uk-form-label" for="form-stacked-select">
        Quantity 
        <span v-if="input.product_id && input.quantity > 0">Total price: {{ totalPrice }}$</span>
      </label>
      <div class="uk-form-controls">
        <input class="uk-input uk-form-width-large" type="text" placeholder="Name" v-model="input.quantity">
      </div>
      <button class="uk-button uk-button-primary uk-margin-small-bottom" @click="save">Save</button>
    </div>
  </div>
</template>

<script>
import UIkit from 'uikit';
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      loading: false,
      title: '',
      input: {
        product_id: null,
        user_id: null,
        quantity: 1,
      },
      totalPrice: null,
    };
  },
  watch: {
    'input.product_id': function () {
      this.countTotal();
    },
    'input.quantity': function () {
      this.countTotal();
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
    this.loading = true;
    await this.getUsersList();
    await this.getProductsList();
    if (this.$route.params.id) {
      await this.getSingleOrder(this.$route.params.id);
      this.$set(this.input, 'product_id', this.ORDER.single.product_id);
      this.$set(this.input, 'user_id', this.ORDER.single.user_id);
      this.$set(this.input, 'quantity', this.ORDER.single.quantity);
      this.title = `Edit order # ${this.$route.params.id}`;
    } else {
      this.title = 'Create new order';
    }
    this.loading = false;
  },
  methods: {
    ...mapActions({
      getUsersList: 'User/GET_USERS_LIST',
      getProductsList: 'Product/GET_PRODUCTS_LIST',
      getSingleOrder: 'Order/GET_SINGLE_ORDER',
      updateOrder: 'Order/UPDATE_ORDER',
      createOrder: 'Order/CREATE_ORDER',
    }),
    async save() {
      if (this.$route.params.id) {
        const response = await this.updateOrder({
          id: this.$route.params.id,
          ...this.input,
        });
        if (response.type === 'success') {
          this.$router.push('/orders');
        } else {
          let resultError = '';
          for (const i in response.errors) {
            resultError += `${response.errors[i][0]} `;
          }
          UIkit.notification({
            message: resultError,
            status: 'danger',
            pos: 'bottom-right',
            timeout: 5000,
          });
        }
      } else {
        const response = await this.createOrder(this.input);
        if (response.type === 'success') {
          this.$router.push('/orders');
        } else {
          let resultError = '';
          for (const i in response.errors) {
            resultError += `${response.errors[i][0]} `;
          }
          UIkit.notification({
            message: resultError,
            status: 'danger',
            pos: 'bottom-right',
            timeout: 5000,
          });
        }
      }
    },
    countTotal() {
      let quantity = parseInt(this.input.quantity);
      if (this.input.product_id && quantity > 0) {
        var self = this
        this.PRODUCT.list.map(elem => {
          if (elem.id === parseInt(self.input.product_id, 10)) {
            let discount = 0;
            if (quantity >= elem.discount_quantity) {
              discount = quantity * elem.price * (elem.discount / 100);
            }
            self.totalPrice = quantity * elem.price - discount;
          }
        })
      }
    },
  },
};
</script>
