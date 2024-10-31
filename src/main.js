import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from "vuetify";

import i18n from '@/plugins/i18n';
import Vuelidate from 'vuelidate';

import 'bootstrap'; 

import 'bootstrap/dist/css/bootstrap.min.css';
import "vuetify/dist/vuetify.min.css";



//import FlagIcon from 'vue-flag-icon';

import VueStripeCheckout from 'vue-stripe-checkout';
import { store } from './store/store'

import VueAnalytics from 'vue-analytics'


 
//Vue.use(VueStripeCheckout, 'pk_test_xIv1CKBITh4Fh2aEdroyNMg8');
Vue.use(VueStripeCheckout, window.Metri_Config.STRIPE_PUBLISHABLE_KEY);


Vue.use(Vuelidate);
Vue.use(Vuetify);
//Vue.use(FlagIcon);
Vue.use(VueAnalytics, {
  id: 'UA-80774314-3',
  router
})

//apiURL=process.env.VUE_APP_FORM_API_URL
// Vue.config.formApiUrl = process.env.FORM_API_URL;

Vue.config.productionTip = false;




new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

i18n.locale = window.Metri_Config.LANG;


