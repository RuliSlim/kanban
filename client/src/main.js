import Vue from 'vue'
import App from './App.vue'
import Toasted from 'vue-toasted';
Vue.use(Toasted);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#apps')