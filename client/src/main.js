import Vue from 'vue'
import App from './App.vue'
import Toasted from 'vue-toasted';
Vue.use(Toasted);
// import VueMaterial from 'vue-material';
// import 'vue-material/dist/vue-material.css';
// Vue.use(VueMaterial);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#apps')

// npm i vue-toasted

// ---main.js


// ---manggil
// this.$toasted.success('Successfully logged in',{
//                         duration: 3000
//                     });