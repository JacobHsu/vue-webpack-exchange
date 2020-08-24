// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate'
import VueLocalStorage from 'vue-localstorage'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import '@/assets/bootstrap.css'
import '@/assets/icomoon/style.css'
import i18n from './i18n'
import conf from './conf'

Vue.config.productionTip = false
Vue.prototype.$conf = conf

Vue.use(BootstrapVue)
Vue.use(VeeValidate)
Vue.use(VueLocalStorage)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
