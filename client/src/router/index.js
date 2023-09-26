import { createRouter, createWebHistory } from 'vue-router'
import { useUserAuthentication } from '@/stores/userAuthentication';
import ViewLogin from '@/views/ViewLogin.vue'
import ViewCadastro from '@/views/ViewCadastro.vue'

const routes = [
  {
    path: '/',
    name: '',
    components: {
      default: () => import('@/views/ViewHome.vue')
    },
    children: [
      {
        path: 'reservas',
        component: () => import('@/views/ViewReserva.vue')
      },
      {
        path: 'mesas',
        component: () => import('@/views/ViewMesa.vue')
      },
      {
        path: 'usuarios',
        component: () => import('@/views/ViewUsuario.vue')
      },
      {
        path: 'agendamento',
        component: () => import('@/views/ViewAgendamento.vue')
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: ViewLogin
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: ViewCadastro
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeEach(async (to) => {
  const publicPages = ['/login', '/cadastro'];
  const authRequired = !publicPages.includes(to.path);
  const authUser = useUserAuthentication();

  /* Verificar se é um path publico, caso contrario direciona para o /login */
  var isLogado = await authUser.validateAuthentication();
  if (authRequired && !isLogado) {
    return '/login';
  }
});

export default router
