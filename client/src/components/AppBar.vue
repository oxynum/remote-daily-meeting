<template>
  <div class="appbar">
    <v-app-bar
        dark
      >
        <v-app-bar-nav-icon @click="$emit('update:drawer', true)"></v-app-bar-nav-icon>
        <v-toolbar-title>Remote Daily Meetings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="loggedIn" @click="logOut"><v-icon>mdi-logout</v-icon> Log Out</v-btn>
        <v-btn v-else @click="$router.push('/login')"><v-icon>mdi-account</v-icon> Log In</v-btn>
    </v-app-bar>
  </div>
</template>

<script>

import firebase from 'firebase'

export default {

  data: () => ({
    loggedIn: false
  }),

  props: ['drawer', 'logOutBtn'],

  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true
        this.$emit('update:logOutBtn', false)
      } else {
        this.loggedIn = false
      }
    })
  },

  methods: {
    logOut () {
      var unsub = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase.auth().signOut()
            .then(() => {
              if (this.$router.currentRoute !== '/') {
                this.$router.push('/')
                this.$emit('update:logOutBtn', true)
              }
            })
            .catch((e) => {
              console.log(e)
            })
        }
      })
      unsub()
    }
  }
}
</script>
