<template>
  <div>
    <h1 class="uk-heading-medium">{{ title }}</h1>
    <div v-if="!loading">
      <div class="uk-margin">
        <input class="uk-input uk-form-width-large" type="text" placeholder="Surname" v-model="input.surname">
      </div>
      <div class="uk-margin">
        <input class="uk-input uk-form-width-large" type="text" placeholder="Name" v-model="input.name">
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
        surname: '',
        name: '',
      },
    };
  },
  computed: {
    ...mapGetters({
      USER: 'User/STATE',
    }),
  },
  async created() {
    if (this.$route.params.id) {
      this.loading = true;
      await this.getSingleUser(this.$route.params.id);
      this.$set(this.input, 'surname', this.USER.single.surname);
      this.$set(this.input, 'name', this.USER.single.name);
      this.title = `Edit user # ${this.$route.params.id} ${this.USER.single.name} ${this.USER.single.surname}`;
      this.loading = false;
    } else {
      this.title = 'Create new user';
    }
  },
  methods: {
    ...mapActions({
      getSingleUser: 'User/GET_SINGLE_USER',
      updateUser: 'User/UPDATE_USER',
      createUser: 'User/CREATE_USER',
    }),
    async save() {
      if (this.$route.params.id) {
        const response = await this.updateUser({
          id: this.$route.params.id,
          ...this.input,
        });
        if (response.type === 'success') {
          this.$router.push('/users');
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
        const response = await this.createUser(this.input);
        if (response.type === 'success') {
          this.$router.push('/users');
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
