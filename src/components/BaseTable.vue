<!-- eslint-disable vue/no-use-v-if-with-v-for -->

<template>
  <table class="table tablesorter" :class="tableClass">
    <thead :class="theadClasses">
      <tr>
        <slot name="columns">
          <th v-for="column in columns" :key="column">{{ column }}</th>
        </slot>
      </tr>
    </thead>

    <tbody :class="tbodyClasses">
      <tr v-for="(item, index) in data" :key="index">
        <slot :row="item">
          <td
            v-for="(column, index) in columns"
            :key="index"
            v-if="hasValue(item, column)"
          >
            {{ itemValue(item, column) }}
          </td>
        </slot>
        
      </tr>
      <tr  v-if="data && data.length<=0">
        <td class="text-left" :colspan="columns.length">
          <slot name="empty">
      <p>Empty</p>
      </slot>
        </td>
      </tr>
      <tr style="background-color: rgba(200, 171, 255, 0.918);border-bottom: solid 1px rgb(202, 202, 202);">
        <slot name="summary" >
         

          </slot>

      </tr>
      
      
    </tbody>
  </table>
</template>

<script>
export default {
  name: "base-table",
  props: {
    tableClass: {
      type: String,
      default: "",
    },
    theadClasses: {
      type: String,
      default: "",
    },
    tbodyClasses: {
      type: String,
      default: "",
    },
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    },
  },
};
</script>

<style></style>
