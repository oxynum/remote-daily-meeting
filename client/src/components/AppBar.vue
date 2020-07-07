<template>
  <div class="appbar">
    <v-app-bar
        dark
      >
        <v-app-bar-nav-icon @click="$emit('update:drawer', true)"></v-app-bar-nav-icon>
        <v-toolbar-title>Remote Daily Meetings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-select
          v-show="isInDashboard"
          class="center-selection"
          v-model="currentTeam"
          :items="teams"
          menu-props="auto"
          hide-details
          prepend-icon="mdi-account-multiple"
          @change="selectTeam"
        ></v-select>
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
    loggedIn: false,
    teams: [],
    currentTeam: '',
    isInDashboard: false
  }),

  props: ['drawer', 'logOutBtn'],

  mounted () {
    this.isInDashboard = this.$router.currentRoute.path.includes('/dashboard')

    if (this.isInDashboard) {
      this.loadTeams()
    }

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
    },
    selectTeam () {
      this.$router.push('/dashboard/' + (this.teams.indexOf(this.currentTeam) + 1) + '/members')
    },
    loadTeams () {
      var teamsRef = this.$secondaryApp.firestore().collection('teams')
      var query = teamsRef
        .where('idSM', '==', firebase.auth().currentUser.uid)
        .where('active', '==', true)
      query.orderBy('creationDate')
        .onSnapshot((snapshot) => {
          this.teams = []
          snapshot.forEach((doc) => {
            this.teams.push(doc.data().name)
          })
          if (this.teams.length > 0) {
            if (!isNaN(this.$route.params.team)) {
              var parsedParam = parseInt(this.$route.params.team, 10)
              if (parsedParam <= this.teams.length) {
                this.currentTeam = this.teams[parsedParam - 1]
              } else {
                this.currentTeam = this.teams[0]
              }
            } else {
              this.currentTeam = this.teams[0]
            }
            if (this.$router.currentRoute.path === '/dashboard') {
              if (this.teams.length > 0) {
                this.$router.push('/dashboard/1/members')
              }
            }
          }
        })
    }
  },
  watch: {
    $route (to, from) {
      this.isInDashboard = this.$router.currentRoute.path.includes('/dashboard')

      if (this.isInDashboard) {
        this.loadTeams()
        if (this.$router.currentRoute.path === '/dashboard') {
          if (this.teams.length > 0) {
            this.$router.push('/dashboard/1/members')
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.center-selection {
    text-align: center;
}
</style>
