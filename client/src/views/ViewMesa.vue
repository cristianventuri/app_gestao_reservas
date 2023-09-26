<template>
  <section class="card">
    <ComponenteGrid :dataGrid="this.mesas" :dataColumn="this.columns" fildOrder="msaId" />
  </section>
</template>

<script>
import ComponenteGrid from '@/components/ComponenteGrid.vue';
import Http from '@/services/Http.js';

export default {
  name: "ViewMesa",
  components: {
    ComponenteGrid
  },

  data() {
    return {
      mesas: [],
      columns: [
        { field: 'msaId', header: 'Código', sortable: true },
        { field: 'msaDescricao', header: 'Descrição' }
      ]
    }
  },

  methods: {
    async loadMesas() {
      const { data } = await Http.get('mesas');
      this.mesas = data;
    }
  },

  mounted() {
    this.loadMesas();
  }
}
</script>