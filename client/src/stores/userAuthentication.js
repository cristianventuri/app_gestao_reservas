import { defineStore } from 'pinia';
import Http from '@/services/Http.js';

export const useUserAuthentication = defineStore('userAuthentication', {
  state: () => {
    return {
      id: null,
      name: null,
      token: null
    }
  },

  actions: {
    async logOut() {
      this.id = null;
      this.name = null;
      this.token = null;
      sessionStorage.removeItem('userData');
    },

    async logIn(userId, senha) {
      const { data } = await Http.post('auth', { "usuario": userId, "senha": senha });

      if (data.auth) {
        this.id = data.auth.usrId;
        this.name = data.auth.usrNome;
        this.token = data.auth.token;
        sessionStorage.setItem('userData', JSON.stringify(this.$state));
      }

      return data;
    },

    async validateAuthentication() {
      if (this.token) {
        await Http.post('authJwt', { "token": this.token });
        return true;

      } else {

        try {
          const storageSession = sessionStorage.getItem('userData');
          
          if (storageSession) {
            const objectUserData = JSON.parse(storageSession);

            if (objectUserData.token) {
              const { data } = await Http.post('authJwt', { "token": objectUserData.token });

              if (data.auth) {
                this.id = data.auth.usrId;
                this.name = data.auth.usrNome;
                this.token = data.auth.token;
                sessionStorage.setItem('userData', JSON.stringify(this.$state));
              }

              return true;
            }
          }

          /* caso não atender limpa e faz logout */
          this.logOut();
          return false;

        } catch (error) {
          /* caso der erro limpa e faz logout */
          this.logOut();
          return false;
        }
      }
    },
  },

  getters: {
    getID: (state) => {
      state.validateAuthentication();
      return state.id;
    },
    getName: (state) => {
      state.validateAuthentication();
      return state.name;
    },
    getToken: (state) => {
      state.validateAuthentication();
      return state.token;
    },
  },
});