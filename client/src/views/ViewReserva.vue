<template>
  <section class="card">
    <ComponenteGrid :dataGrid="this.reservas" :dataColumn="this.columns" fildOrder="rsvId" />
  </section>
</template>

<script>
import ComponenteGrid from '@/components/ComponenteGrid.vue';
import Http from '@/services/Http.js';

export default {
  name: "ViewReserva",
  components: {
    ComponenteGrid
  },

  data() {
    return {
      reservas: [],
      columns: [
        { field: 'rsvId', header: 'Reserva - Código', sortable: true },
        { field: 'rsvNome', header: 'Reserva - Nome' },
        { field: 'rsvDataHora', header: 'Reserva - Data/Hora' },
        { field: 'msaId', header: 'Mesa' },
        { field: 'usrNome', header: 'Responsável' },
      ]
    }
  },

  methods: {
    async loadReservas() {
      const { data } = await Http.get('reservas');
      data.map((reserva) => {
        (reserva.rsvDataHora = moment(reserva.rsvDataHora).format("DD/MM/YYYY HH:mm:ss"))
      })

      this.reservas = data;
    }
  },

  mounted() {
    this.loadReservas();
  }
}
</script>


