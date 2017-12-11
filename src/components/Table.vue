<template>
  <div align="center">
    <h2>Custom Table</h2>

    <b-table :fields="fields" :items="items">
      <!-- A virtual column -->
      <template slot="index" scope="data">
        {{data.index + 1}}
      </template>

      <!-- A custom formatted column -->
        <template slot="names" scope="data">
          {{ data.item.name.first }} 
        </template>

      <!-- A virtual composite column -->
      <template slot="nameage" scope="data">
        <!--    {{data.item.name.first}} is {{data.item.age}} years old -->
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fields: {
        index: {    // A virtual column that doesn't exist in items
          label: 'Index'
        },
        names: {     // A column that needs custom formatting
          label: 'Full Name'
        },
        age: {      // A regular column
          label: 'Age'
        },
        nameage: {   // A virtual column made up from two fields
          label: 'First name and age'
        }
      },
      items: [
        { name: { first: 'John', last: 'Doe' }, sex: 'Male', age: 42 },
        { name: { first: 'Jane', last: 'Doe' }, sex: 'Female', age: 36 },
        { name: { first: 'Rubin', last: 'Kincade' }, sex: 'Male', age: 73 },
        { name: { first: 'Shirley', last: 'Partridge' }, sex: 'Female', age: 62 },
        { name: null, sex: 'Male', age: 25 }
      ]
    }
  }
}
</script>


<style>

</style>
