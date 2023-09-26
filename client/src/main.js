import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import DialogService from 'primevue/dialogservice';
import ConfirmationService from 'primevue/confirmationservice';

/* Default VUE */
import './assets/styles/base.css';

/* PrimeVue */
import "primevue/resources/primevue.min.css";
import 'primeicons/primeicons.css';
import "primevue/resources/themes/viva-light/theme.css";     
import { pt } from "./assets/locales/pt.json"

/* FontAwesome */
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, far, fab);

/* jQuery */
import $ from "jquery";
window.$ = $;

import moment from 'moment'; 
window.moment = moment;

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(PrimeVue, {
  locale: pt
});
app.use(ToastService);
app.use(DialogService);
app.use(ConfirmationService);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
export default app;




