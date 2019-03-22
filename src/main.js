import Vue from 'vue'
import router from './router'
import './plugins/vuetify'
import App from './App.vue'
import VeeValidate from 'vee-validate';
import httpRequest from './api/httpRequest'

Vue.prototype.$eventBus = new Vue();
Vue.prototype.$axios = httpRequest;

Vue.use(VeeValidate);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
