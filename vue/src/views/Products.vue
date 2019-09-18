<template>
  <div>
    <h1 class="uk-heading-medium">Products</h1>
    <button class="uk-button uk-button-default" @click="$router.push('/products/add')">Create</button>
    <v-table :head="head" v-if="!loading">
      <template #body>
        <tr v-for="product in PRODUCT.list" :key="product.id + '_product'">
            <td>{{ product.id }}</td>
            <td>{{ product.title }}</td>
            <td>{{ product.price }}$</td>
            <td>
              <button class="uk-button uk-button-primary" type="button" @click="$router.push('/products/single/' + product.id)">
                Edit
              </button>
              <button class="uk-button uk-button-danger" type="button" @click="showRemover(product.id)">
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
      head: ['#', 'Name', 'Price', 'Actions'],
      loading: true,
    };
  },
  computed: {
    ...mapGetters({
      PRODUCT: 'Product/STATE',
    }),
  },
  async created() {
    await this.getProducts();
  },
  methods: {
    ...mapActions({
      getProductsList: 'Product/GET_PRODUCTS_LIST',
      removeProduct: 'Product/REMOVE_PRODUCT',
    }),
    async getProducts() {
      this.loading = true;
      await this.getProductsList();
      this.loading = false;
    },
    showRemover(id) {
      UIkit.modal.confirm('Remove confirmation').then(async () => {
        const response = await this.removeProduct(id);
        if (response.type === 'success') {
          UIkit.notification({
            message: `Product # ${id} was removed`,
            status: 'success',
            pos: 'bottom-right',
            timeout: 5000,
          });
        }
        this.getProducts();
      }, () => {
        UIkit.notification({
          message: 'Removing rejected',
          status: 'success',
          pos: 'bottom-right',
          timeout: 5000,
        });
      });
    },
  },
  components: {
    'v-table': Table,
  },
};
</script>
