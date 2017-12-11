// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//////////////import Popper from 'popper'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import AuthPlugin from './plugins/AuthPlugin.js'
import VModal from 'vue-js-modal'

Vue.use(VModal)
Vue.use(BootstrapVue)
Vue.use(AuthPlugin)

Vue.config.productionTip = false;

//configure route guards
router.beforeEach(function (to, from, next)  {
  //Enforce authentication
  if (to.matched.some(function(record) { return record.meta.requiresAuth })
      && !Vue.authPlugin.loggedIn())
  {
      next({
          path: '/login',
          query: { redirect: to.name }
      });
  }
  else {
      next(); // make sure to always call next()!
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
