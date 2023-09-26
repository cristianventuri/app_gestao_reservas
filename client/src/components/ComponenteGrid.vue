<template>
  <section class="grid">
    <DataTable class="p-datatable-sm" :value="dataGrid" :sortField="fildOrder" :sortOrder="-1" style="min-width: 50rem;">
      <Column v-for="column in dataColumn" :field="column.field" :header="column.header" :sortable="column.sortable">
      </Column>
    </DataTable>
  </section>
</template>

<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
  name: "ComponenteGrid",
  components: {
    DataTable,
    Column,
  },
  
  props: {
    dataGrid: Array,
    dataColumn: Array,
    fildOrder: String,
  }
}
</script>

<style>
section.grid {
  width: 100%;
}
</style>