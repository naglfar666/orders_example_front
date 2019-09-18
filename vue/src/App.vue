<template>
  <div id="app">
    <nav class="uk-navbar-container" uk-navbar>
        <div class="uk-navbar-left">
            <ul class="uk-navbar-nav">
                <li
                  :class="($route.path.indexOf('orders') > -1)? 'uk-active' : 'uk-parent'"
                ><router-link to="/orders">Orders</router-link></li>
                <li
                  :class="($route.path.indexOf('products') > -1)? 'uk-active' : 'uk-parent'"
                ><router-link to="/products">Products</router-link></li>
                <li
                  :class="($route.path.indexOf('users') > -1)? 'uk-active' : 'uk-parent'"
                ><router-link to="/users">Users</router-link></li>
            </ul>
        </div>
    </nav>
    <div class="uk-container">
      <router-view/>
    </div>
  </div>
</template>
<script>
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';

UIkit.use(Icons);

export default {
  name: 'App',
  watch: {
    // eslint-disable-next-line
    '$route.path': function () {
      this.checkRoute();
    },
  },
  async created() {
    this.checkRoute();
  },
  methods: {
    checkRoute() {
      // const val = this.$route.path;
      // if (val.indexOf('orders') === -1 && val.indexOf('products') === -1 && val.indexOf('users') === -1) {
      //   this.$router.push('/orders');
      // }
    },
  },
};
</script>

<style lang="less">
@import "../node_modules/uikit/src/less/uikit.less";
</style>
