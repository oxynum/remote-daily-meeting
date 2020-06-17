import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'

var serviceAccountKey = require('./config/serviceAccountKey.json')

firebase.initializeApp(serviceAccountKey)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  firebase,
  render: h => h(App)
}).$mount('#app')
