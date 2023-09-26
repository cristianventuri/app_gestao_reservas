<template>
  <div class="add_reserva" @keypress="this.pressSave">
    <div class="formulario">
      <p v-html="getStringDataHora"></p>
      <div class="campo">
        <label for="nome_reserva">Solicitante da Reserva: </label><br>
        <InputText id="nome_reserva" v-model="this.form.nome" aria-describedby="nome_reserva-help" @focus="this.removeClassInvalid" autocomplete="off"/>
      </div>
    </div>

    <div class="action">
      <Button class="p-button-danger p-button-rounded p-button-sm p-button-text" label="Cancelar" icon="pi pi-times" @click="this.closeDialog" />
      <Button class="p-button-primary p-button-rounded p-button-sm p-button-text" label="Confirmar" icon="pi pi-check" @click="this.addReserva" />
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { success, error } from '@/services/ServiceToast';
import { mapState } from 'pinia';
import { useUserAuthentication } from '@/stores/userAuthentication.js'
import Http from '@/services/Http.js';

export default {
  name: "ComponenteReserva",
  inject: ['dialogRef'],
  components: {
    InputText,
    Button
  },

  data() {
    return {
      ...this.dialogRef.data,
      form: {
        nome: '',
      }
    }
  },

  computed: {
    ...mapState(useUserAuthentication, ['getID']),

    getStringDataHora() {
      var arrDataHora = moment(this.dialogRef.data.dataHora).format('DD/MM/YYYY HH:00').split(' ');
      return `<b>Atenção</b><br> A reserva da mesa <b>${this.dialogRef.data.mesa}</b> será agendada para o dia <b>${arrDataHora[0]}</b> às <b>${arrDataHora[1]}</b> horas.`
    }
  },

  methods: {
    closeDialog() {
      error('Atenção', 'A alteração dos dados foi cancelada.');
      this.dialogRef.close();
    },

    addReserva() {
      if (this.form.nome.trim() == '') {
        $('#nome_reserva').addClass('p-invalid');
        error('Atenção', 'O campo de Solicitante da Reserva é obrigátorio!');
      } else {
        const reserva = {
          nome: this.form.nome,
          user: this.getID,
          mesa: this.dialogRef.data.mesa,
          dataHora: moment(this.dialogRef.data.dataHora).format('YYYY-MM-DD HH:mm:ss')
        }

        Http.post('reservas', reserva).then((res) => {
          success('Sucesso', 'A reserva foi agendada com sucesso.');
          this.dialogRef.options.emits.atualizaReservas();
          this.dialogRef.close();
        }).catch((err) => {
          const { message } = err.response.data;
          error('Atenção', message || 'Não foi possível realizar o agendamento da reserva.');
        });
      }
    },

    removeClassInvalid(event) {
      $(event.currentTarget).removeClass('p-invalid');
    },

    pressSave(event) {
      if ((event.keyCode === 13)) {
        this.addReserva();
      }
    }
  }
}
</script>

<style lang="scss">
.p-dialog-content {
  padding: 0 1.5rem 1.5rem !important;

  .formulario {
    display: grid;
    padding: 1rem 1rem 2rem 1rem;
    gap: 1rem;
  }

  .p-dialog-title {
    font-size: 1rem;
  }

  input {
    width: 100%;
  }

  .action {
    display: flex;
    justify-content: flex-end;
  }
}
</style>