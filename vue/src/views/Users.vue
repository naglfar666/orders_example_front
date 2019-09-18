<template>
  <div>
    <h1 class="uk-heading-medium">Users</h1>
    <button class="uk-button uk-button-default" @click="$router.push('/users/add')">Create</button>
    <v-table :head="head" v-if="!loading">
      <template #body>
        <tr v-for="user in USER.list" :key="user.id + '_user'">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.surname }}</td>
            <td>
              <button class="uk-button uk-button-primary" type="button" @click="$router.push('/users/single/' + user.id)">
                Edit
              </button>
              <button class="uk-button uk-button-danger" type="button" @click="showRemover(user.id)">
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
      head: ['#', 'Name', 'Surname', 'Actions'],
      loading: true,
    };
  },
  computed: {
    ...mapGetters({
      USER: 'User/STATE',
    }),
  },
  async created() {
    await this.getUsers();
  },
  methods: {
    ...mapActions({
      getUsersList: 'User/GET_USERS_LIST',
      getSingleUser: 'User/GET_SINGLE_USER',
      removeUser: 'User/REMOVE_USER',
    }),
    async getUsers() {
      this.loading = true;
      await this.getUsersList();
      this.loading = false;
    },
    showRemover (id) {
      UIkit.modal.confirm('Remove confirmation').then(async () => {
        let response = await this.removeUser(id);
        if (response.type === 'success') {
          UIkit.notification({
            message: 'User # ' + id + ' was removed',
            status: 'success',
            pos: 'bottom-right',
            timeout: 5000
          });
        }
        this.getUsers();
      }, () => {
        UIkit.notification({
          message: 'Removing rejected',
          status: 'success',
          pos: 'bottom-right',
          timeout: 5000
        });
      });
    }
  },
  components: {
    'v-table': Table,
  },
};
</script>
