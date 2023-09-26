<template>
  <nav class="menu">
    <RouterLink v-for="itemMenu in itens" :to="itemMenu.route" custom>
      <a :class="getClassItemMenu(itemMenu.route)" :href="itemMenu.route">
        <font-awesome-icon :icon="itemMenu.icone" />
        <span>{{ itemMenu.label }}</span>
      </a>
    </RouterLink>
    <a href="#" class="router_item" @click.prevent="encerrarSecao">
      <font-awesome-icon icon="fa-solid fa-power-off" />
      <span>Sair</span>
    </a>
  </nav>
  
  <main class="conteudo">
    <RouterView />
  </main>
</template>

<script>
import { RouterLink } from 'vue-router';
import { useUserAuthentication } from '@/stores/userAuthentication.js'
import { mapActions, mapState } from 'pinia';
import { warn } from '@/services/ServiceToast';
import { confirm } from '@/services/ServiceConfirm';

export default {
  name: "ViewHome",
  components: {
    RouterLink
  },

  data() {
    return {
      active: false,
      itens: [
        { label: 'Agendamento', icone: 'far fa-calendar-plus', route: '/agendamento' },
        { label: 'Reservas', icone: 'fas fa-utensils', route: '/reservas' },
        { label: 'Mesas', icone: 'fas fa-chair', route: '/mesas' },
        { label: 'Usuários', icone: 'fas fa-user', route: '/usuarios' },
      ],
    }
  },

  computed: {
    ...mapState(useUserAuthentication, ['getName']),
  },

  methods: {
    ...mapActions(useUserAuthentication, ['logOut']),

    encerrarSecao(){
        const fnConfirma = () => {
          this.$router.replace('/login');
          this.logOut();
          warn(`Aviso!`, 'Sua seção de usuário foi encerrada.');
        };
        const fnRejeita = () => {
          warn(`Aviso!`, 'Sua seção de usuário não foi encerrada.');
        };

        confirm(`Atenção, ${this.getName}!`, 'Tem certeza que deseja encerrar a seção de usuário atual?', "pi pi-question-circle", fnConfirma, fnRejeita);
    },

    getClassItemMenu(route) {
      return (window.location.pathname === route) ? 'router_item active' : 'router_item';
    }
  }
}
</script>

<style lang="scss">
$primary_color: #35363a;
$secondary_color: #efefef;

nav.menu {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: $primary_color;

  .router_item {
    padding: 0 1rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: $secondary_color;
    text-decoration: none;
    transition: ease-in-out .2s;

    &:hover,
    &.active {
      background: $secondary_color;
      color: $primary_color;
    }
  }
}

main.conteudo {
  padding: 2rem;
}
</style>