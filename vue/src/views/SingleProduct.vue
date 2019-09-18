<template>
  <div>
    <h1 class="uk-heading-medium">{{ title }}</h1>
    <div v-if="!loading">
      <label class="uk-form-label" for="form-stacked-select">Name</label>
      <div class="uk-form-controls">
        <input class="uk-input uk-form-width-large" type="text" placeholder="Name" v-model="input.title">
      </div>
      <label class="uk-form-label" for="form-stacked-select">Price in $</label>
      <div class="uk-form-controls">
        <input class="uk-input uk-form-width-large" type="text" placeholder="Price in $" v-model="input.price">
      </div>
      <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
        <label><input class="uk-checkbox" type="checkbox" v-model="input.useDiscount">Use discount</label>
      </div>
      <div v-if="input.useDiscount">
        <label class="uk-form-label" for="form-stacked-select">Quantity for discount</label>
        <div class="uk-form-controls">
          <input class="uk-input uk-form-width-large" type="text" placeholder="Quantity for discount" v-model="input.discount_quantity">
        </div>

        <label class="uk-form-label" for="form-stacked-select">Discount in %</label>
        <div class="uk-form-controls">
          <input class="uk-input uk-form-width-large" type="text" placeholder="Discount in %" v-model="input.discount">
        </div>
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
        title: '',
        price: '',
        discount_quantity: 1,
        discount: 0,
        useDiscount: false,
      },
    };
  },
  computed: {
    ...mapGetters({
      PRODUCT: 'Product/STATE',
    }),
  },
  async created() {
    if (this.$route.params.id) {
      this.loading = true;
      await this.getSingleProduct(this.$route.params.id);
      this.$set(this.input, 'title', this.PRODUCT.single.title);
      this.$set(this.input, 'discount_quantity', this.PRODUCT.single.discount_quantity);
      this.$set(this.input, 'discount', this.PRODUCT.single.discount);
      this.$set(this.input, 'price', this.PRODUCT.single.price);
      if (this.PRODUCT.single.discount > 0) {
        this.$set(this.input, 'useDiscount', true);
      }
      this.title = `Edit product # ${this.$route.params.id} ${this.PRODUCT.single.title}`;
      this.loading = false;
    } else {
      this.title = 'Create new product';
    }
  },
  methods: {
    ...mapActions({
      getSingleProduct: 'Product/GET_SINGLE_PRODUCT',
      updateProduct: 'Product/UPDATE_PRODUCT',
      createProduct: 'Product/CREATE_PRODUCT',
    }),
    async save() {
      if (this.$route.params.id) {
        const response = await this.updateProduct({
          id: this.$route.params.id,
          ...this.input,
        });
        if (response.type === 'success') {
          this.$router.push('/products');
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
        const response = await this.createProduct(this.input);
        if (response.type === 'success') {
          this.$router.push('/products');
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
  },
};
</script>
