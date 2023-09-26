<template>
  <section id="section-autenticacao">
    <div class="conteudo-autenticacao">
      <div class="container-inicial">
        <span class="icone pi pi-users"></span>
        <h3>Acesso</h3>
      </div>

      <div class="mensagem success" v-if="this.mensagem.success">
        <span class="icone pi pi-check-circle"></span>
        <span class="texto-mensagem">{{ this.mensagem.success }}</span>
      </div>
      <div class="mensagem load" v-if="this.mensagem.load">
        <span class="icone pi pi-spin pi-spinner"></span>
        <span class="texto-mensagem">{{ this.mensagem.load }}</span>
      </div>
      <div class="mensagem error" v-if="this.mensagem.error">
        <span class="icone pi pi-times-circle"></span>
        <span class="texto-mensagem">{{ this.mensagem.error }}</span>
      </div>
      <div class="mensagem warn" v-if="this.mensagem.warn">
        <span class="icone pi pi-exclamation-circle"></span>
        <span class="texto-mensagem">{{ this.mensagem.warn }}</span>
      </div>

      <form class="container-formulario-login" @submit.prevent="this.submit()">
        <div class="campos-formulario">
          <InputText id="username" class="p-inputtext-sm" v-model="this.form.usuario" type="text" placeholder="Usuário" @focus="this.onFocusInput($event)" autocomplete="off" />
          <Password id="password" class="p-inputtext-sm" v-model="this.form.senha" :feedback="false" toggleMask placeholder="Senha" @focus="this.onFocusInput($event)" />
        </div>
        <div class="acao-formulario">
          <RouterLink class="btn-cadastro" to="cadastro">Criar Conta</RouterLink>
          <Button severity="success" title="Confirmar" size="small" type="submit">
            <span class="icone-detail">Acessar</span>
          </Button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useUserAuthentication } from '../stores/userAuthentication';

export default {
  name: "ViewLogin",
  components: {
    InputText,
    Password,
    Button,
  },

  data() {
    return {
      mensagem: {
        success: false,
        error: false,
        load: false,
        warn: false,
      },
      form: {
        usuario: '',
        senha: ''
      },
    }
  },

  methods: {
    submit() {
      var usuario = this.form.usuario ? this.form.usuario.trimStart() : '';
      var senha = this.form.senha ? this.form.senha.trimStart() : '';
      var componenteUser = $("#username");
      var componentePassword = $("#password");

      if (usuario === '' && senha === '') {
        this.addClassInvalid(componenteUser);
        this.addClassInvalid(componentePassword);
        this.clearMessages();
        this.mensagem.error = 'Informe o nome de usuário e senha para prosseguir';
      } else if (usuario === '') {
        this.addClassInvalid(componenteUser);
        this.clearMessages();
        this.mensagem.error = 'Informe o nome de usuário para prosseguir';
      } else if (senha === '') {
        this.addClassInvalid(componentePassword);
        this.clearMessages();
        this.mensagem.error = 'Informe sua senha para prosseguir';
      } else {
        this.clearMessages();
        this.mensagem.load = "Validando credenciais...";
        this.autenticaUsuario(usuario, senha);
      }
    },

    onFocusInput(event) {
      this.removeClassInvalid(event.currentTarget);
    },

    addClassInvalid(element) {
      $(element).addClass("p-invalid");
    },

    removeClassInvalid(element) {
      $(element).removeClass("p-invalid");
    },

    async autenticaUsuario(usuario, senha) {
      try {
        const userAuthentication = useUserAuthentication();
        const { auth, message } = await userAuthentication.logIn(usuario, senha);
        this.clearMessages();

        if (auth) {
          this.mensagem.success = message;
          this.$router.replace('/');
        } else {
          this.mensagem.warn = message;
        }
      } catch (error) {
        return false;
      }
    },

    clearMessages() {
      this.mensagem.success = false;
      this.mensagem.error = false;
      this.mensagem.load = false;
      this.mensagem.warn = false;
    }
  },
}
</script>

<style lang="scss">
$font-color-placeholder: rgba($color: #fff, $alpha: .6);

#section-autenticacao {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .conteudo-autenticacao {
    width: 100%;
    max-width: 20rem;
    padding: 2rem;
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 2rem;
    box-shadow: 0 0 20px -5px var(--black-mute);
    background-color: rgba($color: #000000, $alpha: .80);

    .container-inicial {
      color: var(--white);
      display: grid;
      justify-items: center;
      gap: 1rem;

      h3 {
        font-size: 1.5rem;
        font-weight: 300;
      }

      .icone {
        font-size: 6rem;
      }
    }

    .mensagem {
      width: 100%;
      display: grid;
      grid-template-columns: 1rem auto;
      align-items: center;
      gap: 0.5rem;
      color: white;
      padding: 0.5rem;
      border-radius: 0.3rem;

      &.load {
        background-color: var(--blue-600);
      }

      &.success {
        background-color: var(--green-500);
      }

      &.error {
        background-color: var(--red-600);
      }

      &.warn {
        background-color: var(--orange-600);
      }

      .icone {
        font-size: 1rem;
        width: 1rem;
        height: 1rem;
      }
    }

    .container-formulario-login,
    .campos-formulario {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 2rem;
    }

    .container-formulario-login {
      .campos-formulario {
        gap: .5rem;

        input {
          width: 100%;
          text-align: center;
          color: var(--white);
          background-color: rgba($color: #fff, $alpha: .05);

          &::placeholder {
            color: $font-color-placeholder;
          }
        }

        svg {
          color: $font-color-placeholder;
          cursor: pointer;
        }
      }

      .acao-formulario {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;

        .btn-cadastro {
          text-decoration: none;
          color: white;
        }

        button {
          display: flex;
          gap: .5rem
        }
      }
    }
  }
}
</style>