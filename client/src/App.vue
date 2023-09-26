<template>
  <RouterView />
  <ConfirmDialog />
  <DynamicDialog />
  <ComponenteToast />
</template>

<script>
import { useUserAuthentication } from './stores/userAuthentication';
import ComponenteToast from './components/ComponenteToast.vue';
import ConfirmDialog from 'primevue/confirmdialog';
import DynamicDialog from 'primevue/dynamicdialog';

export default {
  name: "App",
  components: {
    ComponenteToast,
    ConfirmDialog,
    DynamicDialog,
  },

  data() {
    return {
      isAuth: false,
      isLogin: false
    }
  },
  
  watch: {
    async $route(to, from) {
      /* Verifica se está logado, caso contrário direciona para o login */
      const userAuthentication = useUserAuthentication();
      this.isLogin = (to.path.indexOf('/login') > -1) || to.path === '/';
      this.isAuth = userAuthentication.validateAuthentication();

      if (!this.isAuth && !this.isLogin) {
        this.$router.replace('/login');
      }
    }
  },
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  background-color: #efefef;
}
</style>