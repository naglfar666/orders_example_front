<template>
  <div>
    <h1 class="uk-heading-medium">Users</h1>
    <v-table :head="head">
      <template #body>
        <tr>
            <td>Table Data</td>
            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
            <td><button class="uk-button uk-button-default" type="button">Button</button></td>
        </tr>
        <tr>
            <td>Table Data</td>
            <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
            <td><button class="uk-button uk-button-default" type="button">Button</button></td>
        </tr>
      </template>
    </v-table>
  </div>
</template>

<script>
import Table from '@/components/Table.vue';

export default {
  data() {
    return {
      head: ['#', 'Name', 'Surname', 'Actions'],
    };
  },
  components: {
    'v-table': Table,
  },
};
</script>
