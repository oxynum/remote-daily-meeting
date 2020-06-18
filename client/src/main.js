import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'

var serviceAccountKey = require('./config/serviceAccountKey.json')

firebase.initializeApp(serviceAccountKey)
Vue.prototype.$secondaryApp = firebase.initializeApp(serviceAccountKey, 'Secondary')

Vue.config.productionTip = false
Vue.config.silent = true

let app = ''

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      firebase,
      render: h => h(App)
    }).$mount('#app')
  }
})
