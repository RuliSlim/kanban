import Vue from 'vue'
import App from './App.vue'
import Toasted from 'vue-toasted';
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: 'CLIENT_ID.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)
Vue.use(Toasted);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#apps')