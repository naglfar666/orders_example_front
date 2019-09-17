<template>
  <div>
    <table class="uk-table uk-table-middle uk-table-divider">
        <thead>
            <tr>
                <th v-for="th in head" :key="th + '_th'">{{ th }}</th>
            </tr>
        </thead>
        <tbody>
            <slot name="body"></slot>
        </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    head: Array,
  },
};
</script>
