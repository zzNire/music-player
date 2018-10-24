// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './commom/stylus/index.styl'
import 'babel-polyfill'
import fastclick from 'fastclick'
import Swiper from 'swiper'
import './commom/stylus/variable.styl';
import lazyLoad from 'vue-lazyload';
import store from './store'

fastclick.attach(document.body);
Vue.config.productionTip = false
Vue.use(lazyLoad,{
  loading :require('./commom/image/default.png')
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
