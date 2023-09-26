<template>
  <section class="agendamento">
    <div class="selecao_calendario">
      <div class="header_selecao_calendario">
        <h3>Agenda</h3>
        <p>Clique sobre o dia desejado para carregar as informações correspondentes.</p>
      </div>
      <div class="calendario">
        <Calendar v-model="date" inline showWeek hourFormat="24" :minDate="new Date()" />
      </div>
    </div>

    <div class="selecao_mesa">
      <div class="header_selecao_mesa">
        <h3>Mesas</h3>
        <p>Clique sobre a mesa desejada para visualizar os horários disponíveis para reserva.</p>
      </div>
      <div class="mesas_disponiveis">
        <button v-for="mesa in mesas" class="item_mesa" :active="mesa.msaId === mesaAtiva" @click="mesaAtiva = mesa.msaId" :title="'Selecionar Mesa ' + mesa.msaId">
          <font-awesome-icon class="mesa_icone" icon="fa-solid fa-utensils" />
          <span class="mesa_id">Mesa {{ mesa.msaId }}</span>
        </button>
      </div>
    </div>

    <div class="selecao_horario">
      <div class="header_selecao_horario">
        <h3>Horários</h3>
        <p>Clique sobre o horário desejado para abrir o agendamento de reserva.</p>
      </div>
      <div class="horarios_disponiveis">
        <button 
          v-if="existeHorarioDisponivel"
          v-for="horario in horarios" 
          class="item_hora" 
          :disabled="horario.reservado" 
          :title="'Horário ' + (horario.reservado ? 'Indisponível' : 'Disponível')"
          @click="openAddReserva(horario.hora, horario.reservado)">
          {{ horario.hora }}:00 
        </button>
        <h4 v-else style="color: red;">{{ getDescricaoAvisoHorario }}</h4>
      </div>
    </div>
  </section>
</template>

<script>
import Http from '@/services/Http.js';
import Calendar from 'primevue/calendar';
import ComponenteReserva from '@/components/ComponenteReserva.vue';
import { dynamicDialog } from '@/services/ServiceDialog';
import { warn } from '@/services/ServiceToast';

export default {
  name: "ViewAgendamento",
  components: {
    Calendar
  },

  data() {
    return {
      date: new Date(),
      mesas: [],
      mesaAtiva: 1,
      horarios: [
        { hora: '18', reservado: false },
        { hora: '19', reservado: false },
        { hora: '20', reservado: false },
        { hora: '21', reservado: false },
        { hora: '22', reservado: false },
        { hora: '23', reservado: false },
      ]
    }
  },

  watch: {
    date(newDate, oldDate) {
      this.carregaDisponibilidadeHorario();
    },

    mesaAtiva(newMesa, oldMesa) {
      this.carregaDisponibilidadeHorario();
    }
  },
  
  computed: {
    existeHorarioDisponivel(){
      /* Se não possuir nenhum horario reservado ou se não for domingo então permite agendar */
      return this.horarios.some(horario => horario.reservado === false) && this.date.getDay() !== 0;
    },

    getDescricaoAvisoHorario(){
      /* Se não possuir nenhum horario reservado ou se não for domingo então permite agendar */
      return this.date.getDay() === 0 ? 'Não é possível realizar reservas aos domingos!' : 'Não existem horários disponíveis para esta mesa!';
    }
  },

  methods: {
    async loadMesas() {
      const { data } = await Http.get('mesas');
      this.mesas = data;
    },

    async carregaDisponibilidadeHorario() {
      const { data } = await Http.post(`reservas-ativas/${this.mesaAtiva}`, { date: moment(this.date).format('YYYY-MM-DD') });
      if (data.length > 0) {
        data.forEach((reserva) => {
          var date = new Date(reserva.rsvDataHora);
          var horario = this.horarios.find((horario) => (parseInt(date.getHours()) === parseInt(horario.hora)));
          horario.reservado = (horario != undefined);
        });
      } else {
        this.horarios.map((horario) => { horario.reservado = false });
      }
    },

    openAddReserva(horario, isReservado) {
      if (isReservado) {
        warn('Aviso', `A mesa selecionada (Mesa ${this.mesaAtiva}), já possui reservas para o dia ${moment(this.date).format('DD/MM/YYYY')}.`);
      } else {
        this.date.setHours(horario);
        this.date.setMinutes(0);
        this.date.setSeconds(0);

        dynamicDialog(ComponenteReserva, `Adicionar Reserva - Mesa ${this.mesaAtiva}`, {
          data: {
            mesa: this.mesaAtiva,
            dataHora: this.date
          },
          emits: {
            atualizaReservas: () => {
              this.carregaDisponibilidadeHorario(this.date);
            }
          }
        });
      }
    },
  },
  
  beforeMount() {
    this.carregaDisponibilidadeHorario();
    this.loadMesas();
  }
}
</script>

<style>
section.agendamento {
  display: grid;
  justify-items: center;
  row-gap: 2rem;

  .selecao_calendario,
  .selecao_mesa,
  .selecao_horario {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    max-width: 60rem;
  }

  .mesas_disponiveis {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;

    .item_mesa {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      height: 5rem;
      width: 5rem;
      border: 1px dotted #35363a;
      border-radius: 0.5rem;
      cursor: pointer;
      background-color: white;
      transition: ease-in-out .2s;

      &:hover {
        background-color: #d0d6f0;
      }

      &[active=true] {
        /* cursor: no-drop !important; */
        background-color: #d0d6f0;

        & * {
          color: #35363a;
        }
      }

      .mesa_icone {
        font-size: 1.5rem;
        color: #a4a8bd;
      }
    }
  }

  .horarios_disponiveis {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;

    .item_hora {
      height: 2rem;
      width: 5rem;
      background-color: white;
      border: 1px solid #8bae2c;
      color: #8bae2c;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: ease-in-out .2s;

      &:hover:not(&:disabled) {
        background-color: #d0d6f0;
      }

      &:disabled {
        cursor: no-drop;
        border-color: red;
        color: red;
        opacity: .6;
      }
    }
  }
}
</style>