<template>
  <section class="card">
    <ComponenteGrid :dataGrid="this.usuarios" :dataColumn="this.columns" fildOrder="usrId" />
  </section>
</template>

<script>
import ComponenteGrid from '@/components/ComponenteGrid.vue';
import Http from '@/services/Http.js';
export default {
  name: "ViewUsuario",
  components: {
    ComponenteGrid,
  },
  data() {
    return {
      usuarios: [],
      columns: [
        { field: 'usrId', header: 'Código', sortable: true },
        { field: 'usrNome', header: 'Nome' }
      ]
    }
  },
  methods: {
    async loadUsers() {
      const { data } = await Http.get('users');
      this.usuarios = data;
    }
  },
  mounted() {
    this.loadUsers();
  }
}
</script>

<style></style>